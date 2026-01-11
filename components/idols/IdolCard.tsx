import { Idol } from '@/types'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { IDOL_ICONS, IDOL_ACCENT_COLORS, IDOL_DETAILS } from '@/lib/constants/idols'
import { Check, X, Clock } from 'lucide-react'

interface IdolCardProps {
  idol: Idol
}

const statusConfig = {
  active: {
    color: 'bg-green-500 text-white',
    icon: Clock,
    label: 'Ativo'
  },
  eliminated: {
    color: 'bg-red-500 text-white',
    icon: X,
    label: 'Eliminado'
  },
  pending: {
    color: 'bg-gray-400 text-white',
    icon: Clock,
    label: 'Pendente'
  }
}

export function IdolCard({ idol }: IdolCardProps) {
  const config = statusConfig[idol.status]
  const Icon = config.icon
  const accentColor = IDOL_ACCENT_COLORS[idol.id]
  const details = IDOL_DETAILS[idol.id]

  return (
    <Card className={cn(
      'relative transition-all duration-300 shadow-lg',
      // Fundo sólido
      'bg-card',
      // Border superior colorido GROSSO
      'border-t-6',
      accentColor,
      // Bordas laterais normais
      'border-x border-b border-border',
      // Rounded corners
      'rounded-lg overflow-hidden',
      // Ídolo eliminado tem opacidade reduzida
      idol.status === 'eliminated' && 'opacity-75'
    )}>
      {/* Header */}
      <CardHeader className="pb-4 relative">
        <div className="flex items-center gap-3">
          <span className="text-4xl shrink-0">
            {IDOL_ICONS[idol.id]}
          </span>
          <CardTitle className="text-xl font-bold text-card-foreground flex-1">
            {idol.name}
          </CardTitle>
        </div>
        <Badge className={cn('absolute top-4 right-4', config.color)}>
          <Icon className="h-3 w-3 mr-1" />
          {config.label}
        </Badge>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-5 pt-2">
        {/* Seção 1: Essência */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-card-foreground uppercase tracking-wide">
            O que é de verdade
          </h3>
          <p className="text-sm leading-relaxed text-card-foreground/80">
            {details.essence}
          </p>
        </div>

        {/* Seção 2: Na vida real */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-card-foreground uppercase tracking-wide">
            Na vida real
          </h3>
          <p className="text-sm leading-relaxed text-card-foreground/80">
            {details.realLife}
          </p>
        </div>

        {/* Seção 3: Sinais de alerta */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold text-card-foreground uppercase tracking-wide">
            Sinais de alerta
          </h3>
          <p className="text-sm leading-relaxed text-card-foreground/80">
            {details.alerts}
          </p>
        </div>

        {/* Resistência (só para eliminados) */}
        {idol.status === 'eliminated' && idol.resistanceLevel && (
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-card-foreground/60 uppercase tracking-wide">
                Resistência
              </span>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      'w-2.5 h-2.5 rounded-full transition-colors',
                      i < (idol.resistanceLevel || 0)
                        ? 'bg-primary'
                        : 'bg-muted'
                    )}
                  />
                ))}
                <span className="ml-2 text-xs font-bold text-primary">
                  {idol.resistanceLevel}/5
                </span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
