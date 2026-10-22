/* sig.js — подпись Дарии Кромберг + пасхалка: из подписи поднимается пиксельный дракон
   Подключение: <script src="sig.js" defer></script>
   Подпись: <span class="dk-sig" role="img" aria-label="Подпись Дарии Кромберг"></span>
   Дракон по наведению на любой элемент с атрибутом data-dk-dragon (у .dk-sig включён сам) */
(function () {
  var VB = '95 44 751 826', D = 'M 368.308 69.010 C 362.559 71.326, 362.056 74.567, 363.424 100.500 C 364.157 114.387, 364.130 114.657, 360.048 134 C 353.745 163.869, 347.549 186.757, 341.406 202.865 C 331.944 227.674, 330.107 233.313, 326.985 247.135 C 325.325 254.486, 321.935 266.617, 319.453 274.093 C 316.970 281.569, 313.422 294.881, 311.569 303.674 C 307.873 321.205, 305.190 328.801, 298.293 341.259 C 291.401 353.706, 289.571 359.533, 284.539 385.061 C 276.473 425.977, 271.929 436.261, 261.284 437.689 C 250.778 439.098, 242.292 429.658, 231.435 404.485 C 228.432 397.521, 221.311 382.075, 215.611 370.161 C 189.719 316.041, 189.106 314.552, 186.545 299.460 C 182.511 275.688, 173.969 251.312, 166.788 243.084 C 141.531 214.142, 119.524 210.830, 119.718 236 C 119.902 259.854, 130.198 302.437, 142.203 329 C 158.693 365.484, 173.183 393.610, 186.510 415 C 190.450 421.325, 196.067 430.550, 198.991 435.500 C 201.916 440.450, 209.443 452.110, 215.719 461.412 C 242.367 500.905, 243.284 512.638, 223.035 554.964 C 204.813 593.052, 203.754 610.301, 218.785 624.156 C 230.030 634.522, 237.273 635.302, 274.688 630.176 C 315.311 624.612, 319.924 625.967, 338.441 648.896 C 347.907 660.617, 374.988 701.744, 382.957 716.500 C 393.012 735.120, 397.893 743.393, 408.030 759 C 418.561 775.214, 427.093 790.195, 436.506 809 C 452.411 840.778, 470.858 853.196, 484.355 841.212 C 489.323 836.800, 491.406 825.602, 488.922 816.658 C 484.708 801.483, 457.938 747.433, 446.974 731.965 C 442.505 725.659, 435.656 715.100, 431.755 708.500 C 420.015 688.638, 408.829 672.081, 399.835 661.255 C 388.309 647.381, 385.571 642.225, 385.531 634.318 C 385.463 620.690, 392.339 618.229, 425.997 619.839 C 438.923 620.457, 503.275 621.220, 569 621.535 C 634.725 621.850, 695.250 622.516, 703.500 623.016 C 747.157 625.662, 808.554 624.942, 814.662 621.712 C 826.046 615.692, 823.661 602.972, 810.051 597.117 C 797.307 591.635, 767.434 584.982, 744.439 582.504 C 736.222 581.619, 718.475 579.534, 705 577.870 C 689.092 575.907, 674.363 574.722, 663 574.491 C 639.706 574.019, 511.451 572.188, 507 572.264 C 505.075 572.297, 474.025 572.341, 438 572.362 C 401.975 572.383, 367.550 572.415, 361.500 572.435 C 345.135 572.487, 340.180 569.415, 324.310 549.374 C 310.588 532.045, 300.275 513.032, 296.397 497.911 C 293.251 485.645, 295.955 473.083, 306.105 452.812 C 310.162 444.709, 320.121 421.676, 331.749 393.500 C 333.111 390.200, 336.584 380.750, 339.467 372.500 C 342.350 364.250, 346.531 353.225, 348.759 348 C 352.424 339.403, 370.171 287.178, 384.269 243.500 C 387.288 234.150, 393.450 218.400, 397.964 208.500 C 411.125 179.637, 423 137.716, 423 120.119 C 423 97.078, 385.537 62.070, 368.308 69.010';
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var css = '.dk-sig{display:inline-block;width:1.7em;height:1.85em;vertical-align:-.55em;color:inherit;cursor:default;transition:transform .4s cubic-bezier(.2,.8,.2,1),filter .4s}' +
    '.dk-sig svg{display:block;width:100%;height:100%}' +
    '.dk-sig:hover,.dk-sig.is-play{transform:translateY(-1px) rotate(-4deg);filter:drop-shadow(0 0 6px rgba(124,107,255,.55))}' +
    '.dk-dragon{position:fixed;z-index:9999;pointer-events:none;image-rendering:pixelated;opacity:0;transition:opacity .4s;filter:drop-shadow(0 0 6px rgba(124,107,255,.5))}' +
    '.dk-dragon.is-on{opacity:1}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  document.querySelectorAll('.dk-sig').forEach(function (el) {
    if (!el.innerHTML.trim()) el.innerHTML = '<svg viewBox="' + VB + '" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="' + D + '"/></svg>';
    el.setAttribute('data-dk-dragon', '');
  });
  if (reduce) return;

  var DRAGON = [
    '.....................h...h..........f.y.....', '.....................hb..hb........fyf.y....', 'v.....................bbbbb.......ffy.f.....',
    'vv...................bbbebbbb....fyf........', '.vv.................bbbbbbbbbbbff...........', '.vwv................bbbbbaabbbf.........v...',
    '..vwv...............bbbb...aa..........vv...', '..vwwv...............bbbb.............vwv...', '...vwwv...............bbb............vwwv...',
    '...vwwwv..............bbbb..........vwwv....', '....vwwwv..............bbb.........vwwwv....', '....vwwwwv.............bbbb.......vwwwv.....',
    '.....vwwwwv.............bbb......vwwwwv.....', '.....vwwwwwv...........cbbb.....vwwwwv......', '......vwwwwwv.........ccbbb....vwwwwwv......',
    '......vwwwwwwv.......ccbbbbb..vwwwwwv.......', '.......vwwwwwwvv....ccbbbbbbbvwwwwwwv.......', '.......vwwwwwwwwvv.ccbbbbbbbbbwwwwwv........',
    '........vwwwwwwwwwbcbbbbbbbbbwwwwwv.........', '........vwwvwwwvwwbcbbbbbbbbbwwvwwv.........', '.........vv.vwv.vvbccbbbbbbbbvv.vv..........',
    '..........v..v....bccbbbbbbbb...............', '..................bccbbbbbbab...............', '..................bbccbbbbbab...............',
    '.................bb.ccbbbbab.bb.............', '................bb..bccbbbb...bb............', '...............hh...bbcbbbb....hh...........',
    '.....................bbbbbb.................', '......................bbbbb.................', '.......................bbbb.................',
    '........................bbb.................', '........................bbb.................', '.......................bbb..................',
    '......................bbb...................', '....................bbbb....................', '..................bbbb......................',
    '.................bbb........................', '.................bb.........................', '..................bb........................',
    '...................bhh......................'
  ];
  var PAL = { b: '#7c6bff', a: '#463a82', c: '#b9f0e6', e: '#e7c27a', f: '#ffaa5a', y: '#ffe08a', h: '#dcd7f0', w: '#342c64', v: '#96c8e6' };
  var PIX = [];
  DRAGON.forEach(function (row, y) {
    for (var x = 0; x < row.length; x++) if (row[x] !== '.') PIX.push({ x: x, y: y, ch: row[x], wing: row[x] === 'w' || row[x] === 'v',
      ax: 22 + (Math.random() - .5) * 10, ay: 41 + Math.random() * 2, delay: (39 - y) / 39 * 900 + Math.random() * 300, fx: (Math.random() - .5) * 6 });
  });
  function hex(c) { return [1, 3, 5].map(function (i) { return parseInt(c.slice(i, i + 2), 16); }); }
  function mix(a, b, k) { a = hex(a); b = hex(b); return 'rgb(' + [0, 1, 2].map(function (i) { return Math.round(a[i] + (b[i] - a[i]) * k); }).join(',') + ')'; }
  function clamp(k) { return k < 0 ? 0 : k > 1 ? 1 : k; }

  var cv = document.createElement('canvas'); cv.className = 'dk-dragon'; cv.setAttribute('aria-hidden', 'true');
  var cx = cv.getContext('2d'), S = 3, cssS = 3, state = 'off', t0 = 0, fallT = 0, anchor = null, keep = false, raf = 0;
  var RISE = 1700;

  function place() {
    if (!anchor) return;
    var r = anchor.getBoundingClientRect(), w = 44 * cssS, h = 44 * cssS;
    var left = Math.max(6, Math.min(window.innerWidth - w - 6, r.left + r.width / 2 - w / 2));
    var top = r.top - h + 4; if (top < 6) top = r.bottom + 4;
    cv.style.left = left + 'px'; cv.style.top = top + 'px';
  }
  function px(x, y, col, a, sz) { sz = sz || S; cx.globalAlpha = a; cx.fillStyle = col; cx.fillRect(Math.round(x * S + (S - sz) / 2), Math.round(y * S + (S - sz) / 2), sz, sz); }
  function frame(now) {
    place(); cx.clearRect(0, 0, cv.width, cv.height);
    var t = now - t0;
    if (state === 'rise' && t >= RISE) state = 'live';
    if (state === 'live' && !keep) { state = 'fall'; fallT = now; }
    if (state === 'rise') PIX.forEach(function (p) {
      var k = 1 - Math.pow(1 - clamp((t - p.delay) / 750), 3);
      if (k <= 0) { if (Math.random() < .3) px(p.ax, p.ay, '#ffaa5a', .55, S * .6); return; }
      px(p.ax + (p.x - p.ax) * k + Math.sin(k * 6 + p.fx) * (1 - k), p.ay + (p.y - p.ay) * k, k < 1 ? mix('#ffaa5a', PAL[p.ch], k * k) : PAL[p.ch], .35 + k * .65, k < 1 ? S * (.6 + k * .4) : S);
    });
    else if (state === 'live') {
      var flap = 1 - .42 * Math.pow(Math.sin((t - RISE) / 200), 2);
      PIX.forEach(function (p) {
        if ((p.ch === 'f' || p.ch === 'y') && Math.random() < .25) return;
        px(p.x, Math.round(p.wing ? 17 + (p.y - 17) * flap : p.y), PAL[p.ch], 1);
      });
    } else if (state === 'fall') {
      var ft = now - fallT;
      if (ft > 1700) { stop(); return; }
      PIX.forEach(function (p) {
        var k = clamp((ft - p.y * 16 - Math.random() * 50) / 1000);
        px(p.x + p.fx * k, p.y + k * k * (42 - p.y), mix(PAL[p.ch], '#3a3646', Math.min(1, k * 1.6)), 1 - k * .9);
      });
    }
    cx.globalAlpha = 1; raf = requestAnimationFrame(frame);
  }
  function start(el) {
    if (state === 'live') { keep = true; return; }
    if (state !== 'off') return;
    anchor = el; keep = true;
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    cssS = window.innerWidth < 700 ? 2 : 3; S = cssS * dpr;
    cv.width = 44 * S; cv.height = 44 * S; cv.style.width = 44 * cssS + 'px'; cv.style.height = 44 * cssS + 'px';
    if (!cv.parentNode) document.body.appendChild(cv);
    state = 'rise'; t0 = performance.now(); el.classList.add('is-play');
    requestAnimationFrame(function () { cv.classList.add('is-on'); });
    cancelAnimationFrame(raf); raf = requestAnimationFrame(frame);
  }
  function stop() {
    state = 'off'; cv.classList.remove('is-on'); cx.clearRect(0, 0, cv.width, cv.height);
    if (anchor) anchor.classList.remove('is-play');
  }

  document.querySelectorAll('[data-dk-dragon]').forEach(function (el) {
    el.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') start(el); });
    el.addEventListener('pointerleave', function (e) { if (e.pointerType === 'mouse') keep = false; });
    el.addEventListener('click', function (e) {          // touch: tap plays the whole story
      if (e.pointerType === 'mouse' || (window.matchMedia && window.matchMedia('(hover: hover)').matches)) return;
      start(el); setTimeout(function () { keep = false; }, RISE + 2600);
    });
  });
})();
