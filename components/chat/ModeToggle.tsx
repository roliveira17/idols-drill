'use client'

import { useSession } from '@/context/SessionContext'
import { Button } from '@/components/ui/button'
import { MessageSquare, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ModeToggle() {
  const { state, setViewMode } = useSession()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t px-3 py-2 sm:p-3 flex gap-2 justify-center z-10 safe-area-inset-bottom">
      <Button
        variant={state.viewMode === 'conversation' ? 'default' : 'outline'}
        onClick={() => setViewMode('conversation')}
        className={cn(
          'flex-1 max-w-xs transition-all h-11 sm:h-10',
          state.viewMode === 'conversation' && 'shadow-lg'
        )}
      >
        <MessageSquare className="mr-2 h-4 w-4 shrink-0" />
        <span className="truncate">Conversa</span>
      </Button>
      <Button
        variant={state.viewMode === 'idols' ? 'default' : 'outline'}
        onClick={() => setViewMode('idols')}
        className={cn(
          'flex-1 max-w-xs transition-all h-11 sm:h-10',
          state.viewMode === 'idols' && 'shadow-lg'
        )}
      >
        <Users className="mr-2 h-4 w-4 shrink-0" />
        <span className="truncate">Ídolos</span>
      </Button>
    </div>
  )
}
