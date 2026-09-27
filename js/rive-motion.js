(function () {
  const reduce = matchMedia('(prefers-reduced-motion:reduce)');
  let runtime, buffer;
  const active = new Map();
  function eligible() {
    return !reduce.matches && !navigator.connection?.saveData && !(navigator.hardwareConcurrency && navigator.hardwareConcurrency < 3);
  }
  function load() {
    if (!eligible()) return Promise.reject(new Error('Static preference'));
    runtime ||= new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'assets/vendor/rive/rive.js';
      script.onload = () => {
        window.rive.RuntimeLoader.setWasmUrl(new URL('assets/vendor/rive/rive.wasm', document.baseURI).href);
        window.rive.RuntimeLoader.setWasmFallbackUrl(null);
        resolve(window.rive);
      };
      script.onerror = reject;
      document.head.append(script);
    });
    buffer ||= fetch(new URL('assets/motion/feedback.riv', document.baseURI)).then(r => {
      if (!r.ok) throw new Error('Animation unavailable');
      return r.arrayBuffer();
    });
    return Promise.all([runtime, buffer]);
  }
  function clear(target) {
    const current = active.get(target);
    if (!current) return;
    clearTimeout(current.timer);
    current.player?.cleanup();
    current.canvas.remove();
    current.resolve?.(false);
    active.delete(target);
  }
  async function signal(kind, target) {
    if (!target || !eligible()) return false;
    const ticket = Symbol(); target._riveTicket = ticket;
    try {
      const [api, bytes] = await load();
      if (!eligible() || !target.isConnected || target._riveTicket !== ticket) return false;
      clear(target);
      const canvas = document.createElement('canvas');
      canvas.className = 'rive-feedback'; canvas.width = canvas.height = 128;
      canvas.setAttribute('aria-hidden', 'true');
      target.classList.add('motion-host'); target.append(canvas);
      const current = { canvas, player: null, timer: null }; active.set(target, current);
      return await new Promise(resolve => {
        current.resolve = resolve;
        current.player = new api.Rive({
          buffer: bytes.slice(0), canvas, artboard: kind, animations: 'success', autoplay: true,
          onLoad: () => {
            clearTimeout(current.timer);
            canvas.dataset.riveLoaded = 'true';
            resolve(true);
            current.timer = setTimeout(() => clear(target), 650);
          },
          onLoadError: () => { clear(target); resolve(false); }
        });
        current.timer = setTimeout(() => { clear(target); resolve(false); }, 5000);
      });
    } catch { return false; }
  }
  document.addEventListener('pointerover', event => {
    if (event.target.closest('.quiz-option,.world-object,#complete') && eligible()) load().catch(() => {});
  }, { passive: true });
  reduce.addEventListener('change', () => { if (reduce.matches) for (const target of active.keys()) clear(target); });
  addEventListener('pagehide', () => { for (const target of active.keys()) clear(target); });
  window.NativeMotion = { signal };
})();
