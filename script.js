/* © 2026 Дария Кромберг */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  requestAnimationFrame(function () { document.body.classList.add('is-loaded'); });

  // Open / closed by Saratov time, 08:00–20:00 daily
  function updateStatus() {
    var el = document.getElementById('status'), long = document.getElementById('status-long');
    try {
      var parts = new Intl.DateTimeFormat('ru-RU', { timeZone: 'Europe/Saratov', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
      var h = +parts.find(function (p) { return p.type === 'hour'; }).value;
      var m = +parts.find(function (p) { return p.type === 'minute'; }).value;
      var t = h * 60 + m, open = t >= 8 * 60 && t < 20 * 60;
      el.classList.toggle('is-open', open);
      el.querySelector('span').textContent = open ? 'Открыто до 20:00' : 'Закрыто · откроемся в 08:00';
      if (long) long.textContent = open ? 'Сейчас открыто — заходите' : 'Сейчас закрыто — откроемся в 08:00';
    } catch (e) {}
  }
  updateStatus(); setInterval(updateStatus, 60000);

  // Reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  // Header
  var header = document.getElementById('header');
  window.addEventListener('scroll', function () { header.classList.toggle('is-scrolled', window.scrollY > 10); }, { passive: true });

  // Showcase: pinned, items swap as you scroll
  var sc = document.getElementById('showcase');
  if (sc) {
    var pin = sc.querySelector('.showcase__pin');
    var slides = Array.prototype.slice.call(sc.querySelectorAll('.slide'));
    var n = slides.length;
    sc.style.setProperty('--n', n);
    document.getElementById('sc-n').textContent = String(n).padStart(2, '0');
    var counter = document.getElementById('sc-i'), bar = document.getElementById('sc-bar'), last = -1;
    function render() {
      if (reduce) { slides.forEach(function (s) { s.style.opacity = 1; }); return; }
      var r = sc.getBoundingClientRect();
      var p = clamp(-r.top / (sc.offsetHeight - window.innerHeight), 0, 1);
      var pos = p * (n - 1), idx = Math.round(pos);
      slides.forEach(function (s, i) {
        var d = pos - i, ad = Math.abs(d);
        s.style.opacity = clamp(1 - (ad - 0.12) / 0.36, 0, 1);
        s.classList.toggle('is-current', i === idx);
        s.setAttribute('aria-hidden', i === idx ? 'false' : 'true');
        s.querySelector('.slide__float').style.transform = 'translate3d(0,' + (-d * 55) + 'vh,0) rotate(' + (d * 16) + 'deg) scale(' + (1 - ad * .25) + ')';
        s.querySelector('.slide__word').style.transform = 'translate(-50%,-50%) translate3d(' + (-d * 45) + 'vw,0,0)';
        s.querySelector('.slide__jp').style.transform = 'translate3d(0,' + (d * 30) + 'vh,0)';
        s.querySelector('.slide__info').style.transform = 'translate3d(0,' + (-d * 18) + 'vh,0)';
      });
      if (idx !== last) {
        last = idx;
        counter.textContent = String(idx + 1).padStart(2, '0');
        pin.style.setProperty('--tint', slides[idx].dataset.tint);
      }
      bar.style.width = (p * 100) + '%';
    }
    window.addEventListener('scroll', function () { requestAnimationFrame(render); }, { passive: true });
    window.addEventListener('resize', render);
    render();
  }

  // Sticky menu tabs follow the section in view
  var tabs = Array.prototype.slice.call(document.querySelectorAll('.tab'));
  function setTab(key) {
    tabs.forEach(function (t) {
      var on = t.dataset.tab === key;
      t.classList.toggle('is-active', on);
      if (on) { t.setAttribute('aria-current', 'true'); t.parentElement.scrollTo({ left: t.offsetLeft - 20, behavior: reduce ? 'auto' : 'smooth' }); }
      else t.removeAttribute('aria-current');
    });
  }
  if ('IntersectionObserver' in window) {
    var po = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) setTab(e.target.dataset.tab); });
    }, { rootMargin: '-40% 0px -55% 0px' });
    document.querySelectorAll('.panel').forEach(function (p) { po.observe(p); });
  }

  // Drag-to-scroll gallery
  var g = document.querySelector('.gallery');
  if (g) {
    var down = false, sx = 0, sl = 0;
    g.addEventListener('mousedown', function (e) { down = true; sx = e.pageX; sl = g.scrollLeft; g.classList.add('is-dragging'); });
    window.addEventListener('mouseup', function () { down = false; g.classList.remove('is-dragging'); });
    g.addEventListener('mousemove', function (e) { if (!down) return; e.preventDefault(); g.scrollLeft = sl - (e.pageX - sx); });
  }
})();
