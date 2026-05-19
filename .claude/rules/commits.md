# Regras e Automação de Commits do Git

Você é responsável por analisar as alterações em _stage_ (ou adicioná-las) e criar automaticamente os commits do Git para este repositório. Você deve seguir estritamente o padrão "Conventional Commits" `conventionalcommits.org` e as regras de formatação específicas descritas abaixo.

## 1. Tipos de Commit Permitidos

Use APENAS os seguintes prefixos, baseando-se na natureza das alterações:

- **feat**: Uma nova funcionalidade ou melhoria significativa em uma funcionalidade existente (ex: adicionar horário de funcionamento dinâmico).
- **fix**: Uma correção de bug.
- **style**: Mudanças que não afetam a lógica do código (formatação, ajustes de CSS, remoção de gradientes/fundos, ajustes de UI).
- **refactor**: Uma alteração de código que não corrige um bug nem adiciona uma funcionalidade (ex: simplificar a lógica de um componente, atualizar regras).
- **chore**: Atualização de dependências, tarefas de build ou configurações de ferramentas.
- **docs**: Mudanças apenas na documentação.

## 2. Regras de Formatação

- **Idioma**: TODAS as mensagens de commit DEVEM ser escritas em Inglês.
- **Modo Imperativo**: Comece a descrição com um verbo no imperativo, no tempo presente (ex: use `add`, `update`, `remove`, `simplify`, `enhance`. NUNCA use `added`, `adds` ou `updating`).
- **Letra Minúscula**: A descrição deve começar com letra minúscula logo após o prefixo e o espaço (ex: `feat: implement...`).
- **Sem Pontuação**: Não coloque ponto final (`.`) no final da mensagem de commit.
- **Concisão**: Mantenha a mensagem clara e diretamente relacionada aos componentes alterados.

## 3. Exemplos de Referência

Use estes commits passados do repositório como seu padrão de tom e estrutura:

- `feat: enhance CategoryPage to support dynamic links`
- `style: update WhatsAppButton to remove primary color background`
- `refactor: simplify Indications component logic`
- `feat: add business hours and open status logic`
- `refactor: update rules to claude code`
- `style: remove gradient color to match minimalist design`

## 4. Arquivo de Task

Sempre que existir um arquivo de task correspondente ao trabalho realizado (ex: `tasks/03.md`), ele **deve** ser incluído no mesmo commit. Adicione-o ao stage junto com os demais arquivos antes de commitar.

## 5. Quando Criar Commits

- **NUNCA** crie um commit automaticamente ao terminar uma tarefa de desenvolvimento.
- **SOMENTE** crie commits quando o usuário pedir explicitamente (ex: "faça o commit", "commita", "pode commitar").
- Ao criar commits, inclua **TODOS** os arquivos modificados/criados, incluindo arquivos `.md`, `.gitignore`, arquivos de configuração e arquivos de task em `tasks/`.
- Se as alterações cobrirem **assuntos diferentes**, separe em commits distintos, um por assunto.

## 6. Fluxo de Execução

1. Analise os arquivos modificados e identifique os diferentes assuntos presentes.
2. Agrupe os arquivos por assunto e crie um commit separado para cada grupo.
3. Para cada grupo, verifique se há um arquivo de task em `tasks/` relacionado e inclua-o no stage.
4. Gere a mensagem de commit apropriada em inglês e execute `git commit -m "<mensagem>"`.
5. Exiba uma breve confirmação de sucesso com a mensagem commitada.
