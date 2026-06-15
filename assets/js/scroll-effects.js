function initScrollEffects() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || !('IntersectionObserver' in window)) return;

  // CSS transitions only apply once this class is present,
  // so elements remain visible if JS doesn't run.
  document.body.classList.add('anim-ready');

  // Safety timeout: force all animated elements visible if the observer
  // misfires (e.g. element already in viewport on load).
  const SAFETY_TIMEOUT_MS = 1400;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0,
    rootMargin: '0px 0px -4px 0px',
  });

  function observe(el) {
    if (el) observer.observe(el);
  }

  function observeAll(selector) {
    document.querySelectorAll(selector).forEach(el => observer.observe(el));
  }

  // Individual elements
  observeAll('.sec-head, .fade-up, .fade-in, .intro-rule');

  // Grid groups — classes added here so the CSS stagger transitions kick in
  const campGrid = document.querySelector('.camp-grid');
  if (campGrid) { campGrid.classList.add('camp-stagger');   observe(campGrid); }

  const planGrid = document.querySelector('.plan-grid');
  if (planGrid) { planGrid.classList.add('plan-stagger');   observe(planGrid); }

  const recGrid = document.querySelector('.rec-grid');
  if (recGrid)  { recGrid.classList.add('rec-cards');       observe(recGrid);  }

  const newsList = document.querySelector('.news-list');
  if (newsList) { newsList.classList.add('news-fade');       observe(newsList); }

  const instaGrid = document.querySelector('.insta-grid');
  if (instaGrid) { instaGrid.classList.add('insta-stagger'); observe(instaGrid); }

  // Store layout
  observeAll('.map-anim, .detail-anim');

  // Booking
  document.querySelectorAll('.book-btns').forEach(el => {
    el.classList.add('book-rise');
    observe(el);
  });
  document.querySelectorAll('.book-note, .insta-btns').forEach(el => {
    el.classList.add('fade-up');
    observe(el);
  });

  // Fallback: mark everything visible after a short delay
  const allAnimated = '.fade-up, .fade-in, .sec-head, .intro-rule, .camp-stagger, .plan-stagger, .rec-cards, .news-fade, .insta-stagger, .map-anim, .detail-anim, .book-rise';
  setTimeout(() => {
    document.querySelectorAll(allAnimated).forEach(el => el.classList.add('is-visible'));
  }, SAFETY_TIMEOUT_MS);
}
