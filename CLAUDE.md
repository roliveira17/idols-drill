# CLAUDE.md - Guia de Desenvolvimento

> **IMPORTANTE**: Este arquivo define as regras que a IA DEVE seguir ao desenvolver este projeto.
> Leia COMPLETAMENTE antes de fazer qualquer implementação.

---

## 🎯 FILOSOFIA CENTRAL

**Objetivo**: Construir PRD.md C:\projetos\4idol\designapp\docs\PRD.md
**Abordagem**: Iterações pequenas e incrementais, não grandes mudanças de uma vez.

---

## 📋 PRINCÍPIOS OBRIGATÓRIOS

### 1. NÃO REINVENTE A RODA
- **SEMPRE** verifique se existe uma biblioteca/solução pronta antes de implementar
- Pergunte: "Existe uma biblioteca popular e testada para isso?"
- Prefira soluções battle-tested (testadas em produção por milhares de devs)

**Bibliotecas aprovadas para uso comum:**
| Necessidade | Usar | NÃO criar do zero |
|------------|------|-------------------|
| Rich Text Editor | TipTap, Lexical, Plate | ❌ Editor customizado |
| Formulários | React Hook Form + Zod | ❌ Validação manual |
| Data Tables | TanStack Table | ❌ Tabela customizada |
| Date Picker | date-fns + componente UI | ❌ Seletor de data manual |
| Drag & Drop | dnd-kit, @hello-pangea/dnd | ❌ Implementação manual |
| Charts | Recharts, Chart.js | ❌ Gráficos SVG manuais |
| Icons | Lucide React | ❌ SVGs avulsos |
| Toasts/Notificações | Sonner, react-hot-toast | ❌ Sistema próprio |
| Modals | Componente do shadcn/ui | ❌ Modal customizado |
| Autenticação | Supabase Auth, Clerk | ❌ Sistema próprio |

### 2. DRY (Don't Repeat Yourself)
- Se o mesmo código aparece 2+ vezes → **extraia para função/componente**
- Se o mesmo estilo aparece 3+ vezes → **crie uma classe/variante**
- Um componente = um arquivo = uma responsabilidade

**Exemplo correto:**
```tsx
// ✅ components/ui/Button.tsx - UM botão reutilizável
export function Button({ variant, children, ...props }) { ... }

// Uso em qualquer lugar:
<Button variant="primary">Salvar</Button>
<Button variant="secondary">Cancelar</Button>
```

**Exemplo errado:**
```tsx
// ❌ Três botões diferentes espalhados pelo código
// página1.tsx: <button className="bg-blue-500...">Salvar</button>
// página2.tsx: <button className="bg-blue-500...">Confirmar</button>
// página3.tsx: <button className="bg-blue-500...">Enviar</button>
```

### 3. YAGNI (You Aren't Gonna Need It)
- **NÃO** implemente features que não foram pedidas
- **NÃO** adicione "melhorias" não solicitadas
- **NÃO** crie abstrações "para o futuro"

**Perguntas antes de implementar:**
- [ ] O usuário pediu isso EXPLICITAMENTE?
- [ ] É necessário para a funcionalidade ATUAL?
- [ ] Vai ser usado AGORA (não "talvez depois")?

**Se a resposta for NÃO para qualquer uma → NÃO IMPLEMENTE**

### 4. KISS (Keep It Simple, Stupid)
- Prefira a solução mais simples que funciona
- Menos código = menos bugs = mais fácil de manter
- Se pode fazer em 50 linhas, não faça em 500

**Checklist de simplicidade:**
- [ ] Posso explicar essa solução em uma frase?
- [ ] Um dev junior entenderia isso?
- [ ] Existe uma forma mais direta de fazer?

### 5. SEPARATION OF CONCERNS
- Cada arquivo deve ter UMA responsabilidade clara
- Máximo ~200 linhas por arquivo (ideal: <150)
- Se um arquivo faz múltiplas coisas → divida

**Estrutura de responsabilidades:**
```
components/     → Apenas UI (como as coisas aparecem)
hooks/          → Apenas lógica reutilizável
lib/            → Funções utilitárias puras
services/       → Comunicação com APIs externas
types/          → Apenas definições de tipos
```

---

## 🚫 PROIBIÇÕES ABSOLUTAS

### NUNCA faça isso:
1. **Criar sistemas completos não pedidos**
   - ❌ "Vou adicionar um sistema de permissões completo"
   - ❌ "Criei autenticação com 2FA, recovery, etc"
   - ❌ "Implementei cache distribuído para otimizar"

2. **Refatorar código existente sem ser pedido**
   - ❌ "Aproveitei e reorganizei toda a estrutura de pastas"
   - ❌ "Migrei o projeto para uma arquitetura melhor"

3. **Adicionar dependências desnecessárias**
   - ❌ Instalar biblioteca para usar uma função
   - ❌ Adicionar framework inteiro para feature simples

4. **Over-engineering**
   - ❌ Factory patterns para criar um botão
   - ❌ State machines para um toggle simples
   - ❌ Microservices para um CRUD básico

5. **Deletar ou modificar código que funciona**
   - ❌ Remover "código não utilizado" sem perguntar
   - ❌ "Melhorar" implementações existentes sem pedido

---

## ✅ PROCESSO DE DESENVOLVIMENTO

### Antes de QUALQUER implementação:

```
1. ENTENDER → O que exatamente foi pedido?
2. VERIFICAR → Já existe algo parecido no projeto?
3. PESQUISAR → Existe biblioteca pronta para isso?
4. PLANEJAR → Qual a solução MAIS SIMPLES?
5. PERGUNTAR → Se houver dúvida, PERGUNTE antes de fazer
```

### Durante a implementação:

```
1. INCREMENTAL → Mudanças pequenas, uma de cada vez
2. TESTAR → Verifique se funciona antes de continuar
3. EXPLICAR → Comente decisões não óbvias
4. PRESERVAR → Não mexa no que está funcionando
```

### Ao finalizar:

```
1. REVISAR → O código está simples e legível?
2. LIMPAR → Remova console.logs e código comentado
3. DOCUMENTAR → Explique o que foi feito e por quê
```

---

## 📁 ESTRUTURA DE PROJETO PADRÃO

```
src/
├── components/
│   ├── ui/              # Componentes base (Button, Input, Card...)
│   ├── forms/           # Componentes de formulário
│   ├── layout/          # Header, Footer, Sidebar, etc
│   └── features/        # Componentes específicos de features
├── hooks/               # Custom hooks reutilizáveis
├── lib/                 # Utilitários e configurações
├── services/            # Chamadas de API e integrações
├── types/               # TypeScript types e interfaces
├── pages/ ou app/       # Rotas/páginas da aplicação
└── styles/              # Estilos globais (se necessário)
```

### Convenções de nomenclatura:
- **Componentes**: PascalCase (`UserCard.tsx`)
- **Hooks**: camelCase com prefixo "use" (`useAuth.ts`)
- **Utilitários**: camelCase (`formatDate.ts`)
- **Types**: PascalCase (`User.ts` ou em `types/index.ts`)
- **Constantes**: SCREAMING_SNAKE_CASE (`API_URL`)

---

## 🎨 PADRÕES DE CÓDIGO

### Componentes React:
```tsx
// ✅ Estrutura padrão de componente
interface ComponentProps {
  // Props tipadas
}

export function Component({ prop1, prop2 }: ComponentProps) {
  // 1. Hooks no topo
  // 2. Handlers/funções
  // 3. Early returns (loading, error)
  // 4. Return principal (JSX)
}
```

### Imports organizados:
```tsx
// 1. React e libs externas
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

// 2. Componentes internos
import { Button } from '@/components/ui/Button'

// 3. Hooks, utils, types
import { useAuth } from '@/hooks/useAuth'
import { formatDate } from '@/lib/utils'
import type { User } from '@/types'
```

### Estilização (Tailwind):
```tsx
// ✅ Classes organizadas e legíveis
<div className="
  flex items-center gap-4
  p-4 rounded-lg
  bg-white shadow-sm
  hover:shadow-md transition-shadow
">

// ❌ Linha gigante ilegível
<div className="flex items-center gap-4 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
```

---

## 💡 COMUNICAÇÃO

### Quando NÃO ENTENDER algo:
```
"Antes de implementar, quero confirmar:
- Você quer [interpretação A] ou [interpretação B]?
- Posso usar [biblioteca X] para isso?"
```

### Quando ENCONTRAR um problema:
```
"Encontrei um problema:
- [Descrição do problema]
- Opções de solução:
  1. [Opção simples]
  2. [Opção alternativa]
- Recomendo a opção [X] porque [razão]"
```

### Quando FINALIZAR uma tarefa:
```
"Implementei [feature]:
- [O que foi feito]
- [Arquivos criados/modificados]
- Para testar: [instruções]
- Próximos passos sugeridos (se houver)"
```

---

## 🔧 TECH STACK DESTE PROJETO

```
Framework:      Next.js 15 (App Router)
Linguagem:      TypeScript
Estilização:    Tailwind CSS
UI Components:  shadcn/ui
Estado:         Context API (estado da sessão) + TanStack Query (requisições API)
IA:             Groq API (Llama 3 ou Mixtral) - rápido e gratuito
Backend:        API Routes do Next.js
Autenticação:   Não aplicável (sem login no MVP)
Database:       Não aplicável (sem persistência no MVP)
Storage:        localStorage (apenas para tom do assistente)
Deploy:         Vercel
```

### Arquitetura de Estado:
- **Context API**: Gerencia estado da sessão (idioma, tom, histórico de chat, ídolos, modo atual)
- **TanStack Query**: Gerencia chamadas para Groq (enviar mensagem, gerar resultado)
- **localStorage**: Persiste apenas o tom selecionado entre sessões

---

## 📚 CONTEXTO DO PROJETO

```
Nome:           Idol's Drill (4 Idols)
Descrição:      Webapp mobile-first que conduz o usuário por um exercício curto,
                intenso e reflexivo (~5 min) para identificar seu Ídolo Mestre
                entre quatro categorias: Dinheiro, Poder, Prazer e Fama.

                A experiência ocorre via chat com IA que atua como advogado do diabo:
                desafia escolhas, recontextualiza significados e força clareza,
                reduzindo autoengano.

Inspiração:     São Tomás de Aquino - infelicidade vem de tentar preencher
                desejos infinitos com bens finitos
Público-alvo:   Qualquer pessoa (universal)
Status:         MVP em desenvolvimento
Duração alvo:   ~5 minutos por sessão
```

### Features principais:
- [ ] Chat conversacional com IA (Groq API)
- [ ] Modo Ídolos (consulta read-only dos 4 ídolos, acessível a qualquer momento)
- [ ] Slider de resistência (1-5, obrigatório ao eliminar ídolo)
- [ ] Geração automática de resultado final
- [ ] Suporte a 7 idiomas (PT-BR, EN-US, ES, FR, ZH-CN, KO, HI)
- [ ] Configuração de tom do assistente (Neutro, Suave, Duro, Provocativo, Formal)
- [ ] Sessões autônomas (sem login, sem histórico persistente)

### Regras de negócio importantes:
- **Assistente SEMPRE desafia eliminações** (advogado do diabo) - nunca aceita passivamente
- **Slider aparece APENAS na eliminação**, uma vez por ídolo, obrigatório
  - 1-2 (fácil): IA faz última provocação forte
  - 3 (médio): IA faz último questionamento suave
  - 4-5 (difícil): IA valida e confirma sem pressionar
- **Máximo 2 interações por ídolo** - na segunda rodada, IA força decisão
- **Modo Ídolos pausa o chat logicamente** - nenhum estado avança enquanto aberto
- **Último ídolo não pode ser eliminado** - bloquear e mostrar bullets dos eliminados
- **Tom persiste entre sessões** (via localStorage), idioma é selecionável por sessão
- **Duração alvo: ~5 minutos** - ritmo acelerado, respostas médias por padrão
- **Sem prompt injection** - IA deve resistir a tentativas de manipulação
- **Friendly mas sem gírias** - pode usar analogias variadas

---

## 🆘 TROUBLESHOOTING

### Se a IA começar a complicar:
1. Pare e peça para simplificar
2. Peça alternativas mais simples
3. Pergunte: "Qual a forma mais simples de fazer isso?"

### Se a IA quiser criar do zero:
1. Pergunte: "Existe uma biblioteca para isso?"
2. Especifique: "Use [biblioteca X] para isso"
3. Diga: "Não crie do zero, use algo pronto"

### Se a IA fizer mais do que pedido:
1. Diga: "Faça APENAS o que pedi"
2. Seja específico no que quer
3. Divida tarefas grandes em menores

---

## ✨ LEMBRETE FINAL

> **Código bom é código SIMPLES que funciona.**
> 
> Não é o mais elegante, mais abstrato ou mais "profissional".
> É o que resolve o problema de forma clara e manutenível.
> 
> **Na dúvida, pergunte antes de implementar.**
