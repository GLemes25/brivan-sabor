# Regras de Git Workflow e Ambientes

## Proteção da Branch `main`

- **NUNCA** faça commits diretos na branch `main`.
- A `main` reflete **estritamente** o que está em produção no Vercel. Qualquer alteração direta nela é considerada uma falha crítica de processo.

## Branch de Desenvolvimento

- Todo o desenvolvimento deve ocorrer na branch `dev` ou em branches de feature originadas a partir dela:
  - `feat/<nome-da-feature>` para novas funcionalidades.
  - `fix/<nome-da-correção>` para correções de bugs.
- Ao finalizar uma feature/fix, faça o merge de volta para `dev` antes de promover para `main`.

## Deploy

- O deploy para produção (`main`) é feito **exclusivamente** via Merge Request / Pull Request da `dev` para a `main`.
- Nenhum push direto para `main` é permitido, mesmo em situações de urgência — abra o PR.

## Variáveis de Ambiente e Banco de Dados

- O ambiente local (branch `dev`) **DEVE** utilizar sua própria string de conexão do Neon DB no `.env`, separada da string usada em produção.
- Nunca aponte o ambiente de desenvolvimento para o banco de produção.
- Nunca faça commit do arquivo `.env` com credenciais reais.
