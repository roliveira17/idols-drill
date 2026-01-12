'use client'

import { useEffect, useRef } from 'react'
import { useSession } from '@/context/SessionContext'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'
import { ChatMessageSkeleton } from './ChatMessageSkeleton'
import { IdolSelector } from './IdolSelector'
import { useSendMessage } from '@/hooks/useSendMessage'
import { toast } from 'sonner'

export function ChatContainer() {
  const { state, addMessage } = useSession()
  const { mutate: sendMessage, isPending } = useSendMessage()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const handleSend = (message: string) => {
    // Guard: prevent sending if no idol is selected
    if (!state.currentIdolDiscussion) return

    // Adiciona mensagem do usuário
    addMessage({ role: 'user', content: message })

    // Envia para API
    sendMessage(
      { message },
      {
        onSuccess: (aiResponse) => {
          addMessage({ role: 'assistant', content: aiResponse })
        },
        onError: (error) => {
          toast.error('Erro ao enviar mensagem', {
            description: error.message
          })
        }
      }
    )
  }

  // Auto-scroll para última mensagem
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [state.chatHistory])

  // Determine if user can send messages
  const canSendMessage = state.currentIdolDiscussion !== undefined

  // Get placeholder based on state and language
  const getPlaceholder = () => {
    if (state.isAwaitingSlider) {
      return state.language === 'pt-BR'
        ? 'Aguardando resposta do slider...'
        : 'Awaiting slider response...'
    }
    if (!canSendMessage) {
      return state.language === 'pt-BR'
        ? 'Selecione um ídolo acima para começar...'
        : 'Select an idol above to start...'
    }
    return state.language === 'pt-BR'
      ? 'Digite sua mensagem...'
      : 'Type your message...'
  }

  return (
    <div className="flex flex-col h-full">
      {/* Área de mensagens */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-3 py-4 sm:p-4 space-y-3 sm:space-y-4"
      >
        {state.chatHistory.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center">
            <div>
              <p className="text-lg font-medium mb-2 text-gray-800 dark:text-gray-100">
                Bem-vindo ao Idol's Drill
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Comece a conversa para descobrir seu Ídolo Mestre
              </p>
            </div>
          </div>
        ) : (
          <>
            {state.chatHistory.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))}
            {isPending && <ChatMessageSkeleton />}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Idol Selector */}
      <IdolSelector />

      {/* Input */}
      <ChatInput
        onSend={handleSend}
        isLoading={isPending}
        disabled={state.isAwaitingSlider || !canSendMessage}
        placeholder={getPlaceholder()}
      />
    </div>
  )
}
