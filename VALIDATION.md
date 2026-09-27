# Verificação — 27 de setembro de 2026

15 grupos de verificações passaram, zero falhas, no navegador integrado Chromium. Executar `python -m http.server 8091` e abrir `tests/browser.html`. O armazenamento dos testes é isolado do progresso real.

- 60 lições únicas com conteúdo e quizzes válidos; 14 missões e 10 desafios executados.
- Quizzes incorretos sem XP; acerto, conclusão, missão e desafio sem duplicação. Máximo 2650 XP.
- Migração de estado v1: 1950 XP, favoritos, medalha original e desafio cívico anterior preservados.
- Estados disponível, em progresso, concluído e dominado; revisão sem XP adicional.
- Pesquisa por aliases e sem acentos; estados vazios; favoritos, última lição, menu e perfil persistentes.
- Dados inválidos e armazenamento bloqueado recuperáveis; reposição com confirmação.
- Menu móvel com Escape, foco devolvido e fundo inerte.
- Sem transbordo horizontal nas páginas principais, percurso cívico e cinco laboratórios a 1440, 1280, 1024, 768, 430 e 390 px.
- Cinco experiências operáveis por botões; limite de 100 euros, seleção dos grupos, sinais, elementos da notícia e rota segura.
- Nenhum erro JavaScript capturado durante os testes.

Revisão visual adicional: início desktop, mapa, percurso cívico e missão digital móvel. Fontes primárias visíveis e ligações complementares. A regra CSS de redução de movimento existe; não foi feita auditoria WCAG completa nem teste com leitores de ecrã reais. O conteúdo é educativo; as fontes de princípios não pretendem estabelecer regras universais de etiqueta.

Figma: 13 vistas SVG verificadas como XML válido e tokens fornecidos. São material de importação; não foi possível criar um ficheiro nativo ou protótipo na conta Figma por indisponibilidade das ferramentas.

## Homepage v2

17 grupos passaram, zero falhas. Além dos testes anteriores: dez objetos e destinos no hero, seleção única, alvos mínimos de 44 px, fontes locais, carregamento do SVG e ausência de transbordo a 1440, 1280, 768 e 390 px. Design nativo Figma criado e revisto. Spline aguarda autenticação do utilizador; publicação do fallback SVG expressamente autorizada.
