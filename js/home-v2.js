(function () {
  const worlds = {
    financeira: [
      "Cada escolha conta.",
      "Percebe como o dinheiro se move e dá um destino às tuas escolhas.",
      "#00A878",
      "#DCEDE1",
      [9, 19, 24],
    ],
    digital: [
      "O mundo está ligado. E tu?",
      "Navega com confiança. Reconhece riscos e protege o que é teu.",
      "#2979FF",
      "#E1EAF1",
      [63, 8, 26],
    ],
    alimentar: [
      "Há mais no teu prato.",
      "Descobre alimentos, escolhas e pequenos hábitos que fazem parte do dia.",
      "#FF7A45",
      "#F4E5D9",
      [41, 72, 20],
    ],
    cientifica: [
      "A curiosidade é um começo.",
      "Faz perguntas. Procura evidência. Dá espaço a uma explicação melhor.",
      "#7C4DFF",
      "#E9E3F0",
      [29, 0, 20],
    ],
    ambiental: [
      "Fazemos parte do mesmo mundo.",
      "Liga as escolhas do dia a dia ao planeta que partilhamos.",
      "#45A557",
      "#E2ECD9",
      [69, 55, 24],
    ],
    juridica: [
      "Conhecer também é proteger.",
      "Direitos, deveres e decisões: compreende as regras que se cruzam contigo.",
      "#9D174D",
      "#F0E0E5",
      [0, 45, 18],
    ],
    mediatica: [
      "Antes de partilhar, olha outra vez.",
      "Lê para lá do título. Descobre quem diz, como sabe e o que falta.",
      "#E0A800",
      "#F1ECD3",
      [47, 6, 17],
    ],
    civica: [
      "Viver melhor, em conjunto.",
      "Cortesia, limites e participação. O espaço comum também é nosso.",
      "#2456D7",
      "#E0E8EF",
      [16, 66, 22],
    ],
    ia: [
      "Uma resposta não é o fim.",
      "Explora a inteligência artificial com curiosidade e sentido crítico.",
      "#6C4CF1",
      "#E9E2F1",
      [76, 31, 18],
    ],
    seguranca: [
      "Prevenir é ganhar espaço.",
      "Reconhece sinais, encontra apoio e aprende a escolher uma ação prudente.",
      "#E84A3C",
      "#F2E0D9",
      [59, 69, 19],
    ],
  };
  function render({ data, all, e, lessonURL, areaURL }) {
    const last = all.find((l) => l.id === Store.state.lastLesson);
    const next =
      last && !Store.state.completedLessons.includes(last.id)
        ? last
        : all.find(
            (l) =>
              !Store.state.completedLessons.includes(l.id) &&
              (!last || l.area.id === last.area.id),
          ) ||
          all.find((l) => !Store.state.completedLessons.includes(l.id)) ||
          all[0];
    const level = Progress.level();
    const objects = data
      .map((a) => {
        const w = worlds[a.id],
          [x, y, size] = w[4];
        return `<button class="world-object" data-world="${a.id}" style="--ox:${x}%;--oy:${y}%;--ow:${size}%" aria-label="Descobrir ${e(a.shortTitle)}" aria-pressed="false" aria-controls="world-caption"><img src="assets/worlds/${a.id}.svg" alt="" width="300" height="270"><span>${e(a.shortTitle)}</span></button>`;
      })
      .join("");
    return `<section class="v2-hero" aria-labelledby="home-title"><div class="v2-intro"><p class="v2-signature">Um mundo de possibilidades.</p><h1 id="home-title">Aprender para<br><em>decidir melhor.</em></h1><p class="v2-subtitle">Conhecimento prático<br>para a vida real.</p><a class="explore-button" href="#worlds-title">Explorar <span aria-hidden="true">↗</span></a><p class="hero-note">Dez mundos. O teu caminho.</p></div><figure class="world-stage"><div class="world-scene" role="group" aria-label="O mundo da literacia"><img class="book-island" src="assets/worlds/book-island.svg" alt="Livro aberto sobre uma pequena ilha, rodeado por mundos de conhecimento." width="700" height="530">${objects}</div><figcaption id="world-caption" class="world-caption" aria-live="polite"><span class="caption-index" aria-hidden="true">↗</span><div><strong id="world-name">Segue a tua curiosidade.</strong><p id="world-description">Escolhe um objeto e descobre um mundo.</p><a id="world-link" href="#worlds-title">Ver todos os mundos <span aria-hidden="true">→</span></a></div></figcaption></figure></section>
    <section class="v2-journey resume-card" aria-labelledby="journey-title"><div><p class="v2-kicker">${last ? "O teu próximo passo" : "Começa por uma descoberta"}</p><h2 id="journey-title">${e(next.title)}</h2><p>${e(next.area.shortTitle)} · ${next.minutes || 3} min <a href="${lessonURL(next)}">${last ? "Continuar percurso" : "Começar a aprender"} <span aria-hidden="true">→</span></a></p></div><div class="journey-line"><span>Nível ${level.number} — ${e(level.name)}</span><progress value="${Progress.percent()}" max="100" aria-label="${Progress.percent()}% das lições concluídas"></progress><p>${Progress.count()} de ${all.length} lições concluídas <span>${level.xp} XP</span></p><a href="progresso.html">O meu percurso ↗</a></div></section>
    <section class="v2-worlds" aria-labelledby="worlds-title"><header class="worlds-heading"><div><p class="v2-kicker">O conhecimento começa numa pergunta.</p><h2 id="worlds-title" tabindex="-1">Escolhe um mundo.</h2></div><label class="v2-search"><span class="sr-only">Pesquisar literacias e lições</span><span aria-hidden="true">⌕</span><input id="search" type="search" placeholder="O que queres descobrir?" autocomplete="off"></label></header><p id="search-status" role="status" aria-live="polite"></p><div id="search-results"></div><div id="area-grid">${data
      .map((a, i) => {
        const w = worlds[a.id],
          lessons = a.categories.flatMap((c) => c.lessons),
          p = Progress.percent(lessons);
        return `<article class="editorial-world ${i % 2 ? "reversed" : ""} world-${a.id}" style="--world-color:${w[2]};--world-paper:${w[3]}"><div class="world-illustration"><span class="world-land" aria-hidden="true"></span><img src="assets/worlds/${a.id}.svg" alt="" width="300" height="270" loading="lazy"><span class="world-number" aria-hidden="true">${String(i + 1).padStart(2, "0")}</span></div><div class="world-editorial"><p class="world-category">${e(a.shortTitle)}</p><h3>${w[0]}</h3><p>${w[1]}</p><div class="world-progress"><progress value="${p}" max="100" aria-label="${p}% de ${e(a.shortTitle)} concluído"></progress><span>${p ? p + "% explorado" : lessons.length + " pequenas descobertas"}</span></div><a class="world-entry" href="${areaURL(a)}" aria-label="Explorar ${e(a.title)}">${p ? "Continuar neste mundo" : "Explorar este mundo"} <span aria-hidden="true">↗</span></a></div></article>`;
      })
      .join(
        "",
      )}</div></section><section class="v2-ending"><p>Uma ideia nova pode mudar a próxima decisão.</p><a href="missoes.html">Leva o conhecimento para a vida. <span aria-hidden="true">↗</span></a></section>`;
  }
  function mount() {
    const buttons = [...document.querySelectorAll(".world-object")];
    const scene = document.querySelector(".world-scene");
    let selected = null;
    function show(id, committed = false) {
      const area = LITERACIES.find((a) => a.id === id);
      buttons.forEach((b) => {
        b.classList.toggle("highlighted", b.dataset.world === id);
        if (committed)
          b.setAttribute("aria-pressed", String(b.dataset.world === id));
      });
      scene.classList.toggle("has-selection", Boolean(id));
      if (!area) return;
      document.querySelector("#world-name").textContent = area.title;
      document.querySelector("#world-description").textContent = worlds[id][1];
      const link = document.querySelector("#world-link");
      link.href = "literacia.html?id=" + id;
      link.textContent = "Explorar mundo →";
    }
    buttons.forEach((b) => {
      b.addEventListener("pointerenter", () => show(b.dataset.world));
      b.addEventListener("focus", () => show(b.dataset.world));
      b.addEventListener("click", () => {
        selected = b.dataset.world;
        show(selected, true);
      });
    });
    scene.addEventListener("pointerleave", () => {
      if (selected) show(selected);
      else {
        scene.classList.remove("has-selection");
        buttons.forEach((b) => b.classList.remove("highlighted"));
      }
    });
    scene.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        selected = null;
        buttons.forEach((b) => b.setAttribute("aria-pressed", "false"));
        scene.classList.remove("has-selection");
        buttons.forEach((b) => b.classList.remove("highlighted"));
      }
    });
  }
  window.HomeV2 = { render, mount, worlds };
})();
