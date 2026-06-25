function initHeroSlider() {
  const slides     = document.querySelectorAll('.hero-slide');
  const bars       = document.querySelectorAll('.hero-bar');
  const prevBtn    = document.querySelector('.hero-prev');
  const nextBtn    = document.querySelector('.hero-next');
  const hero       = slides[0]?.closest('.hero');
  const counterCur = hero?.querySelector('.hero-counter-cur');

  if (!slides.length) return;

  const SLIDE_INTERVAL_MS = 5800;
  const SWIPE_MIN_PX      = 50;   // minimum horizontal travel to count as swipe
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let current = 0;
  let timer   = null;

  /* ── Core transition ─────────────────────────────────────── */

  function goTo(index) {
    const from = current;
    current = (index + slides.length) % slides.length;

    slides[from].classList.remove('is-active');
    slides[current].classList.add('is-active');

    // Restart the CSS zoom animation on the incoming image
    const img = slides[current].querySelector('.hero-slide-img');
    if (img && !reducedMotion) {
      img.style.animation = 'none';
      void img.offsetWidth; // force reflow to restart animation
      img.style.animation = '';
    }

    // Update bar indicators
    bars[from]?.classList.remove('is-active');
    bars[from]?.removeAttribute('aria-current');
    bars[current]?.classList.add('is-active');
    bars[current]?.setAttribute('aria-current', 'true');

    // Update "01 / 04" counter
    if (counterCur) counterCur.textContent = String(current + 1).padStart(2, '0');
  }

  /* ── Autoplay ────────────────────────────────────────────── */

  function startAutoplay() {
    if (reducedMotion) return;
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), SLIDE_INTERVAL_MS);
  }

  function stopAutoplay() {
    clearInterval(timer);
    timer = null;
  }

  // Manual navigation resets the autoplay timer so it doesn't fire too soon
  function manualGoTo(index) {
    clearInterval(timer);
    goTo(index);
    startAutoplay();
  }

  /* ── Controls ────────────────────────────────────────────── */

  prevBtn?.addEventListener('click', () => manualGoTo(current - 1));
  nextBtn?.addEventListener('click', () => manualGoTo(current + 1));

  bars.forEach((bar, i) => bar.addEventListener('click', () => manualGoTo(i)));

  // Keyboard: left/right arrows work when any slider control is focused
  function onKeydown(e) {
    if (e.key === 'ArrowLeft')  { manualGoTo(current - 1); e.preventDefault(); }
    if (e.key === 'ArrowRight') { manualGoTo(current + 1); e.preventDefault(); }
  }
  [prevBtn, nextBtn, ...bars].forEach(el => el?.addEventListener('keydown', onKeydown));

  /* ── Touch swipe ─────────────────────────────────────────── */

  if (hero) {
    let touchStartX = 0;
    let touchStartY = 0;

    hero.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    hero.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;

      // Ignore vertical-dominant gestures (user is scrolling the page)
      if (Math.abs(dy) > Math.abs(dx)) return;
      if (Math.abs(dx) < SWIPE_MIN_PX) return;

      manualGoTo(dx < 0 ? current + 1 : current - 1);
    }, { passive: true });
  }

  /* ── Pause on hover / focus ──────────────────────────────── */

  // When the loader fades out, the browser fires mouseenter on the hero if the
  // cursor happens to be positioned over it — even though the user never moved.
  // Track real mouse movement so we can ignore that phantom event.
  let cursorMoved = false;
  window.addEventListener('mousemove', () => { cursorMoved = true; }, { once: true });

  if (hero) {
    hero.addEventListener('mouseenter', () => { if (cursorMoved) stopAutoplay(); });
    hero.addEventListener('mouseleave', () => { if (!document.hidden) startAutoplay(); });

    hero.addEventListener('focusin',  stopAutoplay);
    hero.addEventListener('focusout', (e) => {
      // Only restart if focus left the hero entirely
      if (!hero.contains(e.relatedTarget)) startAutoplay();
    });
  }

  /* ── Pause when tab is hidden ────────────────────────────── */

  document.addEventListener('visibilitychange', () => {
    document.hidden ? stopAutoplay() : startAutoplay();
  });

  /* ── Init ────────────────────────────────────────────────── */

  bars[0]?.setAttribute('aria-current', 'true');

  // body.is-loading is removed when the loader starts fading and the hero
  // image animation begins. The loader itself shows for ~2700 ms, so by the
  // time the user sees slide 1 they've already waited that long. Using a
  // shorter first interval (4000 ms) makes the total wait feel like a normal
  // cycle; subsequent slides use the full 5800 ms.
  let autoplayInited = false;

  function beginAutoplay() {
    if (autoplayInited) return;
    autoplayInited = true;
    setTimeout(() => {
      goTo(current + 1);
      startAutoplay();
    }, 4000);
  }

  if (!document.body.classList.contains('is-loading')) {
    startAutoplay(); // loader already gone or never present
  } else {
    const mo = new MutationObserver(() => {
      if (!document.body.classList.contains('is-loading')) {
        mo.disconnect();
        beginAutoplay();
      }
    });
    mo.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    setTimeout(() => { mo.disconnect(); beginAutoplay(); }, 5000); // safety net
  }
}
