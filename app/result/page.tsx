'use client'

import { useSession } from '@/context/SessionContext'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { useRouter } from 'next/navigation'
import { IDOL_ICONS } from '@/lib/constants/idols'
import { Trophy, RotateCcw, ChevronRight } from 'lucide-react'
import { useEffect } from 'react'

export default function ResultPage() {
  const { state, resetSession } = useSession()
  const router = useRouter()

  // Calcular ídolo mestre (último não eliminado)
  const masterIdol = state.idols.find(i => i.status === 'active')
  const eliminatedIdols = state.idols
    .filter(i => i.status === 'eliminated')
    .sort((a, b) => {
      if (!a.eliminatedAt || !b.eliminatedAt) return 0
      return a.eliminatedAt.getTime() - b.eliminatedAt.getTime()
    })

  useEffect(() => {
    // Se não houver resultado válido, redirecionar para home
    if (!masterIdol || eliminatedIdols.length !== 3) {
      router.push('/')
    }
  }, [masterIdol, eliminatedIdols, router])

  const handleNewSession = () => {
    resetSession()
    router.push('/')
  }

  if (!masterIdol) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-sm text-muted-foreground">Carregando resultado...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-3 sm:p-4 bg-gradient-to-br from-background via-background to-muted flex items-center justify-center">
      <div className="max-w-2xl w-full space-y-4 sm:space-y-6 py-4">
        {/* Card Principal - Ídolo Mestre */}
        <Card className="shadow-2xl border-2 border-primary/20">
          <CardHeader className="text-center pb-3 sm:pb-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-500" />
              <CardTitle className="text-xl sm:text-2xl">Seu Ídolo Mestre</CardTitle>
            </div>
            <CardDescription className="text-xs sm:text-sm">
              O ídolo que mais influencia suas decisões e prioridades
            </CardDescription>
          </CardHeader>

          <CardContent className="text-center pb-6 sm:pb-8">
            <div className="text-6xl sm:text-8xl mb-3 sm:mb-4 animate-bounce">
              {IDOL_ICONS[masterIdol.id]}
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold mb-2">{masterIdol.name}</h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto px-4">
              {masterIdol.description}
            </p>
          </CardContent>
        </Card>

        {/* Card da Jornada */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              Sua Jornada
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              A ordem em que você eliminou os ídolos
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-2 sm:space-y-3">
            {eliminatedIdols.map((idol, index) => (
              <div
                key={idol.id}
                className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-muted/50"
              >
                <div className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 text-primary font-bold text-xs sm:text-sm shrink-0">
                  {index + 1}
                </div>
                <div className="text-xl sm:text-2xl">{IDOL_ICONS[idol.id]}</div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm sm:text-base truncate">{idol.name}</p>
                  <p className="text-[10px] sm:text-xs text-muted-foreground">
                    Dificuldade: {idol.resistanceLevel}/5
                  </p>
                </div>
                <div className="flex gap-0.5 sm:gap-1 shrink-0">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                        i < (idol.resistanceLevel || 0)
                          ? 'bg-primary'
                          : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Card de Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Reflexão</CardTitle>
            <CardDescription className="text-xs sm:text-sm">
              O que isso revela sobre suas prioridades
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
            <p className="leading-relaxed">
              O fato de <strong>{masterIdol.name}</strong> ser seu Ídolo Mestre
              sugere que esta é a área onde você busca preencher seus desejos
              mais profundos de felicidade e realização.
            </p>

            {eliminatedIdols.length > 0 && (
              <p className="leading-relaxed text-muted-foreground">
                Você eliminou <strong>{eliminatedIdols[0].name}</strong> primeiro
                (dificuldade {eliminatedIdols[0].resistanceLevel}/5), o que pode
                indicar que este ídolo tem menos influência em suas decisões diárias.
              </p>
            )}

            <div className="pt-2 sm:pt-3 border-t">
              <p className="text-[10px] sm:text-xs text-muted-foreground italic">
                Lembre-se: este exercício é um espelho para autoconhecimento,
                não um julgamento. O objetivo é reconhecer onde buscamos
                plenitude em bens finitos que não podem satisfazer desejos infinitos.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Botão Nova Sessão */}
        <Button
          onClick={handleNewSession}
          size="lg"
          className="w-full h-12 sm:h-14 text-base sm:text-lg shadow-lg"
        >
          <RotateCcw className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          Fazer Nova Sessão
        </Button>

        <p className="text-center text-xs text-muted-foreground">
          Duração da sessão: ~{Math.round((new Date().getTime() - state.sessionStartedAt.getTime()) / 60000)} minutos
        </p>
      </div>
    </div>
  )
}
