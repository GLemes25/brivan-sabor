# Regras de Workflow de Deploy

**NUNCA faça commit diretamente na main. A main é exclusiva para produção. Após qualquer merge na main, você DEVE retornar imediatamente para a branch dev.**

Esta regra complementa [[git-workflow]]: o único caminho permitido para levar código da `dev` até a `main` é via Pull Request revisado no GitHub — nunca via merge, push ou pull direto local que contorne o PR.

Merge do PR aprovado via `gh pr merge` (ou pelo botão de merge do GitHub) é permitido, pois ainda passa pelo fluxo de Pull Request. O que é proibido é qualquer atalho que leve código para `main` sem um PR: push direto, pull direto, ou merge local seguido de push.
