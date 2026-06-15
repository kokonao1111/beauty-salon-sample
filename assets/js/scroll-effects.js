function initScrollEffects() {
  var rm = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  if (rm || !('IntersectionObserver' in window)) return;

  document.body.classList.add('anim-ready');

  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0, rootMargin: '0px 0px -4px 0px' });

  // Individual fade targets
  document.querySelectorAll('.sec-head, .fade-up, .fade-in, .intro-rule').forEach(function (el) {
    obs.observe(el);
  });

  // Grid stagger groups — class added dynamically so CSS transitions apply
  var cg = document.querySelector('.camp-grid');
  if (cg) { cg.classList.add('camp-stagger');  obs.observe(cg); }

  var pg = document.querySelector('.plan-grid');
  if (pg) { pg.classList.add('plan-stagger');   obs.observe(pg); }

  var rg = document.querySelector('.rec-grid');
  if (rg) { rg.classList.add('rec-cards');      obs.observe(rg); }

  var nl = document.querySelector('.news-list');
  if (nl) { nl.classList.add('news-fade');       obs.observe(nl); }

  var ig = document.querySelector('.insta-grid');
  if (ig) { ig.classList.add('insta-stagger');  obs.observe(ig); }

  // Store map & detail
  document.querySelectorAll('.map-anim, .detail-anim').forEach(function (el) {
    obs.observe(el);
  });

  // Booking
  document.querySelectorAll('.book-btns').forEach(function (el) {
    el.classList.add('book-rise');
    obs.observe(el);
  });
  document.querySelectorAll('.book-note, .insta-btns').forEach(function (el) {
    el.classList.add('fade-up');
    obs.observe(el);
  });

  // Safety fallback: force all elements visible after 1.4s in case observer misfires
  setTimeout(function () {
    var sel = '.fade-up,.fade-in,.sec-head,.intro-rule,.camp-stagger,.plan-stagger,.rec-cards,.news-fade,.insta-stagger,.map-anim,.detail-anim,.book-rise';
    document.querySelectorAll(sel).forEach(function (el) {
      el.classList.add('is-visible');
    });
  }, 1400);
}
