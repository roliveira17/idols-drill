import { IdolType } from '@/types'

/**
 * Detecta se o usuário está tentando eliminar um ídolo
 * Retorna o IdolType se detectar intenção clara, null se ambíguo
 */
export function detectEliminationIntent(message: string): IdolType | null {
  const lowerMessage = message.toLowerCase().trim()

  // Palavras-chave de eliminação
  const eliminationKeywords = [
    'eliminar',
    'remover',
    'descartar',
    'tirar',
    'excluir',
    'escolho',
    'prefiro não',
    'não quero',
    'abrir mão',
    'dispensar',
    'largar'
  ]

  // Verificar se há intenção de eliminação
  const hasEliminationIntent = eliminationKeywords.some(keyword =>
    lowerMessage.includes(keyword)
  )

  if (!hasEliminationIntent) {
    return null
  }

  // Mapear menções de ídolos
  const idolMentions: Record<IdolType, string[]> = {
    money: ['dinheiro', 'grana', 'money', 'rico', 'riqueza', 'financeiro', 'econômico'],
    power: ['poder', 'power', 'controle', 'autoridade', 'comando', 'influência'],
    pleasure: ['prazer', 'pleasure', 'conforto', 'diversão', 'lazer', 'experiência'],
    fame: ['fama', 'fame', 'reconhecimento', 'reputação', 'status', 'popularidade', 'celebridade']
  }

  // Contar menções de cada ídolo
  const mentions: Record<IdolType, number> = {
    money: 0,
    power: 0,
    pleasure: 0,
    fame: 0
  }

  for (const [idol, keywords] of Object.entries(idolMentions)) {
    for (const keyword of keywords) {
      if (lowerMessage.includes(keyword)) {
        mentions[idol as IdolType]++
      }
    }
  }

  // Encontrar ídolo mais mencionado
  const sortedMentions = Object.entries(mentions).sort((a, b) => b[1] - a[1])
  const [topIdol, topCount] = sortedMentions[0]
  const [secondIdol, secondCount] = sortedMentions[1]

  // Se houver empate ou nenhuma menção clara, retornar null
  if (topCount === 0 || topCount === secondCount) {
    return null
  }

  return topIdol as IdolType
}
