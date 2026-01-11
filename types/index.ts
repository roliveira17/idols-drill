// Tipos dos 4 ídolos
export type IdolType = 'money' | 'power' | 'pleasure' | 'fame'

export type IdolStatus = 'active' | 'eliminated' | 'pending'

export interface Idol {
  id: IdolType
  name: string
  nameTranslated: Record<Language, string>
  description: string
  descriptionTranslated: Record<Language, string>
  status: IdolStatus
  eliminatedAt?: Date
  resistanceLevel?: 1 | 2 | 3 | 4 | 5
  interactionCount: number // máx 14
}

// Tipos de tom do assistente
export type ToneType = 'neutral' | 'soft' | 'hard' | 'provocative' | 'formal'

// Tipos de idioma
export type Language = 'pt-BR' | 'en-US' | 'es' | 'fr' | 'zh-CN' | 'ko' | 'hi'

// Tipos de mensagem do chat
export type MessageRole = 'user' | 'assistant' | 'system'

export interface ChatMessage {
  id: string
  role: MessageRole
  content: string
  timestamp: Date
  metadata?: {
    idolDiscussed?: IdolType
    actionType?: 'challenge' | 'confirm' | 'recede' | 'slider'
  }
}

// Tipo de modo da interface
export type ViewMode = 'conversation' | 'idols'

// Estado da sessão
export interface SessionState {
  language: Language
  tone: ToneType
  idols: Idol[]
  chatHistory: ChatMessage[]
  viewMode: ViewMode
  currentIdolDiscussion?: IdolType
  isAwaitingSlider: boolean
  sessionStartedAt: Date
  sessionEndedAt?: Date
}

// Tipo de resultado final
export interface SessionResult {
  masterIdol: IdolType
  journey: {
    idol: IdolType
    eliminatedAt: Date
    resistanceLevel: 1 | 2 | 3 | 4 | 5
    reason: string
  }[]
  insights: string[]
  possibleFifthAxis?: string
  recommendations: string[]
  generatedAt: Date
}
