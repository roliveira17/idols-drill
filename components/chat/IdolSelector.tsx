'use client'

import { useEffect } from 'react'
import { useSession } from '@/context/SessionContext'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { IDOL_ICONS, IDOL_NAMES } from '@/lib/constants/idols'
import { MAX_INTERACTIONS_PER_IDOL } from '@/lib/constants/config'
import { IdolType } from '@/types'
import { cn } from '@/lib/utils'
import { AlertCircle } from 'lucide-react'

const MESSAGES = {
  'pt-BR': {
    selectToBegin: 'Selecione um ídolo acima para começar',
    allMaxed: 'Todos os ídolos atingiram o máximo de interações (2/2). Você deve eliminar um para continuar.',
    currentMaxed: 'Máximo de interações atingido. Mude de ídolo ou elimine este.',
    masterIdol: 'Mestre'
  },
  'en-US': {
    selectToBegin: 'Select an idol above to begin',
    allMaxed: 'All idols have reached max interactions (2/2). You must eliminate one to continue.',
    currentMaxed: 'Max interactions reached. Switch idols or eliminate this one.',
    masterIdol: 'Master'
  },
  'es': {
    selectToBegin: 'Selecciona un ídolo arriba para comenzar',
    allMaxed: 'Todos los ídolos han alcanzado el máximo de interacciones (2/2). Debes eliminar uno para continuar.',
    currentMaxed: 'Máximo de interacciones alcanzado. Cambia de ídolo o elimina este.',
    masterIdol: 'Maestro'
  },
  'fr': {
    selectToBegin: 'Sélectionnez une idole ci-dessus pour commencer',
    allMaxed: 'Toutes les idoles ont atteint le maximum d\'interactions (2/2). Vous devez en éliminer une pour continuer.',
    currentMaxed: 'Maximum d\'interactions atteint. Changez d\'idole ou éliminez celle-ci.',
    masterIdol: 'Maître'
  },
  'zh-CN': {
    selectToBegin: '选择上方的偶像开始',
    allMaxed: '所有偶像已达到最大互动次数（2/2）。您必须淘汰一个才能继续。',
    currentMaxed: '已达到最大互动次数。切换偶像或淘汰此偶像。',
    masterIdol: '大师'
  },
  'ko': {
    selectToBegin: '시작하려면 위의 아이돌을 선택하세요',
    allMaxed: '모든 아이돌이 최대 상호작용 횟수(2/2)에 도달했습니다. 계속하려면 하나를 제거해야 합니다.',
    currentMaxed: '최대 상호작용 횟수에 도달했습니다. 아이돌을 전환하거나 제거하세요.',
    masterIdol: '마스터'
  },
  'hi': {
    selectToBegin: 'शुरू करने के लिए ऊपर एक आइडल चुनें',
    allMaxed: 'सभी आइडल अधिकतम इंटरैक्शन (2/2) तक पहुंच गए हैं। जारी रखने के लिए आपको एक को हटाना होगा।',
    currentMaxed: 'अधिकतम इंटरैक्शन पहुंच गया। आइडल बदलें या इसे हटा दें।',
    masterIdol: 'मास्टर'
  }
}

export function IdolSelector() {
  const { state, setCurrentIdolDiscussion } = useSession()
  const { idols, currentIdolDiscussion, language } = state

  const activeIdols = idols.filter(i => i.status === 'active')
  const allAtLimit = activeIdols.every(i => i.interactionCount >= MAX_INTERACTIONS_PER_IDOL)
  const currentIdol = idols.find(i => i.id === currentIdolDiscussion)
  const messages = MESSAGES[language]

  const handleSelect = (idolId: IdolType) => {
    const idol = idols.find(i => i.id === idolId)
    if (!idol || idol.interactionCount >= MAX_INTERACTIONS_PER_IDOL) return
    setCurrentIdolDiscussion(idolId)
  }

  const getBadgeColor = (count: number) => {
    if (count === 0) return 'bg-green-500 hover:bg-green-600'
    if (count === 1) return 'bg-yellow-500 hover:bg-yellow-600'
    return 'bg-red-500 hover:bg-red-600'
  }

  // Auto-select last remaining idol
  useEffect(() => {
    if (activeIdols.length === 1 && currentIdolDiscussion !== activeIdols[0].id) {
      setCurrentIdolDiscussion(activeIdols[0].id)
    }
  }, [activeIdols.length, currentIdolDiscussion, setCurrentIdolDiscussion, activeIdols])

  return (
    <div className="border-t bg-background px-3 py-3 sm:px-4">
      {/* Warning for all maxed */}
      {allAtLimit && activeIdols.length > 1 && (
        <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
          <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
          <p className="text-sm text-red-800">
            {messages.allMaxed}
          </p>
        </div>
      )}

      {/* Idol buttons */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
        {activeIdols.map((idol) => {
          const isSelected = currentIdolDiscussion === idol.id
          const isAtLimit = idol.interactionCount >= MAX_INTERACTIONS_PER_IDOL
          const isMasterIdol = activeIdols.length === 1

          return (
            <Button
              key={idol.id}
              onClick={() => handleSelect(idol.id)}
              disabled={isAtLimit}
              variant={isSelected ? 'default' : 'outline'}
              className={cn(
                'shrink-0 flex items-center gap-2 h-12 px-3 sm:px-4',
                isSelected && 'ring-2 ring-primary ring-offset-2 shadow-lg',
                isAtLimit && 'opacity-50 cursor-not-allowed'
              )}
            >
              <span className="text-xl">{IDOL_ICONS[idol.id]}</span>
              <span className="font-medium text-sm sm:text-base">
                {IDOL_NAMES[idol.id][language]}
              </span>
              <Badge className={cn('text-xs', getBadgeColor(idol.interactionCount))}>
                {idol.interactionCount}/{MAX_INTERACTIONS_PER_IDOL}
              </Badge>
              {isMasterIdol && (
                <Badge className="bg-amber-500 hover:bg-amber-600 text-xs">
                  {messages.masterIdol}
                </Badge>
              )}
            </Button>
          )
        })}
      </div>

      {/* No selection warning */}
      {!currentIdolDiscussion && !allAtLimit && activeIdols.length > 1 && (
        <p className="text-sm text-muted-foreground mt-2 text-center">
          {messages.selectToBegin}
        </p>
      )}

      {/* Current idol at limit warning */}
      {currentIdol && currentIdol.interactionCount >= MAX_INTERACTIONS_PER_IDOL && (
        <p className="text-sm text-orange-600 mt-2 text-center font-medium">
          {messages.currentMaxed}
        </p>
      )}
    </div>
  )
}
