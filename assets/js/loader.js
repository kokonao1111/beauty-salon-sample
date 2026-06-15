(function () {
  const el = document.getElementById('siteLoader');
  if (!el) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Minimum time the loader stays visible (prevents flash on fast connections)
  const MIN_DISPLAY_MS  = reducedMotion ? 700  : 2700;
  const FADE_DURATION_MS = reducedMotion ? 260  : 800;
  const HARD_CUTOFF_MS   = 4000;

  document.body.classList.add('is-loading');

  let dismissed = false;

  function dismiss() {
    if (dismissed) return;
    dismissed = true;
    el.classList.add('is-hiding');
    document.body.classList.remove('is-loading');
    setTimeout(() => el.classList.add('is-hidden'), FADE_DURATION_MS);
  }

  let minTimeElapsed = false;
  let domReady = document.readyState !== 'loading';

  function tryDismiss() {
    if (minTimeElapsed && domReady) dismiss();
  }

  setTimeout(() => { minTimeElapsed = true; tryDismiss(); }, MIN_DISPLAY_MS);

  if (!domReady) {
    document.addEventListener('DOMContentLoaded', () => { domReady = true; tryDismiss(); });
  }

  // Failsafe: force dismiss if both conditions never resolve together
  setTimeout(dismiss, HARD_CUTOFF_MS);
})();
