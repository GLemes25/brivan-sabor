# Regras de TypeScript

## Tipagem Estrita (CRÍTICO)

- **Proibição do `any`:** É terminantemente proibido o uso de `any` — tanto implícito quanto explícito. Se o tipo for dinâmico e exigir validação em runtime, use `unknown` com type narrowing.
- **Tipagem de Parâmetros:** Todos os parâmetros de funções e Server Actions **DEVEM** ter tipos explícitos. Nunca deixe um parâmetro sem anotação de tipo.
- **Reaproveitamento do Prisma/Zod:** Ao manipular dados do banco, importe os tipos gerados pelo Prisma (`import { Product, Order } from '@/lib/generated/prisma/client'`) ou infira do Zod (`z.infer<typeof schema>`). **NUNCA** recrie manualmente interfaces que espelham a estrutura do banco.
- **Tipagem de Componentes Funcionais:** Props de componentes devem ser definidas como `type` (não `interface`) e passadas explicitamente ao componente.
- **Modo Estrito:** O projeto DEVE operar sempre com `"strict": true` no `tsconfig.json`. Nunca desabilite esta opção.

## Tipagem Geral

- **Obrigatório:** Todo o código do projeto deve ser escrito em TypeScript.
- **Declaração de Tipos:** **SEMPRE** utilize `type` no lugar de `interface` para declaração de tipos e tipagem de props.

## Nomenclatura de Variáveis

- Use nomes de variáveis altamente descritivos que deixem claro o contexto e o tipo de dado.
- Todos os nomes de variáveis devem ser em Inglês US.
- Para booleanos, sempre utilize prefixos semânticos (exemplos: `isLoading`, `hasError`, `isSubmitting`, `canEdit`).
