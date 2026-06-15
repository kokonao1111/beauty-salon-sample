function initHeroSlider() {
  var slides = document.querySelectorAll('.hero-slide');
  var dots   = document.querySelectorAll('.hero-dot');
  if (!slides.length) return;

  var rm    = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var cur   = 0;
  var timer = null;

  function go(n) {
    slides[cur].classList.remove('is-active');
    if (dots[cur]) dots[cur].classList.remove('is-active');

    cur = (n + slides.length) % slides.length;

    // Restart zoom animation on the incoming slide's image
    var img = slides[cur].querySelector('.hero-slide-img');
    if (img && !rm) {
      img.style.animation = 'none';
      void img.offsetWidth; // reflow to restart animation
      img.style.animation = '';
    }

    slides[cur].classList.add('is-active');
    if (dots[cur]) dots[cur].classList.add('is-active');
  }

  function start() {
    if (rm) return;
    clearInterval(timer);
    timer = setInterval(function () { go(cur + 1); }, 5800);
  }

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      clearInterval(timer);
      go(i);
      start();
    });
  });

  start();
}
