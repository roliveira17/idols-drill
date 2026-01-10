'use client'

import { useState } from 'react'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'
import { IdolType } from '@/types'
import { IDOL_NAMES, IDOL_ICONS } from '@/lib/constants/idols'

interface ResistanceSliderProps {
  isOpen: boolean
  idolId?: IdolType
  language: 'pt-BR' | 'en-US' | 'es' | 'fr' | 'zh-CN' | 'ko' | 'hi'
  onConfirm: (level: 1 | 2 | 3 | 4 | 5) => void
  onCancel: () => void
}

const labels: Record<number, Record<string, string>> = {
  1: {
    'pt-BR': 'Muito Fácil',
    'en-US': 'Very Easy',
    'es': 'Muy Fácil',
    'fr': 'Très Facile',
    'zh-CN': '非常容易',
    'ko': '매우 쉬움',
    'hi': 'बहुत आसान'
  },
  2: {
    'pt-BR': 'Fácil',
    'en-US': 'Easy',
    'es': 'Fácil',
    'fr': 'Facile',
    'zh-CN': '容易',
    'ko': '쉬움',
    'hi': 'आसान'
  },
  3: {
    'pt-BR': 'Médio',
    'en-US': 'Medium',
    'es': 'Medio',
    'fr': 'Moyen',
    'zh-CN': '中等',
    'ko': '보통',
    'hi': 'मध्यम'
  },
  4: {
    'pt-BR': 'Difícil',
    'en-US': 'Difficult',
    'es': 'Difícil',
    'fr': 'Difficile',
    'zh-CN': '困难',
    'ko': '어려움',
    'hi': 'कठिन'
  },
  5: {
    'pt-BR': 'Muito Difícil',
    'en-US': 'Very Difficult',
    'es': 'Muy Difícil',
    'fr': 'Très Difficile',
    'zh-CN': '非常困难',
    'ko': '매우 어려움',
    'hi': 'बहुत कठिन'
  }
}

const titles: Record<string, string> = {
  'pt-BR': 'Quão difícil foi essa decisão?',
  'en-US': 'How difficult was this decision?',
  'es': '¿Qué tan difícil fue esta decisión?',
  'fr': 'Quelle a été la difficulté de cette décision?',
  'zh-CN': '这个决定有多难？',
  'ko': '이 결정이 얼마나 어려웠나요?',
  'hi': 'यह निर्णय कितना कठिन था?'
}

const descriptions: Record<string, string> = {
  'pt-BR': 'Avalie a dificuldade de eliminar este ídolo',
  'en-US': 'Rate the difficulty of eliminating this idol',
  'es': 'Evalúa la dificultad de eliminar este ídolo',
  'fr': 'Évaluez la difficulté d\'éliminer cette idole',
  'zh-CN': '评估消除这个偶像的难度',
  'ko': '이 우상을 제거하는 난이도를 평가하세요',
  'hi': 'इस मूर्ति को खत्म करने की कठिनाई का मूल्यांकन करें'
}

export function ResistanceSlider({
  isOpen,
  idolId,
  language,
  onConfirm,
  onCancel
}: ResistanceSliderProps) {
  const [value, setValue] = useState<number>(3)

  const handleConfirm = () => {
    onConfirm(value as 1 | 2 | 3 | 4 | 5)
  }

  // Não permite fechar clicando fora (modal obrigatório)
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Só permite fechar via botão cancelar
      return
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className="max-w-md w-[calc(100%-2rem)] sm:w-full"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">
            {titles[language]}
          </DialogTitle>
          <DialogDescription>
            {idolId && (
              <span className="flex items-center gap-2 mt-2">
                <span className="text-xl sm:text-2xl">{IDOL_ICONS[idolId]}</span>
                <span className="font-medium text-sm sm:text-base">
                  {IDOL_NAMES[idolId][language]}
                </span>
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="py-6 sm:py-8">
          <Slider
            value={[value]}
            onValueChange={([v]) => setValue(v)}
            min={1}
            max={5}
            step={1}
            className="mb-6 cursor-pointer touch-none"
          />

          <div className="text-center">
            <p className="text-3xl sm:text-2xl font-bold text-primary mb-1">
              {value}
            </p>
            <p className="text-base sm:text-lg font-medium">
              {labels[value][language]}
            </p>
          </div>

          {/* Indicadores visuais */}
          <div className="flex justify-between mt-6 text-xs text-muted-foreground px-1">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </div>

        <DialogFooter className="gap-2 flex-col sm:flex-row">
          <Button variant="outline" onClick={onCancel} className="flex-1 w-full">
            Cancelar
          </Button>
          <Button onClick={handleConfirm} className="flex-1 w-full">
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
