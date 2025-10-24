# MIRA WebApp

Landing page moderna para o MIRA construída com Next.js, Shadcn/UI, TypeScript e Tailwind CSS.

## 🚀 Tecnologias

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Shadcn/UI** - Componentes UI modernos e acessíveis

## ✨ Características da Landing Page

- **Design Responsivo** - Otimizada para todos os dispositivos
- **Animações Suaves** - Transições e efeitos visuais elegantes
- **Modo Escuro** - Suporte completo para tema escuro/claro
- **Performance** - Otimizada para velocidade e SEO
- **Acessibilidade** - Componentes acessíveis por padrão

## 📦 Instalação

As dependências já foram instaladas durante a configuração inicial.

## 🏃‍♂️ Como executar

```bash
# Entrar no diretório do projeto
cd mira-webapp

# Executar em modo de desenvolvimento
npm run dev
```

O projeto estará disponível em [http://localhost:3000](http://localhost:3000)

## 🎨 Componentes disponíveis

Os seguintes componentes do Shadcn/UI já estão instalados:

- `Button` - Botões interativos
- `Card` - Cartões de conteúdo
- `Input` - Campos de entrada
- `Label` - Rótulos para formulários
- `Badge` - Etiquetas e marcadores
- `Separator` - Separadores visuais

## 🖼️ Assets

- **Logo MIRA** - Localizado em `/public/images/Logo MIRA.webp`
- **Ícones SVG** - Ícones do Next.js e Vercel incluídos

## 📁 Estrutura do projeto

```
mira-webapp/
├── public/
│   └── images/
│       └── Logo MIRA.webp
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx (Landing Page)
│   ├── components/
│   │   └── ui/
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       ├── badge.tsx
│   │       └── separator.tsx
│   └── lib/
│       └── utils.ts
├── components.json
├── next.config.ts
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🎯 Seções da Landing Page

1. **Header** - Navegação com logo MIRA
2. **Hero Section** - Apresentação principal com CTA
3. **Features** - Recursos e funcionalidades principais
4. **Call to Action** - Seção de conversão
5. **Footer** - Links e informações da empresa

## 🔧 Comandos disponíveis

```bash
npm run dev      # Executar em desenvolvimento
npm run build    # Criar build de produção
npm run start    # Executar build de produção
npm run lint     # Executar linter
```

## 🎨 Customização

### Cores e Tema

O projeto usa o sistema de cores do Shadcn/UI com suporte a modo escuro. Para personalizar:

1. Edite as variáveis CSS em `src/app/globals.css`
2. Modifique o arquivo `tailwind.config.ts` para cores personalizadas

### Conteúdo

Para alterar o conteúdo da landing page, edite o arquivo `src/app/page.tsx`.

## 📚 Próximos passos

Para adicionar mais componentes do Shadcn/UI:

```bash
npx shadcn@latest add [component-name]
```

Componentes recomendados para expansão:

- `dialog` - Modais e diálogos
- `form` - Formulários com validação
- `navigation-menu` - Menus de navegação avançados
- `toast` - Sistema de notificações
- `accordion` - Seções expansíveis
- `tabs` - Navegação por abas
