# A Literacia — implementação modular

Pedido: `A_Literacia_Modular_Prompts.zip`, setembro de 2026.

## Entregue

- Homepage editorial com livro central e dez objetos selecionáveis por rato, toque e teclado; missão recomendada e conquista recente.
- Sidebar: preferência de recolha existente preservada; fixação persistente; ocultação na descida e revelação na subida; botão de revelação acessível; gaveta mobile com foco contido. A ocultação mantém a largura de leitura estável.
- Dez cenários SVG originais, com contexto visual próprio, associados às páginas das literacias. Fontes locais Fraunces / IBM Plex Sans / IBM Plex Mono.
- Percursos com nós HTML e curvas SVG recalculadas por ResizeObserver. Alternância desktop e coluna vertical mobile. Estados com símbolo, cor e texto; o desafio mantém as regras de desbloqueio existentes.
- Rive nativo: `assets/motion/feedback.riv`, 21 artboards, 7 timelines por artboard, sem scripts ou ciclos contínuos. Fonte editável em RML e gerador Python. Feedback de resposta, XP/nível, conquista, conclusão e seleção de mundo integrado. Outros eventos disponíveis no ficheiro para evolução.
- Runtime Rive Canvas 2.43.1 com licença MIT, alojado localmente, carregado após interação; WASM local, sem fallback CDN. Elementos decorativos fora da árvore acessível. Texto de feedback sempre disponível. Movimento reduzido, poupança de dados ou dispositivo com menos de três processadores lógicos mantêm a versão CSS/estática.
- Figma: homepage em 1440, 1280, 768 e 390 px; página `02 · Plataforma modular` com onze vistas adicionais, componentes de navegação/ação reutilizados e ligações de protótipo. 40 variáveis temáticas, 9 de espaçamento e 4 de movimento, além das bases existentes. Os valores de progresso nas vistas são exemplos, não dados de utilizadores.
- Conteúdo original preservado: 60 lições, 14 missões, 10 desafios, fontes e armazenamento local. A animação não atribui XP.

Figma: https://www.figma.com/design/PiJNAacPxKxfxOiHNYcpSt?node-id=10-36

## Dependência pendente

O editor Spline continua em `app.spline.design/signin`. Não foram criadas cenas Spline, nem existe exportação `.splinecode`/URL de cena para integrar. O hero e os dez mundos publicados são SVG, não WebGL. Esta alternativa foi expressamente autorizada enquanto o utilizador trata da autenticação.

Após acesso: criar o hero e dez cenas, verificar desempenho e interação, exportar os assets, integrar por carregamento diferido e manter SVG visível até a cena estar pronta ou sempre que falhar. Não há URLs fictícios nem carregamentos de runtimes Spline sem cena.

## Validação

`tests/browser.html`: 21 grupos de testes com armazenamento isolado. Inclui quizzes e XP idempotente, migração, favoritos, fontes, gaveta mobile, dimensões 1440/1280/1024/768/430/390, menu dinâmico, dez cenários, ligações SVG e carregamento/limpeza real do Rive.

Rive CLI 1.2.0: `--verify`, `inspect --summary` e renderização de controlo. Zero problemas no relatório `rive-feedback/inspection.json`. Duração de animação: 250–450 ms; remoção do canvas após 650 ms. O ficheiro `.riv` tem aproximadamente 18 kB; o runtime/WASM, cerca de 2,4 MB, só são pedidos após interação relevante.

## Reprodução

```powershell
python scripts/world-scenes.py
python scripts/rive-feedback.py
rive design/rive-feedback --verify
rive inspect design/rive-feedback --summary
rive design/rive-feedback --once
Copy-Item design/rive-feedback/build/rive-feedback.riv assets/motion/feedback.riv
node scripts/pages.mjs
python -m http.server 8765 --bind 127.0.0.1
```

Não voltar a executar `design/modular-figma.js` sem inspecionar o Figma: é um registo de criação e duplicaria as vistas. Os IDs estão no histórico de implementação.
