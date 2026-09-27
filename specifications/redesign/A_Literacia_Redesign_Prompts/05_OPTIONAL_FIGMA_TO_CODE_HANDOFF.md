# FIGMA → CODE HANDOFF — A LITERACIA

Quando existir um design aprovado no Figma:

1. não copiar pixels cegamente;
2. extrair tokens;
3. extrair componentes;
4. mapear estados;
5. reproduzir comportamentos em CSS/JS;
6. manter semântica HTML;
7. preservar acessibilidade.

---

# Tokens

Extrair:

```text
colors
spacing
radius
shadow
typography
motion
```

---

# Componentes prioritários

```text
Sidebar
LiteracyCard
LearningNode
ProgressBar
QuizCard
MissionCard
SourceCard
AchievementCard
```

---

# SVG

Preferir SVG para:

- mapas;
- ligações;
- ilustrações simples;
- ícones;
- elementos 2.5D.

---

# Motion

Não converter protótipos do Figma em dependências pesadas.

Reproduzir com:

```text
CSS
SVG
vanilla JS
```

---

# Regra

O código deve preservar a sensação visual do Figma sem sacrificar:

- performance;
- acessibilidade;
- simplicidade do projeto.
