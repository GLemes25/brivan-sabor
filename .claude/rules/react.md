# Regras de React, Next.js e UI

## Componentização

- **Sintaxe:** **SEMPRE** utilize _arrow functions_ para a criação de componentes React.
- **Isolamento:** **NUNCA** crie mais de um componente no mesmo arquivo. Cada componente deve ter seu próprio arquivo exclusivo.

## Sistema de UI (shadcn/ui)

- **Prioridade Máxima:** Use os componentes da biblioteca shadcn/ui o máximo possível para construir a interface. Consulte https://ui.shadcn.com/.
- **Verificação Prévia:** Antes de criar um novo componente do zero, **SEMPRE** use o _Context7_ (sua ferramenta de contexto) para verificar se já existe um componente correspondente no shadcn/ui. Se existir, instale-o e use-o.
- **Instalação:** Instale componentes shadcn com `pnpm dlx shadcn@latest add <componente>`. Após instalar, verifique se todas as dependências peer foram adicionadas ao `package.json`; se faltar alguma (ex: `class-variance-authority`), instale manualmente com `pnpm add <dependência>`.
- **Versão Atual:** O `button.tsx` gerado pelo shadcn mais recente **não usa** `React.forwardRef` (removido no React 19) e declara props com `type`, não `interface`. Se o arquivo gerado usar o padrão antigo, atualize-o para o padrão atual antes de usar.
- **Botões:** **SEMPRE** use o componente `Button` do shadcn/ui (`@/components/ui/button`). **NUNCA** utilize a tag `<button>` nativa do HTML diretamente.
- **Links estilizados como botão:** Use `<Button asChild>` com `<Link href="...">` interno. **NUNCA** estilize uma tag `<a>` ou `<Link>` manualmente como botão.
- **Páginas e Layouts:** **SEMPRE** verifique os componentes base disponíveis em `@components/ui/page.tsx` para garantir a reutilização da estrutura de página.

## Imagens

- **NUNCA** use a tag `<img>` nativa do HTML. **SEMPRE** use o componente `<Image />` do Next.js (`next/image`).
- Para imagens de fundo que preenchem um container de altura definida, use `fill` + `className="object-cover"` e adicione `position: relative` ao container pai.
- Para imagens com dimensões fixas conhecidas, use as props `width` e `height` explícitas.
- Domínios externos (ex: `images.unsplash.com`) devem estar declarados em `remotePatterns` no `next.config.ts`.

## Estilização (Tailwind CSS)

- **Cores do Tema:** **NUNCA** use cores hard-coded do Tailwind (como `text-white`, `bg-black`, `border-[#f1f1f1]`, `bg-[#2b54ff]`, etc.).
- **SEMPRE** utilize as variáveis de cor do tema definidas no seu `@app/globals.css` (exemplos: `text-background`, `bg-foreground`, `bg-primary`, `text-primary-foreground`, `border-border`).
- **Novas Variáveis:** Caso a cor necessária não exista, crie uma nova variável CSS em `@app/globals.css` seguindo o padrão já existente. Porém, antes de criar, **SEMPRE** leia a documentação do shadcn/ui sobre _theming_ para confirmar se é realmente necessário.

## Formulários e Validação

- **Stack Obrigatória:** **SEMPRE** construa formulários utilizando `React Hook Form` em conjunto com `Zod` para validação de esquemas.
- **Componente Base:** **SEMPRE** utilize o componente wrapper `@components/ui/form.tsx` do shadcn para montar e estruturar os campos dos formulários.
