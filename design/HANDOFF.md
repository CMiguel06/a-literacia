# A Literacia — design e implementação

O site publicado é o protótipo funcional: https://cmiguel06.github.io/a-literacia/

## Importar no Figma

Arrasta os 13 ficheiros SVG de `views/` para um ficheiro Figma. São capturas vetoriais do DOM real, com formas e texto editáveis. Os tokens estão em `tokens.json`. As vistas não são componentes nativos Figma, não incluem Auto Layout e não contêm ligações de protótipo Figma. Sombras, gradientes, pseudoelementos, máscaras e algumas transformações CSS podem diferir da versão no navegador. A tipografia de referência usa a fonte de sistema; os SVG usam Arial para portabilidade. As ferramentas Figma não estavam disponíveis nesta sessão, pelo que não foi criado qualquer ficheiro na conta Figma.

## 13 vistas

01 início desktop; 02 início móvel; 03 menu móvel aberto; 04 menu desktop recolhido; 05 área Cívica; 06 percurso; 07 lição; 08 quiz; 09 missão interativa; 10 progresso; 11 conquistas; 12 pesquisa; 13 fontes.

## Componentes implementados

- Navegação: sidebar aberta/recolhida, tooltips, drawer móvel com Escape e gestão de foco.
- Mapa: dez âncoras com emblemas em camadas, cor temática, título e progresso; duas colunas no telemóvel.
- Percurso: etapas, conectores, nós disponíveis/em progresso/concluídos/dominados e desafio final bloqueado.
- Lição: mini percurso, secções, quiz com feedback, fontes primárias visíveis e complementares expansíveis.
- Recompensas: XP único, modal nativo de conquista, progresso e histórico local.
- Laboratório: orçamento, prato, sinais de phishing, notícia e caminhos. Todos têm alternativas ao arrastar.

## Movimento e estados

Hover/foco: 150–220 ms, pequeno deslocamento e sombra. Quiz correto/incorreto: cor + ícone + explicação. Conquista: diálogo com botão de continuação. `prefers-reduced-motion` elimina animações e transformações decorativas. Sem movimento contínuo ou WebGL.

## Percurso de demonstração

Início → escolher Cívica → Gentileza não cria dívida → responder ao quiz → concluir → regressar ao percurso. Rever o quiz de uma lição concluída marca-a como dominada sem novos XP. Missões → escolher uma das cinco experiências → interagir com botões ou arrastar → resolver a missão de 25 XP. Pesquisa → escrever cortesia → abrir um resultado. Fontes → abrir a fonte principal ou expandir complementares.

## Persistência

Mantém a chave `a-literacia-progress`, os IDs originais e os XP anteriores. As novas lições fazem aumentar o denominador de progresso: uma percentagem pode baixar sem perder conclusões. A medalha das 40 lições e os desafios já conquistados são preservados. Os SVG mostram dados locais de demonstração.
