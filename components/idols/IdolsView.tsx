'use client'

import { useSession } from '@/context/SessionContext'
import { IdolCard } from './IdolCard'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'
import { Info } from 'lucide-react'

export function IdolsView() {
  const { state, setViewMode } = useSession()
  const isOpen = state.viewMode === 'idols'

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setViewMode(open ? 'idols' : 'conversation')
      }}
    >
      <DialogContent className="max-w-7xl w-[calc(100%-2rem)] sm:w-full max-h-[90vh] sm:max-h-[85vh] overflow-y-auto bg-background">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl sm:text-2xl text-foreground">
            <span>Os 4 Ídolos</span>
          </DialogTitle>
          <DialogDescription className="flex items-start gap-2 pt-2 text-xs sm:text-sm text-foreground/70">
            <Info className="h-4 w-4 shrink-0 mt-0.5 text-primary" />
            <span>
              Consulte as definições a qualquer momento. O chat continuará de onde parou quando você voltar.
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mt-4">
          {state.idols.map((idol) => (
            <IdolCard key={idol.id} idol={idol} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
