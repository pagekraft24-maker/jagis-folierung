/* JAGIS – Website-Skripte (ohne Abhängigkeiten) */
(function () {
  'use strict';
  var WA_NUMBER = '4915735626023';
  var EMAIL = 'gottmannjascha@gmail.com';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function ready(fn) { if (document.readyState !== 'loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }

  ready(function () {
    var root = document.documentElement;

    /* ---------- Mobile-Menü ---------- */
    var toggle = document.querySelector('[data-menu-toggle]');
    var menu = document.getElementById('mobile-menu');
    function setMenu(open) {
      root.classList.toggle('menu-open', open);
      if (!toggle || !menu) return;
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
      menu.setAttribute('aria-hidden', String(!open));
      menu.querySelectorAll('a').forEach(function (a) { a.tabIndex = open ? 0 : -1; });
      document.body.style.overflow = open ? 'hidden' : '';
    }
    if (toggle) toggle.addEventListener('click', function () { setMenu(!root.classList.contains('menu-open')); });
    document.querySelectorAll('[data-menu-link]').forEach(function (a) { a.addEventListener('click', function () { setMenu(false); }); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && root.classList.contains('menu-open')) setMenu(false); });
    window.addEventListener('resize', function () { if (window.innerWidth >= 768 && root.classList.contains('menu-open')) setMenu(false); });

    /* ---------- Hero: Einblenden, Parallax, Scroll-Hinweis ---------- */
    var heroIn = document.querySelectorAll('.hero-in');
    setTimeout(function () { heroIn.forEach(function (el) { el.classList.add('is-visible'); }); }, 100);
    var parallax = document.querySelector('[data-parallax]');
    var indicator = document.querySelector('.scroll-indicator');
    var ticking = false;
    function onScroll() {
      var y = window.scrollY || window.pageYOffset;
      if (parallax && !reduceMotion && y < window.innerHeight * 1.2) parallax.style.transform = 'translate3d(0,' + (y * 0.4) + 'px,0)';
      if (indicator) indicator.classList.toggle('is-hidden', y >= 50);
      ticking = false;
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
    onScroll();

    /* ---------- Einblenden beim Scrollen ---------- */
    var reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && !reduceMotion) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      reveals.forEach(function (el) { io.observe(el); });
    } else {
      reveals.forEach(function (el) { el.classList.add('is-visible'); });
    }

    /* ---------- FAQ ---------- */
    document.querySelectorAll('.faq-btn').forEach(function (btn) {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      btn.addEventListener('click', function () {
        var open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!open));
        if (panel) panel.style.maxHeight = open ? '0px' : panel.scrollHeight + 'px';
      });
    });

    /* ---------- Galerie-Lightbox ---------- */
    var lb = document.querySelector('[data-lightbox]');
    var thumbs = Array.prototype.slice.call(document.querySelectorAll('[data-gallery] [data-index]'));
    if (lb && thumbs.length) {
      var lbImg = lb.querySelector('[data-lightbox-img]');
      var lbLabel = lb.querySelector('[data-lightbox-label]');
      var dots = lb.querySelectorAll('[data-dot]');
      var current = 0, lastFocus = null;
      function show(i) {
        current = (i + thumbs.length) % thumbs.length;
        var t = thumbs[current];
        lbImg.src = t.getAttribute('data-full');
        lbImg.alt = t.getAttribute('data-label');
        lbLabel.textContent = t.getAttribute('data-label');
        dots.forEach(function (d, k) { d.classList.toggle('is-active', k === current); });
      }
      function open(i) { lastFocus = document.activeElement; show(i); lb.classList.add('is-open'); document.body.style.overflow = 'hidden'; lb.querySelector('[data-lightbox-close]').focus(); }
      function close() { lb.classList.remove('is-open'); document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); }
      thumbs.forEach(function (t, i) { t.addEventListener('click', function () { open(i); }); });
      lb.addEventListener('click', function (e) { if (!e.target.closest('[data-lightbox-inner]')) close(); });
      lb.querySelector('[data-lightbox-close]').addEventListener('click', close);
      lb.querySelector('[data-lightbox-prev]').addEventListener('click', function () { show(current - 1); });
      lb.querySelector('[data-lightbox-next]').addEventListener('click', function () { show(current + 1); });
      dots.forEach(function (d) { d.addEventListener('click', function () { show(Number(d.getAttribute('data-dot'))); }); });
      document.addEventListener('keydown', function (e) {
        if (!lb.classList.contains('is-open')) return;
        if (e.key === 'Escape') close();
        if (e.key === 'ArrowLeft') show(current - 1);
        if (e.key === 'ArrowRight') show(current + 1);
      });
      var sx = null;
      lb.addEventListener('touchstart', function (e) { sx = e.touches[0].clientX; }, { passive: true });
      lb.addEventListener('touchend', function (e) {
        if (sx === null) return; var dx = e.changedTouches[0].clientX - sx;
        if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1)); sx = null;
      });
    }

    /* ---------- Paket-Vorauswahl ---------- */
    document.querySelectorAll('[data-preset-paket]').forEach(function (a) {
      a.addEventListener('click', function () {
        var sel = document.getElementById('f-paket');
        if (sel) sel.value = a.getAttribute('data-preset-paket');
      });
    });

    /* ---------- Anfrageformular → WhatsApp ---------- */
    var form = document.querySelector('[data-contact-form]');
    if (form) {
      var success = document.querySelector('[data-form-success]');
      var errorEl = form.querySelector('[data-form-error]');
      var counter = form.querySelector('[data-char-count]');
      var msg = form.querySelector('[name="nachricht"]');
      var lastText = '';
      if (msg && counter) msg.addEventListener('input', function () { counter.textContent = '(' + msg.value.length + '/500)'; });

      function compose() {
        var f = new FormData(form);
        var zonen = f.getAll('schutzzonen');
        var lines = ['Hallo JAGIS, ich interessiere mich für eine Lackschutzfolierung.', ''];
        lines.push('Name: ' + f.get('name'));
        lines.push('E-Mail: ' + f.get('email'));
        if (f.get('telefon')) lines.push('Telefon: ' + f.get('telefon'));
        if (f.get('fahrzeug')) lines.push('Fahrzeug: ' + f.get('fahrzeug'));
        lines.push('Paket: ' + f.get('paket'));
        if (f.get('finish')) lines.push('Finish: ' + f.get('finish'));
        if (zonen.length) lines.push('Zusätzliche Schutzzonen: ' + zonen.join(', '));
        if (f.get('nachricht')) { lines.push(''); lines.push(String(f.get('nachricht'))); }
        return lines.join('\n');
      }

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        if (form.querySelector('[name="phone_alt"]').value.trim() !== '') return;
        var required = ['name', 'email', 'paket'];
        var ok = true;
        required.forEach(function (n) {
          var el = form.querySelector('[name="' + n + '"]');
          var valid = el.checkValidity() && String(el.value).trim() !== '';
          el.classList.toggle('field-error', !valid);
          el.setAttribute('aria-invalid', String(!valid));
          if (!valid) ok = false;
        });
        errorEl.classList.toggle('hidden', ok);
        if (!ok) { var first = form.querySelector('.field-error'); if (first) first.focus(); return; }
        lastText = compose();
        window.open('https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(lastText), '_blank', 'noopener');
        form.classList.add('hidden');
        success.classList.add('is-visible');
      });

      form.querySelectorAll('input, select, textarea').forEach(function (el) {
        el.addEventListener('input', function () { el.classList.remove('field-error'); el.removeAttribute('aria-invalid'); });
      });

      var mailLink = document.querySelector('[data-mail-fallback]');
      if (mailLink) mailLink.addEventListener('click', function (e) {
        e.preventDefault();
        window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Anfrage Lackschutzfolierung') + '&body=' + encodeURIComponent(lastText);
      });

      var reset = document.querySelector('[data-form-reset]');
      if (reset) reset.addEventListener('click', function () {
        form.reset(); if (counter) counter.textContent = '(0/500)';
        success.classList.remove('is-visible'); form.classList.remove('hidden');
      });
    }
  });
})();
