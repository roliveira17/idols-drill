import { ToneType, Language } from '@/types'

export const AVAILABLE_TONES: ToneType[] = [
  'neutral',
  'soft',
  'hard',
  'provocative',
  'formal'
]

export const TONE_LABELS: Record<ToneType, Record<Language, string>> = {
  neutral: {
    'pt-BR': 'Neutro',
    'en-US': 'Neutral',
    'es': 'Neutral',
    'fr': 'Neutre',
    'zh-CN': '中立',
    'ko': '중립',
    'hi': 'तटस्थ'
  },
  soft: {
    'pt-BR': 'Suave',
    'en-US': 'Soft',
    'es': 'Suave',
    'fr': 'Doux',
    'zh-CN': '柔和',
    'ko': '부드러운',
    'hi': 'कोमल'
  },
  hard: {
    'pt-BR': 'Duro',
    'en-US': 'Hard',
    'es': 'Duro',
    'fr': 'Dur',
    'zh-CN': '强硬',
    'ko': '강경한',
    'hi': 'कठोर'
  },
  provocative: {
    'pt-BR': 'Provocativo',
    'en-US': 'Provocative',
    'es': 'Provocativo',
    'fr': 'Provocateur',
    'zh-CN': '挑衅',
    'ko': '도발적인',
    'hi': 'उत्तेजक'
  },
  formal: {
    'pt-BR': 'Formal',
    'en-US': 'Formal',
    'es': 'Formal',
    'fr': 'Formel',
    'zh-CN': '正式',
    'ko': '격식있는',
    'hi': 'औपचारिक'
  }
}

export const AVAILABLE_LANGUAGES: Language[] = [
  'pt-BR',
  'en-US',
  'es',
  'fr',
  'zh-CN',
  'ko',
  'hi'
]

export const LANGUAGE_LABELS: Record<Language, string> = {
  'pt-BR': 'Português (BR)',
  'en-US': 'English (US)',
  'es': 'Español',
  'fr': 'Français',
  'zh-CN': '简体中文',
  'ko': '한국어',
  'hi': 'हिन्दी'
}

// Regras de negócio
export const MAX_INTERACTIONS_PER_IDOL = 2
export const TARGET_SESSION_DURATION_MINUTES = 5
export const SLIDER_MIN = 1
export const SLIDER_MAX = 5
