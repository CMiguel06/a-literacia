# Verificação da primeira versão

Verificada em 27 de setembro de 2026 no navegador Chromium integrado.

## Testes funcionais

As 12 verificações agrupadas em `tests/browser.html` passaram, sem erros JavaScript. O teste usa armazenamento simulado isolado e não apaga o progresso de visitantes.

- 10 literacias, 20 categorias, 40 lições e IDs únicos.
- Pesquisa por título, descrição, palavras-chave e aliases, incluindo normalização de acentos e estados vazios.
- Resposta incorreta sem XP; resposta correta com 10 XP; conclusão com 20 XP; repetição sem duplicação.
- Favoritos, última lição, preferência de menu e perfil preservados entre carregamentos.
- Missões com 25 XP e desafios com 50 XP, atribuídos uma única vez; acesso ao desafio condicionado à conclusão das lições da área.
- Abertura e conclusão das 40 lições, das 10 missões e dos 10 desafios; total de 1950 XP e 100% de progresso.
- Recuperação de dados locais corrompidos e de IDs de rota inexistentes.
- Aprendizagem em memória quando o navegador bloqueia o armazenamento, com aviso visível.
- Menu móvel com Escape, foco devolvido ao botão e conteúdo de fundo isolado.
- Ausência de transbordo horizontal nas páginas principais a **1440, 1024, 768 e 390 px**.
- Ausência de erros JavaScript durante as verificações.
- Reposição com confirmação e cancelamento.

Revisão visual da página inicial em computador e telemóvel de 390 px. JavaScript validado também com `node --check`.

## Repetir

Executa `python -m http.server 8091` na pasta do projeto e abre `http://127.0.0.1:8091/tests/browser.html`.

Os testes são executados num iframe do próprio site. Usam dados em memória, sem alterações ao localStorage real do utilizador. Não requerem dependências ou serviços externos.

## Âmbito

O conteúdo corresponde ao MVP pedido: duas categorias e duas lições por categoria. Os restantes temas do mapa editorial original são possibilidades de expansão. As variantes por idade estão preparadas no modelo, mas ainda não têm texto diferenciado. A revisão é funcional e visual; não constitui uma auditoria formal de acessibilidade nem aconselhamento profissional.
