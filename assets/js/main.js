/* JAGIS – Website-Skripte (ohne Abhängigkeiten) */
(function () {
  'use strict';
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
  });
})();
