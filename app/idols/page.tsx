'use client'

import { useSession } from '@/context/SessionContext'
import { IdolCard } from '@/components/idols/IdolCard'
import { ArrowLeft, Info } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function IdolsPage() {
  const { state } = useSession()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b px-3 py-3 sm:p-4 bg-background sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center gap-3">
          <Link href="/chat">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Voltar para o chat</span>
            </Button>
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
              Os 4 Ídolos
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {state.idols.filter(i => i.status === 'active').length} ídolos ativos
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-3 py-6 sm:p-8">
        {/* Info Banner */}
        <div className="mb-6 p-4 bg-muted/50 border rounded-lg">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 shrink-0 mt-0.5 text-primary" />
            <p className="text-sm text-foreground/80">
              Consulte as definições a qualquer momento. O chat continuará de onde parou quando você voltar.
            </p>
          </div>
        </div>

        {/* Grid de Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
          {state.idols.map((idol) => (
            <IdolCard key={idol.id} idol={idol} />
          ))}
        </div>
      </main>
    </div>
  )
}
