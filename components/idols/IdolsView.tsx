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
      <DialogContent className="max-w-3xl w-[calc(100%-2rem)] sm:w-full max-h-[90vh] sm:max-h-[85vh] overflow-y-auto bg-background">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-4">
          {state.idols.map((idol) => (
            <IdolCard key={idol.id} idol={idol} />
          ))}
        </div>

        <div className="mt-4 p-4 bg-card border-2 border-border rounded-lg shadow-sm">
          <h3 className="text-sm font-bold mb-3 text-foreground flex items-center gap-2">
            <span className="text-base">ℹ️</span>
            Legenda
          </h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2 rounded bg-green-500/10 dark:bg-green-500/20 border border-green-500/30">
              <div className="w-4 h-4 rounded-full bg-green-500 shrink-0 shadow-sm" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Ativo</p>
                <p className="text-xs text-foreground/70">Ainda em consideração</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 rounded bg-red-500/10 dark:bg-red-500/20 border border-red-500/30">
              <div className="w-4 h-4 rounded-full bg-red-500 shrink-0 shadow-sm" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">Eliminado</p>
                <p className="text-xs text-foreground/70">Já foi descartado</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
