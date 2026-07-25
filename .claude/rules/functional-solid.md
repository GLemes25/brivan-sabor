# Regras de SOLID Funcional

O projeto é **estritamente funcional**. Os princípios SOLID abaixo são adaptados para este paradigma.

## Proibições

- **PROIBIDO** o uso de Orientação a Objetos: nada de `class`, herança (`extends`) ou construtores.
- Prefira funções, tipos e composição no lugar de instâncias e métodos.

## SRP — Responsabilidade Única

- Funções devem ser puras e pequenas, fazendo apenas uma coisa.
- Separação estrita entre:
  - **Server Actions**: responsáveis apenas por acesso a dados/lógica de negócio.
  - **UI (Client/Server Components)**: responsável apenas por renderização e interação.
- Uma Server Action nunca deve conter lógica de apresentação; um componente nunca deve conter acesso direto a dados.

## OCP — Aberto/Fechado

- Estenda comportamento via **composição de funções** (Higher-Order Functions), não via modificação de função existente.
- No React, utilize a prop `children` para permitir extensão/composição de componentes sem alterar seu código interno.

## LSP — Substituição

- Utilize tipagem forte em TypeScript com `type` ou `interface` para garantir que implementações alternativas (mocks, variantes) sejam substituíveis sem quebrar contratos.

## ISP — Segregação de Interfaces

- Tipos devem ser granulares. Componentes e funções devem receber **apenas** as propriedades que efetivamente utilizam.
- Exemplo: em vez de receber um objeto `User` inteiro, receba apenas `name` ou `role` quando for só isso que a função/componente precisa.

## DIP — Inversão de Dependência

- Dependências (instâncias de banco, fetchers, clientes externos) devem ser passadas como **parâmetros de função** (Dependency Injection baseada em parâmetros), nunca importadas/instanciadas diretamente dentro da lógica de negócio quando isso dificultar testes.
