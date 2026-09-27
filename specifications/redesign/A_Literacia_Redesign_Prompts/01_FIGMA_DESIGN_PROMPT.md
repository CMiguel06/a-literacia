# FIGMA DESIGN PROMPT — A LITERACIA

## Objetivo

Criar um novo design system e protótipo visual para **A Literacia**.

O site será implementado em GitHub Pages, por isso o design deve ser:

- visualmente rico;
- tecnicamente leve;
- reproduzível em HTML/CSS/JS;
- altamente responsivo.

---

# CRIAR NO FIGMA

Desenhar estas vistas:

1. Homepage desktop
2. Homepage mobile
3. Sidebar aberta
4. Sidebar recolhida
5. Página de Literacia
6. Learning Path
7. Página de Lição
8. Quiz
9. Missão interativa
10. Progresso
11. Conquistas
12. Pesquisa
13. Fontes e aprofundamento

---

# DESIGN SYSTEM

Criar:

- color tokens;
- typography;
- spacing;
- radius;
- shadows;
- states;
- components.

---

# CORES

Base neutra:

```text
Background       #F7F9FC
Surface          #FFFFFF
Text Primary     #1F2937
Text Secondary   #64748B
Border           #E5E7EB
```

Criar accent por literacia:

```text
Financeira   #10B981
Digital      #3B82F6
Alimentar    #F97316
Científica   #8B5CF6
Ambiental    #22C55E
Jurídica     #9F1239
Mediática    #EAB308
Cívica       #2563EB
IA           #7C3AED
Segurança    #EF4444
```

Ajustar tonalidades se necessário para acessibilidade.

---

# COMPONENTES

Criar:

- Sidebar
- SidebarItem
- LiteracyCard
- LearningNode
- ProgressBar
- XPBadge
- LevelBadge
- MissionCard
- QuizCard
- SourceCard
- AchievementCard
- SearchResult
- LessonNavigation

---

# LEARNING NODE

Estados:

```text
locked
available
active
completed
mastered
```

Cada estado deve ser distinguível por:

- forma;
- iconografia;
- cor;
- label.

Nunca apenas por cor.

---

# MOVIMENTO

No protótipo Figma:

- hover em cards;
- sidebar collapse;
- progress fill;
- node completion;
- modal de conquista;
- quiz feedback.

Movimentos curtos:

```text
150–250 ms
```

---

# HOME

Não criar apenas uma grelha.

Criar:

- hero;
- continuar;
- progresso;
- mapa das literacias;
- missão recomendada.

O mapa das literacias deve ser visualmente forte.

---

# INSPIRAÇÃO

Pretendo a clareza pedagógica de Khan Academy e Brilliant, com personalidade própria.

Evitar:

- aparência corporativa;
- dashboards B2B;
- excesso de branco sem identidade;
- UI infantilizada;
- cards repetidos sem hierarquia.

---

# RESULTADO

O Figma deverá funcionar como fonte visual para a implementação estática.

Todos os efeitos precisam de poder ser reproduzidos com:

- HTML;
- CSS;
- SVG;
- JavaScript.
