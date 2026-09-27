# A Literacia

**Aprender para decidir melhor.** Site educativo em português europeu, estático e sem dependências de execução.

Site: https://CMiguel06.github.io/a-literacia/

## O que inclui

- 10 literacias e 60 lições; Cívica expandida para 12 categorias e 24 lições.
- Explicações, exemplos, prática, quiz e atividade em cada lição.
- 14 missões, cinco experiências visuais interativas e 10 desafios finais (desbloqueados ao concluir as lições da área).
- XP atribuído uma única vez por atividade: lição 20, quiz 10, missão 25, desafio 50.
- Níveis, conquistas, pesquisa com acentos normalizados e aliases, favoritos e última lição.
- Menu recolhível no computador e drawer com teclado e foco no telemóvel.
- Progresso e preferências guardados no localStorage; sem conta, backend, rastreadores ou sincronização.

## Abrir e publicar

Abre `index.html` diretamente no navegador, ou executa `python -m http.server 8091` na pasta e visita `http://localhost:8091`.

No GitHub: **Settings → Pages → Deploy from a branch → main → / (root)**. O ficheiro `.nojekyll` permite servir diretamente os ficheiros estáticos. Todas as ligações internas são relativas; as rotas usam ficheiros HTML e query parameters.

## Estrutura e manutenção

- `css/styles.css` e `css/learning.css`: estilos base, nova identidade e responsividade.
- `js/learning-ui.js`: mapa, percursos, emblemas e fontes.
- `js/experiences.js`: cinco laboratórios acessíveis por botões e arrastar.
- `design/`: tokens, 13 vistas SVG importáveis e guia Figma.
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

Cada literacia contém `categories[].lessons[]`, `mission`, `missions[]`, `challenge` e `sources`. IDs devem ser únicos. As perguntas têm `answers`, `correct` (índice começando em zero) e `explanation`. Não mudes IDs de lições publicadas sem considerar o progresso existente.

O perfil de explicação é guardado, mas a adaptação por idade está preparada apenas na estrutura `variants`, conforme a especificação permite para o MVP. O mapa de conteúdos completo encontra-se nos Markdown; esta versão inclui 60 lições e a expansão cívica do segundo ZIP.

Os exemplos são educativos, não aconselhamento financeiro, médico ou jurídico individual. A área cívica mantém neutralidade partidária; a segurança privilegia prevenção, afastamento e ajuda. Fontes oficiais estão disponíveis em cada literacia e lição.

## Privacidade e limitações

Limpar o armazenamento do navegador remove o progresso. Navegação privada ou bloqueio do armazenamento pode impedir persistência. O site continua a funcionar em memória nessa sessão e avisa quando uma gravação falha. O alojamento pode manter registos de acesso conforme a política do GitHub.

Não há serviços pagos, bibliotecas remotas, fontes externas ou build necessário para publicar. Node.js é apenas uma ferramenta opcional para manutenção dos dados e geração das páginas.

## Atualização visual de setembro de 2026

Mapa de literacias, percursos com cinco estados, identidade temática, fontes em destaque, microinterações e redução de movimento. A chave de armazenamento e todos os IDs anteriores foram preservados. O máximo atual é 2650 XP; dominar uma lição por revisão não duplica XP. A conquista das 40 lições originais mantém-se.

Para recriar o conteúdo a partir dos geradores, executa `node scripts/content.mjs` e depois `node scripts/expand-civic.mjs`. Isto substitui edições diretas ao JSON; para essas edições usa apenas `node scripts/sync-data.mjs`.

A expansão e os requisitos de redesign estão em `specifications/redesign/`. Consulta `VALIDATION.md` para os testes.

## Homepage v2 — mundos de conhecimento

A homepage usa composição editorial, hero SVG interativo e progresso integrado. Ver `design/home-v2/README.md` para a primeira versão do [Figma nativo](https://www.figma.com/design/PiJNAacPxKxfxOiHNYcpSt).

## Plataforma modular

As páginas interiores partilham agora as fontes e a identidade editorial. `js/modular.js` e `css/modular.css` acrescentam menu dinâmico com fixação, dez cenários SVG e ligações SVG nos percursos. `js/rive-motion.js` carrega o Rive local apenas após interação relevante; o feedback textual e estático funciona sem o runtime. As animações e os ícones originais estão em `assets/motion/feedback.riv`; a fonte editável está em `design/rive-feedback/`.

Consulta [o estado dos módulos](design/MODULAR-STATUS.md) para o Figma atualizado, reprodução, validação e a dependência Spline ainda pendente de autenticação.
