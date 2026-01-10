'use client'

import { useState, KeyboardEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Send, Loader2 } from 'lucide-react'

interface ChatInputProps {
  onSend: (message: string) => void
  isLoading: boolean
  disabled?: boolean
  placeholder?: string
}

export function ChatInput({
  onSend,
  isLoading,
  disabled = false,
  placeholder = 'Digite sua mensagem...'
}: ChatInputProps) {
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim() || isLoading || disabled) return
    onSend(input.trim())
    setInput('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex gap-2 px-3 py-3 sm:p-4 border-t bg-background">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled || isLoading}
        className="resize-none min-h-[52px] max-h-[120px] text-base sm:text-sm"
        rows={2}
      />
      <Button
        onClick={handleSend}
        disabled={disabled || isLoading || !input.trim()}
        size="icon"
        className="h-[52px] w-[52px] sm:h-[60px] sm:w-[60px] shrink-0"
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
        ) : (
          <Send className="h-4 w-4 sm:h-5 sm:w-5" />
        )}
      </Button>
    </div>
  )
}
