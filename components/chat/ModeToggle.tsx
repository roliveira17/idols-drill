'use client'

import { Button } from '@/components/ui/button'
import { MessageSquare, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function ModeToggle() {
  const pathname = usePathname()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t px-3 py-2 sm:p-3 flex gap-2 justify-center z-10 safe-area-inset-bottom">
      <Link href="/chat" className="flex-1 max-w-xs">
        <Button
          variant={pathname === '/chat' ? 'default' : 'outline'}
          className={cn(
            'w-full transition-all h-11 sm:h-10',
            pathname === '/chat' && 'shadow-lg'
          )}
        >
          <MessageSquare className="mr-2 h-4 w-4 shrink-0" />
          <span className="truncate">Conversa</span>
        </Button>
      </Link>
      <Link href="/idols" className="flex-1 max-w-xs">
        <Button
          variant={pathname === '/idols' ? 'default' : 'outline'}
          className={cn(
            'w-full transition-all h-11 sm:h-10',
            pathname === '/idols' && 'shadow-lg'
          )}
        >
          <Users className="mr-2 h-4 w-4 shrink-0" />
          <span className="truncate">Ídolos</span>
        </Button>
      </Link>
    </div>
  )
}
