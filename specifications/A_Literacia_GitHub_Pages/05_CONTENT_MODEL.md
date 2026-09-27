# MODELO DE CONTEÚDO — A LITERACIA

O site é estático.

Guardar conteúdo num JSON simples.

---

# Exemplo de literacia

```json
{
  "id": "financeira",
  "title": "Literacia Financeira",
  "icon": "wallet",
  "description": "Perceber dinheiro antes de decidir o que fazer com ele.",
  "categories": []
}
```

---

# Exemplo de categoria

```json
{
  "id": "orcamento",
  "title": "Orçamento",
  "description": "Aprender a decidir para onde vai o dinheiro.",
  "lessons": []
}
```

---

# Exemplo de lição

```json
{
  "id": "necessidade-vs-desejo",
  "title": "Necessidade ou desejo?",
  "summary": "Nem tudo aquilo que queremos é aquilo de que precisamos.",
  "xp": 20,

  "quick": "Necessidade resolve algo essencial. Desejo melhora ou acrescenta algo.",

  "explain": [
    "Uma necessidade está ligada ao essencial.",
    "Um desejo é algo que gostarias de ter, mas que normalmente pode esperar."
  ],

  "example": {
    "title": "Imagina",
    "text": "Precisar de almoço é diferente de querer umas sapatilhas novas."
  },

  "quiz": {
    "question": "Qual destas opções é normalmente uma necessidade?",
    "answers": [
      "Água",
      "Uma consola nova",
      "Uma skin num jogo"
    ],
    "correct": 0,
    "explanation": "A água é essencial."
  },

  "activity": "Durante um dia identifica três necessidades e três desejos.",

  "keywords": [
    "dinheiro",
    "gastos",
    "necessidade",
    "desejo"
  ]
}
```

---

# Perfis de explicação

Opcional:

```json
{
  "variants": {
    "8-11": {},
    "12-15": {},
    "16-17": {},
    "adult": {}
  }
}
```

Se isto tornar o conteúdo demasiado pesado na primeira versão:

não implementar ainda.

Preparar apenas a estrutura.

---

# Progresso

Guardar localmente:

```json
{
  "xp": 260,
  "completedLessons": [
    "necessidade-vs-desejo"
  ],
  "favorites": [],
  "lastLesson": "necessidade-vs-desejo"
}
```

---

# Pesquisa

Cada lição deve incluir:

```text
keywords
aliases
```

para permitir pesquisa simples.
