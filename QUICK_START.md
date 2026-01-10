# Quick Start Guide

## Início Rápido (5 minutos)

### 1. Instalação
```bash
cd c:/projetos/designapp
npm install
```

### 2. Executar o Styleguide
```bash
npm run dev
```

Acesse: http://localhost:3000 (redireciona automaticamente para /styleguide)

### 3. Ver os Componentes
O styleguide mostra todos os componentes disponíveis com exemplos de código.

## Usar em Outro Projeto

### Opção A: Projeto Novo (Recomendado)
1. Copie toda a pasta `designapp` para o local desejado
2. Renomeie a pasta
3. Execute `npm install`
4. Comece a desenvolver!

### Opção B: Integrar em Projeto Existente

#### Passo 1: Copiar Arquivos Essenciais
```bash
# Do seu projeto existente, execute:

# Copiar componentes
cp -r /caminho/para/designapp/components ./

# Copiar utilitários
cp -r /caminho/para/designapp/lib ./

# Copiar design tokens
cp /caminho/para/designapp/app/globals.css ./app/
# (ou para onde você guarda seus estilos globais)
```

#### Passo 2: Configurar Tailwind
Copie as configurações do `tailwind.config.ts`:
- Cores customizadas
- Border radius
- Extensões do theme

#### Passo 3: Instalar Dependências
```bash
npm install @radix-ui/react-label @radix-ui/react-radio-group @radix-ui/react-slot class-variance-authority clsx lucide-react tailwind-merge
```

#### Passo 4: Importar no Layout
```tsx
// app/layout.tsx ou _app.tsx
import "./globals.css"
```

## Estrutura do Projeto

```
designapp/
├── app/
│   ├── globals.css          # Design tokens (cores, fontes, sombras)
│   ├── layout.tsx            # Layout raiz
│   ├── page.tsx              # Redireciona para /styleguide
│   └── styleguide/           # Documentação interativa
│       ├── layout.tsx
│       ├── navigation.ts
│       └── page.tsx
├── components/
│   └── ui/                   # Componentes UI reutilizáveis
│       ├── alert.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── label.tsx
│       └── radio-group.tsx
├── lib/
│   └── utils.ts              # Utilitário cn() para classes
├── docs/
│   └── prompt_design/        # Documentação do processo
├── tailwind.config.ts        # Configuração do Tailwind
├── tsconfig.json             # Configuração TypeScript
├── package.json              # Dependências
└── README.md                 # Documentação completa
```

## Componentes Disponíveis

### Alert
Mensagens informativas com variantes:
- `default` - Informação geral
- `destructive` - Erros e avisos críticos

### Badge
Indicadores de status:
- `default`, `secondary`, `destructive`, `outline`
- `success`, `warning`, `info` (cores semânticas)

### Button
Botões interativos:
- Variantes: `default`, `destructive`, `outline`, `secondary`, `ghost`, `link`
- Tamanhos: `default`, `sm`, `lg`, `icon`

### Card
Container com seções:
- `Card` (wrapper)
- `CardHeader`, `CardTitle`, `CardDescription`
- `CardContent`
- `CardFooter`

### Label
Labels de formulário acessíveis

### RadioGroup
Grupos de radio buttons acessíveis

## Personalização

### Mudar Cores
Edite `app/globals.css`:
```css
:root {
  --primary: oklch(0.4650 0.1470 24.9381);  /* Sua cor aqui */
  /* ... */
}
```

### Adicionar Componente
1. Crie em `components/ui/seu-componente.tsx`
2. Use o padrão CVA (class-variance-authority)
3. Adicione exemplo no styleguide

### Mudar Fontes
1. Importe no `app/layout.tsx`
2. Atualize variáveis em `globals.css`

## Próximos Passos

1. Explore o styleguide: `npm run dev`
2. Leia a documentação em `/docs/prompt_design/`
3. Customize as cores e tipografia
4. Adicione seus próprios componentes
5. Use em produção!

## Suporte

- Veja exemplos no styleguide: http://localhost:3000/styleguide
- Documentação completa: `README.md`
- Processo de design: `docs/prompt_design/`

## Tecnologias

- Next.js 16 (App Router)
- TailwindCSS 3.4
- Radix UI (componentes acessíveis)
- TypeScript 5.9
- Lucide Icons

---

**Pronto para usar!** 🚀
