function initToast() {
  const toast = document.getElementById('toast');
  if (!toast) return;

  const MSG = '詳細ページは現在準備中です。\nご相談・ご予約はお電話または下記よりどうぞ。';
  let timer = null;

  function showToast() {
    clearTimeout(timer);
    toast.textContent = MSG;
    toast.classList.add('is-visible');
    timer = setTimeout(() => toast.classList.remove('is-visible'), 2500);
  }

  document.querySelectorAll('[data-coming-soon]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      showToast();
    });
  });
}

document.addEventListener('DOMContentLoaded', function () {
  initNavigation();
  initHeroSlider();
  initScrollEffects();
  initToast();
  initModals();
  initLightbox();

  // Prevent placeholder href="#" links from scrolling the page to the top.
  // Logo links (pc-toplink, sp-toplink) are handled by initNavigation() and intentionally scroll.
  document.querySelectorAll('a[href="#"]').forEach(el => {
    el.addEventListener('click', e => e.preventDefault());
  });
});
