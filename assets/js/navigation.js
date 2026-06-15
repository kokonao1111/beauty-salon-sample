function initNavigation() {
  const drawer    = document.getElementById('drawer');
  const drawerBg  = document.getElementById('dbg');
  const btnMenu   = document.getElementById('mbtn');
  const btnClose  = document.getElementById('dx');
  const btnHome   = document.getElementById('htop');
  const spLogoLink = document.getElementById('sp-toplink');
  const pcLogoLink = document.getElementById('pc-toplink');
  const pcHeader  = document.querySelector('.pc-header');
  const spHeader  = document.querySelector('.sp-header');

  // PC header height when visible (used for scroll-offset calculation)
  const PC_HEADER_H = 68;
  const SP_HEADER_H = 56;

  /* Drawer */
  function openDrawer() {
    drawer.classList.add('open');
    drawerBg.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    drawerBg.classList.remove('open');
    document.body.style.overflow = '';
  }

  btnMenu?.addEventListener('click', openDrawer);
  btnClose?.addEventListener('click', closeDrawer);
  drawerBg?.addEventListener('click', closeDrawer);

  /* Scroll to top */
  function scrollToTop(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  btnHome?.addEventListener('click', scrollToTop);
  spLogoLink?.addEventListener('click', scrollToTop);
  pcLogoLink?.addEventListener('click', scrollToTop);

  /* Smooth scroll for in-page anchor links */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const hash = link.getAttribute('href');
      if (hash === '#') return;

      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      closeDrawer();

      const isPC = window.innerWidth >= 768;
      const header = isPC ? pcHeader : spHeader;
      const offset = header && !header.classList.contains('hidden')
        ? header.offsetHeight
        : (isPC ? PC_HEADER_H : SP_HEADER_H);

      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - offset,
        behavior: 'smooth',
      });
    });
  });

  /* Header show/hide on scroll */
  const SCROLL_THRESHOLD = 100; // px before hide behavior kicks in
  const SCROLL_HYSTERESIS = 4;  // px delta to ignore micro-scrolls

  let lastScrollY = 0;

  function onScroll() {
    const y  = window.scrollY;
    const scrolledDown = y > lastScrollY + SCROLL_HYSTERESIS;
    const scrolledUp   = y < lastScrollY - SCROLL_HYSTERESIS;

    pcHeader?.classList.toggle('scrolled', y > 12);
    spHeader?.classList.toggle('scrolled', y > 12);

    if (y > SCROLL_THRESHOLD) {
      if (scrolledDown) {
        pcHeader?.classList.add('hidden');
        spHeader?.classList.add('hidden');
      } else if (scrolledUp) {
        pcHeader?.classList.remove('hidden');
        spHeader?.classList.remove('hidden');
      }
    } else {
      pcHeader?.classList.remove('hidden');
      spHeader?.classList.remove('hidden');
    }

    lastScrollY = y;
  }

  onScroll(); // run once on init to set correct state
  window.addEventListener('scroll', onScroll, { passive: true });
}
