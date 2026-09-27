(function () {
  "use strict";
  const data = window.LITERACIES;
  const main = document.querySelector("main");
  const page = document.body.dataset.page;
  const id = new URLSearchParams(location.search).get("id");
  const all = data.flatMap((area) =>
    area.categories.flatMap((category) =>
      category.lessons.map((lesson) => ({ ...lesson, area, category })),
    ),
  );
  const e = (value) =>
    String(value).replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const normalize = (value) =>
    value
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const lessonURL = (lesson) =>
    "licao.html?id=" + encodeURIComponent(lesson.id);
  const areaURL = (area) => "literacia.html?id=" + encodeURIComponent(area.id);
  const paths = {
    book: '<path d="M12 5c-3-2-7-2-10-1v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1Zm0 0v15"/>',
    wallet:
      '<path d="M20 8V5H5a3 3 0 0 0 0 6h16v9H5a3 3 0 0 1-3-3V8m19 5h-5v4h5"/>',
    monitor:
      '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/>',
    utensils:
      '<path d="M4 3v6m4-6v6M2 3v5a4 4 0 0 0 8 0V3M6 12v9M19 3c-4 3-4 8 0 9v9m0-18v9"/>',
    flask:
      '<path d="M9 3h6m-5 0v6L4 19c-.5 1 0 2 2 2h12c2 0 2.5-1 2-2L14 9V3M7 15h10"/>',
    leaf: '<path d="M20 3C9 2 3 6 4 14c1 7 13 9 16-11ZM4 21 15 10"/>',
    scale:
      '<path d="M12 3v18m-5 0h10M3 7l9-3 9 3M5 7l-4 8h8L5 7Zm14 0-4 8h8l-4-8Z"/>',
    news: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 7h10M7 11h4v6H7zm8 0h2m-2 4h2m-2 3h2"/>',
    landmark:
      '<path d="m2 8 10-6 10 6H2Zm2 3v7m5-7v7m6-7v7m5-7v7M2 22h20M3 19h18"/>',
    sparkles:
      '<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3ZM20 2v4m-2-2h4"/>',
    shield:
      '<path d="m12 2 9 4v6c0 5-6 8-9 10-3-2-9-5-9-10V6l9-4Z"/><path d="m8 12 3 3 5-6"/>',
    home: '<path d="m3 10 9-8 9 8v11h-6v-7H9v7H3Z"/>',
    target:
      '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    chart: '<path d="M4 20V10m8 10V4m8 16v-7"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="m8 13-2 9 6-3 6 3-2-9"/>',
    bookmark: '<path d="M6 3h12v19l-6-4-6 4V3Z"/>',
    settings:
      '<circle cx="12" cy="12" r="4"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    search: '<circle cx="10" cy="10" r="7"/><path d="m15 15 6 6"/>',
    arrow: '<path d="M4 12h16m-6-6 6 6-6 6"/>',
    close: '<path d="m5 5 14 14M5 19 19 5"/>',
    panel:
      '<rect x="2" y="3" width="20" height="18" rx="2"/><path d="M8 3v18"/>',
  };
  const icon = (name) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || paths.book}</svg>`;
  const bar = (list, label = "") =>
    `<div class="progress-block"><div class="progress-label"><span>${e(label || `${Progress.count(list)} de ${list.length} lições concluídas`)}</span><strong>${Progress.percent(list)}%</strong></div><progress max="100" value="${Progress.percent(list)}" aria-label="${e(label || "Progresso das lições")}">${Progress.percent(list)}%</progress></div>`;
  const ui = LearningUI.init({ data, all, e, icon, bar, areaURL, lessonURL });
  const currentArea =
    data.find((a) => a.id === id) || all.find((l) => l.id === id)?.area;
  document.body.setAttribute("style", LearningUI.theme(currentArea?.id));
  const link = (href, label, name, active) =>
    `<a href="${href}" class="nav-link${active ? " active" : ""}" ${active ? 'aria-current="page"' : ""} title="${e(label)}">${icon(name)}<span>${e(label)}</span></a>`;
  const nav = document.querySelector("#sidebar");
  nav.innerHTML = `<div class="brand-row"><a class="brand" href="index.html" aria-label="A Literacia — início"><span class="brand-symbol">${icon("book")}</span><span class="brand-label">A Literacia<span class="brand-caption">APRENDER PARA A VIDA</span></span></a><button class="icon-button mobile-close" aria-label="Fechar menu">${icon("close")}</button></div>
    <nav aria-label="Navegação principal">${link("index.html", "Início", "home", page === "home")}<p class="nav-heading">EXPLORAR LITERACIAS</p>${data.map((a) => link(areaURL(a), a.shortTitle, a.icon, page === "area" && id === a.id)).join("")}
    <div class="nav-divider"></div>${link("missoes.html", "Missões", "target", page === "missions")}${link("progresso.html", "Progresso", "chart", page === "progress")}${link("conquistas.html", "Conquistas", "award", page === "achievements")}${link("favoritos.html", "Favoritos", "bookmark", page === "favorites")}</nav>
    <div class="sidebar-bottom">${link("definicoes.html", "Definições", "settings", page === "settings")}<button id="collapse" class="nav-link" title="Recolher menu" aria-label="Recolher menu" aria-expanded="true">${icon("panel")}<span>Recolher menu</span></button><p class="local-note">O teu ritmo. O teu caminho.</p></div>`;
  document.querySelector("#menu").innerHTML = icon("menu");
  document.querySelector("#top-logo").innerHTML = icon("book") + " A Literacia";
  const media = matchMedia("(max-width: 768px)");
  const overlay = document.querySelector("#overlay");
  function drawer(open) {
    document.body.classList.toggle("drawer-open", open);
    document.querySelector("#menu").setAttribute("aria-expanded", String(open));
    overlay.hidden = !open;
    nav.inert = media.matches && !open;
    document.querySelector("#shell").inert = open;
    document.body.style.overflow = open ? "hidden" : "";
    if (open) nav.querySelector("a").focus();
    else if (media.matches) document.querySelector("#menu").focus();
  }
  function setCollapsed(value) {
    document.body.classList.toggle("sidebar-collapsed", value);
    document
      .querySelector("#collapse")
      .setAttribute("aria-expanded", String(!value));
    document
      .querySelector("#collapse")
      .setAttribute("aria-label", value ? "Expandir menu" : "Recolher menu");
    document.querySelector("#collapse").title = value
      ? "Expandir menu"
      : "Recolher menu";
  }
  const tablet = matchMedia("(min-width: 769px) and (max-width: 1100px)");
  const preferredCollapsed = () =>
    tablet.matches || Store.preference("sidebar", "open") === "closed";
  setCollapsed(preferredCollapsed());
  tablet.addEventListener("change", () => setCollapsed(preferredCollapsed()));
  nav.inert = media.matches;
  const navTooltip = document.createElement("div");
  navTooltip.className = "nav-tooltip";
  navTooltip.setAttribute("role", "tooltip");
  navTooltip.hidden = true;
  document.body.append(navTooltip);
  function showNavTooltip(event) {
    if (media.matches || !document.body.classList.contains("sidebar-collapsed"))
      return;
    const target = event.target.closest(".nav-link");
    if (!target) return;
    navTooltip.textContent = target.title;
    navTooltip.style.top =
      Math.max(
        8,
        Math.min(innerHeight - 50, target.getBoundingClientRect().top),
      ) + "px";
    navTooltip.hidden = false;
  }
  nav.addEventListener("focusin", showNavTooltip);
  nav.addEventListener("mouseover", showNavTooltip);
  for (const type of ["focusout", "mouseout", "click", "scroll"])
    nav.addEventListener(type, () => {
      navTooltip.hidden = true;
    });
  document.querySelector("#collapse").onclick = () => {
    const collapsed = !document.body.classList.contains("sidebar-collapsed");
    setCollapsed(collapsed);
    Store.setPreference("sidebar", collapsed ? "closed" : "open");
  };
  document.querySelector("#menu").onclick = () => drawer(true);
  document.querySelector(".mobile-close").onclick = () => drawer(false);
  overlay.onclick = () => drawer(false);
  media.addEventListener("change", () => {
    drawer(false);
    nav.inert = media.matches;
  });
  document.addEventListener("keydown", (event) => {
    if (!document.body.classList.contains("drawer-open")) return;
    if (event.key === "Escape") {
      drawer(false);
      return;
    }
    if (event.key === "Tab") {
      const focusable = [...nav.querySelectorAll("a,button")].filter(
        (n) => n.getClientRects().length,
      );
      const first = focusable[0],
        last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
  function stats() {
    const l = Progress.level();
    document.querySelector("#status").innerHTML =
      `<span class="xp">${icon("sparkles")} ${l.xp} XP</span><span class="level">Nível ${l.number} · ${l.name}</span>`;
    const warning = document.querySelector("#storage-warning");
    warning.hidden = Store.available;
  }
  Store.recognize(
    Progress.achievements()
      .filter((a) => a.unlocked)
      .map((a) => a.title),
    true,
  );
  let previousAchievements = Progress.achievements()
    .filter((a) => a.unlocked)
    .map((a) => a.title);
  function toast(text) {
    const box = document.querySelector("#toast");
    box.textContent = text;
    box.hidden = false;
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => {
      box.hidden = true;
    }, 6000);
  }
  window.addEventListener("progresschange", () => {
    stats();
    const unlocked = Progress.achievements()
      .filter((a) => a.unlocked)
      .map((a) => a.title);
    const fresh = unlocked.filter((t) => !previousAchievements.includes(t));
    Store.recognize(unlocked);
    if (fresh.length) {
      toast("Conquista desbloqueada: " + fresh.join(", "));
      const dialog = document.querySelector("#achievement-dialog");
      if (dialog) {
        document.querySelector("#achievement-name").textContent =
          fresh.join(" · ");
        if (!dialog.open) dialog.showModal();
      }
    }
    previousAchievements = unlocked;
  });
  stats();
  const dialog = document.querySelector("#achievement-dialog");
  if (dialog) {
    document.querySelector("#achievement-close").onclick = () => {
      dialog.close();
      if (!document.activeElement || document.activeElement.disabled)
        main.focus();
    };
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) dialog.close();
    });
  }
  const sourceList = (area, lesson) => ui.sourceMarkup(area, lesson);
  const notice = (area) =>
    ["financeira", "juridica", "alimentar"].includes(area.id)
      ? `<p class="notice">Conteúdo educativo geral. Não substitui aconselhamento ${area.id === "financeira" ? "financeiro" : area.id === "juridica" ? "jurídico" : "nutricional ou médico"} adaptado à tua situação.</p>`
      : "";
  function title(text, subtitle, eyebrow = "APRENDER PARA DECIDIR MELHOR") {
    document.title = text + " — A Literacia";
    document.querySelector('meta[name="description"]').content = subtitle;
    document.querySelector('meta[property="og:title"]').content =
      document.title;
    document.querySelector('meta[property="og:description"]').content =
      subtitle;
    return `<header class="page-heading"><p class="eyebrow">${e(eyebrow)}</p><h1>${e(text)}</h1><p class="lead">${e(subtitle)}</p></header>`;
  }
  function lessonRow(l, i) {
    const done = Store.state.completedLessons.includes(l.id);
    return `<a class="lesson-row" href="${lessonURL(l)}"><span class="lesson-number ${done ? "done" : ""}">${done ? "✓" : String(i + 1).padStart(2, "0")}</span><span class="lesson-info"><strong>${e(l.title)}</strong><span>${e(l.summary)}</span></span><span class="lesson-meta">${done ? "Concluída" : "3 min · 20 XP"} ${icon("arrow")}</span></a>`;
  }
  function card(area) {
    const list = area.categories.flatMap((c) => c.lessons);
    return `<article class="literacy-card" style="${ui.theme(area.id)}"><div class="card-top"><span class="area-icon tone-${e(area.id)}">${icon(area.icon)}</span><span class="small">${list.length} lições</span></div><h3>${e(area.title)}</h3><p>${e(area.description)}</p>${bar(list)}<a class="explore" href="${areaURL(area)}" aria-label="Explorar ${e(area.title)}">Explorar ${icon("arrow")}</a></article>`;
  }
  function home() {
    main.innerHTML = window.HomeV2
      ? HomeV2.render({ data, all, e, lessonURL, areaURL })
      : ui.homeMarkup();
    if (window.HomeV2) HomeV2.mount();
    document.querySelector("#search").addEventListener("input", (event) => {
      const query = normalize(event.target.value.trim());
      const grid = document.querySelector("#area-grid"),
        result = document.querySelector("#search-results"),
        status = document.querySelector("#search-status");
      if (!query) {
        grid.hidden = false;
        result.innerHTML = "";
        status.textContent = "";
        return;
      }
      grid.hidden = true;
      const areas = data.filter((a) =>
        normalize(
          [
            a.title,
            a.description,
            a.shortTitle,
            ...a.categories.map((c) => c.title),
          ].join(" "),
        ).includes(query),
      );
      const matches = all.filter((l) =>
        normalize(
          [
            l.title,
            l.summary,
            l.area.title,
            l.category.title,
            ...l.keywords,
            ...l.aliases,
          ].join(" "),
        ).includes(query),
      );
      status.textContent = `${areas.length} ${areas.length === 1 ? "literacia" : "literacias"} e ${matches.length} ${matches.length === 1 ? "lição encontrada" : "lições encontradas"}.`;
      result.innerHTML =
        (areas.length
          ? `<div class="search-areas">${areas.map((a) => `<a class="search-area" href="${areaURL(a)}" style="${ui.theme(a.id)}"><span class="area-icon">${icon(a.icon)}</span><span><strong>${e(a.title)}</strong><small>Explorar percurso</small></span>${icon("arrow")}</a>`).join("")}</div>`
          : "") +
        (matches.length
          ? `<h2 class="results-heading">Lições para explorar</h2><div class="lesson-list">${matches.map(lessonRow).join("")}</div>`
          : "") +
        (!areas.length && !matches.length
          ? '<div class="empty"><h2>Ainda não encontrámos esse tema.</h2><p>Experimenta dinheiro, fontes, consentimento ou segurança.</p></div>'
          : "");
    });
  }
  function areaPage() {
    const area = data.find((a) => a.id === id);
    if (!area) return missing();
    document.title = area.title + " — A Literacia";
    document.querySelector('meta[name="description"]').content =
      area.description;
    document.querySelector('meta[property="og:title"]').content =
      document.title;
    document.querySelector('meta[property="og:description"]').content =
      area.description;
    main.innerHTML = ui.areaMarkup(area) + notice(area) + sourceList(area);
  }
  function lessonPage() {
    const lesson = all.find((l) => l.id === id);
    if (!lesson) return missing();
    const wasCompleted = Store.state.completedLessons.includes(lesson.id);
    Store.last(lesson.id);
    const siblings = all.filter((l) => l.area.id === lesson.area.id);
    const index = siblings.findIndex((l) => l.id === id);
    main.innerHTML = `<div class="lesson-toolbar"><a class="back-link" href="${areaURL(lesson.area)}">← ${e(lesson.area.title)}</a><button id="favorite" class="button ghost" aria-pressed="false"></button></div><article class="lesson-article">${title(lesson.title, lesson.summary, `${lesson.category.title} · LIÇÃO ${index + 1} DE ${siblings.length} · 3 MIN`)}<div id="lesson-progress">${bar(siblings)}</div><div id="lesson-mini-path">${ui.miniPath(lesson)}</div><div class="lesson-steps" aria-label="Nesta lição"><a href="#quick">Em 10 segundos</a><a href="#explain">Explica-me</a><a href="#example">Mostra-me</a><a href="#experiment">Experimenta</a><a href="#quiz">Testa-me</a><a href="#apply">Aplica</a><a href="#sources">Fontes</a></div>
      <section class="quick-box" id="quick"><p class="eyebrow">01 / EM 10 SEGUNDOS</p><h2>${e(lesson.quick)}</h2></section><section class="lesson-section" id="explain"><p class="eyebrow">02 / EXPLICA-ME</p><h2>Vamos por partes.</h2>${lesson.explain.map((p) => `<p>${e(p)}</p>`).join("")}</section><section class="example-box" id="example"><p class="eyebrow">03 / MOSTRA-ME</p><h2>${e(lesson.example.title)}</h2><p>${e(lesson.example.text)}</p></section><section class="lesson-section" id="experiment"><p class="eyebrow">04 / EXPERIMENTA</p><h2>Faz a ligação.</h2><div id="practice"></div></section><section class="quiz-card" id="quiz"><p class="eyebrow">05 / TESTA-ME · 10 XP</p><h2>Uma pergunta para recordar.</h2><div id="lesson-quiz"></div></section><section class="lesson-section" id="apply"><p class="eyebrow">06 / APLICA</p><h2>Leva isto contigo.</h2><p>${e(lesson.activity)}</p><p class="small">Esta atividade fica contigo. Não precisas de enviar respostas nem dados pessoais.</p></section>${notice(lesson.area)}${sourceList(lesson.area, lesson)}<div class="completion-box"><div><strong id="completion-title">Pronto para guardar este passo?</strong><p id="completion-hint">Responde corretamente ao quiz para concluir a lição.</p></div><button id="complete" class="button primary">Concluir lição · 20 XP</button></div><nav class="lesson-pagination" aria-label="Lições">${index > 0 ? `<a href="${lessonURL(siblings[index - 1])}">← ${e(siblings[index - 1].title)}</a>` : "<span></span>"}${index < siblings.length - 1 ? `<a href="${lessonURL(siblings[index + 1])}">${e(siblings[index + 1].title)} →</a>` : `<a href="${areaURL(lesson.area)}">Voltar à literacia →</a>`}</nav></article>`;
    const favorite = document.querySelector("#favorite");
    function refreshFavorite() {
      const saved = Store.state.favorites.includes(id);
      favorite.setAttribute("aria-pressed", String(saved));
      favorite.innerHTML = icon("bookmark") + (saved ? "Guardado" : "Guardar");
    }
    favorite.onclick = () => {
      Store.favorite(id);
      refreshFavorite();
    };
    refreshFavorite();
    if (lesson.area.id === "financeira") {
      document.querySelector("#practice").innerHTML =
        '<p>Exemplo fictício: tens 50 €. Move o controlo e observa quanto resta depois dos gastos.</p><label for="spending">Despesas: <output id="spending-value">25 €</output></label><input type="range" id="spending" min="0" max="60" value="25" step="1"><p id="balance" class="balance" role="status">Restam 25 €.</p>';
      document.querySelector("#spending").oninput = (event) => {
        const spent = Number(event.target.value),
          balance = 50 - spent;
        document.querySelector("#spending-value").textContent = spent + " €";
        document.querySelector("#balance").textContent =
          balance >= 0
            ? `Restam ${balance} €. Entradas − saídas = saldo.`
            : `Faltam ${Math.abs(balance)} €. O plano ultrapassa o disponível.`;
      };
    } else {
      document.querySelector("#practice").innerHTML =
        `<p>Relê o exemplo e explica, por palavras tuas, como se liga à ideia principal.</p><details class="reflection"><summary>Comparar com uma pista</summary><p>${e(lesson.quick)}</p><p>Consegues imaginar outra situação em que esta ideia seja útil?</p></details>`;
    }
    function refreshCompletion() {
      const done = Store.state.completedLessons.includes(id);
      const button = document.querySelector("#complete");
      button.disabled = done || !Store.state.quizzes.includes(id);
      button.textContent = done
        ? "✓ Lição concluída"
        : "Concluir lição · 20 XP";
      document.querySelector("#completion-hint").textContent = done
        ? "Este passo já está no teu percurso. Podes rever quando quiseres."
        : Store.state.quizzes.includes(id)
          ? "Já acertaste no quiz. Conclui para guardar o teu progresso."
          : "Responde corretamente ao quiz para concluir a lição.";
      document.querySelector("#lesson-progress").innerHTML = bar(siblings);
      document.querySelector("#lesson-mini-path").innerHTML =
        ui.miniPath(lesson);
      document.querySelector("#completion-title").textContent = done
        ? Store.state.masteredLessons.includes(id)
          ? "Conhecimento revisto. Mais um passo consolidado."
          : "Lição concluída. A próxima etapa espera por ti."
        : "Pronto para guardar este passo?";
    }
    Quiz.mount(document.querySelector("#lesson-quiz"), lesson.quiz, {
      id,
      field: "quizzes",
      reward: 10,
      onSuccess: () => {
        if (wasCompleted) Store.add("masteredLessons", id);
        refreshCompletion();
      },
    });
    document.querySelector("#complete").onclick = () => {
      if (!Store.state.quizzes.includes(id)) return;
      Store.add("completedLessons", id);
      refreshCompletion();
    };
    refreshCompletion();
  }
  function missions() {
    const selected = data.find((a) => a.id === id);
    main.innerHTML =
      title(
        "Experimenta. Decide. Aprende.",
        "Pequenas situações, grandes oportunidades de pôr o conhecimento em prática.",
        "LABORATÓRIO DA VIDA REAL",
      ) +
      `<div class="filter-links"><a class="chip ${!selected ? "selected" : ""}" href="missoes.html">Todas as missões</a>${data.map((a) => `<a class="chip ${selected?.id === a.id ? "selected" : ""}" href="missoes.html?id=${a.id}" style="${ui.theme(a.id)}">${icon(a.icon)}${e(a.shortTitle)}</a>`).join("")}</div>${selected ? '<section id="interactive-experience"></section>' : `<section class="lab-introduction"><span>${icon("target")}</span><div><h2>Aprende fazendo.</h2><p>Distribui um orçamento, compõe um prato, explora uma mensagem ou escolhe uma rota. Abre uma literacia para experimentar o laboratório.</p></div></section>`}<div class="missions-grid">${(selected ? [selected] : data).flatMap((a) => (a.missions || [a.mission]).map((m) => `<section class="quiz-card mission-quiz" style="${ui.theme(a.id)}"><div class="mission-top"><span class="area-icon">${icon(a.icon)}</span><span class="mission-xp">${Store.state.missions.includes(m.id) ? "✓ Concluída" : "25 XP"}</span></div><p class="eyebrow">${e(a.title)}</p><h2>${e(m.title)}</h2>${m.scene ? `<div class="civic-scene" aria-hidden="true"><span>${{ door: "↔", clock: "20:00 → 20:40", seat: "♡", help: "“Não, obrigado.”" }[m.scene]}</span></div>` : ""}<div id="${m.id}"></div><a class="text-link" href="${selected ? areaURL(a) : "missoes.html?id=" + a.id}">${selected ? "Rever o percurso" : "Abrir laboratório"} ${icon("arrow")}</a></section>`)).join("")}</div>`;
    if (selected)
      Experiences.mount(
        document.querySelector("#interactive-experience"),
        selected,
      );
    (selected ? [selected] : data).forEach((a) =>
      (a.missions || [a.mission]).forEach((m) =>
        Quiz.mount(document.getElementById(m.id), m, {
          id: m.id,
          field: "missions",
          reward: 25,
          onSuccess: () => {
            document
              .getElementById(m.id)
              .closest(".mission-quiz")
              .querySelector(".mission-xp").textContent = "✓ Concluída";
          },
        }),
      ),
    );
  }
  function challenge() {
    const area = data.find((a) => a.id === id);
    if (!area) return missing();
    const list = area.categories.flatMap((c) => c.lessons);
    main.innerHTML = `<a class="back-link" href="${areaURL(area)}">← ${e(area.title)}</a>${title("Desafio final — vida real", area.description, "JUNTA O QUE APRENDESTE")}`;
    if (
      Progress.count(list) !== list.length &&
      !Store.state.challenges.includes(area.challenge.id)
    ) {
      main.innerHTML += `<div class="empty"><h2>Mais alguns passos antes do desafio.</h2><p>Conclui as ${list.length} lições desta literacia para desbloquear este cenário.</p>${bar(list)}<a class="button primary" href="${areaURL(area)}">Continuar a aprender</a></div>`;
      return;
    }
    main.innerHTML +=
      '<section class="quiz-card challenge-card"><p class="eyebrow">UM CENÁRIO · 50 XP</p><div id="final-quiz"></div></section>';
    Quiz.mount(document.querySelector("#final-quiz"), area.challenge, {
      id: area.challenge.id,
      field: "challenges",
      reward: 50,
      onSuccess: () =>
        toast("Desafio superado. Mais uma decisão com conhecimento."),
    });
  }
  function progressPage() {
    const level = Progress.level();
    main.innerHTML =
      title(
        "O teu percurso, ao teu ritmo.",
        "Cada lição é um passo. Podes parar, voltar e rever sem perder o que aprendeste.",
        "O TEU PROGRESSO",
      ) +
      `<section class="progress-overview"><div><p class="eyebrow">NÍVEL ${level.number}</p><h2>${level.name}</h2><p>${level.next ? `Faltam ${level.next - level.xp} XP para o próximo nível.` : "Chegaste ao nível Mentor. Continua a explorar."}</p></div><div class="big-stat"><strong>${level.xp}</strong><span>XP conquistados</span></div><div class="big-stat"><strong>${Progress.count()}<small> / ${all.length}</small></strong><span>lições concluídas</span></div></section><section class="summary-card">${bar(all)}</section><h2 class="results-heading">O caminho em cada literacia</h2><div class="card-grid">${data.map(card).join("")}</div><p class="notice">O progresso é guardado apenas neste navegador e dispositivo. Limpar os dados do navegador pode apagá-lo. Não é sincronizado entre dispositivos.</p>`;
  }
  function achievementsPage() {
    main.innerHTML =
      title(
        "Pequenas conquistas, novos olhares.",
        "Reconhecer o que aprendeste também faz parte do caminho.",
        "AS TUAS CONQUISTAS",
      ) +
      `<div class="achievement-grid">${Progress.achievements()
        .map(
          (a) =>
            `<article class="achievement ${a.unlocked ? "unlocked" : ""}"><span class="area-icon">${icon("award")}</span><span class="badge">${a.unlocked ? "✓ Desbloqueada" : "Por descobrir"}</span><h2>${e(a.title)}</h2><p>${e(a.description)}</p></article>`,
        )
        .join("")}</div>`;
  }
  function favorites() {
    const list = all.filter((l) => Store.state.favorites.includes(l.id));
    main.innerHTML =
      title(
        "Guarda o que queres recordar.",
        "As tuas lições favoritas, reunidas num só lugar.",
        "FAVORITOS",
      ) +
      (list.length
        ? `<div class="lesson-list">${list.map(lessonRow).join("")}</div>`
        : `<div class="empty">${icon("bookmark")}<h2>Um lugar para as tuas descobertas.</h2><p>Usa “Guardar” numa lição para a encontrares aqui.</p><a class="button primary" href="index.html">Explorar literacias</a></div>`);
  }
  function settings() {
    main.innerHTML =
      title(
        "Uma experiência à tua medida.",
        "Escolhe como preferes ler e compreende onde fica o teu progresso.",
        "DEFINIÇÕES",
      ) +
      `<section class="summary-card settings-card"><h2>Perfil de explicação</h2><label for="profile">Guardar a minha preferência</label><select id="profile"><option value="adult">Adulto</option><option value="16-17">16–17 anos</option><option value="12-15">12–15 anos</option><option value="8-11">8–11 anos</option></select><p class="small">Nesta primeira versão, as explicações são iguais para todos. A preferência fica guardada para futuras versões adaptadas.</p><p id="preference-feedback" role="status"></p></section><section class="summary-card settings-card"><h2>Os teus dados ficam aqui.</h2><p>Guardamos progresso, XP, favoritos, última lição e preferências no armazenamento local deste navegador. Não existe conta nem sincronização. O site não usa serviços de análise ou publicidade.</p><p>O alojamento GitHub Pages pode registar acessos segundo a <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer">política de privacidade do GitHub</a>.</p></section><section class="summary-card settings-card"><h2>Recomeçar o percurso</h2><p>Apaga o progresso, os favoritos e os XP guardados neste navegador.</p><button id="reset-open" class="button secondary">Repor progresso</button><div id="reset-confirm" hidden><p><strong>Queres apagar o progresso neste navegador?</strong> Esta ação não pode ser desfeita.</p><div class="button-row"><button id="reset-cancel" class="button secondary">Cancelar</button><button id="reset" class="button danger">Sim, apagar o progresso</button></div></div><p id="reset-result" role="status"></p></section>`;
    const profile = document.querySelector("#profile");
    profile.value = Store.preference("profile", "adult");
    profile.onchange = () => {
      Store.setPreference("profile", profile.value);
      document.querySelector("#preference-feedback").textContent =
        Store.available
          ? "Preferência guardada."
          : "Não foi possível guardar a preferência neste navegador.";
      stats();
    };
    document.querySelector("#reset-open").onclick = () => {
      document.querySelector("#reset-confirm").hidden = false;
      document.querySelector("#reset-cancel").focus();
    };
    document.querySelector("#reset-cancel").onclick = () => {
      document.querySelector("#reset-confirm").hidden = true;
      document.querySelector("#reset-open").focus();
    };
    document.querySelector("#reset").onclick = () => {
      Store.reset();
      document.querySelector("#reset-confirm").hidden = true;
      document.querySelector("#reset-result").textContent =
        "Progresso reposto. Podes começar um novo percurso.";
      document.querySelector("#reset-open").focus();
    };
  }
  function missing() {
    main.innerHTML =
      title(
        "Este caminho não foi encontrado.",
        "Podes voltar à biblioteca e escolher uma literacia.",
        "VAMOS ENCONTRAR O CAMINHO",
      ) + '<a class="button primary" href="index.html">Voltar ao início</a>';
  }
  (
    ({
      home,
      area: areaPage,
      lesson: lessonPage,
      missions,
      challenge,
      progress: progressPage,
      achievements: achievementsPage,
      favorites,
      settings,
      missing,
    })[page] || missing
  )();
})();
