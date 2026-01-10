import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resultado - Idol\'s Drill',
  description: 'Descubra qual é o seu Ídolo Mestre e reflita sobre suas prioridades.',
  robots: {
    index: false, // Não indexar resultados individuais
    follow: true,
  },
}
