# A Literacia

**Aprender para decidir melhor.** Site educativo em português europeu, estático e sem dependências de execução.

Site: https://CMiguel06.github.io/a-literacia/

## O que inclui

- 10 literacias, 2 categorias por literacia e 2 lições por categoria (40 lições).
- Explicações, exemplos, prática, quiz e atividade em cada lição.
- 10 missões e 10 desafios finais (desbloqueados ao concluir as lições da área).
- XP atribuído uma única vez por atividade: lição 20, quiz 10, missão 25, desafio 50.
- Níveis, conquistas, pesquisa com acentos normalizados e aliases, favoritos e última lição.
- Menu recolhível no computador e drawer com teclado e foco no telemóvel.
- Progresso e preferências guardados no localStorage; sem conta, backend, rastreadores ou sincronização.

## Abrir e publicar

Abre `index.html` diretamente no navegador, ou executa `python -m http.server 8091` na pasta e visita `http://localhost:8091`.

No GitHub: **Settings → Pages → Deploy from a branch → main → / (root)**. O ficheiro `.nojekyll` permite servir diretamente os ficheiros estáticos. Todas as ligações internas são relativas; as rotas usam ficheiros HTML e query parameters.

## Estrutura e manutenção

- `css/styles.css`: identidade visual e responsividade.
- `js/app.js`: interface, páginas, pesquisa, menu e navegação.
- `js/storage.js`: persistência e recuperação de dados inválidos.
- `js/progress.js`: XP, níveis e conquistas.
- `js/quiz.js`: interação e feedback dos quizzes.
- `data/literacies.json`: conteúdo estruturado e fontes.
- `data/literacies.js`: cópia para abrir o site sem servidor local.
- `scripts/content.mjs`: conteúdo editorial inicial; gera JSON e o script de dados (`node scripts/content.mjs`).
- `scripts/pages.mjs`: gera as páginas HTML de entrada (`node scripts/pages.mjs`).
- `scripts/sync-data.mjs`: atualiza o script a partir do JSON, depois de editar `data/literacies.json`.
- `specifications/`: os nove Markdown originais fornecidos no ZIP.

Para adicionar conteúdo, edita o JSON e executa `node scripts/sync-data.mjs`. Não voltes a executar `content.mjs` depois de edições diretas ao JSON: esse script recria o conteúdo inicial. Para manter uma única fonte editorial, podes optar por editar o gerador em vez do JSON.

Cada literacia contém `categories[].lessons[]`, `mission`, `challenge` e `sources`. IDs devem ser únicos. As perguntas têm `answers`, `correct` (índice começando em zero) e `explanation`. Não mudes IDs de lições publicadas sem considerar o progresso existente.

O perfil de explicação é guardado, mas a adaptação por idade está preparada apenas na estrutura `variants`, conforme a especificação permite para o MVP. O mapa de conteúdos completo encontra-se nos Markdown; a primeira versão implementa o âmbito inicial de 40 lições, não centenas de temas.

Os exemplos são educativos, não aconselhamento financeiro, médico ou jurídico individual. A área cívica mantém neutralidade partidária; a segurança privilegia prevenção, afastamento e ajuda. Fontes oficiais estão disponíveis em cada literacia e lição.

## Privacidade e limitações

Limpar o armazenamento do navegador remove o progresso. Navegação privada ou bloqueio do armazenamento pode impedir persistência. O site continua a funcionar em memória nessa sessão e avisa quando uma gravação falha. O alojamento pode manter registos de acesso conforme a política do GitHub.

Não há serviços pagos, bibliotecas remotas, fontes externas ou build necessário para publicar. Node.js é apenas uma ferramenta opcional para manutenção dos dados e geração das páginas.
