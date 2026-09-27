(function () {
  const key = "a-literacia-progress";
  const empty = () => ({
    version: 1,
    completedLessons: [],
    quizzes: [],
    missions: [],
    challenges: [],
    favorites: [],
    lastLesson: null,
  });
  let available = true;
  function read() {
    try {
      const raw = JSON.parse(localStorage.getItem(key) || "null");
      const clean = empty();
      if (!raw || typeof raw !== "object") return clean;
      for (const field of [
        "completedLessons",
        "quizzes",
        "missions",
        "challenges",
        "favorites",
      ]) {
        clean[field] = Array.isArray(raw[field])
          ? [...new Set(raw[field].filter((v) => typeof v === "string"))]
          : [];
      }
      clean.lastLesson =
        typeof raw.lastLesson === "string" ? raw.lastLesson : null;
      return clean;
    } catch {
      return empty();
    }
  }
  let state = read();
  function write() {
    try {
      localStorage.setItem(key, JSON.stringify(state));
      available = true;
    } catch {
      available = false;
    }
    window.dispatchEvent(new CustomEvent("progresschange"));
    return available;
  }
  function preference(name, fallback) {
    try {
      return localStorage.getItem("a-literacia-" + name) || fallback;
    } catch {
      return fallback;
    }
  }
  function setPreference(name, value) {
    try {
      localStorage.setItem("a-literacia-" + name, value);
    } catch {
      available = false;
    }
  }
  window.Store = {
    get state() {
      return state;
    },
    get available() {
      return available;
    },
    preference,
    setPreference,
    add(field, id) {
      if (state[field].includes(id)) return false;
      state[field].push(id);
      write();
      return true;
    },
    favorite(id) {
      state.favorites = state.favorites.includes(id)
        ? state.favorites.filter((v) => v !== id)
        : [...state.favorites, id];
      write();
    },
    last(id) {
      state.lastLesson = id;
      write();
    },
    reset() {
      state = empty();
      write();
    },
  };
  window.addEventListener("storage", (event) => {
    if (event.key === key || event.key === null) {
      state = read();
      window.dispatchEvent(new CustomEvent("progresschange"));
    }
  });
})();
