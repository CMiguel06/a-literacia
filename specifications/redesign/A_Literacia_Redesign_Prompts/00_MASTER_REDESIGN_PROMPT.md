# MASTER REDESIGN PROMPT — A LITERACIA

## Contexto

Existe já um website funcional chamado **A Literacia**, publicado em GitHub Pages.

URL pública:
https://cmiguel06.github.io/a-literacia/index.html

O objetivo NÃO é reconstruir o projeto de raiz.

O objetivo é **redesenhar profundamente a experiência visual e pedagógica**, mantendo a simplicidade técnica necessária para GitHub Pages.

---

# VISÃO DO PRODUTO

**A Literacia — aprender para decidir melhor.**

O website ensina competências essenciais para a vida através de:

- explicações curtas;
- fontes e aprofundamento;
- quizzes;
- desafios;
- mapas de aprendizagem;
- progresso;
- microinterações;
- pequenas experiências visuais.

O website deve deixar de parecer uma coleção de cartões/documentação e passar a parecer uma **plataforma de aprendizagem interativa**.

Referências conceptuais:

- Khan Academy
- Brilliant
- Duolingo, apenas na clareza da progressão
- videojogos educativos modernos
- dashboards pedagógicos leves

NÃO copiar visualmente nenhuma destas plataformas.

---

# PRINCÍPIO DE REDESIGN

Preservar:

- sidebar esquerda;
- possibilidade de recolher a sidebar;
- progresso;
- fontes;
- aprofundamento;
- conteúdo modular;
- quizzes;
- GitHub Pages;
- funcionamento sem backend.

Alterar:

- linguagem visual;
- hierarquia;
- navegação dentro das literacias;
- cards;
- paleta;
- movimento;
- sensação de progressão.

---

# NOVA DIREÇÃO VISUAL

Abandonar terracota como identidade dominante.

Utilizar uma base neutra clara:

- branco;
- cinza muito suave;
- azul-cinza suave;
- superfícies claras.

Cada literacia deverá ter uma cor própria.

Sugestão:

```text
Financeira   → verde/esmeralda
Digital      → azul
Alimentar    → coral/laranja
Científica   → roxo
Ambiental    → verde natural
Jurídica     → bordô
Mediática    → dourado/amarelo
Cívica       → azul real
IA           → violeta/ciano
Segurança    → vermelho/laranja
```

Criar tokens de cor por literacia.

---

# LITERACIAS

Manter:

1. Literacia Financeira
2. Literacia Digital
3. Literacia Alimentar
4. Literacia Científica
5. Literacia Ambiental
6. Literacia Jurídica
7. Literacia Mediática
8. Literacia Cívica
9. Literacia de IA
10. Literacia de Segurança e Autoproteção

---

# HOMEPAGE

A homepage deve ser muito mais visual.

Topo:

```text
A Literacia

Aprender para decidir melhor.

Conhecimento prático para a vida real.

[ Pesquisa ]
```

Depois:

- continuar aprendizagem;
- progresso geral;
- mapa/constelação das literacias;
- missão recomendada;
- conquistas recentes.

Evitar uma grelha monótona de 10 cards iguais.

Criar variação visual controlada.

---

# MAPA DAS LITERACIAS

Criar uma secção visual onde as literacias aparecem como universos ligados.

Exemplo conceptual:

```text
            Ciência
          /         \
        IA         Media
        |            |
     Digital       Cívica
        |            |
        └── Segurança ┘

      Financeira
          |
      Ambiental
          |
      Alimentar
```

Isto pode ser feito com:

- SVG;
- CSS;
- linhas;
- nós;
- hover;
- pequenas animações.

Não utilizar WebGL apenas para isto.

---

# PÁGINA DE LITERACIA

Eliminar a sensação de lista de artigos.

Criar um **Learning Path**.

Exemplo:

```text
[1] Fundamentos
      ↓
[2] Conceito seguinte
      ↓
[3] Desafio
      ↓
[4] Aplicação prática
      ↓
[★] Checkpoint
```

Cada lição é um nó.

Estados:

```text
bloqueado
disponível
em progresso
concluído
dominado
```

Os nós devem ser:

- acessíveis;
- clicáveis;
- visualmente claros;
- responsivos.

---

# PÁGINA DE LIÇÃO

Manter leitura clara.

Estrutura:

```text
Título

Em 10 segundos

Explica-me

Mostra-me

Experimenta

Testa-me

Aplica

Fontes e aprofundamento
```

Adicionar:

- pequena barra de progresso;
- XP;
- estado da lição;
- navegação anterior/seguinte.

Fontes e aprofundamento devem permanecer visíveis e valorizados.

---

# INTERAÇÃO

Adicionar movimento apenas quando melhora compreensão.

Usar:

- CSS transitions;
- CSS transforms;
- SVG;
- parallax muito leve;
- hover 2.5D;
- progress animations.

Evitar:

- animações contínuas;
- elementos a saltar;
- efeitos pesados;
- WebGL desnecessário.

---

# 2.5D

Cards e módulos podem ter:

- profundidade;
- sombras suaves;
- elementos em camadas;
- pequenas deslocações com cursor;
- objetos ilustrados em SVG.

Exemplo:

Literacia Financeira:

- moedas;
- carteira;
- gráfico simples.

Literacia Digital:

- telemóvel;
- browser;
- shield.

Alimentar:

- prato;
- alimentos;
- rótulos.

---

# RESPONSIVIDADE

Desktop:
sidebar fixa/recolhível + área de aprendizagem ampla.

Tablet:
sidebar compacta.

Mobile:
drawer.

Learning paths devem transformar-se numa coluna vertical em mobile.

---

# FONTES

Nunca remover a secção:

**Fontes e aprofundamento**

Cada lição deverá permitir:

- fonte principal;
- fontes complementares;
- “Aprofundar”.

A credibilidade do projeto é parte da identidade.

---

# FILOSOFIA FINAL

O utilizador não deve sentir:

> “Tenho uma lista de artigos para ler.”

Deve sentir:

> “Estou a avançar num percurso de aprendizagem.”
