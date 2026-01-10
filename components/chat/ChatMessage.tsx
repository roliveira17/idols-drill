import { ChatMessage as ChatMessageType } from '@/types'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'

interface ChatMessageProps {
  message: ChatMessageType
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div className={cn(
      'flex gap-3 mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300',
      isUser ? 'justify-end' : 'justify-start'
    )}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 text-primary-foreground">
          🤖
        </div>
      )}

      <div className={cn(
        'max-w-[80%] px-4 py-3 rounded-2xl shadow-sm',
        isUser
          ? 'bg-primary text-primary-foreground rounded-br-sm'
          : 'bg-muted rounded-bl-sm'
      )}>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
        <span className="text-xs opacity-60 mt-2 block">
          {format(message.timestamp, 'HH:mm')}
        </span>
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
          👤
        </div>
      )}
    </div>
  )
}
