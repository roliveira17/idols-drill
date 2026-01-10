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
      <DialogContent className="max-w-3xl w-[calc(100%-2rem)] sm:w-full max-h-[90vh] sm:max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl sm:text-2xl">
            <span>Os 4 Ídolos</span>
          </DialogTitle>
          <DialogDescription className="flex items-start gap-2 pt-2 text-xs sm:text-sm">
            <Info className="h-4 w-4 shrink-0 mt-0.5" />
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

        <div className="mt-4 p-3 sm:p-4 bg-muted rounded-lg text-xs sm:text-sm">
          <p className="font-medium mb-2">Legenda:</p>
          <ul className="space-y-1 text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500 shrink-0"></span>
              <span>Ativo - Ainda em consideração</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 shrink-0"></span>
              <span>Eliminado - Já foi descartado</span>
            </li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}
