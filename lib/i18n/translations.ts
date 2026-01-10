import { Language } from '@/types'

/**
 * Sistema de traduções para UI labels
 */
export const translations: Record<string, Record<Language, string>> = {
  // Home
  'home.title': {
    'pt-BR': 'Idol\'s Drill',
    'en-US': 'Idol\'s Drill',
    'es': 'Idol\'s Drill',
    'fr': 'Idol\'s Drill',
    'zh-CN': 'Idol\'s Drill',
    'ko': 'Idol\'s Drill',
    'hi': 'Idol\'s Drill'
  },
  'home.subtitle': {
    'pt-BR': 'Descubra seu Ídolo Mestre em ~5 minutos',
    'en-US': 'Discover your Master Idol in ~5 minutes',
    'es': 'Descubre tu Ídolo Maestro en ~5 minutos',
    'fr': 'Découvrez votre Idole Maître en ~5 minutes',
    'zh-CN': '在约5分钟内发现您的主偶像',
    'ko': '약 5분 안에 마스터 아이돌 찾기',
    'hi': 'लगभग 5 मिनट में अपनी मुख्य मूर्ति खोजें'
  },
  'home.startButton': {
    'pt-BR': 'Começar o Exercício',
    'en-US': 'Start Exercise',
    'es': 'Comenzar Ejercicio',
    'fr': 'Commencer l\'Exercice',
    'zh-CN': '开始练习',
    'ko': '연습 시작',
    'hi': 'अभ्यास शुरू करें'
  },

  // Chat
  'chat.placeholder': {
    'pt-BR': 'Digite sua mensagem...',
    'en-US': 'Type your message...',
    'es': 'Escribe tu mensaje...',
    'fr': 'Tapez votre message...',
    'zh-CN': '输入您的消息...',
    'ko': '메시지를 입력하세요...',
    'hi': 'अपना संदेश टाइप करें...'
  },
  'chat.idolsRemaining': {
    'pt-BR': 'ídolos restantes',
    'en-US': 'idols remaining',
    'es': 'ídolos restantes',
    'fr': 'idoles restantes',
    'zh-CN': '剩余偶像',
    'ko': '남은 우상',
    'hi': 'शेष मूर्तियाँ'
  },

  // Result
  'result.yourMasterIdol': {
    'pt-BR': 'Seu Ídolo Mestre',
    'en-US': 'Your Master Idol',
    'es': 'Tu Ídolo Maestro',
    'fr': 'Votre Idole Maître',
    'zh-CN': '您的主偶像',
    'ko': '당신의 마스터 아이돌',
    'hi': 'आपकी मुख्य मूर्ति'
  },
  'result.newSession': {
    'pt-BR': 'Fazer Nova Sessão',
    'en-US': 'New Session',
    'es': 'Nueva Sesión',
    'fr': 'Nouvelle Session',
    'zh-CN': '新会话',
    'ko': '새 세션',
    'hi': 'नया सत्र'
  }
}

/**
 * Helper para buscar tradução
 */
export function t(key: string, language: Language): string {
  return translations[key]?.[language] || key
}
