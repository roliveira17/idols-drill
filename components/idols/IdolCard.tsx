import { Idol } from '@/types'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { IDOL_ICONS } from '@/lib/constants/idols'
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

  return (
    <Card className={cn(
      'relative transition-all duration-300',
      // Ídolo Ativo - Destaque com borda verde e background
      idol.status === 'active' && [
        'border-2 border-green-500 shadow-lg shadow-green-500/20',
        'bg-gradient-to-br from-green-500/10 via-background to-background',
        'dark:from-green-500/20 dark:via-background dark:to-background'
      ],
      // Ídolo Eliminado - Opaco e vermelho
      idol.status === 'eliminated' && [
        'opacity-50 grayscale',
        'border-2 border-red-500/50',
        'bg-gradient-to-br from-red-500/5 via-background to-background'
      ],
      // Ídolo Pendente
      idol.status === 'pending' && 'border border-border opacity-70'
    )}>
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="text-3xl sm:text-4xl shrink-0 drop-shadow-sm">
              {IDOL_ICONS[idol.id]}
            </span>
            <CardTitle className="text-lg sm:text-xl font-bold text-foreground truncate">
              {idol.name}
            </CardTitle>
          </div>
          <Badge className={cn('shrink-0 shadow-sm', config.color)}>
            <Icon className="h-3 w-3 mr-1" />
            {config.label}
          </Badge>
        </div>

        <p className="text-sm leading-relaxed text-foreground dark:text-foreground/90">
          {idol.description}
        </p>

        {idol.status === 'eliminated' && idol.resistanceLevel && (
          <div className="pt-3 border-t border-border/50">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-foreground/70">
                Resistência:
              </span>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      'w-2 h-2 rounded-full transition-colors',
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
      </CardHeader>
    </Card>
  )
}
