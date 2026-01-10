import { useMutation } from '@tanstack/react-query'
import { useSession } from '@/context/SessionContext'

interface SendMessageParams {
  message: string
  sliderLevel?: 1 | 2 | 3 | 4 | 5
}

export function useSendMessage() {
  const { state } = useSession()

  return useMutation({
    mutationFn: async ({ message, sliderLevel }: SendMessageParams) => {
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [
              ...state.chatHistory.map(m => ({
                role: m.role,
                content: m.content
              })),
              { role: 'user', content: message }
            ],
            language: state.language,
            tone: state.tone,
            idols: state.idols.map(i => ({
              id: i.id,
              status: i.status,
              interactionCount: i.interactionCount
            })),
            currentDiscussion: state.currentIdolDiscussion,
            sliderLevel
          })
        })

        if (!response.ok) {
          let errorMessage = 'Erro ao enviar mensagem'

          try {
            const error = await response.json()
            errorMessage = error.error || errorMessage

            // Mensagens mais amigáveis por status
            if (response.status === 401) {
              errorMessage = 'Configuração de API inválida. Verifique a chave de API.'
            } else if (response.status === 429) {
              errorMessage = 'Muitas requisições. Aguarde um momento e tente novamente.'
            } else if (response.status === 500) {
              errorMessage = 'Erro no servidor. Tente novamente em instantes.'
            }
          } catch {
            // Se não conseguir fazer parse do JSON, usa mensagem genérica
          }

          throw new Error(errorMessage)
        }

        const data = await response.json()

        if (!data.response) {
          throw new Error('Resposta vazia do servidor')
        }

        return data.response as string
      } catch (error) {
        // Se for erro de rede
        if (error instanceof TypeError && error.message.includes('fetch')) {
          throw new Error('Erro de conexão. Verifique sua internet.')
        }

        // Propagar outros erros
        throw error
      }
    },
    retry: (failureCount, error) => {
      // Não tentar novamente se for erro de autenticação
      if (error.message.includes('API inválida')) {
        return false
      }
      // Tentar até 2 vezes para outros erros
      return failureCount < 2
    },
    retryDelay: (attemptIndex) => Math.min(1000 * Math.pow(2, attemptIndex), 5000)
  })
}
