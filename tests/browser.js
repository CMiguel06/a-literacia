(async function () {
  const results = document.querySelector("#results");
  const status = document.querySelector("#status");
  const viewport = document.querySelector("#viewport");
  const root = new URL("../", location.href);
  let passed = 0,
    failed = 0,
    memory = {},
    width = 1440,
    route = "index.html",
    frame,
    errors = [];
  window.testMemory = memory;
  window.testErrors = errors;
  function assert(condition, message) {
    if (!condition) throw Error(message);
  }
  async function load(nextRoute = route, nextWidth = width, blocked = false) {
    route = nextRoute;
    width = nextWidth;
    frame?.remove();
    frame = document.createElement("iframe");
    frame.width = width;
    frame.height = 960;
    frame.title = "Site em verificação";
    viewport.append(frame);
    const url = new URL(route, root);
    const source = await fetch(url).then((r) => r.text());
    const pageId = url.searchParams.get("id");
    // Isolated mock storage: the real visitor's localStorage is never touched.
    const setup = `<base href="${root.href}"><script>Object.defineProperty(window,'localStorage',{value:{getItem(k){${blocked ? "throw Error('blocked')" : "return parent.testMemory[k]??null"}},setItem(k,v){${blocked ? "throw Error('blocked')" : "parent.testMemory[k]=String(v)"}},removeItem(k){delete parent.testMemory[k]},clear(){for(const k of Object.keys(parent.testMemory))delete parent.testMemory[k]}}});const OriginalURLSearchParams=URLSearchParams;window.URLSearchParams=class extends OriginalURLSearchParams{constructor(){super(${JSON.stringify(url.search)})}};window.addEventListener('error',e=>parent.testErrors.push(e.message));<\/script>`;
    const ready = new Promise((resolve) => (frame.onload = resolve));
    frame.srcdoc = source.replace("<head>", "<head>" + setup);
    await ready;
    await new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(resolve)),
    );
    return { w: frame.contentWindow, d: frame.contentDocument };
  }
  async function test(name, fn) {
    const li = document.createElement("li");
    results.append(li);
    try {
      await fn();
      passed++;
      li.className = "pass";
      li.textContent = "✓ " + name;
    } catch (error) {
      failed++;
      li.className = "fail";
      li.textContent = "✗ " + name + ": " + error.message;
    }
    status.textContent = `${passed} verificações passaram; ${failed} falharam.`;
  }
  function clear() {
    for (const key of Object.keys(memory)) delete memory[key];
  }
  await test("10 literacias, 60 lições, IDs e perguntas válidos", async () => {
    const { w } = await load();
    const data = w.LITERACIES,
      ids = [];
    assert(data.length === 10, "número de áreas");
    for (const a of data) {
      assert(a.categories.length >= 2, "categorias");
      for (const c of a.categories) {
        assert(c.lessons.length >= 2, "lições");
        for (const l of c.lessons) {
          ids.push(l.id);
          assert(
            l.quiz.correct >= 0 && l.quiz.correct < l.quiz.answers.length,
            "resposta",
          );
          assert(l.explain.length && l.activity && l.example.text, "conteúdo");
        }
      }
    }
    assert(ids.length === 60 && new Set(ids).size === 60, "IDs únicos");
  });
  await test("Pesquisa por aliases e sem acentos; pesquisa vazia e sem resultados", async () => {
    const { d, w } = await load();
    const input = d.querySelector("#search");
    for (const [q, expected] of [
      ["password", "phishing"],
      ["orcamento", "planear-orcamento"],
    ]) {
      input.value = q;
      input.dispatchEvent(new w.Event("input"));
      assert(
        d.querySelector(`#search-results a[href="licao.html?id=${expected}"]`),
        "pesquisa " + q,
      );
    }
    input.value = "zzzxxyy";
    input.dispatchEvent(new w.Event("input"));
    assert(
      d.querySelector("#search-results").textContent.includes("Ainda não"),
      "estado vazio",
    );
    input.value = "";
    input.dispatchEvent(new w.Event("input"));
    assert(!d.querySelector("#area-grid").hidden, "repor grelha");
  });
  await test("Quiz incorreto não dá XP; acerto e conclusão somam 30 XP; repetição não duplica", async () => {
    clear();
    let { d, w } = await load("licao.html?id=receitas-e-despesas");
    assert(d.querySelector("#complete").disabled, "conclusão bloqueada");
    d.querySelectorAll("#lesson-quiz button")[1].click();
    assert(w.Progress.xp() === 0, "erro sem XP");
    d.querySelectorAll("#lesson-quiz button")[0].click();
    assert(w.Progress.xp() === 10, "quiz 10 XP");
    d.querySelector("#complete").click();
    assert(w.Progress.xp() === 30, "lição 20 XP");
    assert(
      d.querySelector("#lesson-progress progress").value === 25,
      "progresso 25%",
    );
    ({ d, w } = await load("licao.html?id=receitas-e-despesas"));
    d.querySelectorAll("#lesson-quiz button")[0].click();
    assert(w.Progress.xp() === 30, "sem duplicação");
    assert(d.querySelector("#complete").disabled, "já concluída");
  });
  await test("Favoritos, última lição, preferência de menu e perfil persistem entre carregamentos", async () => {
    let { d, w } = await load("licao.html?id=phishing");
    d.querySelector("#favorite").click();
    d.querySelector("#collapse").click();
    ({ d, w } = await load("favoritos.html"));
    assert(
      d.querySelector('main a[href="licao.html?id=phishing"]'),
      "favorito",
    );
    assert(d.body.classList.contains("sidebar-collapsed"), "menu guardado");
    ({ d, w } = await load("index.html"));
    assert(
      d
        .querySelector(".resume-card a")
        .getAttribute("href")
        .includes("phishing"),
      "última lição",
    );
    ({ d, w } = await load("definicoes.html"));
    d.querySelector("#profile").value = "12-15";
    d.querySelector("#profile").dispatchEvent(new w.Event("change"));
    ({ d, w } = await load("definicoes.html"));
    assert(d.querySelector("#profile").value === "12-15", "perfil");
  });
  await test("Missão vale 25 XP apenas uma vez; desafio fica bloqueado até completar a área", async () => {
    clear();
    let { d, w } = await load("missoes.html?id=digital");
    d.querySelectorAll("#missao-digital button")[1].click();
    assert(w.Progress.xp() === 25, "missão");
    ({ d, w } = await load("missoes.html?id=digital"));
    d.querySelectorAll("#missao-digital button")[1].click();
    assert(w.Progress.xp() === 25, "missão única");
    ({ d, w } = await load("desafio.html?id=digital"));
    assert(!d.querySelector("#final-quiz"), "desafio bloqueado");
    for (const l of w.LITERACIES.find(
      (a) => a.id === "digital",
    ).categories.flatMap((c) => c.lessons)) {
      w.Store.add("quizzes", l.id);
      w.Store.add("completedLessons", l.id);
    }
    ({ d, w } = await load("desafio.html?id=digital"));
    d.querySelectorAll("#final-quiz button")[2].click();
    assert(w.Progress.xp() === 195, "50 XP de desafio");
    ({ d, w } = await load("desafio.html?id=digital"));
    d.querySelectorAll("#final-quiz button")[2].click();
    assert(w.Progress.xp() === 195, "desafio único");
  });
  await test("Todas as 60 lições, 14 missões e 10 desafios funcionam", async () => {
    clear();
    let { w } = await load();
    const data = w.LITERACIES;
    for (const area of data) {
      for (const lesson of area.categories.flatMap((c) => c.lessons)) {
        const { d, w } = await load("licao.html?id=" + lesson.id);
        assert(
          d.querySelector("h1").textContent === lesson.title,
          "título " + lesson.id,
        );
        d.querySelectorAll("#lesson-quiz button")[lesson.quiz.correct].click();
        d.querySelector("#complete").click();
        assert(
          w.Store.state.completedLessons.includes(lesson.id),
          "concluir " + lesson.id,
        );
      }
      let { d, w } = await load("missoes.html?id=" + area.id);
      for (const mission of area.missions || [area.mission])
        d.querySelectorAll("#" + mission.id + " button")[
          mission.correct
        ].click();
      ({ d, w } = await load("desafio.html?id=" + area.id));
      d.querySelectorAll("#final-quiz button")[area.challenge.correct].click();
    }
    {
      const review = await load("licao.html?id=receitas-e-despesas");
      review.d.querySelectorAll("#lesson-quiz button")[0].click();
    }
    ({ w } = await load("progresso.html"));
    assert(w.Progress.xp() === 2650, "total de XP");
    assert(w.Progress.percent() === 100, "100%");
    assert(
      w.Progress.achievements().every((a) => a.unlocked),
      "conquistas",
    );
  });
  await test("IDs inválidos e localStorage corrompido não bloqueiam o site", async () => {
    clear();
    memory["a-literacia-progress"] = "{invalid";
    let { d, w } = await load("licao.html?id=nao-existe");
    assert(
      d.querySelector("h1").textContent.includes("não foi encontrado"),
      "erro de rota",
    );
    memory["a-literacia-progress"] = JSON.stringify({
      completedLessons: "wrong",
      favorites: 1,
      lastLesson: {},
    });
    ({ d, w } = await load("index.html"));
    assert(
      w.Progress.xp() === 0 &&
        d.querySelectorAll(".editorial-world").length === 10,
      "recuperação",
    );
  });
  await test("Sem armazenamento, a aprendizagem funciona e mostra aviso", async () => {
    const { d, w } = await load("licao.html?id=phishing", 1440, true);
    d.querySelectorAll("#lesson-quiz button")[1].click();
    d.querySelector("#complete").click();
    assert(w.Progress.xp() === 30, "sessão em memória");
    assert(!d.querySelector("#storage-warning").hidden, "aviso");
  });
  await test("Menu móvel abre, fecha com Escape e mantém foco e fundo isolado", async () => {
    clear();
    const { d, w } = await load("index.html", 390);
    assert(d.querySelector("#sidebar").inert, "menu fechado");
    d.querySelector("#menu").click();
    assert(d.body.classList.contains("drawer-open"), "aberto");
    assert(d.querySelector("#shell").inert, "fundo isolado");
    assert(d.querySelector("#sidebar").contains(d.activeElement), "foco");
    d.dispatchEvent(
      new w.KeyboardEvent("keydown", { key: "Escape", bubbles: true }),
    );
    assert(!d.body.classList.contains("drawer-open"), "Escape");
    assert(d.activeElement === d.querySelector("#menu"), "foco devolvido");
  });
  await test("Layout sem transbordo a 1440, 1280, 1024, 768, 430 e 390 px nas páginas principais", async () => {
    clear();
    for (const size of [1440, 1280, 1024, 768, 430, 390])
      for (const path of [
        "index.html",
        "literacia.html?id=seguranca",
        "licao.html?id=phishing",
        "missoes.html",
        "missoes.html?id=financeira",
        "missoes.html?id=alimentar",
        "missoes.html?id=digital",
        "missoes.html?id=mediatica",
        "missoes.html?id=seguranca",
        "literacia.html?id=civica",
        "progresso.html",
        "conquistas.html",
        "favoritos.html",
        "definicoes.html",
      ]) {
        const { d, w } = await load(path, size);
        assert(
          d.documentElement.scrollWidth <= size + 1,
          `${path} a ${size}px: ${d.documentElement.scrollWidth}`,
        );
        assert(d.querySelectorAll("h1").length === 1, "h1 único");
        const links = [...d.querySelectorAll("a")];
        assert(
          links.every(
            (a) => a.textContent.trim() || a.getAttribute("aria-label"),
          ),
          "links com nome",
        );
      }
  });
  await test("Migração preserva os 1950 XP, favoritos e conquistas anteriores", async () => {
    clear();
    let { w } = await load();
    const data = w.LITERACIES;
    const old = data
      .flatMap((a) => a.categories.flatMap((c) => c.lessons))
      .filter((l) => l.introducedIn !== 2)
      .map((l) => l.id);
    memory["a-literacia-progress"] = JSON.stringify({
      version: 1,
      completedLessons: old,
      quizzes: old,
      missions: data.map((a) => a.mission.id),
      challenges: data.map((a) => a.challenge.id),
      favorites: ["phishing"],
      lastLesson: "phishing",
    });
    let page = await load("desafio.html?id=civica");
    assert(page.w.Progress.xp() === 1950, "XP anterior");
    assert(page.d.querySelector("#final-quiz"), "desafio anterior preservado");
    assert(
      page.w.Store.state.favorites.includes("phishing"),
      "favorito anterior",
    );
    assert(
      page.w.Progress.achievements().find(
        (a) => a.title === "Aprender para a Vida",
      ).unlocked,
      "medalha anterior",
    );
  });
  await test("Estados disponível, em progresso, concluído e dominado sem XP duplicado", async () => {
    clear();
    let { w } = await load();
    assert(w.Progress.state("phishing") === "available", "disponível");
    let p = await load("licao.html?id=phishing");
    assert(p.w.Progress.state("phishing") === "active", "ativo");
    p.d.querySelectorAll("#lesson-quiz button")[1].click();
    p.d.querySelector("#complete").click();
    assert(p.w.Progress.state("phishing") === "completed", "concluído");
    p = await load("licao.html?id=phishing");
    p.d.querySelectorAll("#lesson-quiz button")[1].click();
    assert(
      p.w.Progress.state("phishing") === "mastered" && p.w.Progress.xp() === 30,
      "dominado",
    );
  });
  await test("Cinco experiências funcionam por botões e não atribuem XP", async () => {
    clear();
    let p = await load("missoes.html?id=financeira");
    for (let i = 0; i < 4; i++)
      p.d.querySelector('[data-change="0,10"]').click();
    for (let i = 0; i < 6; i++)
      p.d.querySelector('[data-change="1,10"]').click();
    p.d.querySelector(".lab-check").click();
    assert(
      p.d.querySelector(".lab-feedback").textContent.includes("✓"),
      "orçamento",
    );
    assert(p.d.querySelector('[data-change="0,10"]').disabled, "limite 100");
    p = await load("missoes.html?id=alimentar");
    p.d.querySelectorAll("[data-food]").forEach((b) => b.click());
    p.d.querySelector(".lab-check").click();
    assert(
      p.d.querySelector("#plate-count").textContent === "3 de 3 grupos",
      "prato",
    );
    p = await load("missoes.html?id=digital");
    p.d.querySelectorAll("[data-mark]").forEach((b) => b.click());
    assert(
      p.d.querySelector("#signal-count").textContent.startsWith("3 de 3"),
      "sinais",
    );
    p = await load("missoes.html?id=mediatica");
    p.d.querySelectorAll("[data-news]").forEach((b) => b.click());
    assert(
      p.d.querySelector("#news-count").textContent.startsWith("4 de 4"),
      "notícia",
    );
    p = await load("missoes.html?id=seguranca");
    p.d.querySelector('[data-route="a"]').click();
    assert(
      p.d.querySelector(".lab-feedback").textContent.includes("✓"),
      "rota",
    );
    assert(p.w.Progress.xp() === 0, "prática sem XP");
    clear();
  });
  await test("Homepage v2: dez objetos acessíveis, seleção e destinos corretos", async () => {
    clear();
    const { d, w } = await load("index.html", 1440);
    const objects = [...d.querySelectorAll(".world-object")];
    assert(objects.length === 10, "dez objetos");
    for (const b of objects) {
      b.focus();
      b.click();
      assert(b.getAttribute("aria-pressed") === "true", "selecionado");
      assert(
        d.querySelectorAll('.world-object[aria-pressed="true"]').length === 1,
        "seleção única",
      );
      assert(
        d.querySelector("#world-link").getAttribute("href") ===
          "literacia.html?id=" + b.dataset.world,
        "destino",
      );
      assert(
        d.querySelector("#world-description").textContent.length > 20,
        "descrição",
      );
    }
    assert(
      d.querySelectorAll(".editorial-world").length === 10,
      "dez mundos editoriais",
    );
    assert(w.Progress.xp() === 0, "exploração não muda XP");
  });
  await test("Homepage v2: alvos de toque, imagens, hero e tipografia nos quatro tamanhos", async () => {
    for (const size of [1440, 1280, 768, 390]) {
      const { d, w } = await load("index.html", size);
      await d.fonts.ready;
      const hero = d.querySelector(".v2-hero");
      if (size > 768)
        assert(
          hero.getBoundingClientRect().height >= w.innerHeight * 0.65,
          "hero imersivo",
        );
      for (const b of d.querySelectorAll(".world-object")) {
        const r = b.getBoundingClientRect();
        assert(r.width >= 44 && r.height >= 44, "alvo de toque");
      }
      assert(
        w
          .getComputedStyle(d.querySelector("h1"))
          .fontFamily.includes("Fraunces"),
        "display",
      );
      assert(
        d.querySelector(".book-island").complete &&
          d.querySelector(".book-island").naturalWidth > 0,
        "fallback carregado",
      );
      assert(d.documentElement.scrollWidth <= size + 1, "sem transbordo");
    }
    clear();
  });
  await test("Não ocorreram erros JavaScript", async () =>
    assert(errors.length === 0, errors.join("; ")));
  await test("Reposição exige confirmação e limpa apenas o progresso de teste", async () => {
    let { d, w } = await load("definicoes.html");
    w.Store.add("completedLessons", "phishing");
    d.querySelector("#reset-open").click();
    assert(!d.querySelector("#reset-confirm").hidden, "confirmação");
    d.querySelector("#reset-cancel").click();
    assert(w.Store.state.completedLessons.length === 1, "cancelamento");
    d.querySelector("#reset-open").click();
    d.querySelector("#reset").click();
    assert(w.Progress.xp() === 0, "reposição");
  });
  clear();
  await load("index.html", 1440);
  document.querySelector("#controls").hidden = false;
  document
    .querySelectorAll("[data-width]")
    .forEach((b) => (b.onclick = () => load(route, Number(b.dataset.width))));
  document
    .querySelectorAll("[data-route]")
    .forEach((b) => (b.onclick = () => load(b.dataset.route, width)));
  status.textContent = `CONCLUÍDO: ${passed} verificações passaram; ${failed} falharam. Testes com armazenamento isolado.`;
  document.title = `${failed ? "FALHOU" : "PASSOU"} — Verificação de A Literacia`;
})();
