'use client'

import { useSession } from '@/context/SessionContext'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { AVAILABLE_TONES, TONE_LABELS } from '@/lib/constants/config'
import { ToneType } from '@/types'

export function ToneSelector() {
  const { state, setTone } = useSession()

  return (
    <RadioGroup
      value={state.tone}
      onValueChange={(value) => setTone(value as ToneType)}
      className="grid grid-cols-1 gap-3"
    >
      {AVAILABLE_TONES.map((tone) => (
        <div key={tone} className="flex items-center space-x-3">
          <RadioGroupItem value={tone} id={tone} />
          <Label
            htmlFor={tone}
            className="flex-1 cursor-pointer text-sm font-normal"
          >
            <span className="font-medium">
              {TONE_LABELS[tone][state.language]}
            </span>
          </Label>
        </div>
      ))}
    </RadioGroup>
  )
}
