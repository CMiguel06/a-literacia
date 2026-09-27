# MASTER PROMPT — A LITERACIA

## Missão

Cria um website educativo chamado **A Literacia**.

O website será publicado através de **GitHub Pages**.

Não construir uma aplicação empresarial complexa.

Não criar backend.

Não criar autenticação.

Não criar base de dados.

O projeto deve ser deliberadamente simples, rápido e fácil de manter.

---

# Conceito

**A Literacia**

### Aprender para decidir melhor.

O site ensina competências práticas essenciais através de:

- explicações curtas;
- exemplos;
- pequenos jogos;
- quizzes;
- desafios;
- barras de progresso;
- níveis;
- conquistas.

A experiência deve parecer uma mistura entre:

- guia prático;
- jogo educativo;
- biblioteca visual;
- manual para a vida.

Sem parecer uma escola tradicional.

---

# Literacias

Criar estas áreas:

1. **Literacia Financeira**
2. **Literacia Digital**
3. **Literacia Alimentar**
4. **Literacia Científica**
5. **Literacia Ambiental**
6. **Literacia Jurídica**
7. **Literacia Mediática**
8. **Literacia Cívica**
9. **Literacia de IA**
10. **Literacia de Segurança e Autoproteção**

A interface deve permitir adicionar novas literacias futuramente através de dados, sem redesenhar o site.

---

# Interface

Layout principal:

```text
┌──────────────┬──────────────────────────────┐
│              │                              │
│   SIDEBAR    │         CONTEÚDO             │
│              │                              │
│  recolhível  │                              │
│              │                              │
└──────────────┴──────────────────────────────┘
```

Sidebar:

- esquerda;
- recolhível;
- semelhante conceptualmente ao ChatGPT;
- ícones quando fechada;
- drawer no mobile.

---

# Homepage

Mostrar:

```text
A Literacia

Aprender para decidir melhor.

[ Começar ]

O que queres aprender hoje?
```

Depois apresentar uma grelha com as dez literacias.

Cada card:

- ícone;
- título;
- frase curta;
- progresso;
- botão "Explorar".

---

# Filosofia visual

Identidade:

**terracota + creme + branco quente**

Estilo:

- simples;
- acolhedor;
- editorial;
- moderno;
- muito user-friendly.

Não utilizar:

- interfaces escuras agressivas;
- excesso de animação;
- gradientes neon;
- dashboard empresarial;
- UI infantilizada.

---

# Gamificação

Adicionar apenas gamificação que ajude a aprender:

- XP;
- níveis;
- progresso;
- quizzes;
- missões;
- conquistas;
- desafio final de cada literacia.

Sem rankings públicos.

Sem punições.

Sem streaks agressivas.

---

# Tecnologia

Preferir:

```text
index.html
css/styles.css
js/app.js
data/literacies.json
```

Se houver vantagens claras, podem existir ficheiros adicionais.

Não adicionar uma framework apenas porque existe.

---

# Persistência

Guardar localmente:

- progresso;
- XP;
- lições concluídas;
- favoritos;
- definição da sidebar;
- perfil de explicação.

Utilizar:

```js
localStorage
```

---

# Responsividade

O site deve funcionar muito bem em:

- desktop;
- portátil;
- tablet;
- telemóvel.

Mobile não pode ser apenas desktop encolhido.

---

# Regra principal

Antes de criar qualquer funcionalidade pergunta:

> Isto ajuda alguém a encontrar, compreender, praticar ou recordar conhecimento?

Se a resposta for não, não adicionar.
