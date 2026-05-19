<div align="center">
  <img src="public/logo.svg" alt="Logo Brivan Sabor" width="300" />

# Brivan Sabor - E-commerce

![Status](https://img.shields.io/badge/Status-Em_Desenvolvimento-warning?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)

</div>

> Projeto desenvolvido com foco em demonstrar **engenharia de frontend avançada**, UX/UI de alto padrão (Luxury Design) e desenvolvimento focado em conversão para um negócio real de gastronomia.

---

## 🚀 Demo Online

[![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?style=for-the-badge&logo=vercel)](#)

👉 **Acesse a aplicação (Em breve):**
🔗 [#](#)

---

## 📋 Sobre o Projeto

A **Brivan Sabor** é uma empresa de gastronomia especializada em salgados artesanais, doces, tábuas de frios e buffet para eventos. Este e-commerce nasce com a missão de aproximar pessoas através da boa comida — facilitando pedidos por delivery ou retirada com uma experiência digital elegante, intuitiva e totalmente orientada à conversão.

O projeto foi construído do zero com uma estética **Luxury Design**: fundo escuro (`brand-black`), tipografia em dourado (`brand-gold`) e atenção obsessiva a cada detalhe visual, garantindo uma experiência impecável em dispositivos móveis.

---

## ✨ Funcionalidades

- 🛍️ **Catálogo por Categorias** — Navegação organizada entre salgados, doces, tábuas de frios e pacotes de buffet
- 🛒 **Sacola de Compras** — Carrinho flutuante com adição, remoção e controle de quantidade de itens
- 💬 **Integração com WhatsApp** — Envio direto do pedido formatado para o número do negócio via link dinâmico
- 📦 **Página de Produto** — Visualização detalhada de cada item com descrição, preço e opções de personalização
- 🎪 **Catering & Eventos** — Seção dedicada para contratação de buffet completo para eventos
- ✅ **Checkout Simplificado** — Formulário de finalização de pedido com validação e resumo do carrinho
- 🌙 **Design Mobile-First** — Interface otimizada prioritariamente para smartphones, com suporte a temas claro e escuro
- ⚡ **Performance Otimizada** — Imagens com lazy-load, Server Components e carregamento progressivo

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Função |
|---|---|
| **Next.js 16 (App Router)** | Framework principal, roteamento e Server/Client Components |
| **React 19** | Biblioteca de UI e gerenciamento de estado local |
| **TypeScript (strict)** | Tipagem estática e segurança de código |
| **Tailwind CSS v4** | Estilização utilitária com design system customizado |
| **shadcn/ui** | Componentes de UI acessíveis e altamente customizáveis |
| **Framer Motion** | Animações de entrada, saída e transições de página |
| **pnpm** | Gerenciador de pacotes eficiente e rápido |

---

## 🧩 Destaques Técnicos

- **Refatoração Figma → Next.js** — Todo o código foi refatorado a partir de exportações do Figma para uma arquitetura limpa e componentizada, respeitando a separação entre Server e Client Components do App Router
- **Mobile-First & Otimização de Imagens** — Uso exclusivo do componente `<Image />` do Next.js com `remotePatterns`, lazy-loading e `fill` + `object-cover` para carregamento ultra-rápido em conexões móveis
- **Arquitetura de Componentes** — Cada componente em arquivo próprio, separados por domínio (`home/`, `layout/`, `ui/`), com props tipadas via `type` e zero uso de `any`
- **Regras de Linting Severas** — ESLint com `eslint-config-next`, proibição de tags `<img>` e `<button>` nativas, import aliases `@/` obrigatórios e convenções de nomenclatura rígidas
- **Design System com Variáveis CSS** — Todas as cores definidas como variáveis CSS em `globals.css`, sem nenhum valor hexadecimal ou RGB hard-coded no JSX
- **Código em inglês, interface em pt-BR** — Separação rigorosa entre o idioma do código-fonte (inglês) e o idioma da interface para o usuário final (português)

---

## 📁 Estrutura do Projeto

```
brivan-sabor/
├── app/                        # Rotas do App Router
│   ├── about/
│   │   └── page.tsx
│   ├── cart/
│   │   └── page.tsx
│   ├── category/
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── catering/
│   │   └── page.tsx
│   ├── checkout/
│   │   └── page.tsx
│   ├── product/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── home/                   # Componentes da página inicial
│   │   ├── featured-products.tsx
│   │   └── hero-section.tsx
│   ├── layout/                 # Componentes estruturais
│   │   ├── footer.tsx
│   │   └── navbar.tsx
│   └── ui/                     # Componentes shadcn/ui
│       └── button.tsx
├── lib/
│   ├── data.ts                 # Dados do catálogo de produtos
│   └── utils.ts                # Helpers e utilitários
├── public/                     # Assets estáticos (logo, imagens)
├── tasks/                      # Tarefas de desenvolvimento
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Como Executar o Projeto

```bash
# Clone o repositório
git clone https://github.com/GLemes25/brivan-sabor.git

# Acesse a pasta
cd brivan-sabor

# Instale as dependências
pnpm install

# Rodar projeto localmente
pnpm dev
```

> Acesse http://localhost:3000 para visualizar a aplicação.

---

### 👤 Autor

## Gabriel Lemes de Oliveira

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/gabriel-lemes-G25)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:gabriellemes924@gmail.com)
[![Whatsapp](https://img.shields.io/badge/Whatsapp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/5567991179190)
