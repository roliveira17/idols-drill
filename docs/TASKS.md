# 📋 TASKS - Idol's Drill MVP

> **Documento de Planejamento e Execução**
>
> Este documento detalha todas as tasks necessárias para implementar o MVP do Idol's Drill, quebradas em microsteps executáveis.

---

## 📊 Visão Geral do Projeto

### Resumo
**Idol's Drill** é um webapp mobile-first que conduz usuários por um exercício introspectivo de ~5 minutos usando IA conversacional (Groq API) para identificar qual dos 4 ídolos (Dinheiro, Poder, Prazer, Fama) é seu "Ídolo Mestre".

### Tech Stack
- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **Estado**: Context API + TanStack Query
- **IA**: Groq API (Llama 3 ou Mixtral)
- **Deploy**: Vercel

### Estado Atual
- ✅ Setup Next.js + Design System completo
- ✅ 6 componentes shadcn/ui básicos
- ❌ Zero lógica de negócio implementada
- ❌ Nenhuma integração com IA
- ❌ Nenhum Context/Provider

---

## 🎯 Progresso Geral

- **Total de Tasks**: 72
- **Concluídas**: 0
- **Em Progresso**: 0
- **Pendentes**: 72

---

## 📦 FASE 0: Setup e Dependências

### F0-T01: Instalar TanStack Query
**Tipo**: Setup | **Complexidade**: Trivial

**Descrição**:
Instalar e configurar TanStack Query para gerenciamento de requisições à API Groq.

**Arquivos**:
- `package.json`
- `app/layout.tsx` (para adicionar QueryClientProvider depois)

**Comandos**:
```bash
npm install @tanstack/react-query
```

**Critérios de Aceite**:
- [ ] Dependência instalada
- [ ] Versão >= 5.0.0

**Dependências**: Nenhuma

---

### F0-T02: Instalar Groq SDK
**Tipo**: Setup | **Complexidade**: Trivial

**Descrição**:
Instalar SDK da Groq para integração com API de IA.

**Arquivos**:
- `package.json`

**Comandos**:
```bash
npm install groq-sdk
```

**Critérios de Aceite**:
- [ ] Dependência instalada
- [ ] SDK pronto para uso em API routes

**Dependências**: Nenhuma

---

### F0-T03: Instalar componentes shadcn/ui faltantes
**Tipo**: Setup | **Complexidade**: Simples

**Descrição**:
Instalar componentes necessários para chat, modal, slider e input.

**Comandos**:
```bash
npx shadcn@latest add input
npx shadcn@latest add textarea
npx shadcn@latest add dialog
npx shadcn@latest add slider
npx shadcn@latest add select
npx shadcn@latest add tabs
```

**Arquivos Criados**:
- `components/ui/input.tsx`
- `components/ui/textarea.tsx`
- `components/ui/dialog.tsx`
- `components/ui/slider.tsx`
- `components/ui/select.tsx`
- `components/ui/tabs.tsx`

**Critérios de Aceite**:
- [ ] Todos os 6 componentes instalados
- [ ] Importações funcionando sem erros
- [ ] Componentes seguem padrão shadcn/ui

**Dependências**: Nenhuma

---

### F0-T04: Instalar Sonner para Toasts
**Tipo**: Setup | **Complexidade**: Trivial

**Descrição**:
Instalar biblioteca Sonner para notificações toast (erros, sucesso).

**Comandos**:
```bash
npm install sonner
npx shadcn@latest add sonner
```

**Arquivos**:
- `package.json`
- `components/ui/sonner.tsx` (criado pelo CLI)

**Critérios de Aceite**:
- [ ] Sonner instalado
- [ ] Componente Toaster pronto para uso

**Dependências**: Nenhuma

---

### F0-T05: Instalar date-fns (opcional, para timestamps)
**Tipo**: Setup | **Complexidade**: Trivial

**Descrição**:
Instalar date-fns para formatação de datas/horários nas mensagens do chat.

**Comandos**:
```bash
npm install date-fns
```

**Critérios de Aceite**:
- [ ] Dependência instalada
- [ ] Pronta para uso em componentes

**Dependências**: Nenhuma

---

## 🏗️ FASE 1: Fundação (Types, Constants, Context)

### F1-T01: Criar tipos base do domínio
**Tipo**: Code | **Complexidade**: Simples

**Descrição**:
Definir tipos TypeScript fundamentais para o domínio do projeto.

**Arquivo**: `types/index.ts`

**Conteúdo**:
```typescript
// Tipos dos 4 ídolos
export type IdolType = 'money' | 'power' | 'pleasure' | 'fame'

export type IdolStatus = 'active' | 'eliminated' | 'pending'

export interface Idol {
  id: IdolType
  name: string
  nameTranslated: Record<Language, string>
  description: string
  descriptionTranslated: Record<Language, string>
  status: IdolStatus
  eliminatedAt?: Date
  resistanceLevel?: 1 | 2 | 3 | 4 | 5
  interactionCount: number // máx 2
}

// Tipos de tom do assistente
export type ToneType = 'neutral' | 'soft' | 'hard' | 'provocative' | 'formal'

// Tipos de idioma
export type Language = 'pt-BR' | 'en-US' | 'es' | 'fr' | 'zh-CN' | 'ko' | 'hi'

// Tipos de mensagem do chat
export type MessageRole = 'user' | 'assistant' | 'system'

export interface ChatMessage {
  id: string
  role: MessageRole
  content: string
  timestamp: Date
  metadata?: {
    idolDiscussed?: IdolType
    actionType?: 'challenge' | 'confirm' | 'recede' | 'slider'
  }
}

// Tipo de modo da interface
export type ViewMode = 'conversation' | 'idols'

// Estado da sessão
export interface SessionState {
  language: Language
  tone: ToneType
  idols: Idol[]
  chatHistory: ChatMessage[]
  viewMode: ViewMode
  currentIdolDiscussion?: IdolType
  isAwaitingSlider: boolean
  sessionStartedAt: Date
  sessionEndedAt?: Date
}

// Tipo de resultado final
export interface SessionResult {
  masterIdol: IdolType
  journey: {
    idol: IdolType
    eliminatedAt: Date
    resistanceLevel: 1 | 2 | 3 | 4 | 5
    reason: string
  }[]
  insights: string[]
  possibleFifthAxis?: string
  recommendations: string[]
  generatedAt: Date
}
```

**Critérios de Aceite**:
- [ ] Arquivo `types/index.ts` criado
- [ ] Todos os tipos necessários definidos
- [ ] Tipos exportados corretamente
- [ ] Nenhum erro de TypeScript

**Dependências**: Nenhuma

---

### F1-T02: Criar constantes dos ídolos
**Tipo**: Code | **Complexidade**: Simples

**Descrição**:
Definir as constantes dos 4 ídolos com suas descrições em múltiplos idiomas.

**Arquivo**: `lib/constants/idols.ts`

**Conteúdo** (estrutura):
```typescript
import { Language, IdolType } from '@/types'

export const IDOL_NAMES: Record<IdolType, Record<Language, string>> = {
  money: {
    'pt-BR': 'Dinheiro',
    'en-US': 'Money',
    // ... outros idiomas
  },
  // ... outros ídolos
}

export const IDOL_DESCRIPTIONS: Record<IdolType, Record<Language, string>> = {
  money: {
    'pt-BR': 'Segurança absoluta, status material, acumulação, medo da perda.',
    'en-US': 'Absolute security, material status, accumulation, fear of loss.',
    // ... outros idiomas
  },
  // ... outros ídolos
}

export const IDOL_ICONS: Record<IdolType, string> = {
  money: '💰',
  power: '👑',
  pleasure: '🎭',
  fame: '⭐'
}
```

**Critérios de Aceite**:
- [ ] Arquivo criado com constantes dos 4 ídolos
- [ ] Nomes traduzidos para os 7 idiomas
- [ ] Descrições traduzidas para os 7 idiomas
- [ ] Ícones definidos
- [ ] Tipos corretamente importados

**Dependências**: F1-T01

---

### F1-T03: Criar constantes de tons e idiomas
**Tipo**: Code | **Complexidade**: Trivial

**Descrição**:
Definir constantes para tons do assistente e idiomas disponíveis.

**Arquivo**: `lib/constants/config.ts`

**Conteúdo**:
```typescript
import { ToneType, Language } from '@/types'

export const AVAILABLE_TONES: ToneType[] = [
  'neutral',
  'soft',
  'hard',
  'provocative',
  'formal'
]

export const TONE_LABELS: Record<ToneType, Record<Language, string>> = {
  neutral: {
    'pt-BR': 'Neutro',
    'en-US': 'Neutral',
    // ...
  },
  // ... outros tons
}

export const AVAILABLE_LANGUAGES: Language[] = [
  'pt-BR',
  'en-US',
  'es',
  'fr',
  'zh-CN',
  'ko',
  'hi'
]

export const LANGUAGE_LABELS: Record<Language, string> = {
  'pt-BR': 'Português (BR)',
  'en-US': 'English (US)',
  // ...
}

export const MAX_INTERACTIONS_PER_IDOL = 2
export const TARGET_SESSION_DURATION_MINUTES = 5
export const SLIDER_MIN = 1
export const SLIDER_MAX = 5
```

**Critérios de Aceite**:
- [ ] Constantes de tons definidas
- [ ] Constantes de idiomas definidas
- [ ] Labels traduzidos
- [ ] Constantes de regras de negócio definidas

**Dependências**: F1-T01

---

### F1-T04: Criar Context Provider (SessionContext)
**Tipo**: Code | **Complexidade**: Média

**Descrição**:
Implementar Context API para gerenciar estado global da sessão.

**Arquivo**: `context/SessionContext.tsx`

**Estrutura**:
```typescript
'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { SessionState, Language, ToneType, Idol, ChatMessage, ViewMode } from '@/types'

interface SessionContextType {
  // Estado
  state: SessionState

  // Actions - Idioma e Tom
  setLanguage: (lang: Language) => void
  setTone: (tone: ToneType) => void

  // Actions - Chat
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void
  clearChat: () => void

  // Actions - Ídolos
  updateIdolStatus: (idolId: string, updates: Partial<Idol>) => void
  eliminateIdol: (idolId: string, resistanceLevel: 1 | 2 | 3 | 4 | 5) => void

  // Actions - View
  setViewMode: (mode: ViewMode) => void

  // Actions - Slider
  setAwaitingSlider: (awaiting: boolean) => void

  // Actions - Sessão
  resetSession: () => void
}

const SessionContext = createContext<SessionContextType | undefined>(undefined)

export function SessionProvider({ children }: { children: ReactNode }) {
  // Implementação do estado e funções
}

export function useSession() {
  const context = useContext(SessionContext)
  if (!context) {
    throw new Error('useSession must be used within SessionProvider')
  }
  return context
}
```

**Critérios de Aceite**:
- [ ] Context criado com todos os métodos
- [ ] Estado inicial correto
- [ ] Tom persiste no localStorage
- [ ] Hook useSession funcional
- [ ] TypeScript sem erros

**Dependências**: F1-T01, F1-T02, F1-T03

---

### F1-T05: Adicionar SessionProvider ao layout root
**Tipo**: Code | **Complexidade**: Trivial

**Descrição**:
Envolver aplicação com SessionProvider no layout raiz.

**Arquivo**: `app/layout.tsx`

**Modificação**:
```typescript
import { SessionProvider } from '@/context/SessionContext'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
```

**Critérios de Aceite**:
- [ ] SessionProvider adicionado ao layout
- [ ] Aplicação renderiza sem erros
- [ ] useSession acessível em qualquer componente

**Dependências**: F1-T04

---

### F1-T06: Adicionar QueryClientProvider ao layout
**Tipo**: Code | **Complexidade**: Trivial

**Descrição**:
Configurar TanStack Query no layout raiz.

**Arquivo**: `app/layout.tsx`

**Modificação**:
```typescript
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from '@/context/SessionContext'

const queryClient = new QueryClient()

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <QueryClientProvider client={queryClient}>
          <SessionProvider>
            {children}
          </SessionProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
```

**Critérios de Aceite**:
- [ ] QueryClient configurado
- [ ] Provider adicionado ao layout
- [ ] Ordem correta dos providers

**Dependências**: F0-T01, F1-T05

---

## 🤖 FASE 2: Infraestrutura de IA

### F2-T01: Criar arquivo de variáveis de ambiente
**Tipo**: Config | **Complexidade**: Trivial

**Descrição**:
Configurar arquivo `.env.local` com chave da API Groq.

**Arquivo**: `.env.local`

**Conteúdo**:
```env
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=llama-3.3-70b-versatile
```

**Arquivo**: `.env.example`
```env
GROQ_API_KEY=
GROQ_MODEL=llama-3.3-70b-versatile
```

**Critérios de Aceite**:
- [ ] `.env.local` criado (gitignored)
- [ ] `.env.example` criado (versionado)
- [ ] Variáveis documentadas

**Dependências**: Nenhuma

---

### F2-T02: Criar cliente Groq
**Tipo**: Code | **Complexidade**: Simples

**Descrição**:
Criar módulo cliente para comunicação com Groq API.

**Arquivo**: `lib/groq/client.ts`

**Conteúdo**:
```typescript
import Groq from 'groq-sdk'

if (!process.env.GROQ_API_KEY) {
  throw new Error('GROQ_API_KEY não definida')
}

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
})

export const DEFAULT_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile'
```

**Critérios de Aceite**:
- [ ] Cliente Groq instanciado
- [ ] Validação de API key
- [ ] Model configurável via env
- [ ] Módulo exporta cliente

**Dependências**: F0-T02, F2-T01

---

### F2-T03: Criar system prompts
**Tipo**: Code | **Complexidade**: Complexa

**Descrição**:
Criar prompts de sistema que definem comportamento da IA conforme PRD.

**Arquivo**: `lib/groq/prompts.ts`

**Estrutura**:
```typescript
import { ToneType, Language, IdolType } from '@/types'

export function getSystemPrompt(params: {
  language: Language
  tone: ToneType
  idols: { id: IdolType, status: string }[]
  currentDiscussion?: IdolType
  interactionCount: number
}): string {
  // Prompt base explicando o papel do assistente
  // Regras: sempre desafiar, advogado do diabo, sem gírias
  // Contextualizar idioma e tom
  // Contextualizar ídolos ativos/eliminados
  // Contextualizar interação (1ª ou 2ª)
}

export function getSliderPrompt(resistanceLevel: 1 | 2 | 3 | 4 | 5): string {
  // 1-2: Provocação forte
  // 3: Questionamento suave
  // 4-5: Validação sem pressionar
}

export function getResultPrompt(params: {
  masterIdol: IdolType
  journey: any[]
  language: Language
}): string {
  // Gerar resultado final com insights
}
```

**Critérios de Aceite**:
- [ ] System prompt implementa regras do PRD
- [ ] Prompts variam por idioma
- [ ] Prompts variam por tom
- [ ] Slider logic corretamente implementada
- [ ] Prompts testados manualmente

**Dependências**: F1-T01, F1-T02, F1-T03

**IMPORTANTE**: Esta é a task mais crítica para o comportamento da IA!

---

### F2-T04: Criar API route /api/chat
**Tipo**: Code | **Complexidade**: Média

**Descrição**:
Criar endpoint POST para receber mensagens e retornar resposta da IA.

**Arquivo**: `app/api/chat/route.ts`

**Estrutura**:
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { groq, DEFAULT_MODEL } from '@/lib/groq/client'
import { getSystemPrompt } from '@/lib/groq/prompts'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages, language, tone, idols, currentDiscussion, interactionCount } = body

    const systemPrompt = getSystemPrompt({
      language,
      tone,
      idols,
      currentDiscussion,
      interactionCount
    })

    const completion = await groq.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500
    })

    return NextResponse.json({
      response: completion.choices[0]?.message?.content || ''
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao processar mensagem' },
      { status: 500 }
    )
  }
}
```

**Critérios de Aceite**:
- [ ] Endpoint criado
- [ ] Recebe parâmetros corretos
- [ ] Chama Groq API
- [ ] Retorna resposta da IA
- [ ] Trata erros adequadamente

**Dependências**: F2-T02, F2-T03

---

### F2-T05: Criar hook useSendMessage (TanStack Query)
**Tipo**: Code | **Complexidade**: Média

**Descrição**:
Criar hook React para enviar mensagens usando TanStack Query.

**Arquivo**: `hooks/useSendMessage.ts`

**Conteúdo**:
```typescript
import { useMutation } from '@tanstack/react-query'
import { useSession } from '@/context/SessionContext'

export function useSendMessage() {
  const { state } = useSession()

  return useMutation({
    mutationFn: async (message: string) => {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [
            ...state.chatHistory.map(m => ({
              role: m.role,
              content: m.content
            })),
            { role: 'user', content: message }
          ],
          language: state.language,
          tone: state.tone,
          idols: state.idols.map(i => ({ id: i.id, status: i.status })),
          currentDiscussion: state.currentIdolDiscussion,
          interactionCount: state.idols.find(i => i.id === state.currentIdolDiscussion)?.interactionCount || 0
        })
      })

      if (!response.ok) throw new Error('Erro ao enviar mensagem')

      const data = await response.json()
      return data.response
    },
    retry: 2
  })
}
```

**Critérios de Aceite**:
- [ ] Hook criado com useMutation
- [ ] Envia contexto completo para API
- [ ] Retorna resposta da IA
- [ ] Retry configurado
- [ ] TypeScript sem erros

**Dependências**: F0-T01, F1-T04, F2-T04

---

## 🎨 FASE 3: Componentes Base

### F3-T01: Criar componente ChatMessage
**Tipo**: Code | **Complexidade**: Simples

**Descrição**:
Componente para renderizar uma mensagem individual do chat.

**Arquivo**: `components/chat/ChatMessage.tsx`

**Estrutura**:
```typescript
import { ChatMessage as ChatMessageType } from '@/types'
import { cn } from '@/lib/utils'

interface ChatMessageProps {
  message: ChatMessageType
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

  return (
    <div className={cn(
      'flex gap-3 mb-4',
      isUser ? 'justify-end' : 'justify-start'
    )}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          🤖
        </div>
      )}

      <div className={cn(
        'max-w-[80%] px-4 py-2 rounded-lg',
        isUser
          ? 'bg-primary text-primary-foreground'
          : 'bg-muted'
      )}>
        <p className="text-sm">{message.content}</p>
        <span className="text-xs opacity-60 mt-1 block">
          {formatTime(message.timestamp)}
        </span>
      </div>

      {isUser && (
        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
          👤
        </div>
      )}
    </div>
  )
}
```

**Critérios de Aceite**:
- [ ] Componente renderiza mensagem
- [ ] Diferencia user vs assistant visualmente
- [ ] Mostra timestamp
- [ ] Responsivo (mobile-first)
- [ ] Estilização com Tailwind

**Dependências**: F1-T01

---

### F3-T02: Criar componente ChatInput
**Tipo**: Code | **Complexidade**: Simples

**Descrição**:
Input para usuário digitar mensagens.

**Arquivo**: `components/chat/ChatInput.tsx`

**Estrutura**:
```typescript
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Send } from 'lucide-react'

interface ChatInputProps {
  onSend: (message: string) => void
  isLoading: boolean
  disabled?: boolean
}

export function ChatInput({ onSend, isLoading, disabled }: ChatInputProps) {
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    onSend(input)
    setInput('')
  }

  return (
    <div className="flex gap-2 p-4 border-t">
      <Textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Digite sua mensagem..."
        disabled={disabled || isLoading}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
          }
        }}
        className="resize-none"
        rows={2}
      />
      <Button
        onClick={handleSend}
        disabled={disabled || isLoading || !input.trim()}
        size="icon"
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  )
}
```

**Critérios de Aceite**:
- [ ] Input funcional com Textarea
- [ ] Botão de enviar
- [ ] Enter envia (Shift+Enter quebra linha)
- [ ] Loading state
- [ ] Disabled state

**Dependências**: F0-T03

---

### F3-T03: Criar componente ChatContainer
**Tipo**: Code | **Complexidade**: Média

**Descrição**:
Container principal do chat que gerencia mensagens e scroll.

**Arquivo**: `components/chat/ChatContainer.tsx`

**Estrutura**:
```typescript
import { useEffect, useRef } from 'react'
import { useSession } from '@/context/SessionContext'
import { ChatMessage } from './ChatMessage'
import { ChatInput } from './ChatInput'
import { useSendMessage } from '@/hooks/useSendMessage'

export function ChatContainer() {
  const { state, addMessage } = useSession()
  const { mutate: sendMessage, isPending } = useSendMessage()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const handleSend = (message: string) => {
    addMessage({ role: 'user', content: message })

    sendMessage(message, {
      onSuccess: (aiResponse) => {
        addMessage({ role: 'assistant', content: aiResponse })
      }
    })
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [state.chatHistory])

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {state.chatHistory.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        onSend={handleSend}
        isLoading={isPending}
        disabled={state.viewMode === 'idols'}
      />
    </div>
  )
}
```

**Critérios de Aceite**:
- [ ] Renderiza histórico de chat
- [ ] Auto-scroll para última mensagem
- [ ] Integrado com useSession
- [ ] Integrado com useSendMessage
- [ ] Input desabilitado em modo Ídolos

**Dependências**: F1-T04, F2-T05, F3-T01, F3-T02

---

### F3-T04: Criar componente IdolCard
**Tipo**: Code | **Complexidade**: Simples

**Descrição**:
Card para exibir um ídolo individual no modo Ídolos.

**Arquivo**: `components/idols/IdolCard.tsx`

**Estrutura**:
```typescript
import { Idol } from '@/types'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface IdolCardProps {
  idol: Idol
}

export function IdolCard({ idol }: IdolCardProps) {
  const statusColors = {
    active: 'bg-green-500',
    eliminated: 'bg-red-500',
    pending: 'bg-gray-400'
  }

  return (
    <Card className={cn(
      'relative',
      idol.status === 'eliminated' && 'opacity-50'
    )}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">{IDOL_ICONS[idol.id]}</span>
            {idol.name}
          </CardTitle>
          <Badge className={statusColors[idol.status]}>
            {idol.status}
          </Badge>
        </div>
        <CardDescription>{idol.description}</CardDescription>
      </CardHeader>
    </Card>
  )
}
```

**Critérios de Aceite**:
- [ ] Card renderiza dados do ídolo
- [ ] Badge de status com cores
- [ ] Opacidade quando eliminado
- [ ] Ícone do ídolo exibido
- [ ] Responsivo

**Dependências**: F1-T01, F1-T02

---

### F3-T05: Criar componente IdolsView
**Tipo**: Code | **Complexidade**: Média

**Descrição**:
View modal/overlay para mostrar os 4 ídolos (modo read-only).

**Arquivo**: `components/idols/IdolsView.tsx`

**Estrutura**:
```typescript
import { useSession } from '@/context/SessionContext'
import { IdolCard } from './IdolCard'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog'

export function IdolsView() {
  const { state, setViewMode } = useSession()
  const isOpen = state.viewMode === 'idols'

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setViewMode(open ? 'idols' : 'conversation')
    }}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Os 4 Ídolos</DialogTitle>
          <DialogDescription>
            Consulte as definições a qualquer momento
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {state.idols.map((idol) => (
            <IdolCard key={idol.id} idol={idol} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
```

**Critérios de Aceite**:
- [ ] Dialog abre/fecha corretamente
- [ ] Mostra os 4 ídolos
- [ ] Read-only (sem interação)
- [ ] Fecha ao clicar fora ou ESC
- [ ] Responsivo

**Dependências**: F0-T03, F1-T04, F3-T04

---

### F3-T06: Criar componente ResistanceSlider
**Tipo**: Code | **Complexidade**: Média

**Descrição**:
Slider 1-5 para indicar resistência ao eliminar ídolo.

**Arquivo**: `components/idols/ResistanceSlider.tsx`

**Estrutura**:
```typescript
import { useState } from 'react'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog'

interface ResistanceSliderProps {
  isOpen: boolean
  onConfirm: (level: 1 | 2 | 3 | 4 | 5) => void
  onCancel: () => void
}

export function ResistanceSlider({ isOpen, onConfirm, onCancel }: ResistanceSliderProps) {
  const [value, setValue] = useState<number>(3)

  const labels = {
    1: 'Muito Fácil',
    2: 'Fácil',
    3: 'Médio',
    4: 'Difícil',
    5: 'Muito Difícil'
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Quão difícil foi essa decisão?</DialogTitle>
        </DialogHeader>

        <div className="py-6">
          <Slider
            value={[value]}
            onValueChange={([v]) => setValue(v)}
            min={1}
            max={5}
            step={1}
            className="mb-4"
          />
          <p className="text-center text-lg font-medium">
            {labels[value as keyof typeof labels]}
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button onClick={() => onConfirm(value as 1 | 2 | 3 | 4 | 5)}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

**Critérios de Aceite**:
- [ ] Slider funcional (1-5)
- [ ] Label descritiva muda conforme valor
- [ ] Botões Confirmar/Cancelar
- [ ] Obrigatório (não fecha ao clicar fora)
- [ ] Callback onConfirm retorna nível

**Dependências**: F0-T03

---

### F3-T07: Criar componente ModeToggle
**Tipo**: Code | **Complexidade**: Simples

**Descrição**:
Toggle fixo no bottom para alternar entre Conversa/Ídolos.

**Arquivo**: `components/chat/ModeToggle.tsx`

**Estrutura**:
```typescript
import { useSession } from '@/context/SessionContext'
import { Button } from '@/components/ui/button'
import { MessageSquare, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

export function ModeToggle() {
  const { state, setViewMode } = useSession()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-2 flex gap-2 justify-center">
      <Button
        variant={state.viewMode === 'conversation' ? 'default' : 'outline'}
        onClick={() => setViewMode('conversation')}
        className="flex-1 max-w-xs"
      >
        <MessageSquare className="mr-2 h-4 w-4" />
        Conversa
      </Button>
      <Button
        variant={state.viewMode === 'idols' ? 'default' : 'outline'}
        onClick={() => setViewMode('idols')}
        className="flex-1 max-w-xs"
      >
        <Users className="mr-2 h-4 w-4" />
        Ídolos
      </Button>
    </div>
  )
}
```

**Critérios de Aceite**:
- [ ] Toggle fixo no bottom
- [ ] Alterna entre modos
- [ ] Indicação visual do modo ativo
- [ ] Ícones Lucide React
- [ ] Responsivo

**Dependências**: F1-T04

---

## 📄 FASE 4: Páginas e Rotas

### F4-T01: Criar página Home/Intro
**Tipo**: Code | **Complexidade**: Simples

**Descrição**:
Página inicial com explicação e botão "Começar".

**Arquivo**: `app/page.tsx`

**Estrutura**:
```typescript
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-2xl p-8">
        <h1 className="text-4xl font-bold mb-4">Idol's Drill</h1>
        <p className="text-muted-foreground mb-6">
          Um exercício introspectivo de ~5 minutos para identificar
          seu Ídolo Mestre entre Dinheiro, Poder, Prazer e Fama.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="text-center">
            <div className="text-4xl mb-2">💰</div>
            <p className="text-sm font-medium">Dinheiro</p>
          </div>
          {/* Repetir para outros ídolos */}
        </div>

        <Link href="/chat">
          <Button size="lg" className="w-full">
            Começar
          </Button>
        </Link>
      </Card>
    </div>
  )
}
```

**Critérios de Aceite**:
- [ ] Página criada em app/page.tsx
- [ ] Explicação clara do exercício
- [ ] Apresentação visual dos 4 ídolos
- [ ] Botão "Começar" leva para /chat
- [ ] Responsivo mobile-first

**Dependências**: Nenhuma

---

### F4-T02: Criar página Chat
**Tipo**: Code | **Complexidade**: Simples

**Descrição**:
Página principal do chat onde o exercício acontece.

**Arquivo**: `app/chat/page.tsx`

**Estrutura**:
```typescript
import { ChatContainer } from '@/components/chat/ChatContainer'
import { ModeToggle } from '@/components/chat/ModeToggle'
import { IdolsView } from '@/components/idols/IdolsView'

export default function ChatPage() {
  return (
    <div className="h-screen flex flex-col">
      <header className="border-b p-4">
        <h1 className="text-xl font-semibold">Idol's Drill</h1>
      </header>

      <main className="flex-1 overflow-hidden">
        <ChatContainer />
      </main>

      <ModeToggle />
      <IdolsView />
    </div>
  )
}
```

**Critérios de Aceite**:
- [ ] Página criada em app/chat/page.tsx
- [ ] ChatContainer renderizado
- [ ] ModeToggle fixo no bottom
- [ ] IdolsView disponível
- [ ] Layout fullscreen mobile-first

**Dependências**: F3-T03, F3-T05, F3-T07

---

### F4-T03: Criar página Result
**Tipo**: Code | **Complexidade**: Média

**Descrição**:
Página de resultado final após completar exercício.

**Arquivo**: `app/result/page.tsx`

**Estrutura**:
```typescript
'use client'

import { useSession } from '@/context/SessionContext'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useRouter } from 'next/navigation'

export default function ResultPage() {
  const { state, resetSession } = useSession()
  const router = useRouter()

  // Calcular ídolo mestre (último não eliminado)
  const masterIdol = state.idols.find(i => i.status === 'active')

  const handleNewSession = () => {
    resetSession()
    router.push('/')
  }

  return (
    <div className="min-h-screen p-4">
      <Card className="max-w-2xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">Seu Ídolo Mestre</h1>

        <div className="text-center mb-8">
          <div className="text-6xl mb-4">
            {IDOL_ICONS[masterIdol?.id]}
          </div>
          <h2 className="text-2xl font-semibold">{masterIdol?.name}</h2>
        </div>

        <div className="space-y-4 mb-8">
          <div>
            <h3 className="font-semibold mb-2">Sua Jornada</h3>
            {state.idols
              .filter(i => i.status === 'eliminated')
              .map(i => (
                <p key={i.id} className="text-sm text-muted-foreground">
                  {i.name} - Nível {i.resistanceLevel}
                </p>
              ))
            }
          </div>
        </div>

        <Button onClick={handleNewSession} className="w-full">
          Nova Sessão
        </Button>
      </Card>
    </div>
  )
}
```

**Critérios de Aceite**:
- [ ] Página criada
- [ ] Mostra ídolo mestre
- [ ] Lista jornada (ídolos eliminados)
- [ ] Botão "Nova Sessão" reseta e volta para home
- [ ] Layout responsivo

**Dependências**: F1-T04

---

### F4-T04: Atualizar navegação do styleguide
**Tipo**: Code | **Complexidade**: Trivial

**Descrição**:
Adicionar links para /chat e /result no styleguide para facilitar testes.

**Arquivo**: `app/styleguide/navigation.ts`

**Modificação**:
Adicionar:
```typescript
{ name: 'Chat', href: '/chat' },
{ name: 'Result', href: '/result' }
```

**Critérios de Aceite**:
- [ ] Links adicionados
- [ ] Navegação funcional

**Dependências**: F4-T02, F4-T03

---

## 🧠 FASE 5: Lógica de Negócio

### F5-T01: Implementar lógica de eliminação de ídolo
**Tipo**: Code | **Complexidade**: Complexa

**Descrição**:
Implementar fluxo completo de eliminação com desafio obrigatório e slider.

**Arquivo**: `hooks/useIdolElimination.ts`

**Estrutura**:
```typescript
import { useState } from 'react'
import { useSession } from '@/context/SessionContext'
import { IdolType } from '@/types'

export function useIdolElimination() {
  const { state, eliminateIdol, setAwaitingSlider } = useSession()
  const [pendingElimination, setPendingElimination] = useState<IdolType | null>(null)

  const requestElimination = (idolId: IdolType) => {
    // Validar se ídolo pode ser eliminado
    // Verificar se não é o último
    // Marcar como pendente
    // Trigger slider
    setPendingElimination(idolId)
    setAwaitingSlider(true)
  }

  const confirmElimination = (resistanceLevel: 1 | 2 | 3 | 4 | 5) => {
    if (!pendingElimination) return

    eliminateIdol(pendingElimination, resistanceLevel)
    setPendingElimination(null)
    setAwaitingSlider(false)

    // Verificar se resta apenas 1 ídolo → redirecionar para /result
  }

  const cancelElimination = () => {
    setPendingElimination(null)
    setAwaitingSlider(false)
  }

  return {
    requestElimination,
    confirmElimination,
    cancelElimination,
    pendingElimination,
    isAwaitingSlider: state.isAwaitingSlider
  }
}
```

**Critérios de Aceite**:
- [ ] Valida se ídolo pode ser eliminado
- [ ] Bloqueia último ídolo
- [ ] Trigger slider obrigatório
- [ ] Elimina ídolo após slider
- [ ] Redireciona para /result quando acabar

**Dependências**: F1-T04

---

### F5-T02: Implementar contador de interações por ídolo
**Tipo**: Code | **Complexidade**: Simples

**Descrição**:
Rastrear número de interações por ídolo e forçar decisão na 2ª.

**Arquivo**: `context/SessionContext.tsx` (modificação)

**Modificação**:
Adicionar lógica no `addMessage` para:
- Incrementar `interactionCount` do ídolo em discussão
- Se `interactionCount === 2`, adicionar flag para IA forçar decisão

**Critérios de Aceite**:
- [ ] Contador incrementa corretamente
- [ ] Máximo 2 interações por ídolo
- [ ] Flag passada para API/prompt

**Dependências**: F1-T04, F2-T03

---

### F5-T03: Implementar detecção de tentativa de eliminação no chat
**Tipo**: Code | **Complexidade**: Média

**Descrição**:
Analisar mensagem do usuário para detectar quando ele quer eliminar um ídolo.

**Arquivo**: `lib/chat/detectIntention.ts`

**Estrutura**:
```typescript
import { IdolType } from '@/types'

export function detectEliminationIntent(message: string): IdolType | null {
  const lowerMessage = message.toLowerCase()

  // Palavras-chave: eliminar, remover, descartar, etc
  // Menciona ídolo: dinheiro, poder, prazer, fama

  // Retorna IdolType se detectar intenção clara
  // Retorna null se ambíguo
}
```

**Critérios de Aceite**:
- [ ] Detecta intenção de eliminação
- [ ] Identifica qual ídolo
- [ ] Funciona com variações de linguagem
- [ ] Retorna null se ambíguo

**Dependências**: F1-T01

---

### F5-T04: Integrar slider com fluxo de eliminação
**Tipo**: Code | **Complexidade**: Média

**Descrição**:
Conectar ResistanceSlider com lógica de eliminação.

**Arquivo**: `app/chat/page.tsx` (modificação)

**Modificação**:
```typescript
import { useIdolElimination } from '@/hooks/useIdolElimination'
import { ResistanceSlider } from '@/components/idols/ResistanceSlider'

export default function ChatPage() {
  const {
    confirmElimination,
    cancelElimination,
    isAwaitingSlider
  } = useIdolElimination()

  return (
    <>
      {/* ... */}
      <ResistanceSlider
        isOpen={isAwaitingSlider}
        onConfirm={confirmElimination}
        onCancel={cancelElimination}
      />
    </>
  )
}
```

**Critérios de Aceite**:
- [ ] Slider abre quando ídolo é marcado para eliminação
- [ ] Não pode ser fechado sem confirmar/cancelar
- [ ] Elimina ídolo após confirmação
- [ ] Envia nível para IA ajustar resposta

**Dependências**: F3-T06, F5-T01

---

### F5-T05: Implementar validação de último ídolo
**Tipo**: Code | **Complexidade**: Simples

**Descrição**:
Bloquear eliminação do último ídolo e mostrar resumo.

**Arquivo**: `hooks/useIdolElimination.ts` (modificação)

**Modificação**:
```typescript
const requestElimination = (idolId: IdolType) => {
  const activeIdols = state.idols.filter(i => i.status === 'active')

  if (activeIdols.length === 1) {
    // Bloquear eliminação
    // Adicionar mensagem da IA explicando
    // Mostrar bullets dos eliminados com razões
    return
  }

  // ... continua fluxo normal
}
```

**Critérios de Aceite**:
- [ ] Detecta quando resta 1 ídolo
- [ ] Bloqueia eliminação
- [ ] IA explica por que não pode
- [ ] Mostra resumo de eliminações

**Dependências**: F5-T01

---

### F5-T06: Implementar redirecionamento automático para resultado
**Tipo**: Code | **Complexidade**: Simples

**Descrição**:
Redirecionar para /result automaticamente quando restar 1 ídolo.

**Arquivo**: `hooks/useIdolElimination.ts` (modificação)

**Modificação**:
```typescript
import { useRouter } from 'next/navigation'

const router = useRouter()

const confirmElimination = (resistanceLevel) => {
  // ... elimina ídolo

  const remainingIdols = state.idols.filter(i => i.status === 'active')
  if (remainingIdols.length === 1) {
    router.push('/result')
  }
}
```

**Critérios de Aceite**:
- [ ] Redireciona automaticamente
- [ ] Redireciona após slider ser confirmado
- [ ] Redireciona apenas quando resta 1 ídolo

**Dependências**: F5-T01, F4-T03

---

## 🌍 FASE 6: Features Avançadas

### F6-T01: Implementar seletor de idioma
**Tipo**: Code | **Complexidade**: Média

**Descrição**:
Componente para selecionar idioma no início da sessão.

**Arquivo**: `components/settings/LanguageSelector.tsx`

**Estrutura**:
```typescript
import { useSession } from '@/context/SessionContext'
import { Select } from '@/components/ui/select'
import { AVAILABLE_LANGUAGES, LANGUAGE_LABELS } from '@/lib/constants/config'

export function LanguageSelector() {
  const { state, setLanguage } = useSession()

  return (
    <Select
      value={state.language}
      onValueChange={(value) => setLanguage(value as Language)}
    >
      {AVAILABLE_LANGUAGES.map(lang => (
        <option key={lang} value={lang}>
          {LANGUAGE_LABELS[lang]}
        </option>
      ))}
    </Select>
  )
}
```

**Critérios de Aceite**:
- [ ] Select com 7 idiomas
- [ ] Muda idioma na sessão
- [ ] Reflete em prompts da IA
- [ ] Reflete em UI labels

**Dependências**: F1-T03, F1-T04

---

### F6-T02: Implementar seletor de tom
**Tipo**: Code | **Complexidade**: Simples

**Descrição**:
Componente para selecionar tom do assistente.

**Arquivo**: `components/settings/ToneSelector.tsx`

**Estrutura**:
```typescript
import { useSession } from '@/context/SessionContext'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { AVAILABLE_TONES, TONE_LABELS } from '@/lib/constants/config'

export function ToneSelector() {
  const { state, setTone } = useSession()

  return (
    <RadioGroup value={state.tone} onValueChange={(v) => setTone(v as ToneType)}>
      {AVAILABLE_TONES.map(tone => (
        <div key={tone} className="flex items-center gap-2">
          <RadioGroupItem value={tone} id={tone} />
          <label htmlFor={tone}>{TONE_LABELS[tone][state.language]}</label>
        </div>
      ))}
    </RadioGroup>
  )
}
```

**Critérios de Aceite**:
- [ ] RadioGroup com 5 tons
- [ ] Persiste no localStorage
- [ ] Carrega tom salvo ao iniciar
- [ ] Reflete em prompts da IA

**Dependências**: F1-T03, F1-T04

---

### F6-T03: Adicionar configurações na página inicial
**Tipo**: Code | **Complexidade**: Simples

**Descrição**:
Adicionar seletores de idioma e tom na página home antes de começar.

**Arquivo**: `app/page.tsx` (modificação)

**Modificação**:
```typescript
import { LanguageSelector } from '@/components/settings/LanguageSelector'
import { ToneSelector } from '@/components/settings/ToneSelector'

export default function HomePage() {
  return (
    <div>
      {/* ... */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Idioma</h3>
        <LanguageSelector />
      </div>

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Tom do Assistente</h3>
        <ToneSelector />
      </div>
      {/* ... */}
    </div>
  )
}
```

**Critérios de Aceite**:
- [ ] Seletores adicionados na home
- [ ] Usuário configura antes de começar
- [ ] Configurações aplicadas na sessão

**Dependências**: F6-T01, F6-T02

---

### F6-T04: Implementar persistência de tom no localStorage
**Tipo**: Code | **Complexidade**: Simples

**Descrição**:
Salvar e carregar tom do localStorage.

**Arquivo**: `context/SessionContext.tsx` (modificação)

**Modificação**:
```typescript
const TONE_STORAGE_KEY = 'idols-drill-tone'

// No init
const savedTone = localStorage.getItem(TONE_STORAGE_KEY) as ToneType | null
const initialTone = savedTone || 'neutral'

// No setTone
const setTone = (tone: ToneType) => {
  setState(prev => ({ ...prev, tone }))
  localStorage.setItem(TONE_STORAGE_KEY, tone)
}
```

**Critérios de Aceite**:
- [ ] Tom salvo no localStorage
- [ ] Tom carregado ao iniciar app
- [ ] Funciona entre sessões

**Dependências**: F1-T04

---

### F6-T05: Implementar tradução de constantes
**Tipo**: Code | **Complexidade**: Média

**Descrição**:
Criar sistema de tradução para constantes e UI labels.

**Arquivo**: `lib/i18n/translations.ts`

**Estrutura**:
```typescript
import { Language } from '@/types'

export const translations: Record<Language, {
  home: {
    title: string
    subtitle: string
    startButton: string
  }
  chat: {
    placeholder: string
    // ...
  }
  // ...
}> = {
  'pt-BR': {
    home: {
      title: 'Idol\'s Drill',
      subtitle: 'Um exercício introspectivo...',
      startButton: 'Começar'
    },
    // ...
  },
  'en-US': {
    // ...
  }
  // ... outros idiomas
}

export function t(language: Language, key: string): string {
  // Helper para buscar tradução
}
```

**Critérios de Aceite**:
- [ ] Arquivo de traduções para 7 idiomas
- [ ] Helper function `t()`
- [ ] Traduções aplicadas na UI

**Dependências**: F1-T01, F1-T03

---

### F6-T06: Implementar geração automática de resultado
**Tipo**: Code | **Complexidade**: Complexa

**Descrição**:
Usar Groq para gerar resultado final com insights.

**Arquivo**: `app/api/result/route.ts`

**Estrutura**:
```typescript
export async function POST(request: NextRequest) {
  const { masterIdol, journey, language } = await request.json()

  const prompt = getResultPrompt({ masterIdol, journey, language })

  const completion = await groq.chat.completions.create({
    model: DEFAULT_MODEL,
    messages: [{ role: 'system', content: prompt }],
    temperature: 0.8,
    max_tokens: 1000
  })

  return NextResponse.json({
    narrative: completion.choices[0]?.message?.content,
    insights: [], // Extrair do conteúdo
    recommendations: [] // Extrair do conteúdo
  })
}
```

**Critérios de Aceite**:
- [ ] API route criada
- [ ] Gera resultado usando Groq
- [ ] Resultado estruturado
- [ ] Insights e recomendações extraídos

**Dependências**: F2-T02, F2-T03

---

### F6-T07: Integrar resultado gerado na página /result
**Tipo**: Code | **Complexidade**: Média

**Descrição**:
Chamar API de resultado e exibir conteúdo gerado.

**Arquivo**: `app/result/page.tsx` (modificação)

**Modificação**:
```typescript
import { useQuery } from '@tanstack/react-query'

export default function ResultPage() {
  const { data: result, isLoading } = useQuery({
    queryKey: ['session-result'],
    queryFn: async () => {
      const res = await fetch('/api/result', {
        method: 'POST',
        body: JSON.stringify({
          masterIdol: masterIdol?.id,
          journey: eliminatedIdols,
          language: state.language
        })
      })
      return res.json()
    }
  })

  return (
    <div>
      {isLoading ? <Loader /> : (
        <>
          <p>{result.narrative}</p>
          <ul>
            {result.insights.map(i => <li>{i}</li>)}
          </ul>
        </>
      )}
    </div>
  )
}
```

**Critérios de Aceite**:
- [ ] Chama API automaticamente
- [ ] Loading state
- [ ] Exibe narrativa
- [ ] Exibe insights
- [ ] Exibe recomendações

**Dependências**: F6-T06, F4-T03

---

## 🎨 FASE 7: Polish e Testes

### F7-T01: Otimizar layout mobile-first
**Tipo**: Code | **Complexidade**: Média

**Descrição**:
Revisar todos os componentes para garantir UX mobile perfeita.

**Tarefas**:
- Testar em viewport 375px (iPhone SE)
- Garantir que toggle não sobrepõe input
- Garantir scroll adequado no chat
- Testar modal de ídolos em mobile

**Critérios de Aceite**:
- [ ] Testado em 3+ dispositivos móveis
- [ ] Sem overflow horizontal
- [ ] Todos os botões acessíveis
- [ ] Scroll funciona perfeitamente

**Dependências**: Todas as tasks de componentes

---

### F7-T02: Adicionar tratamento de erros
**Tipo**: Code | **Complexidade**: Simples

**Descrição**:
Adicionar toasts de erro em operações críticas.

**Arquivo**: `app/layout.tsx` (modificação)

**Modificação**:
```typescript
import { Toaster } from '@/components/ui/sonner'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
```

**Hooks modificados**:
- `useSendMessage`: toast de erro ao falhar
- `app/result/page.tsx`: toast se falhar ao gerar

**Critérios de Aceite**:
- [ ] Toaster adicionado
- [ ] Erros exibidos ao usuário
- [ ] Mensagens descritivas

**Dependências**: F0-T04

---

### F7-T03: Adicionar loading states visuais
**Tipo**: Code | **Complexidade**: Simples

**Descrição**:
Adicionar spinners e skeletons em operações assíncronas.

**Componentes modificados**:
- `ChatInput`: mostrar "Enviando..." quando isPending
- `app/result/page.tsx`: skeleton enquanto carrega resultado

**Critérios de Aceite**:
- [ ] Feedbacks visuais em todas as operações async
- [ ] Usuário sabe quando algo está processando

**Dependências**: Nenhuma (modificações)

---

### F7-T04: Adicionar meta tags e SEO
**Tipo**: Code | **Complexidade**: Trivial

**Descrição**:
Adicionar meta tags no layout root.

**Arquivo**: `app/layout.tsx` (modificação)

**Modificação**:
```typescript
export const metadata = {
  title: 'Idol\'s Drill - Descubra seu Ídolo Mestre',
  description: 'Exercício introspectivo de 5 minutos...',
  // Open Graph, Twitter cards, etc
}
```

**Critérios de Aceite**:
- [ ] Title e description
- [ ] Open Graph tags
- [ ] Favicon configurado

**Dependências**: Nenhuma

---

### F7-T05: Testar fluxo completo end-to-end
**Tipo**: Doc | **Complexidade**: Média

**Descrição**:
Executar teste manual completo do fluxo.

**Checklist**:
- [ ] Home carrega → seleciona idioma e tom → clica "Começar"
- [ ] Chat inicia → IA apresenta os 4 ídolos
- [ ] Usuário tenta eliminar ídolo → IA desafia
- [ ] Usuário confirma → Slider aparece (obrigatório)
- [ ] Seleciona nível → IA ajusta resposta conforme nível
- [ ] Repete até 3 ídolos eliminados
- [ ] Tenta eliminar último → IA bloqueia e explica
- [ ] Redirecionamento automático para /result
- [ ] Resultado exibido corretamente
- [ ] "Nova Sessão" reseta e volta para home

**Critérios de Aceite**:
- [ ] Todos os passos funcionam
- [ ] Nenhum erro no console
- [ ] UX fluida

**Dependências**: Todas as tasks anteriores

---

### F7-T06: Criar README.md atualizado
**Tipo**: Doc | **Complexidade**: Trivial

**Descrição**:
Atualizar README com instruções do projeto.

**Arquivo**: `README.md` (modificação)

**Conteúdo**:
```markdown
# Idol's Drill

## Setup
1. Clone o repo
2. `npm install`
3. Configure `.env.local` com `GROQ_API_KEY`
4. `npm run dev`

## Stack
- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn/ui
- Groq API

## Features
- Chat conversacional com IA
- Modo Ídolos (consulta read-only)
- Slider de resistência
- 7 idiomas
- 5 tons de assistente
```

**Critérios de Aceite**:
- [ ] README atualizado
- [ ] Instruções claras
- [ ] Links úteis

**Dependências**: Nenhuma

---

### F7-T07: Fazer commit inicial
**Tipo**: Doc | **Complexidade**: Trivial

**Descrição**:
Fazer commit inicial do MVP completo.

**Comandos**:
```bash
git add .
git commit -m "feat: MVP completo do Idol's Drill

- Chat conversacional com Groq API
- Sistema de eliminação de ídolos
- Slider de resistência obrigatório
- Suporte a 7 idiomas e 5 tons
- Resultado gerado por IA
- Mobile-first e responsivo"
```

**Critérios de Aceite**:
- [ ] Commit criado
- [ ] Mensagem descritiva

**Dependências**: F7-T05 (teste completo)

---

## 📊 RESUMO DE TASKS POR FASE

| Fase | Tasks | Complexidade Total |
|------|-------|--------------------|
| **Fase 0: Setup** | 5 | Trivial |
| **Fase 1: Fundação** | 6 | Simples → Média |
| **Fase 2: IA** | 5 | Média → Complexa |
| **Fase 3: Componentes** | 7 | Simples → Média |
| **Fase 4: Páginas** | 4 | Simples |
| **Fase 5: Lógica** | 6 | Média → Complexa |
| **Fase 6: Features** | 7 | Simples → Complexa |
| **Fase 7: Polish** | 7 | Trivial → Média |
| **TOTAL** | **47 tasks** | |

---

## 🎯 ORDEM RECOMENDADA DE EXECUÇÃO

### Sprint 1: Fundação (Dias 1-2)
- F0 (Setup completo)
- F1 (Types, Constants, Context)
- F2-T01, F2-T02 (Groq client)

### Sprint 2: Core Chat (Dias 3-4)
- F2-T03, F2-T04, F2-T05 (IA funcionando)
- F3-T01, F3-T02, F3-T03 (Chat básico)
- F4-T01, F4-T02 (Páginas home e chat)

### Sprint 3: Ídolos e Slider (Dias 5-6)
- F3-T04, F3-T05, F3-T06, F3-T07 (Componentes de ídolos)
- F5-T01, F5-T04 (Eliminação + slider)

### Sprint 4: Lógica Avançada (Dia 7)
- F5-T02, F5-T03, F5-T05, F5-T06 (Lógica completa)
- F4-T03 (Página resultado)

### Sprint 5: Features e Polish (Dias 8-9)
- F6 (Idiomas, tons, resultado gerado)
- F7 (Polish, testes, docs)

**Estimativa Total: 9-10 dias de desenvolvimento**

---

## 🚨 TASKS CRÍTICAS (NÃO PODEM FALHAR)

1. **F2-T03**: System prompts - Define comportamento da IA
2. **F5-T01**: Lógica de eliminação - Core do produto
3. **F5-T04**: Slider integrado - Regra obrigatória do PRD
4. **F7-T05**: Teste end-to-end - Validação final

---

## 📝 NOTAS FINAIS

### Decisões de Arquitetura
- **Context API**: Escolhido por simplicidade (sem Redux/Zustand)
- **TanStack Query**: Para chamadas Groq (cache, retry)
- **Groq API**: Rápida e gratuita (vs OpenAI)
- **No Backend DB**: MVP sem persistência (conforme PRD)

### Próximas Iterações (Pós-MVP)
- Login e autenticação
- Histórico de sessões
- Exportação de resultado (PDF)
- Analytics (tempo por ídolo, distribuição)
- Gamificação (badges, streak)

### Dependências Externas
- **Groq API Key**: Necessária para MVP funcionar
- **Vercel**: Para deploy (gratuito)

---

**Documento criado em**: 2026-01-09
**Versão**: 1.0
**Status**: Pronto para execução
