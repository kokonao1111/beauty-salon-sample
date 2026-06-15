document.addEventListener('DOMContentLoaded', function () {
  initNavigation();
  initHeroSlider();
  initScrollEffects();

  // Prevent placeholder href="#" links from scrolling the page to the top.
  // Logo links (pc-toplink, sp-toplink) are handled by initNavigation() and intentionally scroll.
  document.querySelectorAll('a[href="#"]').forEach(el => {
    el.addEventListener('click', e => e.preventDefault());
  });
});
