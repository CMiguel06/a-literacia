(function () {
  const nav = document.querySelector('#sidebar');
  const mobile = matchMedia('(max-width:768px)');
  const reduced = matchMedia('(prefers-reduced-motion:reduce)');
  let pinned = Store.preference('menu-pinned', 'false') === 'true';
  const pin = document.createElement('button');
  pin.className = 'nav-link menu-pin';
  pin.innerHTML = '<b aria-hidden="true">⌖</b><span>Fixar menu</span>';
  pin.setAttribute('aria-label', 'Fixar menu durante a leitura');
  pin.title = 'Fixar menu durante a leitura';
  pin.setAttribute('aria-pressed', String(pinned));
  nav.querySelector('.sidebar-bottom').prepend(pin);
  const reveal = document.createElement('button');
  reveal.id = 'menu-reveal';
  reveal.textContent = '→';
  reveal.setAttribute('aria-label', 'Mostrar menu');
  reveal.setAttribute('aria-controls', 'sidebar');
  reveal.hidden = true;
  document.body.append(reveal);
  function hideMenu(hidden) {
    if (mobile.matches) return;
    document.body.classList.toggle('menu-auto-hidden', hidden);
    nav.inert = hidden;
    reveal.hidden = !hidden;
  }
  pin.onclick = () => {
    pinned = !pinned;
    pin.setAttribute('aria-pressed', String(pinned));
    Store.setPreference('menu-pinned', String(pinned));
    hideMenu(false);
  };
  reveal.onclick = () => { hideMenu(false); nav.querySelector('a').focus(); };
  reveal.onpointerenter = () => hideMenu(false);
  let previous = scrollY, travel = 0;
  addEventListener('scroll', () => {
    const delta = scrollY - previous;
    previous = scrollY;
    travel = Math.sign(travel) === Math.sign(delta) ? travel + delta : delta;
    if (mobile.matches || pinned || nav.contains(document.activeElement)) return;
    if (scrollY < 100 || travel < -35) hideMenu(false);
    else if (scrollY > 220 && travel > 70) hideMenu(true);
  }, { passive: true });
  mobile.addEventListener('change', () => {
    document.body.classList.remove('menu-auto-hidden'); reveal.hidden = true;
    if (!mobile.matches) nav.inert = false;
  });

  // Short, semantic CSS feedback remains available without an animation runtime.
  window.ExperienceMotion = {
    signal(kind, target) {
      if (!target || reduced.matches) return;
      target.dataset.motion = kind;
      window.NativeMotion?.signal(kind, target);
      clearTimeout(target._motionTimer);
      target._motionTimer = setTimeout(() => delete target.dataset.motion, 480);
    }
  };
  let xp = Progress.xp(), level = Progress.level().number;
  let completed = Store.state.completedLessons.length, missions = Store.state.missions.length;
  addEventListener('progresschange', () => {
    const next = Progress.xp();
    if (next > xp) ExperienceMotion.signal(Progress.level().number > level ? 'level' : 'xp', document.querySelector('#status'));
    if (Store.state.completedLessons.length > completed) ExperienceMotion.signal('nodeCompleted', document.querySelector('#complete'));
    if (Store.state.missions.length > missions) ExperienceMotion.signal('missionCompleted', document.querySelector('.quiz-card'));
    level = Progress.level().number;
    completed = Store.state.completedLessons.length; missions = Store.state.missions.length;
    xp = next;
  });
  const achievement = document.querySelector('#achievement-dialog');
  new MutationObserver(() => { if (achievement.open) ExperienceMotion.signal('achievement', achievement.querySelector('.dialog-medal')); }).observe(achievement, {attributes:true,attributeFilter:['open']});
  document.querySelectorAll('.world-object').forEach(button => {
    button.addEventListener('click', () => ExperienceMotion.signal(button.dataset.world, document.querySelector('#world-caption')));
  });

  const area = LITERACIES.find(a => a.id === new URLSearchParams(location.search).get('id'));
  const hero = document.querySelector('.path-hero');
  if (hero && area) {
    const old = hero.lastElementChild;
    const figure = document.createElement('figure');
    figure.className = 'area-world';
    const img = document.createElement('img');
    img.src = 'assets/worlds/' + area.id + '-scene.svg';
    img.alt = ''; img.width = 560; img.height = 330;
    figure.append(img);
    const caption = document.createElement('figcaption');
    caption.textContent = 'Um mundo para explorar'; figure.append(caption);
    old.replaceWith(figure);
  }

  document.querySelectorAll('.path-nodes').forEach(list => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('path-connections');
    svg.setAttribute('aria-hidden', 'true');
    list.prepend(svg);
    function draw() {
      const box = list.getBoundingClientRect();
      if (!box.width || !box.height) return;
      svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
      const nodes = [...list.querySelectorAll('.node-circle')];
      svg.replaceChildren();
      nodes.slice(1).forEach((node, i) => {
        const a = nodes[i].getBoundingClientRect(), b = node.getBoundingClientRect();
        const x1 = a.x + a.width / 2 - box.x, y1 = a.y + a.height / 2 - box.y;
        const x2 = b.x + b.width / 2 - box.x, y2 = b.y + b.height / 2 - box.y;
        const path = document.createElementNS(svg.namespaceURI, 'path');
        path.setAttribute('d', `M ${x1} ${y1} C ${x1} ${(y1+y2)/2}, ${x2} ${(y1+y2)/2}, ${x2} ${y2}`);
        path.classList.toggle('traversed', nodes[i].closest('.path-step').matches('.completed,.mastered'));
        svg.append(path);
      });
    }
    new ResizeObserver(draw).observe(list);
    document.fonts.ready.then(draw);
  });
  if (document.body.dataset.page === 'home') {
    const section = document.createElement('section');
    section.className = 'discovery-next';
    const recommended = LITERACIES.find(a => !Store.state.missions.includes(a.mission.id)) || LITERACIES[0];
    const unlocked = Progress.achievements().filter(a => a.unlocked).sort((a,b) =>
      (Store.state.achievementDates[b.title] || 0) - (Store.state.achievementDates[a.title] || 0));
    const title = document.createElement('h2'); title.textContent = 'O que levas para a vida?';
    const mission = document.createElement('a'); mission.className = 'next-mission';
    mission.href = 'missoes.html?id=' + recommended.id;
    mission.textContent = 'Missão recomendada · ' + recommended.mission.title + ' ↗';
    const badge = document.createElement('p');
    badge.textContent = unlocked.length ? 'Conquista recente: ' + unlocked[0].title : 'A tua primeira conquista começa com uma lição.';
    const link = document.createElement('a'); link.href = 'conquistas.html'; link.textContent = 'Ver conquistas →';
    section.append(title, mission, badge, link);
    document.querySelector('.v2-ending').before(section);
  }
})();
