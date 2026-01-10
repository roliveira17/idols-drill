'use client'

import { useSession } from '@/context/SessionContext'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { AVAILABLE_LANGUAGES, LANGUAGE_LABELS } from '@/lib/constants/config'
import { Language } from '@/types'

export function LanguageSelector() {
  const { state, setLanguage } = useSession()

  return (
    <Select
      value={state.language}
      onValueChange={(value) => setLanguage(value as Language)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecione o idioma" />
      </SelectTrigger>
      <SelectContent>
        {AVAILABLE_LANGUAGES.map((lang) => (
          <SelectItem key={lang} value={lang}>
            {LANGUAGE_LABELS[lang]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
