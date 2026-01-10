'use client'

import { useState } from 'react'
import { useSession } from '@/context/SessionContext'
import { IdolType } from '@/types'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function useIdolElimination() {
  const { state, eliminateIdol, setAwaitingSlider, addMessage } = useSession()
  const [pendingElimination, setPendingElimination] = useState<IdolType | undefined>(undefined)
  const router = useRouter()

  const requestElimination = (idolId: IdolType) => {
    const activeIdols = state.idols.filter(i => i.status === 'active')

    // Validação: bloquear se for o último ídolo
    if (activeIdols.length === 1) {
      const lastIdol = activeIdols[0]
      const eliminatedIdols = state.idols.filter(i => i.status === 'eliminated')

      // Adicionar mensagem da IA bloqueando
      const blockMessage = `Não posso permitir que você elimine ${lastIdol.name}. Este é seu **Ídolo Mestre** - o único que resta!

**Ídolos que você já eliminou:**
${eliminatedIdols.map((idol, i) => `${i + 1}. ${idol.name} (Resistência: ${idol.resistanceLevel}/5)`).join('\n')}

Todos os outros já foram descartados. ${lastIdol.name} é claramente o ídolo que tem maior influência em sua vida. Vamos para o resultado final?`

      addMessage({
        role: 'assistant',
        content: blockMessage
      })

      toast.error('Último ídolo não pode ser eliminado', {
        description: 'Este é seu Ídolo Mestre!'
      })

      // Redirecionar para resultado após 2 segundos
      setTimeout(() => {
        router.push('/result')
      }, 2000)

      return
    }

    // Validar se ídolo existe e está ativo
    const idol = state.idols.find(i => i.id === idolId && i.status === 'active')
    if (!idol) {
      toast.error('Ídolo não encontrado ou já eliminado')
      return
    }

    // Marcar como pendente e aguardar slider
    setPendingElimination(idolId)
    setAwaitingSlider(true)
  }

  const confirmElimination = (resistanceLevel: 1 | 2 | 3 | 4 | 5) => {
    if (!pendingElimination) return

    // Eliminar ídolo com o nível de resistência
    eliminateIdol(pendingElimination, resistanceLevel)

    toast.success('Ídolo eliminado', {
      description: `Nível de resistência: ${resistanceLevel}/5`
    })

    // Limpar estado
    setPendingElimination(undefined)

    // Verificar se resta apenas 1 ídolo após eliminação
    const remainingIdols = state.idols.filter(
      i => i.status === 'active' || (i.id === pendingElimination && i.status !== 'eliminated')
    )

    // Como eliminamos um, verificamos se sobra apenas 1
    if (remainingIdols.length <= 2) {
      // Aguardar um momento para a IA processar
      setTimeout(() => {
        const currentActive = state.idols.filter(i => i.status === 'active')
        if (currentActive.length === 1) {
          router.push('/result')
        }
      }, 3000)
    }
  }

  const cancelElimination = () => {
    setPendingElimination(undefined)
    setAwaitingSlider(false)

    toast.info('Eliminação cancelada', {
      description: 'Você pode continuar refletindo'
    })
  }

  return {
    requestElimination,
    confirmElimination,
    cancelElimination,
    pendingElimination,
    isAwaitingSlider: state.isAwaitingSlider
  }
}
