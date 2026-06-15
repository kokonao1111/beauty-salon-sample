(function () {
  var el = document.getElementById('siteLoader');
  if (!el) return;

  var rm = window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  document.body.classList.add('is-loading');

  var done  = false;
  var minMs = rm ? 700  : 2700;
  var fadeMs = rm ? 260 : 800;

  function hide() {
    if (done) return;
    done = true;
    el.classList.add('is-hiding');
    document.body.classList.remove('is-loading');
    setTimeout(function () { el.classList.add('is-hidden'); }, fadeMs);
  }

  var minOk = false;
  var domOk = (document.readyState !== 'loading');

  function attempt() { if (minOk && domOk) hide(); }

  setTimeout(function () { minOk = true; attempt(); }, minMs);
  if (!domOk) {
    document.addEventListener('DOMContentLoaded', function () { domOk = true; attempt(); });
  }

  // Hard cutoff — prevents loader from getting stuck
  setTimeout(hide, 4000);
})();
