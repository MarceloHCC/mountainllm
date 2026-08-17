# MountainLLM

Um canvas visual para organizar fluxos de produto, agentes e decisões técnicas.

## Usar

O MountainLLM é uma aplicação estática: abra `index.html` em seu navegador ou publique a pasta em qualquer hospedagem estática. Os dados do canvas ficam no navegador de cada pessoa.

## Recursos

- Caixas conectáveis, seleção múltipla, panorâmica e zoom
- Textos, tags, desenhos e imagens no canvas
- Desfazer/refazer e exclusão com confirmação
- Login opcional com GitHub, sem banco de dados

## Login com GitHub

O diretório [`worker`](worker/) contém a função Cloudflare responsável pelo callback OAuth. Antes de ativá-lo, configure a OAuth App e as variáveis descritas em [`worker/README.md`](worker/README.md). Nunca publique `GITHUB_CLIENT_SECRET`.

## Desenvolvimento

Não há dependências nem processo de build para a interface. Edite os arquivos e abra `index.html` novamente.

## Licença

Distribuído sob a [licença MIT](LICENSE).
