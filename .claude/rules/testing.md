# Regras de Testes Unitários

## Stack

- O projeto adota **Vitest** como test runner e **React Testing Library** para testes de componentes.

## Escopo dos Testes

- Testes unitários devem focar em **regras de negócio**:
  - Validações de esquemas Zod.
  - Funções utilitárias (`src/lib`).
  - Cálculos (preços, totais, descontos, etc.).
- Server Actions devem ser testadas de forma **isolada**, sem depender de infraestrutura real (banco de dados, rede).

## Testabilidade

- Escreva funções pensando na facilidade de criação de **mocks**:
  - Prefira receber dependências como parâmetros (ver [[functional-solid]] — DIP) em vez de importar instâncias globais diretamente dentro da função testada.
  - Evite efeitos colaterais escondidos; funções devem ser previsíveis a partir de suas entradas.
