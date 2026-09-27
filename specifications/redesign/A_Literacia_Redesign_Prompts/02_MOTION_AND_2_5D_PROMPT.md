# MOTION + 2.5D PROMPT — A LITERACIA

## Objetivo

Adicionar profundidade e movimento sem comprometer:

- performance;
- acessibilidade;
- GitHub Pages;
- legibilidade.

---

# PRINCÍPIO

Preferir **2.5D** a 3D real.

Utilizar:

- transform;
- translate3d;
- rotate;
- scale;
- SVG;
- CSS perspective;
- parallax muito leve.

Não utilizar Three.js por defeito.

Só utilizar WebGL se existir uma experiência pedagógica que realmente beneficie disso.

---

# HOME

Nos cards/universos das literacias:

Financeira:
- moedas em camadas;
- pequena curva/gráfico;
- carteira estilizada.

Digital:
- telemóvel;
- shield;
- cursor.

Alimentar:
- prato;
- alimentos em camadas.

Científica:
- átomo;
- molécula;
- microscópio.

Ambiental:
- folha;
- planeta;
- água.

Jurídica:
- balança;
- documento;
- assinatura.

Mediática:
- jornal;
- microfone;
- feed.

Cívica:
- edifício público;
- pessoas;
- comunidade.

IA:
- rede;
- nós;
- spark.

Segurança:
- escudo;
- rota de saída;
- sinalização.

---

# HOVER

Ao mover o rato:

camadas podem mover entre:

```text
2px – 8px
```

Não exagerar.

---

# LEARNING PATH

Quando o utilizador conclui uma lição:

1. nó muda de estado;
2. linha até ao próximo nó ilumina;
3. XP é atualizado;
4. próxima etapa é destacada.

Sem confetti por defeito.

---

# QUIZZES

Feedback:

correto:
- pequena expansão;
- check;
- transição positiva.

incorreto:
- não utilizar shake agressivo;
- mostrar explicação.

---

# MISSÕES INTERATIVAS

Criar pequenas experiências visuais.

Exemplos:

## Financeira

Arrastar 100 € entre:

```text
Necessidades
Poupança
Lazer
Investimento
```

## Alimentar

Construir um prato por drag-and-drop.

## Digital

Identificar elementos suspeitos num telemóvel fictício.

## Mediática

Analisar uma notícia e marcar:

```text
fonte
data
autor
evidência
```

## Segurança

Escolher uma rota segura num cenário ilustrado.

---

# PERFORMANCE

Garantir:

- 60fps em equipamento médio;
- sem animações pesadas;
- lazy loading;
- `prefers-reduced-motion`.

---

# ACESSIBILIDADE

Todas as interações com drag-and-drop devem ter alternativa:

- click;
- keyboard;
- buttons.

Movimento não pode ser obrigatório para compreender conteúdo.
