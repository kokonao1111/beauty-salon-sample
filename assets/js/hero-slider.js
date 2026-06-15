function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots   = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;

  const SLIDE_INTERVAL_MS = 5800;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let current = 0;
  let timer   = null;

  function goTo(index) {
    slides[current].classList.remove('is-active');
    dots[current]?.classList.remove('is-active');

    current = (index + slides.length) % slides.length;

    // Restart the CSS zoom animation on the incoming image.
    // Removing and re-adding the element triggers a reflow, which resets the animation.
    const img = slides[current].querySelector('.hero-slide-img');
    if (img && !reducedMotion) {
      img.style.animation = 'none';
      void img.offsetWidth; // force reflow
      img.style.animation = '';
    }

    slides[current].classList.add('is-active');
    dots[current]?.classList.add('is-active');
  }

  function startAutoplay() {
    if (reducedMotion) return;
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), SLIDE_INTERVAL_MS);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      clearInterval(timer);
      goTo(i);
      startAutoplay();
    });
  });

  startAutoplay();
}
