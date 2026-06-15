function initNavigation() {
  var mbtn  = document.getElementById('mbtn');
  var drawer = document.getElementById('drawer');
  var dbg   = document.getElementById('dbg');
  var dx    = document.getElementById('dx');
  var htop  = document.getElementById('htop');
  var spTop = document.getElementById('sp-toplink');
  var pcTop = document.getElementById('pc-toplink');
  var pcH   = document.querySelector('.pc-header');
  var spH   = document.querySelector('.sp-header');

  /* Drawer open / close */
  function openDrawer()  { drawer.classList.add('open');    dbg.classList.add('open');    document.body.style.overflow = 'hidden'; }
  function closeDrawer() { drawer.classList.remove('open'); dbg.classList.remove('open'); document.body.style.overflow = ''; }

  if (mbtn) mbtn.addEventListener('click', openDrawer);
  if (dx)   dx.addEventListener('click',   closeDrawer);
  if (dbg)  dbg.addEventListener('click',  closeDrawer);

  /* Scroll to top */
  function scrollTop(e) { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  if (htop)  htop.addEventListener('click',  scrollTop);
  if (spTop) spTop.addEventListener('click', scrollTop);
  if (pcTop) pcTop.addEventListener('click', scrollTop);

  /* Smooth scroll for all in-page anchor links */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var hash = this.getAttribute('href');
      if (hash === '#') return;
      var target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      closeDrawer();
      var hdr = window.innerWidth >= 768 ? pcH : spH;
      var offset = hdr && !hdr.classList.contains('hidden')
        ? hdr.offsetHeight
        : (window.innerWidth >= 768 ? 68 : 56);
      window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: 'smooth' });
    });
  });

  /* Header show / hide on scroll */
  var lastY = 0;
  function onScroll() {
    var y  = window.scrollY;
    var dn = y > lastY + 4;
    var up = y < lastY - 4;

    if (pcH) pcH.classList.toggle('scrolled', y > 12);
    if (spH) spH.classList.toggle('scrolled', y > 12);

    if (y > 100) {
      if (dn) {
        if (pcH) pcH.classList.add('hidden');
        if (spH) spH.classList.add('hidden');
      } else if (up) {
        if (pcH) pcH.classList.remove('hidden');
        if (spH) spH.classList.remove('hidden');
      }
    } else {
      if (pcH) pcH.classList.remove('hidden');
      if (spH) spH.classList.remove('hidden');
    }
    lastY = y;
  }

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}
