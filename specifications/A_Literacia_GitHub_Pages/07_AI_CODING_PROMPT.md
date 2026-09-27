# PROMPT PARA AI CODING — A LITERACIA

Lê todos os ficheiros Markdown deste projeto antes de escrever código.

O projeto chama-se:

# A Literacia

Será publicado em:

**GitHub Pages**

---

# Tarefa

Cria a primeira versão funcional completa do frontend.

Não criar backend.

Não criar autenticação.

Não criar base de dados.

Não criar arquitetura de aplicação empresarial.

---

# Tecnologia

Usa:

```text
HTML
CSS
JavaScript
JSON
```

Podes utilizar módulos JavaScript nativos.

Evita dependências externas sem necessidade.

---

# Implementar

## 1. Homepage

Criar:

- hero;
- sidebar recolhível;
- cards das dez literacias;
- pequena área de progresso;
- "Continuar aprendizagem";
- missão sugerida.

---

## 2. Sidebar

Deve incluir:

```text
Início

Literacia Financeira
Literacia Digital
Literacia Alimentar
Literacia Científica
Literacia Ambiental
Literacia Jurídica
Literacia Mediática
Literacia Cívica
Literacia de IA
Segurança e Autoproteção

Missões
Progresso
Favoritos
```

Sidebar deve:

- recolher;
- reabrir;
- guardar preferência;
- funcionar como drawer em mobile.

---

## 3. Página de literacia

Criar página reutilizável que recebe:

```text
?id=financeira
?id=digital
...
```

e carrega o conteúdo correto.

Mostrar:

- título;
- descrição;
- progresso;
- categorias;
- lições;
- desafio final.

---

## 4. Página de lição

Criar:

```text
/licao.html?id=...
```

Mostrar:

- resumo;
- explicação;
- exemplo;
- quiz;
- atividade;
- anterior;
- seguinte.

---

## 5. Gamificação

Implementar:

- XP;
- níveis;
- conclusão de lições;
- progresso;
- conquistas simples.

Guardar tudo em:

```text
localStorage
```

---

## 6. Pesquisa

Criar pesquisa client-side sobre:

- títulos;
- descrições;
- keywords.

---

## 7. Design

Seguir `01_UI_UX.md`.

Identidade:

```text
terracota
creme
branco quente
```

Interface muito limpa.

---

# Conteúdo inicial

Não escrever centenas de lições.

Criar inicialmente:

- todas as dez literacias;
- pelo menos duas categorias por literacia;
- duas lições por categoria.

Isto permite validar toda a experiência.

---

# Responsividade

Testar explicitamente:

```text
1440px
1024px
768px
390px
```

---

# Regras

Não inventar estatísticas.

Não apresentar aconselhamento financeiro, médico ou jurídico individual.

Na Literacia Cívica manter neutralidade política.

Na Segurança e Autoproteção privilegiar prevenção, afastamento e procura de ajuda; não criar instruções de combate.

---

# Qualidade

O código deve ser:

- legível;
- comentado apenas quando necessário;
- semanticamente estruturado;
- acessível;
- fácil de alterar;
- adequado a GitHub Pages.

---

# Resultado esperado

No final quero conseguir:

1. abrir o site;
2. ver as dez literacias;
3. recolher a sidebar;
4. abrir uma literacia;
5. abrir uma lição;
6. responder a um quiz;
7. ganhar XP;
8. ver a barra de progresso atualizar;
9. fechar o browser;
10. regressar e manter o progresso.

Nada mais é necessário para o primeiro MVP.
