'use client'

import { ChatContainer } from '@/components/chat/ChatContainer'
import { ModeToggle } from '@/components/chat/ModeToggle'
import { ResistanceSlider } from '@/components/idols/ResistanceSlider'
import { ThemeToggle } from '@/components/ThemeToggle'
import { useSession } from '@/context/SessionContext'
import { useIdolElimination } from '@/hooks/useIdolElimination'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function ChatPage() {
  const { state } = useSession()
  const {
    confirmElimination,
    cancelElimination,
    pendingElimination,
    isAwaitingSlider
  } = useIdolElimination()

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b px-3 py-3 sm:p-4 bg-background/95 backdrop-blur-sm shrink-0 safe-area-inset-top">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <Link href="/">
              <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="min-w-0">
              <h1 className="text-base sm:text-xl font-semibold truncate">Idol's Drill</h1>
              <p className="text-xs text-muted-foreground">
                {state.idols.filter(i => i.status === 'active').length} ídolos restantes
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Indicador de progresso */}
            <div className="flex gap-1 shrink-0">
              {state.idols.map((idol) => (
                <div
                  key={idol.id}
                  className={`h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full transition-colors ${
                    idol.status === 'eliminated'
                      ? 'bg-red-500'
                      : idol.status === 'active'
                      ? 'bg-green-500'
                      : 'bg-gray-300'
                  }`}
                  title={idol.name}
                />
              ))}
            </div>

            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-hidden pb-[72px] sm:pb-20">
        <div className="max-w-4xl mx-auto h-full">
          <ChatContainer />
        </div>
      </main>

      {/* Mode Toggle (fixed bottom) */}
      <ModeToggle />

      {/* Resistance Slider Modal */}
      <ResistanceSlider
        isOpen={isAwaitingSlider}
        idolId={pendingElimination}
        language={state.language}
        onConfirm={confirmElimination}
        onCancel={cancelElimination}
      />
    </div>
  )
}
