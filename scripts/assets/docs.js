(function () {
  var root = document.documentElement;

  /* theme */
  function setTheme(t, save) {
    root.setAttribute('data-theme', t);
    document.querySelectorAll('[data-theme-set]').forEach(function (b) { b.setAttribute('aria-checked', String(b.getAttribute('data-theme-set') === t)); });
    document.querySelectorAll('iframe[data-frame]').forEach(function (f) { try { f.contentWindow.postMessage({ nslTheme: t }, '*'); } catch (e) {} });
    if (save) try { localStorage.setItem('nsl-docs-theme', t); } catch (e) {}
  }
  setTheme(root.getAttribute('data-theme') || 'primary');
  document.querySelectorAll('[data-theme-set]').forEach(function (b) { b.addEventListener('click', function () { setTheme(b.getAttribute('data-theme-set'), true); }); });

  /* mobile nav */
  var menu = document.querySelector('.top__menu');
  if (menu) menu.addEventListener('click', function () { var on = document.body.classList.toggle('nav-open'); menu.setAttribute('aria-expanded', String(on)); });
  document.addEventListener('click', function (e) { if (document.body.classList.contains('nav-open') && !e.target.closest('.layout__side, .top__menu')) { document.body.classList.remove('nav-open'); menu.setAttribute('aria-expanded', 'false'); } });
  var cur = document.querySelector('.side a[aria-current="page"]');
  var sideEl = document.querySelector('.layout__side');
  if (cur && sideEl) sideEl.scrollTop = Math.max(0, cur.offsetTop - sideEl.clientHeight / 2);

  /* sidebar search */
  var q = document.getElementById('navSearch');
  if (q) {
    q.addEventListener('input', function () {
      var v = q.value.trim().toLowerCase();
      document.querySelectorAll('.side__sec').forEach(function (sec) {
        var any = false;
        sec.querySelectorAll('a').forEach(function (a) { var hit = !v || a.textContent.toLowerCase().indexOf(v) >= 0; a.hidden = !hit; any = any || hit; });
        sec.hidden = !any;
      });
    });
    q.addEventListener('keydown', function (e) { if (e.key === 'Enter') { var a = document.querySelector('.side a:not([hidden])' + (q.value ? '' : '[aria-current]')); var first = Array.prototype.find.call(document.querySelectorAll('.side__sec:not([hidden]) a'), function (x) { return !x.hidden; }); if (first) location.href = first.href; } });
    document.addEventListener('keydown', function (e) { if (e.key === '/' && !/input|textarea/i.test(document.activeElement.tagName)) { e.preventDefault(); if (window.innerWidth <= 960) document.body.classList.add('nav-open'); q.focus(); } });
  }

  /* icon filter */
  var iq = document.getElementById('iconSearch');
  if (iq) iq.addEventListener('input', function () { var v = iq.value.trim().toLowerCase(); document.querySelectorAll('.ico').forEach(function (b) { b.hidden = v && b.getAttribute('data-name').indexOf(v) < 0; }); });

  /* copy */
  function toast(t) { var el = document.createElement('div'); el.className = 'toast'; el.setAttribute('role', 'status'); el.textContent = t; document.body.appendChild(el); setTimeout(function () { el.remove(); }, 1400); }
  function copy(text) { (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(function () { toast('Copied ' + (text.length > 40 ? 'code' : text)); }, function () { toast('Copy failed'); }); }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-copy]');
    if (b) { copy(b.parentNode.querySelector('code').textContent); return; }
    var c = e.target.closest('[data-copy-text]');
    if (c) copy(c.getAttribute('data-copy-text'));
  });
  document.addEventListener('keydown', function (e) { if ((e.key === 'Enter' || e.key === ' ') && e.target.matches && e.target.matches('[data-copy-text][role="button"]')) { e.preventDefault(); copy(e.target.getAttribute('data-copy-text')); } });

  /* example frames: auto height, width presets */
  window.addEventListener('message', function (e) {
    if (!e.data || !e.data.nslFrame) return;
    document.querySelectorAll('iframe[data-frame]').forEach(function (f) { if (f.contentWindow === e.source) { var h = Math.max(120, e.data.h); if (Math.abs(f.offsetHeight - h) > 2) f.style.height = h + 'px'; } });
  });
  document.querySelectorAll('.ex').forEach(function (ex) {
    var f = ex.querySelector('iframe');
    f.addEventListener('load', function () { try { f.contentWindow.postMessage({ nslTheme: root.getAttribute('data-theme') }, '*'); } catch (e) {} });
    ex.querySelectorAll('[data-w]').forEach(function (b) {
      b.addEventListener('click', function () {
        var w = b.getAttribute('data-w');
        ex.querySelectorAll('[data-w]').forEach(function (x) { x.setAttribute('aria-checked', String(x === b)); });
        f.style.width = w ? w + 'px' : '100%';
        if (w) f.setAttribute('data-narrow', ''); else f.removeAttribute('data-narrow');
      });
    });
  });
})();
