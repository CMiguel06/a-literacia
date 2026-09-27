(function () {
  const themes = {
    financeira: ["#047857", "#10B981", "#ECFDF5"],
    digital: ["#1D4ED8", "#3B82F6", "#EFF6FF"],
    alimentar: ["#C2410C", "#F97316", "#FFF7ED"],
    cientifica: ["#6D28D9", "#8B5CF6", "#F5F3FF"],
    ambiental: ["#15803D", "#22C55E", "#F0FDF4"],
    juridica: ["#9F1239", "#BE185D", "#FFF1F2"],
    mediatica: ["#854D0E", "#EAB308", "#FEFCE8"],
    civica: ["#1D4ED8", "#2563EB", "#EFF6FF"],
    ia: ["#6D28D9", "#7C3AED", "#F5F3FF"],
    seguranca: ["#B91C1C", "#EF4444", "#FEF2F2"],
  };
  const theme = (id) => {
    const t = themes[id] || ["#334BA8", "#586CE0", "#EEF2FF"];
    return `--accent:${t[0]};--bright:${t[1]};--soft:${t[2]}`;
  };
  const statusSymbol = {
    available: "→",
    active: "▶",
    completed: "✓",
    mastered: "★",
    locked: "⌑",
  };
  const coordinates = {
    financeira: [13, 26],
    digital: [36, 15],
    cientifica: [60, 22],
    ia: [85, 14],
    juridica: [14, 75],
    ambiental: [36, 61],
    alimentar: [56, 81],
    mediatica: [77, 59],
    civica: [91, 84],
    seguranca: [10, 51],
  };
  function init({ data, all, e, icon, bar, areaURL, lessonURL }) {
    const list = (area) => area.categories.flatMap((c) => c.lessons);
    function emblem(area, size = "") {
      return `<span class="emblem ${size}" aria-hidden="true"><span class="emblem-shadow"></span><span class="emblem-back"></span><span class="emblem-face">${icon(area.icon)}</span><span class="emblem-detail">${icon(area.id === "financeira" ? "chart" : area.id === "digital" ? "shield" : area.id === "alimentar" ? "leaf" : area.id === "ia" ? "sparkles" : "book")}</span></span>`;
    }
    function sourceMarkup(area, lesson) {
      const items = lesson?.sources?.length ? lesson.sources : area.sources;
      const source = items[0];
      const extra = [
        ...items.slice(1),
        ...area.sources.filter((s) => !items.some((i) => i.url === s.url)),
      ];
      return `<section class="sources" id="sources"><div class="section-heading"><div><p class="eyebrow">APRENDE. CONFIRMA. APROFUNDA.</p><h2>Fontes e aprofundamento</h2></div>${icon("book")}</div><p class="source-intro">${e(lesson?.sourceNote || "O conhecimento não acaba nesta página. Consulta as referências e continua a explorar.")}</p>${source ? `<a class="source-card" href="${e(source.url)}" target="_blank" rel="noopener noreferrer"><span class="source-icon">${icon("book")}</span><span><span class="source-label">FONTE PRINCIPAL</span><strong>${e(source.title)}</strong><span class="source-domain">${e(new URL(source.url).hostname)}</span></span><span class="source-action">Aprofundar ↗</span></a>` : ""}${extra.length ? `<details class="extra-sources"><summary>Fontes complementares (${extra.length})</summary><ul>${extra.map((s) => `<li><a href="${e(s.url)}" target="_blank" rel="noopener noreferrer">${e(s.title)} ↗</a></li>`).join("")}</ul></details>` : ""}<p class="small source-date">Conteúdo educativo · Atualizado em setembro de 2026 · Exemplos fictícios</p></section>`;
    }
    function homeMarkup() {
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
      const level = Progress.level(),
        percent = Progress.percent();
      const earned = Progress.achievements()
        .filter((a) => a.unlocked)
        .sort(
          (a, b) =>
            (Store.state.achievementDates[b.title] || 0) -
            (Store.state.achievementDates[a.title] || 0),
        )
        .slice(0, 3);
      const edges = [
        ["financeira", "digital"],
        ["digital", "cientifica"],
        ["cientifica", "ia"],
        ["financeira", "seguranca"],
        ["seguranca", "juridica"],
        ["juridica", "ambiental"],
        ["ambiental", "alimentar"],
        ["digital", "ambiental"],
        ["cientifica", "mediatica"],
        ["ia", "mediatica"],
        ["mediatica", "civica"],
        ["alimentar", "civica"],
      ];
      return `<header class="home-heading"><div><p class="eyebrow">O TEU ESPAÇO PARA DESCOBRIR</p><h1>Aprender para <span>decidir melhor.</span></h1><p>Conhecimento prático para a vida real. Escolhe um caminho e dá o próximo passo.</p></div><span class="edition-tag">${data.length} universos<br><strong>${all.length} descobertas</strong></span></header>
      <label class="search-box">${icon("search")}<span class="sr-only">Pesquisar literacias e lições</span><input id="search" type="search" placeholder="O que queres compreender hoje? Dinheiro, IA, convivência…" autocomplete="off"><span class="search-caption">Explorar conhecimento</span></label><p id="search-status" class="small" role="status" aria-live="polite"></p><div id="search-results"></div>
      <div class="learning-overview"><section class="resume-card" style="${theme(next.area.id)}"><div class="resume-content"><p class="eyebrow">${last ? "CONTINUA DE ONDE FICASTE" : "O TEU PRIMEIRO PASSO"}</p><span class="topic-label">${icon(next.area.icon)} ${e(next.area.title)}</span><h2>${e(next.title)}</h2><p>Uma ideia, um exemplo, uma decisão melhor.</p><a class="button primary" href="${lessonURL(next)}">${last ? "Continuar percurso" : "Começar a aprender"} ${icon("arrow")}</a><span class="duration">${next.minutes || 3} min · até 30 XP</span></div>${emblem(next.area, "large")}</section><section class="journey-score"><div class="score-heading"><p class="eyebrow">O TEU PERCURSO</p><span class="level-pill">Nível ${level.number}</span></div><div class="score-body"><div class="progress-ring" style="--progress:${percent}" role="img" aria-label="${percent}% das lições concluídas"><span><strong>${percent}<small>%</small></strong><small>aprendido</small></span></div><div><h2>${level.name}</h2><strong class="score-xp">${level.xp} XP</strong><p>${Progress.count()} de ${all.length} lições</p></div></div><div class="level-progress"><span>${level.next ? `${level.next - level.xp} XP até ao próximo nível` : "Um mundo de conhecimento conquistado"}</span>${bar(all)}</div><a href="progresso.html" class="text-link">Ver o meu progresso ${icon("arrow")}</a></section></div>
      <section id="area-grid" class="discovery-section" aria-labelledby="explore-title"><div class="section-heading"><div><p class="eyebrow">TUDO SE LIGA</p><h2 id="explore-title">Um mundo de coisas para descobrir.</h2><p>Cada universo abre um caminho. Por onde queres começar?</p></div><span class="map-legend"><span></span>Escolhe uma literacia</span></div><div class="literacy-map"><svg class="constellation-lines" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${edges.map(([a, b]) => `<line x1="${coordinates[a][0]}" y1="${coordinates[a][1]}" x2="${coordinates[b][0]}" y2="${coordinates[b][1]}"/>`).join("")}</svg><div class="map-center" aria-hidden="true">${icon("sparkles")}<span>A curiosidade<br>liga os pontos.</span></div>${data
        .map((area) => {
          const l = list(area),
            p = Progress.percent(l);
          return `<a class="universe universe-${area.id}" href="${areaURL(area)}" style="${theme(area.id)};--x:${coordinates[area.id][0]}%;--y:${coordinates[area.id][1]}%" aria-label="Explorar ${e(area.title)}: ${Progress.count(l)} de ${l.length} lições concluídas"><span class="universe-orbit">${emblem(area)}<span class="universe-count">${l.length}</span></span><strong>${e(area.shortTitle)}</strong><span class="universe-progress">${p ? p + "% concluído" : area.id === "civica" ? "Novo percurso expandido" : l.length + " pequenas lições"}</span></a>`;
        })
        .join(
          "",
        )}<div class="map-footnote">Caminhos livres. Sem uma ordem obrigatória.</div></div></section>
      <div class="home-bottom"><section class="mission-feature" style="${theme("digital")}"><div><p class="eyebrow">LABORATÓRIO DA VIDA REAL</p><h2>Nem tudo o que chega<br>ao telemóvel merece um clique.</h2><p>Encontra os sinais de uma mensagem suspeita.</p><a class="button secondary" href="missoes.html?id=digital">Experimentar missão ${icon("arrow")}</a></div><div class="mini-phone" aria-hidden="true"><span class="phone-camera"></span><span class="phone-time">9:41</span><span class="phone-message">A tua conta vai ser bloqueada.<br><b>Envia o teu código agora.</b></span><span class="phone-alert">? Uma pausa faz diferença</span></div></section><section class="recent-achievements"><div class="section-heading"><div><p class="eyebrow">CADA DESCOBERTA CONTA</p><h2>${earned.length ? "As tuas conquistas" : "O próximo motivo de orgulho"}</h2></div>${icon("award")}</div>${earned.length ? earned.map((a) => `<div class="recent-achievement"><span>${icon("award")}</span><div><strong>${e(a.title)}</strong><p>${e(a.description)}</p></div><span class="check">✓</span></div>`).join("") : `<div class="first-achievement"><span class="achievement-medal">${icon("award")}</span><h3>Primeiro Passo</h3><p>Conclui a tua primeira lição.<br>Todo o percurso começa com uma descoberta.</p></div>`}<a class="text-link" href="conquistas.html">Explorar conquistas ${icon("arrow")}</a></section></div>`;
    }
    function learningNode(lesson, index) {
      const state = Progress.state(lesson.id);
      return `<li class="path-step ${state}" data-lesson-state="${e(lesson.id)}"><a class="learning-node" href="${lessonURL(lesson)}" aria-label="${e(lesson.title)} — ${Progress.stateLabels[state]}"><span class="node-circle"><span>${state === "available" ? String(index + 1).padStart(2, "0") : statusSymbol[state]}</span></span><span class="node-copy"><span class="node-meta">LIÇÃO ${index + 1} · ${lesson.minutes || 3} MIN</span><strong>${e(lesson.title)}</strong><span class="node-description">${e(lesson.summary)}</span><span class="node-state">${statusSymbol[state]} ${Progress.stateLabels[state]}</span></span><span class="node-arrow">${icon("arrow")}</span></a></li>`;
    }
    function areaMarkup(area) {
      const lessons = list(area),
        next =
          lessons.find((l) => !Store.state.completedLessons.includes(l.id)) ||
          lessons[0];
      const unlocked =
        Progress.count(lessons) === lessons.length ||
        Store.state.challenges.includes(area.challenge.id);
      const complete = Store.state.challenges.includes(area.challenge.id);
      return `<a class="back-link" href="index.html">← Mapa das literacias</a><header class="path-hero" style="${theme(area.id)}"><div><p class="eyebrow">UM CAMINHO PARA A VIDA REAL</p><h1>${e(area.title)}</h1><p>${e(area.description)}</p><div class="path-hero-tags"><span>${area.categories.length} etapas</span><span>${lessons.length} lições</span><span>Ao teu ritmo</span></div><a class="button primary" href="${lessonURL(next)}">${Progress.count(lessons) ? "Continuar percurso" : "Começar percurso"} ${icon("arrow")}</a></div>${emblem(area, "large")}</header><div class="path-layout"><div><section class="path-intro"><h2>O teu mapa de aprendizagem</h2><p>Escolhe qualquer lição. Conclui o percurso para desbloquear o desafio final.</p><div class="state-legend">${["available", "active", "completed", "mastered", "locked"].map((s) => `<span class="state-${s}"><b>${statusSymbol[s]}</b>${Progress.stateLabels[s]}</span>`).join("")}</div></section><div class="learning-path">${area.categories.map((category, ci) => `<section class="path-chapter" id="etapa-${ci + 1}"><header class="chapter-heading"><span>${String(ci + 1).padStart(2, "0")}</span><div><p class="eyebrow">ETAPA ${ci + 1}</p><h2>${e(category.title)}</h2>${category.description ? `<p>${e(category.description)}</p>` : ""}</div><span class="chapter-check">${Progress.count(category.lessons)}/${category.lessons.length}</span></header><ol class="path-nodes">${category.lessons.map((l) => learningNode(l, lessons.indexOf(l))).join("")}</ol><div class="chapter-checkpoint ${Progress.count(category.lessons) === category.lessons.length ? "completed" : ""}"><span>${Progress.count(category.lessons) === category.lessons.length ? "✓" : "◇"}</span><div><strong>${Progress.count(category.lessons) === category.lessons.length ? "Etapa concluída" : "Checkpoint da etapa"}</strong><p>${Progress.count(category.lessons) === category.lessons.length ? "Leva uma ideia contigo antes de avançar." : `Conclui as ${category.lessons.length} lições desta etapa.`}</p></div></div></section>`).join("")}<section class="final-node ${complete ? "completed" : unlocked ? "available" : "locked"}"><span class="final-symbol">${icon(complete ? "award" : "shield")}</span><p class="eyebrow">DESAFIO FINAL</p><h2>Da aprendizagem à vida real.</h2><p>${complete ? "Desafio concluído. Podes voltar a praticar." : unlocked ? "O teu próximo passo já está disponível." : "Conclui as lições para juntares tudo num cenário."}</p>${unlocked ? `<a class="button primary" href="desafio.html?id=${e(area.id)}">${complete ? "Rever desafio" : "Abrir desafio · 50 XP"} ${icon("arrow")}</a>` : `<span class="locked-label">⌑ Bloqueado · ${Progress.count(lessons)}/${lessons.length} lições</span>`}</section></div></div><aside class="path-sidebar" aria-label="Resumo do percurso"><section class="path-summary"><h2>Cada passo conta.</h2>${bar(lessons)}<div class="path-totals"><span><strong>${Progress.count(lessons)}</strong>concluídas</span><span><strong>${lessons.filter((l) => Progress.state(l.id) === "mastered").length}</strong>dominadas</span></div><p class="small">“Dominado” significa que voltaste a uma lição concluída e acertaste de novo no quiz. Podes rever sempre.</p></section><section class="path-mission"><span class="area-icon">${icon("target")}</span><p class="eyebrow">EXPERIMENTA NA PRÁTICA</p><h3>${e(area.mission.title)}</h3><p>Uma pequena missão para testar uma decisão.</p><a class="text-link" href="missoes.html?id=${area.id}">Abrir laboratório ${icon("arrow")}</a></section><nav class="chapter-nav" aria-label="Etapas do percurso"><h3>O teu caminho</h3>${area.categories.map((c, i) => `<a href="#etapa-${i + 1}"><span>${String(i + 1).padStart(2, "0")}</span>${e(c.title)}</a>`).join("")}</nav></aside></div>`;
    }
    function miniPath(lesson) {
      const siblings = all.filter((l) => l.area.id === lesson.area.id),
        index = siblings.findIndex((l) => l.id === lesson.id);
      return `<nav class="mini-path" aria-label="Progresso na etapa">${siblings
        .slice(Math.max(0, index - 2), index + 3)
        .map(
          (l) =>
            `<a class="mini-node ${Progress.state(l.id)} ${l.id === lesson.id ? "current" : ""}" href="${lessonURL(l)}" ${l.id === lesson.id ? 'aria-current="step"' : ""} title="${e(l.title)} — ${Progress.stateLabels[Progress.state(l.id)]}" aria-label="${e(l.title)} — ${Progress.stateLabels[Progress.state(l.id)]}">${Progress.state(l.id) === "completed" ? "✓" : Progress.state(l.id) === "mastered" ? "★" : siblings.indexOf(l) + 1}</a>`,
        )
        .join(
          "",
        )}<span class="mini-path-label">${Progress.stateLabels[Progress.state(lesson.id)]}</span><span class="lesson-xp">${Store.state.completedLessons.includes(lesson.id) ? `${20 + (Store.state.quizzes.includes(lesson.id) ? 10 : 0)} XP conquistados` : "Até 30 XP"}</span></nav>`;
    }
    return {
      theme,
      emblem,
      sourceMarkup,
      homeMarkup,
      areaMarkup,
      miniPath,
      learningNode,
    };
  }
  window.LearningUI = { init, themes, theme };
})();
