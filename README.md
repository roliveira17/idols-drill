# Idol's Drill 💎

> Exercício introspectivo com IA conversacional para identificar seu **Ídolo Mestre**

## 📖 Sobre o Projeto

**Idol's Drill** é uma aplicação web mobile-first que usa IA conversacional (Groq API) para guiar usuários em um exercício de autoconhecimento baseado no pensamento de **São Tomás de Aquino** sobre os **4 ídolos** que podem dominar nossa vida:

- 💰 **Dinheiro** - Segurança absoluta
- 👑 **Poder** - Controle e autoridade
- 🎭 **Prazer** - Conforto e experiências
- ⭐ **Fama** - Reconhecimento social

O usuário conversa com a IA para eliminar ídolos um por um, avaliando a dificuldade de cada decisão através de um slider. A IA atua como "advogado do diabo", desafiando cada escolha. Ao final, o último ídolo restante é revelado como o **Ídolo Mestre** - aquele que mais influencia suas decisões e prioridades.

---

## ✨ Características

### Funcionalidades Core
- 🤖 **IA Conversacional** com Groq API (Llama 3 / Mixtral)
- 🌍 **7 idiomas suportados** (pt-BR, en-US, es, fr, zh-CN, ko, hi)
- 🎨 **5 tons de conversa** (neutro, suave, duro, provocativo, formal)
- 📊 **Slider de resistência** (1-5) para avaliar dificuldade de cada eliminação
- 📱 **Mobile-first** com responsividade completa
- 🎯 **Sessão autônoma** (~5 minutos, sem cadastro)

### Arquitetura Técnica
- ⚡ **Next.js 15** (App Router, Server/Client Components)
- 🎨 **Tailwind CSS** + **shadcn/ui** (design system)
- 🔄 **TanStack Query** (gerenciamento de estado assíncrono)
- 🎭 **Context API** (estado global da sessão)
- 📝 **TypeScript** (type-safe)
- 🌐 **PWA-ready** (manifest.json, meta tags otimizadas)

### UX/UI
- 🎯 Safe-area-inset para dispositivos com notch
- 🔄 Loading states com skeletons e typing indicators
- ⚠️ Error boundary para tratamento de erros
- 🍞 Toast notifications (Sonner)
- ♿ Touch targets mínimos (44x44px)
- 🚫 Prevenção de zoom no iOS

---

## 🚀 Começando

### Pré-requisitos

- Node.js 18+ e npm/yarn
- Chave de API Groq ([groq.com](https://groq.com))

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/your-repo/idols-drill.git
cd idols-drill/designapp
```

2. Instale dependências:
```bash
npm install
```

3. Configure variáveis de ambiente:
```bash
cp .env.example .env.local
```

Edite `.env.local` e adicione sua chave Groq:
```env
GROQ_API_KEY=gsk_your_key_here
```

4. Execute em desenvolvimento:
```bash
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)

---

## 📂 Estrutura do Projeto

```
designapp/
├── app/
│   ├── api/chat/          # API route para Groq
│   ├── chat/              # Página de conversa
│   ├── result/            # Página de resultado
│   ├── layout.tsx         # Layout root com providers
│   └── page.tsx           # Home/Intro
├── components/
│   ├── chat/              # Componentes de chat
│   ├── idols/             # Componentes de ídolos
│   ├── settings/          # Seletores de idioma/tom
│   └── ErrorBoundary.tsx  # Error boundary
├── context/
│   └── SessionContext.tsx # Context API (estado global)
├── hooks/
│   ├── useSendMessage.ts  # TanStack Query mutation
│   └── useIdolElimination.ts # Lógica de eliminação
├── lib/
│   ├── groq/              # Cliente e prompts Groq
│   ├── constants/         # Ídolos, configurações, traduções
│   └── i18n/              # Sistema de traduções UI
├── types/
│   └── index.ts           # Tipos TypeScript
└── docs/
    ├── PRD.md             # Product Requirements Document
    ├── TASKS.md           # Lista de tasks de implementação
    ├── GUIA_PERSONALIZACAO.md # Guia para usuários
    └── CLAUDE.md          # Guia para IA
```

---

## 🧩 Componentes Principais

### SessionContext
Gerencia estado global da sessão:
- Idioma, tom, histórico de chat
- Status dos ídolos (ativo, eliminado, pendente)
- Contador de interações por ídolo
- Modo de visualização (conversa/ídolos)

### ChatContainer
Container principal do chat com:
- Auto-scroll para última mensagem
- Loading skeleton durante resposta da IA
- Toast notifications para erros

### IdolsView (Modal)
- Visualização read-only dos 4 ídolos
- Grid responsivo (1 col mobile, 2 cols desktop)
- Pausa chat enquanto aberto

### ResistanceSlider (Modal)
- Slider 1-5 para avaliar dificuldade
- Modal obrigatório (não fecha clicando fora)
- Labels multi-idioma

### useIdolElimination
Hook customizado com lógica crítica:
- Validação de último ídolo (bloqueia eliminação)
- Trigger do slider obrigatório
- Redirecionamento automático para `/result`

---

## 🎯 Fluxo da Aplicação

1. **Home** → Usuário escolhe idioma e tom
2. **Chat** → IA apresenta os 4 ídolos
3. **Eliminação** → Usuário tenta eliminar ídolos um por um
4. **Slider** → Após cada eliminação, avalia dificuldade (1-5)
5. **Desafio** → IA atua como "advogado do diabo"
6. **Bloqueio** → Último ídolo é protegido (não pode ser eliminado)
7. **Resultado** → Exibe Ídolo Mestre + jornada + insights

---

## 🌍 Internacionalização (i18n)

### Idiomas Suportados
- 🇧🇷 Português (pt-BR)
- 🇺🇸 Inglês (en-US)
- 🇪🇸 Espanhol (es)
- 🇫🇷 Francês (fr)
- 🇨🇳 Chinês Simplificado (zh-CN)
- 🇰🇷 Coreano (ko)
- 🇮🇳 Hindi (hi)

### Tons de Conversa
- 🤝 **Neutro** - Equilibrado e respeitoso
- 🌸 **Suave** - Gentil e acolhedor
- 💪 **Duro** - Direto e desafiador
- 🔥 **Provocativo** - Intenso e questionador
- 👔 **Formal** - Profissional e acadêmico

---

## 🔧 Scripts

```bash
npm run dev          # Desenvolvimento (localhost:3000)
npm run build        # Build de produção
npm run start        # Servir build de produção
npm run lint         # Executar ESLint
```

---

## 📦 Dependências Principais

| Pacote | Versão | Uso |
|--------|--------|-----|
| next | ^15.1.6 | Framework React |
| react | ^19.0.0 | Biblioteca UI |
| typescript | 5.7.2 | Type safety |
| @tanstack/react-query | ^5.66.0 | Gerenciamento de estado assíncrono |
| groq-sdk | ^0.8.0 | Cliente para Groq API |
| tailwindcss | ^3.4.17 | CSS utility-first |
| lucide-react | ^0.469.0 | Ícones |
| sonner | ^1.7.3 | Toast notifications |

---

## 🚨 Regras de Negócio

- **Máximo de 2 interações** por ídolo (via contador)
- **Slider obrigatório** após cada eliminação
- **Bloqueio do último ídolo** (não pode ser eliminado)
- **Redirecionamento automático** para `/result` quando restar 1 ídolo
- **Tone persistence** em localStorage (idioma não)
- **Sessão temporária** (sem autenticação/persistência no backend)

---

## 🎨 Design System

Usa **shadcn/ui** com customizações:
- **Palette**: Burgundy/Maroon (primary: `#722f37`)
- **Font**: Poppins (300-700)
- **Radius**: 0.375rem (6px)
- **Dark mode**: Suportado via Tailwind

---

## 🧪 Testes

### Validação Manual
✅ Build sem erros TypeScript
✅ Mobile responsivo (375px+)
✅ Modais funcionam em mobile
✅ Slider obrigatório funciona
✅ Último ídolo é bloqueado
✅ Redirecionamento automático

---

## 📄 Documentação Adicional

- **[PRD.md](docs/PRD.md)** - Product Requirements Document
- **[TASKS.md](docs/TASKS.md)** - Breakdown completo de implementação (47 tasks)
- **[GUIA_PERSONALIZACAO.md](docs/GUIA_PERSONALIZACAO.md)** - Guia para usuários personalizarem
- **[CLAUDE.md](docs/CLAUDE.md)** - Guia de comportamento para IA

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto é fornecido como-está para fins educacionais e de autoconhecimento.

---

## 🙏 Agradecimentos

- **São Tomás de Aquino** - Inspiração filosófica
- **Groq** - API de IA super-rápida
- **shadcn/ui** - Design system components
- **Vercel** - Plataforma Next.js

---

## 📞 Suporte

Em caso de dúvidas ou problemas:
- Abra uma [Issue](https://github.com/your-repo/idols-drill/issues)
- Consulte a [documentação](docs/)

---

**Feito com ❤️ para autoconhecimento**
