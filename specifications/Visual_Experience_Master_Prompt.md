# A LITERACIA — VISUAL EXPERIENCE MASTER PROMPT

## PAPEL

Assume simultaneamente os papéis de:

- Senior Product Designer;
- Creative Technologist;
- Interaction Designer;
- Motion Designer;
- Frontend Experience Engineer;
- Learning Experience Designer.

Vais redesenhar **A Literacia**, uma plataforma educativa estática alojada em GitHub Pages.

O objetivo não é fazer “mais um dashboard educativo”.

O objetivo é criar uma experiência visual deliberada, memorável e exploratória, onde o utilizador sente que está a entrar em diferentes **mundos de conhecimento**.

---

# STACK CRIATIVA

Utiliza esta separação clara de responsabilidades:

## Figma
→ sistema visual, layouts, componentes, responsive design, estados, protótipos e design tokens.

## Spline
→ hero 3D, mundos visuais, objetos tridimensionais leves e elementos exploratórios.

## Rive
→ microanimações, feedback, progressão, estados, pequenas personagens/ícones animados e conquistas.

## SVG + CSS
→ learning paths, mapas, diagramas, ligações, animações leves, ilustrações vetoriais e efeitos 2.5D.

## HTML + CSS + JavaScript
→ estrutura, conteúdo, acessibilidade, progresso, quizzes, interações, localStorage e integração final.

---

# 1. PRINCÍPIO DO PRODUTO

Nome:

# A Literacia

Mensagem:

## Aprender para decidir melhor.

Submensagem:

**Conhecimento prático para a vida real.**

O site deve transmitir:

- descoberta;
- curiosidade;
- clareza;
- progressão;
- inteligência;
- movimento;
- confiança.

Não deve transmitir:

- dashboard empresarial;
- aplicação bancária;
- SaaS genérico;
- template AI;
- escola infantil;
- site institucional.

---

# 2. PROIBIÇÕES VISUAIS

Evita explicitamente a estética típica de “vibe coding”.

NÃO criar uma interface dominada por:

- dezenas de cards brancos com border-radius igual;
- pequenos títulos em uppercase com letter-spacing exagerado;
- ícones Lucide como principal linguagem ilustrativa;
- gradientes azul/violeta genéricos;
- widgets KPI;
- layouts inteiramente em grelha;
- boxes dentro de boxes;
- shadows SaaS genéricas;
- “glassmorphism” gratuito;
- badges em todo o lado;
- componentes que parecem retirados de um dashboard administrativo.

Não utilizar “clean minimal SaaS” como direção estética.

---

# 3. PRINCÍPIO DE COMPOSIÇÃO

A navegação deve permanecer racional.

O conteúdo pode ser exploratório.

Isto significa:

```text
SIDEBAR
→ estável
→ discreta
→ previsível

ÁREA PRINCIPAL
→ visual
→ expressiva
→ exploratória
→ reativa
```

A sidebar serve de âncora.

A área central serve de descoberta.

---

# 4. SIDEBAR

Manter sidebar esquerda.

Desktop:

- aberta por defeito;
- recolhível;
- ícones quando fechada;
- tooltip;
- estado persistido.

Mobile:

- drawer.

Conteúdo:

```text
A Literacia

Início

Financeira
Digital
Alimentar
Científica
Ambiental
Jurídica
Mediática
Cívica
IA
Segurança e Autoproteção

Missões
Progresso
Conquistas
Favoritos
```

A sidebar deve ser visualmente discreta.

Não deve competir com o hero.

---

# 5. HOMEPAGE — NOVO HERO

A homepage NÃO deve começar por um dashboard.

Criar um hero imersivo com aproximadamente:

```text
65–80vh
```

Estrutura conceptual:

```text
A LITERACIA

Aprender para decidir melhor.

Conhecimento prático para a vida real.

[ Explorar ]

        + HERO 3D INTERATIVO
```

---

# 6. SPLINE — HERO 3D

Criar no Spline uma composição central 3D.

Conceito recomendado:

## “O Mundo da Literacia”

No centro:

- um livro aberto;
OU
- uma pequena ilha;
OU
- uma estrutura abstrata de conhecimento.

À volta orbitam objetos associados às literacias.

### Financeira
- moeda;
- carteira;
- gráfico.

### Digital
- monitor;
- smartphone;
- shield.

### Alimentar
- prato;
- fruta;
- talheres.

### Científica
- átomo;
- microscópio;
- molécula.

### Ambiental
- folha;
- planeta;
- água.

### Jurídica
- balança;
- documento;
- assinatura.

### Mediática
- jornal;
- microfone;
- feed.

### Cívica
- edifício público;
- pessoas;
- praça.

### IA
- rede neural abstrata;
- nós;
- spark.

### Segurança
- escudo;
- rota;
- sinal de emergência.

---

# 7. COMPORTAMENTO DO HERO 3D

Adicionar:

- movimento muito lento em idle;
- parallax de cursor suave;
- resposta ao hover;
- profundidade;
- alteração subtil de iluminação;
- foco visual no objeto selecionado.

Não utilizar:

- rotação frenética;
- partículas infinitas;
- efeitos “gaming RGB”;
- materiais cromados gratuitos.

Objetivo:

**curiosidade, não espetáculo vazio.**

---

# 8. INTERAÇÃO COM AS LITERACIAS

Ao passar sobre um objeto:

```text
objeto destaca
+
outros reduzem ligeiramente intensidade
+
aparece nome da literacia
+
pequena descrição
```

Ao clicar:

```text
Financeira
Percebe dinheiro, escolhas e consequências.

[ Explorar mundo ]
```

A experiência pode navegar para a literacia correspondente.

---

# 9. FALLBACK

O site NÃO pode depender do Spline para funcionar.

Criar fallback:

- imagem estática;
OU
- composição SVG equivalente.

Se:

- WebGL falhar;
- dispositivo for fraco;
- reduced-motion estiver ativo;

utilizar fallback.

---

# 10. SECÇÃO “MUNDOS”

Depois do hero:

## Escolhe um mundo.

Não utilizar 10 cards idênticos.

Criar composições assimétricas.

Cada literacia pode ocupar:

- bloco horizontal;
- módulo editorial;
- pequena cena;
- composição visual.

Exemplo:

```text
FINANCEIRA

       [ilustração]

Aprende como o dinheiro se move,
cresce, desaparece e é utilizado.

72% explorado

→ Continuar
```

Depois outra literacia pode inverter a composição.

Alternar:

```text
imagem | texto

texto | imagem
```

---

# 11. IDENTIDADE POR LITERACIA

Cada mundo tem uma cor própria.

Sugestão:

```text
Financeira   #00A878
Digital      #2979FF
Alimentar    #FF7A45
Científica   #7C4DFF
Ambiental    #45A557
Jurídica     #9D174D
Mediática    #E0A800
Cívica       #2456D7
IA           #6C4CF1
Segurança    #E84A3C
```

Criar:

- cor principal;
- cor clara;
- cor profunda;
- background muito suave.

Nunca utilizar todas as cores ao mesmo tempo sem hierarquia.

---

# 12. FIGMA — SISTEMA VISUAL

Criar em Figma:

## Foundations

- colors;
- typography;
- spacing;
- grid;
- radius;
- elevation;
- motion tokens.

## Componentes

- Sidebar;
- Navigation Item;
- Hero;
- Literacy World;
- Learning Node;
- Progress Indicator;
- Lesson Header;
- Quiz;
- Mission;
- Source Block;
- Achievement;
- Search;
- Tooltip;
- Bottom Sheet;
- Modal.

Criar variantes e estados.

---

# 13. TIPOGRAFIA

Evitar estética “AI SaaS”.

Sugestão A:

```text
Display:
Fraunces

Interface:
IBM Plex Sans

Technical / XP:
IBM Plex Mono
```

Sugestão B:

```text
Display:
Bricolage Grotesque

Interface:
Atkinson Hyperlegible

Technical:
IBM Plex Mono
```

Escolher UMA combinação.

Não misturar quatro famílias sem necessidade.

---

# 14. LEARNING PATHS

Ao entrar numa literacia, apresentar um percurso visual.

Exemplo:

```text
         ●
      Dinheiro
         │
         ●
      Receita
       ╱   ╲
      ●     ●
   Gastos  Poupança
      ╲     ╱
        ★
     DESAFIO
        │
        ●
    Orçamento
```

Não parecer árvore empresarial.

Criar sensação de percurso.

---

# 15. SVG + CSS — LEARNING PATHS

Implementar learning paths com:

- SVG para ligações;
- HTML para nós;
- CSS para estados;
- JavaScript para progresso.

Estados:

```text
locked
available
active
completed
mastered
```

Concluído:

- linha anterior ativa;
- nó ganha check;
- próximo nó ilumina.

---

# 16. MOBILE LEARNING PATH

Em mobile:

converter o caminho para uma progressão vertical.

Não tentar comprimir um mapa desktop de 1200px num ecrã de 390px.

---

# 17. RIVE — MICROANIMAÇÕES

Utilizar Rive apenas para elementos pequenos e expressivos.

Exemplos:

### XP

Pequeno símbolo ganha energia.

### Conquista

Badge abre/desdobra.

### Resposta correta

Ícone transforma-se num check.

### Missão concluída

Pequeno estado animado.

### Segurança

Shield ganha uma camada.

### Ambiental

Folha cresce discretamente.

---

# 18. NÃO USAR RIVE PARA

- navegação principal;
- texto;
- secções inteiras;
- backgrounds;
- animações essenciais à compreensão.

Todas as interações importantes devem continuar funcionais sem Rive.

---

# 19. EXPERIÊNCIAS INTERATIVAS

Criar pequenas atividades.

## Financeira

Distribuir dinheiro:

```text
Necessidades
Poupança
Lazer
Investimento
```

## Digital

Telemóvel fictício:

```text
SMS suspeita
password fraca
permissão excessiva
localização
```

## Alimentar

Construir prato.

## Científica

Separar:

```text
hipótese
evidência
conclusão
```

## Ambiental

Escolher ações num cenário.

## Jurídica

Identificar:

```text
direito
dever
contrato
responsabilidade
```

## Mediática

Analisar notícia.

## Cívica

Resolver situações de convivência.

## IA

Validar resposta gerada.

## Segurança

Escolher uma ação prudente num cenário.

---

# 20. PRINCÍPIO DE 3D

Regra absoluta:

## 3D para descobrir.
## 2D para aprender.

Quando o utilizador entra numa lição:

reduzir drasticamente complexidade visual.

A leitura deve ser excelente.

---

# 21. PÁGINA DE LIÇÃO

Estrutura:

```text
← voltar

[breadcrumb]

TÍTULO

Em 10 segundos

Explica-me

Mostra-me

Experimenta

Testa-me

Aplica

Fontes e aprofundamento

← Anterior
Seguinte →
```

Largura de leitura:

```text
680–780px
```

---

# 22. FONTES E APROFUNDAMENTO

Nunca esconder ou remover.

Criar bloco editorial:

## Fontes e aprofundamento

Cada fonte:

- nome;
- entidade;
- contexto;
- ligação.

Não parecer referência académica feia.

Não esconder atrás de uma modal desnecessária.

---

# 23. PROGRESSO

Não apresentar como KPI empresarial.

Evitar:

```text
2%
30 XP
1/60
```

todos presos dentro de widgets.

Preferir:

```text
O TEU PERCURSO

Nível 3 — Aprendiz

━━━━━━━━━━━━━━●━━━━━━━━

12 lições exploradas
430 XP
```

---

# 24. GAMIFICAÇÃO

Manter:

- XP;
- níveis;
- progressão;
- missões;
- conquistas.

Mas integrar visualmente na narrativa.

A aprendizagem deve ser o foco.

---

# 25. PROGRESSÃO VISUAL DOS MUNDOS

Opcional e desejável:

cada literacia evolui visualmente.

Exemplo Financeira:

```text
0%
pequena ilha

25%
casa

50%
loja + banco

75%
cidade

100%
mundo completo
```

Isto deve ser uma representação simbólica.

Não substituir a barra real de progresso.

---

# 26. CIVILIDADE / CÍVICA

A Literacia Cívica deve incluir:

- civilidade;
- cortesia;
- cavalheirismo contemporâneo;
- respeito recíproco;
- etiqueta social;
- espaço público;
- comunicação;
- consentimento;
- limites;
- solidariedade;
- instituições;
- participação.

Cavalheirismo é apresentado como:

> consideração, cuidado e respeito.

Aplica-se:

```text
homem → mulher
mulher → homem
pessoa → pessoa
```

---

# 27. ACESSIBILIDADE

Obrigatório:

- semantic HTML;
- keyboard;
- focus-visible;
- aria;
- contrast AA;
- alt text;
- reduced-motion;
- fallback de drag-and-drop;
- fallback do hero 3D;
- conteúdo acessível sem animação.

---

# 28. PERFORMANCE

GitHub Pages continua a ser o target.

Objetivo:

- carregamento rápido;
- lazy-load do Spline;
- lazy-load do Rive;
- SVG otimizado;
- assets comprimidos;
- JavaScript mínimo.

Hero 3D pode carregar após conteúdo crítico.

---

# 29. ARQUITETURA TÉCNICA

Manter simples.

```text
HTML
CSS
JavaScript
JSON
```

Não migrar para React.

Não criar backend.

Não criar login.

Não adicionar build complexo.

---

# 30. ORDEM DE IMPLEMENTAÇÃO

## Fase 1 — Figma

Criar:

- homepage;
- sidebar;
- mundo;
- learning path;
- lição;
- mobile.

NÃO programar antes de validar linguagem visual.

---

## Fase 2 — Spline

Criar apenas o hero.

Validar:

- performance;
- comportamento;
- fallback.

---

## Fase 3 — HTML/CSS

Implementar:

- novo layout;
- tipografia;
- spacing;
- cores;
- responsividade.

---

## Fase 4 — SVG

Implementar:

- learning paths;
- diagramas;
- ligações.

---

## Fase 5 — Rive

Adicionar apenas microanimações aprovadas.

---

## Fase 6 — JS

Ligar:

- progresso;
- XP;
- navegação;
- quizzes;
- missões;
- localStorage.

---

# 31. PRIMEIRO ENTREGÁVEL

Antes de redesenhar todo o website, criar APENAS:

## Homepage v2

Incluindo:

- sidebar;
- hero;
- hero 3D;
- fallback;
- “escolhe um mundo”;
- continuar percurso;
- progresso integrado.

Criar:

```text
Desktop 1440
Laptop 1280
Tablet 768
Mobile 390
```

Não redesenhar as outras páginas ainda.

---

# 32. CRITÉRIO DE SUCESSO

A homepage deve provocar:

> “Quero explorar isto.”

e não:

> “Isto parece uma aplicação de produtividade.”

Deve parecer desenhada por uma equipa criativa.

Não deve parecer um template.

Não deve parecer um dashboard gerado por IA.

A estética deverá nascer da ideia:

# CONHECIMENTO COMO UM MUNDO A EXPLORAR.
