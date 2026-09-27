# ESTRUTURA DO SITE — A LITERACIA

# Estrutura simples

```text
/
├── index.html
├── literacia.html
├── licao.html
├── progresso.html
├── missoes.html
├── favoritos.html
│
├── css/
│   └── styles.css
│
├── js/
│   ├── app.js
│   ├── router.js
│   ├── progress.js
│   ├── quiz.js
│   └── storage.js
│
├── data/
│   └── literacies.json
│
└── assets/
    ├── icons/
    └── images/
```

Não é obrigatório utilizar exatamente estes ficheiros.

O objetivo é manter o projeto compreensível.

---

# Navegação

Homepage:

```text
/
```

Literacia:

```text
/literacia.html?id=financeira
```

Lição:

```text
/licao.html?id=juros-compostos
```

Isto funciona facilmente em GitHub Pages sem routing de servidor.

---

# Homepage

Secções:

1. Hero
2. Continuar aprendizagem
3. Todas as literacias
4. Missão sugerida
5. Progresso geral
6. Pesquisa simples

---

# Todas as literacias

```text
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
```

---

# Página de literacia

Cada uma apresenta:

```text
Título
Descrição
Progresso
Categorias
Lições
Missões
Desafio final
```

---

# Pesquisa

Criar pesquisa client-side.

Pesquisar:

- título;
- descrição;
- palavras-chave;
- aliases.

Exemplo:

```text
password
```

pode apresentar:

```text
Literacia Digital
→ Passwords seguras
→ MFA
→ Phishing

Literacia de Segurança
→ Proteção de contas pessoais
```

---

# Favoritos

Guardar IDs no localStorage.

---

# Continuar aprendizagem

Guardar:

```js
lastLesson
```

Homepage:

```text
Continuar

Literacia Digital
Phishing: como reconhecer uma mensagem suspeita

[ Continuar ]
```

---

# Sem conta

O site deverá funcionar integralmente sem login.

O browser guarda o progresso.
