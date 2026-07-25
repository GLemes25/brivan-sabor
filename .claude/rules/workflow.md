# Regras de Workflow de Deploy

**NUNCA faça commit diretamente na main. A main é exclusiva para produção. Após qualquer merge na main, você DEVE retornar imediatamente para a branch dev.**

Esta regra complementa [[git-workflow]]: o único caminho permitido para levar código da `dev` até a `main` é via Pull Request revisado no GitHub — nunca via merge ou push direto local.
