# UI / UX — A LITERACIA

# Objetivo

Criar uma interface que desapareça mentalmente enquanto o utilizador aprende.

A pessoa não deve precisar de aprender a utilizar o site.

---

# Identidade

Paleta base:

```css
:root {
  --bg: #FCFAF6;
  --surface: #FFFFFF;

  --terracotta: #B85C44;
  --terracotta-dark: #8F4435;
  --terracotta-soft: #D98B73;

  --cream: #F7F1E8;
  --border: #E8DED6;

  --text: #302A27;
  --muted: #746A65;

  --success: #617C69;
  --warning: #B38345;
  --danger: #A9554F;
}
```

---

# Sidebar

Desktop aberta:

```text
240–270 px
```

Desktop recolhida:

```text
64–72 px
```

Mostrar:

```text
A Literacia

Início

Literacias
  Financeira
  Digital
  Alimentar
  Científica
  Ambiental
  Jurídica
  Mediática
  Cívica
  IA
  Segurança

Missões
Progresso
Conquistas
Favoritos

Definições
```

Quando recolhida:

- mostrar apenas ícones;
- mostrar tooltip no hover/focus.

Mobile:

- botão menu;
- sidebar transforma-se em drawer.

---

# Homepage

Hero compacto:

```text
A Literacia

Aprender para decidir melhor.

Conhecimento prático para aquilo que realmente acontece na vida.

[ Começar a aprender ]
```

Não ocupar o ecrã inteiro.

---

# Cards

Cards das literacias:

- border subtil;
- fundo branco;
- radius ~16px;
- muito espaço;
- ícone simples;
- título;
- descrição curta;
- pequena barra de progresso.

Exemplo:

```text
┌────────────────────────────┐
│ 💰                         │
│ Literacia Financeira       │
│                            │
│ Aprende a compreender      │
│ dinheiro e escolhas.       │
│                            │
│ ███████░░░ 70%             │
│                    Explorar│
└────────────────────────────┘
```

---

# Página de literacia

Topo:

```text
💰 Literacia Financeira

Perceber dinheiro antes de decidir o que fazer com ele.

Nível 3
████████░░ 72%
```

Depois:

- categorias;
- lições;
- missões;
- desafio final.

---

# Página de lição

Estrutura:

```text
← Voltar

Juros compostos

Em 10 segundos
...

Explica-me
...

Mostra-me
...

Experimenta
...

Testa-me
...

Aplica
...

← Anterior                 Seguinte →
```

---

# Tipografia

Usar:

- Inter;
- Manrope;
- DM Sans;
- system fonts como fallback.

O conteúdo deve ser confortável.

Evitar:

- parágrafos muito largos;
- texto minúsculo;
- títulos gigantes sem função.

---

# Barra de progresso

Sempre apresentar texto juntamente com a barra.

Exemplo:

```text
7 de 10 lições concluídas

██████████████░░░░░░ 70%
```

---

# Feedback de quiz

Correto:

```text
✓ Boa.

Receita é o dinheiro que entra.
```

Incorreto:

```text
Ainda não.

Pensa no sentido do movimento do dinheiro:
está a entrar ou a sair?
```

Nunca humilhar.

---

# Microinterações

Apenas:

- hover;
- sidebar;
- expand/collapse;
- respostas;
- progresso;
- conquista desbloqueada.

Duração aproximada:

```text
150–250ms
```

---

# Mobile

Requisitos:

- cards em uma coluna;
- botões grandes;
- quizzes fáceis de tocar;
- sidebar drawer;
- boa largura de texto;
- navegação inferior opcional apenas se melhorar UX.

---

# Acessibilidade

- contraste AA;
- foco visível;
- navegação por teclado;
- aria-labels;
- texto alternativo;
- não depender apenas da cor;
- respeitar `prefers-reduced-motion`.

---

# Princípio visual

Se algo parece bonito mas torna a interface mais difícil:

remover.
