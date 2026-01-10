'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { IDOL_ICONS } from '@/lib/constants/idols'
import { LanguageSelector } from '@/components/settings/LanguageSelector'
import { ToneSelector } from '@/components/settings/ToneSelector'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-3 sm:p-4 bg-gradient-to-br from-background via-background to-muted">
      <Card className="max-w-2xl w-full p-5 sm:p-8 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-5xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Idol's Drill
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground">
            Descubra seu Ídolo Mestre em ~5 minutos
          </p>
        </div>

        {/* Descrição */}
        <div className="mb-6 sm:mb-8 space-y-2 sm:space-y-3 text-center">
          <p className="text-sm sm:text-base leading-relaxed">
            Um exercício introspectivo que usa IA conversacional para identificar
            qual dos <strong>4 ídolos</strong> tem maior influência em sua vida.
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Baseado no pensamento de São Tomás de Aquino sobre bens finitos
            que não podem preencher nossos desejos infinitos.
          </p>
        </div>

        {/* Os 4 Ídolos */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-center font-semibold mb-3 sm:mb-4 text-sm sm:text-base text-muted-foreground">
            Os 4 Ídolos
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <div className="text-center p-3 sm:p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <div className="text-3xl sm:text-4xl mb-1 sm:mb-2">{IDOL_ICONS.money}</div>
              <p className="text-xs sm:text-sm font-medium">Dinheiro</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                Segurança absoluta
              </p>
            </div>
            <div className="text-center p-3 sm:p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <div className="text-3xl sm:text-4xl mb-1 sm:mb-2">{IDOL_ICONS.power}</div>
              <p className="text-xs sm:text-sm font-medium">Poder</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                Controle e autoridade
              </p>
            </div>
            <div className="text-center p-3 sm:p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <div className="text-3xl sm:text-4xl mb-1 sm:mb-2">{IDOL_ICONS.pleasure}</div>
              <p className="text-xs sm:text-sm font-medium">Prazer</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                Conforto e experiências
              </p>
            </div>
            <div className="text-center p-3 sm:p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
              <div className="text-3xl sm:text-4xl mb-1 sm:mb-2">{IDOL_ICONS.fame}</div>
              <p className="text-xs sm:text-sm font-medium">Fama</p>
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                Reconhecimento social
              </p>
            </div>
          </div>
        </div>

        {/* Configurações */}
        <div className="mb-6 space-y-4">
          <div>
            <h3 className="font-semibold mb-2 text-sm">Idioma:</h3>
            <LanguageSelector />
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-sm">Tom do Assistente:</h3>
            <ToneSelector />
          </div>
        </div>

        {/* Como funciona */}
        <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-muted/30 rounded-lg">
          <h3 className="font-semibold mb-2 text-xs sm:text-sm">Como funciona:</h3>
          <ol className="text-xs sm:text-sm text-muted-foreground space-y-1 list-decimal list-inside">
            <li>A IA apresentará os 4 ídolos</li>
            <li>Você tentará eliminar um por um</li>
            <li>A IA desafiará cada escolha (advogado do diabo)</li>
            <li>Avaliará a dificuldade de cada eliminação</li>
            <li>Descobrirá seu Ídolo Mestre ao final</li>
          </ol>
        </div>

        {/* Botão CTA */}
        <Link href="/chat" className="block">
          <Button size="lg" className="w-full text-base sm:text-lg h-12 sm:h-14 shadow-lg">
            Começar o Exercício
          </Button>
        </Link>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Sessão autônoma • Sem cadastro • ~5 minutos
        </p>
      </Card>
    </div>
  )
}
