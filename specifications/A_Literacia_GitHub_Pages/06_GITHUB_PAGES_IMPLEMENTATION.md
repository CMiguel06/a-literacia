# IMPLEMENTAÇÃO — GITHUB PAGES

# Objetivo

O site deve poder ser publicado diretamente em GitHub Pages.

---

# Opção recomendada

Vanilla:

```text
HTML
CSS
JavaScript
JSON
```

Isto reduz:

- dependências;
- configuração;
- manutenção;
- build failures.

---

# Estrutura

```text
a-literacia/
│
├── index.html
├── literacia.html
├── licao.html
├── progresso.html
├── missoes.html
│
├── css/
│   └── styles.css
│
├── js/
│   ├── app.js
│   ├── storage.js
│   ├── quiz.js
│   └── progress.js
│
├── data/
│   └── literacies.json
│
├── assets/
│   └── icons/
│
└── README.md
```

---

# Publicação

GitHub repository:

```text
username/a-literacia
```

GitHub Pages:

```text
Settings
→ Pages
→ Deploy from a branch
→ main
→ /root
```

---

# URLs

Evitar rotas que dependem de servidor.

Utilizar query params:

```text
literacia.html?id=digital
licao.html?id=phishing
```

---

# localStorage

Chaves sugeridas:

```text
a-literacia-progress
a-literacia-sidebar
a-literacia-theme
a-literacia-profile
```

---

# Performance

O site deve:

- carregar rapidamente;
- evitar JavaScript pesado;
- comprimir imagens;
- utilizar SVG quando adequado;
- não carregar todas as imagens antecipadamente.

---

# SEO básico

Adicionar:

- `<title>`;
- meta description;
- Open Graph;
- semantic HTML;
- headings corretos.

---

# PWA

Não é necessário na primeira versão.

Pode ser adicionado posteriormente.

---

# Dependências

Evitar.

Se for necessária uma biblioteca de ícones:

preferir SVG inline ou um conjunto pequeno.

---

# JavaScript

Separar responsabilidades:

```text
app.js
→ interface e navegação

storage.js
→ localStorage

progress.js
→ progresso e XP

quiz.js
→ quizzes
```

---

# CSS

Utilizar:

```text
variables
utility classes pequenas
component classes claras
media queries
```

Não recriar Tailwind manualmente com 900 classes.

---

# Breakpoints

Sugestão:

```css
@media (max-width: 1024px) {}
@media (max-width: 768px) {}
@media (max-width: 480px) {}
```

Construir mobile conscientemente.

---

# Requisito final

Depois de clonar o repositório deve ser possível abrir:

```text
index.html
```

e compreender imediatamente o projeto.
