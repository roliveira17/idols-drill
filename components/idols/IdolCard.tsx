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
      'relative transition-all duration-300 border-2',
      idol.status === 'eliminated' && 'opacity-60 border-red-200 dark:border-red-900',
      idol.status === 'active' && 'border-green-200 dark:border-green-900 bg-green-50/50 dark:bg-green-950/20'
    )}>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
            <span className="text-2xl sm:text-3xl">{IDOL_ICONS[idol.id]}</span>
            <span className="text-foreground">{idol.name}</span>
          </CardTitle>
          <Badge className={cn('shrink-0', config.color)}>
            <Icon className="h-3 w-3 mr-1" />
            {config.label}
          </Badge>
        </div>

        <CardDescription className="mt-2 text-sm leading-relaxed text-foreground/80 dark:text-foreground/70">
          {idol.description}
        </CardDescription>

        {idol.status === 'eliminated' && idol.resistanceLevel && (
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs font-medium text-foreground/70">
              Nível de resistência: <span className="text-primary font-bold">{idol.resistanceLevel}/5</span>
            </p>
          </div>
        )}
      </CardHeader>
    </Card>
  )
}
