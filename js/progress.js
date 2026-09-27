(function () {
  const levels = [
    "Curioso",
    "Explorador",
    "Aprendiz",
    "Investigador",
    "Navegador",
    "Estratega",
    "Pensador",
    "Mentor",
  ];
  const thresholds = [0, 60, 150, 300, 500, 800, 1200, 1700];
  const lessons = () =>
    window.LITERACIES.flatMap((a) => a.categories.flatMap((c) => c.lessons));
  const validCount = (field, ids) =>
    Store.state[field].filter((id) => ids.includes(id)).length;
  function xp() {
    const ids = lessons().map((l) => l.id);
    return (
      validCount("completedLessons", ids) * 20 +
      validCount("quizzes", ids) * 10 +
      validCount(
        "missions",
        LITERACIES.flatMap((a) => (a.missions || [a.mission]).map((m) => m.id)),
      ) *
        25 +
      validCount(
        "challenges",
        LITERACIES.map((a) => a.challenge.id),
      ) *
        50
    );
  }
  function level() {
    const value = xp();
    const index = thresholds.reduce((last, t, i) => (value >= t ? i : last), 0);
    return {
      number: index + 1,
      name: levels[index],
      next: thresholds[index + 1] || null,
      xp: value,
    };
  }
  function count(list = lessons()) {
    return list.filter((l) => Store.state.completedLessons.includes(l.id))
      .length;
  }
  function percent(list = lessons()) {
    return list.length ? Math.round((count(list) / list.length) * 100) : 0;
  }
  function achievements() {
    return [
      {
        title: "Primeiro Passo",
        description: "Conclui a tua primeira lição.",
        unlocked: count() > 0,
      },
      {
        title: "Radar Digital",
        description: "Conclui a lição sobre phishing.",
        unlocked: Store.state.completedLessons.includes("phishing"),
      },
      {
        title: "Dinheiro com Cabeça",
        description: "Conclui a lição sobre orçamento.",
        unlocked: Store.state.completedLessons.includes("planear-orcamento"),
      },
      {
        title: "Detetive de Fontes",
        description: "Conclui a lição sobre fontes.",
        unlocked: Store.state.completedLessons.includes("fontes"),
      },
      {
        title: "Saber Pedir Ajuda",
        description: "Conclui a lição sobre o 112.",
        unlocked: Store.state.completedLessons.includes("ligar-112"),
      },
      {
        title: "Da Ideia à Ação",
        description: "Resolve a primeira missão.",
        unlocked: Store.state.missions.length > 0,
      },
      {
        title: "Dez Novos Olhares",
        description: "Conclui uma lição de cada literacia.",
        unlocked: LITERACIES.every(
          (a) => count(a.categories.flatMap((c) => c.lessons)) > 0,
        ),
      },
      {
        title: "Aprender para a Vida",
        description: "Conclui as 40 lições iniciais.",
        unlocked: count(lessons().filter((l) => l.introducedIn !== 2)) === 40,
      },
      {
        title: "Viver em Comum",
        description: "Conclui as 24 lições da Literacia Cívica.",
        unlocked:
          count(
            LITERACIES.find((a) => a.id === "civica").categories.flatMap(
              (c) => c.lessons,
            ),
          ) === 24,
      },
      {
        title: "Conhecimento em Dia",
        description: "Revê uma lição concluída e acerta novamente no quiz.",
        unlocked: Store.state.masteredLessons.length > 0,
      },
    ];
  }
  function state(id) {
    if (Store.state.completedLessons.includes(id))
      return Store.state.masteredLessons.includes(id)
        ? "mastered"
        : "completed";
    return Store.state.startedLessons.includes(id) ? "active" : "available";
  }
  const stateLabels = {
    locked: "Bloqueado",
    available: "Disponível",
    active: "Em progresso",
    completed: "Concluído",
    mastered: "Dominado",
  };
  window.Progress = {
    xp,
    level,
    count,
    percent,
    achievements,
    lessons,
    state,
    stateLabels,
  };
})();
