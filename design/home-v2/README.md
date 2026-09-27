# Homepage v2 — Conhecimento como um mundo a explorar

Figma nativo: https://www.figma.com/design/PiJNAacPxKxfxOiHNYcpSt

Quatro vistas: 1440 (`2:22`), 1280 (`3:328`), 768 (`3:560`) e 390 (`3:760`). Contêm as dez literacias, tipografia Fraunces / IBM Plex Sans / IBM Plex Mono, componentes de navegação, ação e mundos, estados Default/Hover/Focus e ligações de protótipo. As vistas registam a direção visual; o comportamento final está na homepage HTML.

Fundações: coleções Primitives v2 e Homepage v2, 14 variáveis de cor, modo único, aliases e sintaxe CSS. Estilos v2/Display, v2/Section, v2/Body e v2/Technical. Cores principais: papel #F6F4EC, tinta #183B37, texto secundário #51655E, linha #D7DED0, folha #BCE8C5, ouro #EDBB55. As cores temáticas são decorativas; os textos mantêm contraste escuro.

## Âmbito

Apenas a homepage recebeu esta direção visual. As restantes páginas, dados, IDs, lições, quizzes, XP e armazenamento mantêm-se. O novo módulo e CSS são carregados apenas no index.

## Fallback autorizado

O utilizador autorizou expressamente avançar com Figma e SVG enquanto trata da autenticação Spline. A versão atual usa SVG original com profundidade ilustrada: livro aberto sobre ilha central e dez objetos. Hover e foco realçam o objeto, reduzem a intensidade dos outros e apresentam nome, descrição e ligação. O clique ou toque fixa a seleção. Teclado funciona com Tab/Enter; Escape limpa a seleção visual. Reduced-motion remove os movimentos decorativos. Nenhuma informação depende de WebGL.

Não existe ainda cena Spline nem ficheiro Rive integrado. Não foi incluído um URL fictício nem uma biblioteca sem asset. Após autenticação, criar o hero no Spline com esta composição, integrar com carregamento diferido e conservar o SVG para falhas, dispositivos limitados e reduced-motion. Rive fica reservado a microanimações futuras, conforme o âmbito aprovado.

## Assets e performance

`assets/worlds/`: onze ilustrações temáticas/livro e composição completa em SVG. `assets/fonts/`: quatro WOFF2 locais, cerca de 98 KB no total, subconjunto latino com acentos portugueses e licenças OFL. `art.json` conserva as formas originais. Não há serviço de fontes externo em execução.

## Validação

17 grupos de testes passaram, zero falhas. Incluem todas as 60 lições, 14 missões, 10 desafios, migração dos 1950 XP anteriores, favoritos, menu, armazenamento indisponível, pesquisa e cinco laboratórios. As novas verificações cobrem dez objetos, seleção única, destinos, descrições, ausência de XP por exploração, imagem fallback, fonte display, alvos mínimos de 44 px e layout a 1440/1280/768/390. A bateria geral também cobre 1024 e 430. Contraste dos textos principais e secundários calculado sobre o papel; não equivale a auditoria WCAG completa.
