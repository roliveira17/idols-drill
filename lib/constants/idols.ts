import { Language, IdolType } from '@/types'

export const IDOL_NAMES: Record<IdolType, Record<Language, string>> = {
  money: {
    'pt-BR': 'Dinheiro',
    'en-US': 'Money',
    'es': 'Dinero',
    'fr': 'Argent',
    'zh-CN': '金钱',
    'ko': '돈',
    'hi': 'धन'
  },
  power: {
    'pt-BR': 'Poder',
    'en-US': 'Power',
    'es': 'Poder',
    'fr': 'Pouvoir',
    'zh-CN': '权力',
    'ko': '권력',
    'hi': 'शक्ति'
  },
  pleasure: {
    'pt-BR': 'Prazer',
    'en-US': 'Pleasure',
    'es': 'Placer',
    'fr': 'Plaisir',
    'zh-CN': '快乐',
    'ko': '즐거움',
    'hi': 'आनंद'
  },
  fame: {
    'pt-BR': 'Fama',
    'en-US': 'Fame',
    'es': 'Fama',
    'fr': 'Renommée',
    'zh-CN': '名声',
    'ko': '명성',
    'hi': 'प्रसिद्धि'
  }
}

export const IDOL_DESCRIPTIONS: Record<IdolType, Record<Language, string>> = {
  money: {
    'pt-BR': 'Segurança absoluta, status material, acumulação, medo da perda.',
    'en-US': 'Absolute security, material status, accumulation, fear of loss.',
    'es': 'Seguridad absoluta, estatus material, acumulación, miedo a la pérdida.',
    'fr': 'Sécurité absolue, statut matériel, accumulation, peur de la perte.',
    'zh-CN': '绝对安全、物质地位、积累、对失去的恐惧。',
    'ko': '절대적 안전, 물질적 지위, 축적, 상실에 대한 두려움.',
    'hi': 'पूर्ण सुरक्षा, भौतिक स्थिति, संचय, हानि का भय।'
  },
  power: {
    'pt-BR': 'Controle, autoridade, influência, aversão à subordinação.',
    'en-US': 'Control, authority, influence, aversion to subordination.',
    'es': 'Control, autoridad, influencia, aversión a la subordinación.',
    'fr': 'Contrôle, autorité, influence, aversion à la subordination.',
    'zh-CN': '控制、权威、影响力、厌恶服从。',
    'ko': '통제, 권위, 영향력, 복종에 대한 혐오.',
    'hi': 'नियंत्रण, अधिकार, प्रभाव, अधीनता से घृणा।'
  },
  pleasure: {
    'pt-BR': 'Conforto, dopamina, experiências, fuga da dor e do esforço.',
    'en-US': 'Comfort, dopamine, experiences, escape from pain and effort.',
    'es': 'Comodidad, dopamina, experiencias, escape del dolor y del esfuerzo.',
    'fr': 'Confort, dopamine, expériences, fuite de la douleur et de l\'effort.',
    'zh-CN': '舒适、多巴胺、体验、逃避痛苦和努力。',
    'ko': '편안함, 도파민, 경험, 고통과 노력으로부터의 탈출.',
    'hi': 'आराम, डोपामाइन, अनुभव, दर्द और प्रयास से बचाव।'
  },
  fame: {
    'pt-BR': 'Reconhecimento, reputação, validação social, medo da irrelevância.',
    'en-US': 'Recognition, reputation, social validation, fear of irrelevance.',
    'es': 'Reconocimiento, reputación, validación social, miedo a la irrelevancia.',
    'fr': 'Reconnaissance, réputation, validation sociale, peur de l\'insignifiance.',
    'zh-CN': '认可、声誉、社会认同、对无关紧要的恐惧。',
    'ko': '인정, 명성, 사회적 검증, 무관함에 대한 두려움.',
    'hi': 'मान्यता, प्रतिष्ठा, सामाजिक सत्यापन, अप्रासंगिकता का भय।'
  }
}

export const IDOL_ICONS: Record<IdolType, string> = {
  money: '💰',
  power: '👑',
  pleasure: '🎭',
  fame: '⭐'
}
