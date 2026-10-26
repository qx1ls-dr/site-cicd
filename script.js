(function () {
  'use strict';
  var NS = 'http://www.w3.org/2000/svg';
  var CX = 640, CY = 480, KY = 0.42;

  // craft = distance / 17 km/s; mission = real-mission note shown separately
  var DATA = {
    moon:      { name: 'Луна', sub: 'Естественный спутник Земли', dist: '384 400 км', craft: '~6,3 часа', p1: '~2 мин', p10: '~13 с', c: '~1,3 с', mission: 'Астронавты «Аполлона» летели около 3 дней: корабль разгонялся и тормозил, а не шёл с постоянной скоростью.' },
    mercury:   { name: 'Меркурий', sub: 'Самая близкая к Солнцу планета', dist: '~155 млн км, в среднем', craft: '~3,5 месяца', p1: '~14 часов', p10: '~1,4 часа', c: '~8,6 мин', mission: 'Зонд «Мессенджер» добирался до орбиты Меркурия около 6,5 лет — понадобилось несколько гравитационных манёвров.' },
    venus:     { name: 'Венера', sub: 'Самая горячая планета Солнечной системы', dist: '~170 млн км, в среднем', craft: '~3,8 месяца', p1: '~16 часов', p10: '~1,6 часа', c: '~9,5 мин', mission: 'Реальные зонды обычно летят к Венере около 4 месяцев.' },
    mars:      { name: 'Марс', sub: 'Четвёртая планета от Солнца', dist: '~225 млн км, в среднем', craft: '~153 дня', p1: '~21 час', p10: '~2 часа', c: '~12,5 мин', mission: 'Реальные миссии летят около 7 месяцев: не по прямой, а по экономичной траектории вокруг Солнца.' },
    jupiter:   { name: 'Юпитер', sub: 'Крупнейшая планета Солнечной системы', dist: '~778 млн км', craft: '~1,5 года', p1: '~3 дня', p10: '~7 часов', c: '~43 мин', mission: 'Зонд «Юнона» летел к Юпитеру около 5 лет, с гравитационным манёвром у Земли.' },
    saturn:    { name: 'Сатурн', sub: 'Шестая планета, знаменитая кольцами', dist: '~1,4 млрд км', craft: '~2,6 года', p1: '~5,5 дня', p10: '~13 часов', c: '~1 ч 18 мин', mission: 'Зонд «Кассини» летел к Сатурну около 7 лет, облетев Венеру, Землю и Юпитер.' },
    uranus:    { name: 'Уран', sub: 'Ледяной гигант, лежащий на боку', dist: '~2,9 млрд км', craft: '~5,4 года', p1: '~11 дней', p10: '~27 часов', c: '~2 ч 41 мин', mission: '«Вояджер-2» пролетел мимо Урана примерно через 8,5 года после запуска.' },
    neptune:   { name: 'Нептун', sub: 'Самая далёкая планета Солнечной системы', dist: '~4,5 млрд км', craft: '~8,4 года', p1: '~17 дней', p10: '~42 часа', c: '~4 ч 10 мин', mission: '«Вояджер-2» достиг Нептуна примерно через 12 лет после запуска.' },
    proxima:   { name: 'Проксима Центавра', sub: 'Ближайшая к Солнцу звезда', dist: '4,24 св. года', craft: '~75 тыс. лет', p1: '~424 года', p10: '~42 года', c: '4,24 года', mission: 'Ни один аппарат к ней пока не летит.' },
    vega:      { name: 'Вега', sub: 'Одна из самых ярких звёзд ночного неба', dist: '25 св. лет', craft: '~440 тыс. лет', p1: '~2 500 лет', p10: '~250 лет', c: '25 лет', mission: 'Ни один аппарат к ней пока не летит.' },
    andromeda: { name: 'Галактика Андромеды', sub: 'Ближайшая крупная галактика', dist: '2,5 млн св. лет', craft: '~44 млрд лет', p1: '~250 млн лет', p10: '~25 млн лет', c: '2,5 млн лет', mission: 'Свет, который мы видим сегодня, вышел из Андромеды 2,5 млн лет назад.' }
  };
  var SCEN = {
    craft: { lab: 'Зонд, 17 км/с', note: 'Условный полёт по прямой с постоянной скоростью, без разгона и торможения.' },
    p1:    { lab: '1% скорости света, ≈ 3 000 км/с', note: 'Условный полёт по прямой с постоянной скоростью, без разгона и торможения.' },
    p10:   { lab: '10% скорости света, ≈ 30 000 км/с', note: 'Условный полёт по прямой с постоянной скоростью, без разгона и торможения.' },
    c:     { lab: 'Скорость света, 299 792 км/с', note: 'Время, за которое проходит световой или радиосигнал.' }
  };
  var GROUPS = { near: ['moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'], stars: ['proxima', 'vega'], gal: ['andromeda'] };
  var CHIP = { moon: 'Луна', mercury: 'Меркурий', venus: 'Венера', mars: 'Марс', jupiter: 'Юпитер', saturn: 'Сатурн', uranus: 'Уран', neptune: 'Нептун', proxima: 'Проксима Центавра', vega: 'Вега', andromeda: 'Андромеда' };
  var STARS = { proxima: { x: 560, y: 470, ring: 20, d: 60 }, vega: { x: 800, y: 300, ring: 24, d: 64 }, andromeda: { x: 950, y: 600, ring: 0, d: 130 } };
  var PL = [
    { id: 'mercury', rx: 70,  w: 0.25,  a0: 0.5,  r: 5,  ball: 40 },
    { id: 'venus',   rx: 102, w: 0.16,  a0: 2.6,  r: 8,  ball: 40 },
    { id: 'earth',   rx: 138, w: 0.105, a0: 4.2,  r: 9,  ball: 40 },
    { id: 'mars',    rx: 178, w: 0.07,  a0: 5.6,  r: 7,  ball: 40 },
    { id: 'jupiter', rx: 292, w: 0.03,  a0: 1.9,  r: 22, ball: 40 },
    { id: 'saturn',  rx: 368, w: 0.02,  a0: 0.25, r: 13, ball: 22 },
    { id: 'uranus',  rx: 440, w: 0.013, a0: 3.4,  r: 12, ball: 40 },
    { id: 'neptune', rx: 512, w: 0.01,  a0: 5.0,  r: 12, ball: 40 }
  ];
  var BODIES = ['mercury', 'venus', 'earth', 'moon', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
  var FAR = { proxima: 1, vega: 1, andromeda: 1 };
  function isFar(id) { return !!FAR[id]; }
  var $ = function (id) { return document.getElementById(id); };
  function svgEl(tag, attrs) { var e = document.createElementNS(NS, tag); for (var k in attrs) e.setAttribute(k, attrs[k]); return e; }

  var reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var paused = reduce;

  // ---------- bodies ----------
  var bodyEls = {};
  ['back', 'front'].forEach(function (layer) {
    var parent = $(layer);
    BODIES.forEach(function (id) {
      var g = svgEl('g', {}), b = svgEl('use', { href: '#sym-' + id }), s = svgEl('use', { href: '#shade' });
      g.appendChild(b); g.appendChild(s); parent.appendChild(g);
      (bodyEls[id] = bodyEls[id] || {})[layer] = { g: g, b: b, s: s };
    });
  });

  // ---------- chips ----------
  var chipEls = {};
  Object.keys(GROUPS).forEach(function (gk) {
    var wrap = document.querySelector('[data-group="' + gk + '"]');
    GROUPS[gk].forEach(function (id) {
      var btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'chip'; btn.setAttribute('aria-pressed', 'false');
      var shade = isFar(id) ? '' : '<use href="#shade" x="-50" y="-50" width="100" height="100" transform="' + (id === 'saturn' ? 'rotate(45) scale(0.55)' : 'rotate(45)') + '"/>';
      btn.innerHTML = '<svg width="24" height="24" viewBox="-50 -50 100 100" aria-hidden="true"><use href="#sym-' + id + '" x="-50" y="-50" width="100" height="100"/>' + shade + '</svg><span>' + CHIP[id] + '</span>';
      btn.addEventListener('click', function () { select(id, true); });
      wrap.appendChild(btn); chipEls[id] = btn;
    });
  });

  // ---------- map hit targets ----------
  var hitEls = {};
  var hitWrap = $('hits');
  GROUPS.near.concat(GROUPS.stars, GROUPS.gal).forEach(function (id) {
    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'hit'; btn.tabIndex = -1;
    btn.setAttribute('aria-label', DATA[id].name); btn.setAttribute('aria-pressed', 'false');
    btn.innerHTML = '<span class="hit-label">' + DATA[id].name + '</span>';
    btn.addEventListener('click', function () { select(id, true); });
    hitWrap.appendChild(btn); hitEls[id] = btn;
  });

  var el = {
    svg: $('mapSvg'), sys: $('sys'), far: $('far'), sysRing: $('sysRing'), lblSys: $('lbl-sys'), lblEarth: $('lbl-earth'),
    routeG: $('routeG'), routePath: $('routePath'), routeGlow: $('routeGlow'), selRing: $('selRing'), rocket: $('rocket'),
    pSym: $('pSym'), pShade: $('pShade'), pName: $('pName'), pSub: $('pSub'), pDist: $('pDist'), pMission: $('pMission'),
    aLab: $('aLab'), aVal: $('aVal'), aNote: $('aNote'), status: $('status'), modeText: $('modeText'),
    map: $('map'), mapBox: $('mapBox'), layers: document.querySelectorAll('.sl'), hero: $('route'),
    pauseBtn: $('pauseBtn'), pauseText: $('pauseText'), pauseIc: $('pauseIc')
  };
  var rows = Array.prototype.slice.call(document.querySelectorAll('.srow'));
  var rowVals = {};
  document.querySelectorAll('[data-val]').forEach(function (n) { rowVals[n.getAttribute('data-val')] = n; });

  var now0 = performance.now();
  var sel = 'mars', scen = 'craft', selAt = now0, drawAt = now0 + 500, zoom = 0, last = now0;
  var sim = 0, rocketPhase = 0, counting = true;
  var mx = 0, my = 0, pmx = 0, pmy = 0;
  var mapVisible = true;

  function announce() {
    var d = DATA[sel];
    el.status.textContent = d.name + ': ' + SCEN[scen].lab + ' — ' + d[scen] + '.';
  }

  function select(id, user) {
    var n = performance.now();
    var change = isFar(id) !== isFar(sel);
    sel = id; selAt = n; drawAt = n + (change && !reduce ? 1100 : 150); counting = true;
    Object.keys(chipEls).forEach(function (k) { chipEls[k].setAttribute('aria-pressed', k === id ? 'true' : 'false'); });
    Object.keys(hitEls).forEach(function (k) { hitEls[k].setAttribute('aria-pressed', k === id ? 'true' : 'false'); });
    var d = DATA[id];
    el.pSym.setAttribute('href', '#sym-' + id);
    el.pShade.style.display = isFar(id) ? 'none' : '';
    el.pShade.setAttribute('transform', id === 'saturn' ? 'rotate(45) scale(0.55)' : 'rotate(45)');
    el.pName.textContent = d.name; el.pSub.textContent = d.sub;
    el.pDist.textContent = d.dist; el.pMission.textContent = d.mission;
    if (reduce) renderNumbers(1);
    if (user) announce();
  }

  function setScen(k) {
    scen = k;
    rows.forEach(function (r) { r.setAttribute('aria-pressed', r.getAttribute('data-scen') === k ? 'true' : 'false'); });
    el.aLab.textContent = SCEN[k].lab; el.aNote.textContent = SCEN[k].note;
    el.aVal.textContent = DATA[sel][k];
    announce();
  }
  rows.forEach(function (r) { r.addEventListener('click', function () { setScen(r.getAttribute('data-scen')); }); });

  function setPaused(p) {
    paused = p;
    document.documentElement.classList.toggle('is-paused', p);
    el.pauseBtn.setAttribute('aria-pressed', p ? 'true' : 'false');
    el.pauseText.innerHTML = p ? 'Возобновить<span class="long"> движение</span>' : 'Приостановить<span class="long"> движение</span>';
    el.pauseIc.innerHTML = p ? '<path d="M4 2.5v11l9.5-5.5z"/>' : '<rect x="3" y="2" width="3.5" height="12" rx="1"/><rect x="9.5" y="2" width="3.5" height="12" rx="1"/>';
  }
  el.pauseBtn.addEventListener('click', function () { setPaused(!paused); });

  if (!reduce) {
    el.hero.addEventListener('mousemove', function (ev) {
      var b = el.hero.getBoundingClientRect();
      mx = ((ev.clientX - b.left) / b.width - 0.5) * 2;
      my = ((ev.clientY - b.top) / b.height - 0.5) * 2;
    });
  }

  // ---------- numbers ----------
  function fmt(v, dec) {
    var str = dec ? v.toFixed(dec) : String(Math.round(v));
    var parts = str.split('.');
    var ip = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts[1] ? ip + ',' + parts[1] : ip;
  }
  function anim(str, p) {
    if (p >= 1) return str;
    var m = str.match(/\d(?:\d|[  ](?=\d))*(?:,\d+)?/);
    if (!m) return str;
    var clean = m[0].replace(/[\s ]/g, '').replace(',', '.');
    var dec = (clean.split('.')[1] || '').length;
    return str.replace(m[0], fmt(parseFloat(clean) * p, dec));
  }
  function renderNumbers(p) {
    var d = DATA[sel];
    el.aVal.textContent = anim(d[scen], p);
    ['craft', 'p1', 'p10', 'c'].forEach(function (k) { rowVals[k].textContent = anim(d[k], p); });
  }

  // ---------- map helpers ----------
  var pt = el.svg.createSVGPoint();
  function lerp(a, b, u) { return { x: a.x + (b.x - a.x) * u, y: a.y + (b.y - a.y) * u }; }
  function placer() {
    var m = el.svg.getScreenCTM(); var hr = hitWrap.getBoundingClientRect();
    return function (node, x, y) {
      pt.x = x; pt.y = y; var p = pt.matrixTransform(m);
      node.style.left = (p.x - hr.left).toFixed(1) + 'px'; node.style.top = (p.y - hr.top).toFixed(1) + 'px';
      return m.a;
    };
  }

  function drawMap(now) {
    var ez = zoom * zoom * (3 - 2 * zoom);
    var s = 1 - 0.9 * ez;
    var ccx = CX + (250 - CX) * ez, ccy = CY + (590 - CY) * ez;
    var scr = function (x, y) { return { x: ccx + (x - CX) * s, y: ccy + (y - CY) * s }; };
    el.sys.setAttribute('transform', 'translate(' + ccx.toFixed(2) + ' ' + ccy.toFixed(2) + ') scale(' + s.toFixed(4) + ') translate(' + (-CX) + ' ' + (-CY) + ')');
    el.far.setAttribute('opacity', ez.toFixed(3));
    el.sysRing.setAttribute('cx', ccx); el.sysRing.setAttribute('cy', ccy);

    var W = {};
    PL.forEach(function (p) {
      var a = p.a0 + sim * p.w;
      W[p.id] = { x: CX + p.rx * Math.cos(a), y: CY + p.rx * KY * Math.sin(a), r: p.r, ball: p.ball, front: Math.sin(a) >= 0 };
    });
    var ma = 1.2 + sim * 0.5;
    W.moon = { x: W.earth.x + 19 * Math.cos(ma), y: W.earth.y + 8 * Math.sin(ma), r: 3.2, ball: 40, front: W.earth.front };
    BODIES.forEach(function (id) {
      var o = W[id], bs = o.r * 100 / o.ball, ss = o.r * 2.5;
      var deg = Math.atan2(CY - o.y, CX - o.x) * 180 / Math.PI - 180;
      var rot = 'rotate(' + deg.toFixed(1) + ' ' + o.x.toFixed(2) + ' ' + o.y.toFixed(2) + ')';
      ['back', 'front'].forEach(function (layer) {
        var E = bodyEls[id][layer];
        var show = (layer === 'front') === o.front;
        E.g.style.display = show ? '' : 'none';
        if (!show) return;
        E.b.setAttribute('x', o.x - bs / 2); E.b.setAttribute('y', o.y - bs / 2);
        E.b.setAttribute('width', bs); E.b.setAttribute('height', bs);
        E.s.setAttribute('x', o.x - ss / 2); E.s.setAttribute('y', o.y - ss / 2);
        E.s.setAttribute('width', ss); E.s.setAttribute('height', ss);
        E.s.setAttribute('transform', rot);
      });
    });

    var place = placer();
    var solar = ez < 0.5;
    GROUPS.near.forEach(function (id) {
      var h = hitEls[id]; h.hidden = !solar; if (!solar) return;
      var p = scr(W[id].x, W[id].y);
      var k = place(h, p.x, p.y);
      var D = Math.max(40, (2 * W[id].r * s + 16) * k);
      h.style.width = h.style.height = D.toFixed(1) + 'px';
    });
    GROUPS.stars.concat(GROUPS.gal).forEach(function (id) {
      var h = hitEls[id], S = STARS[id]; h.hidden = solar; if (solar) return;
      var k = place(h, S.x, S.y);
      h.style.width = h.style.height = Math.max(44, S.d * k * 1.15).toFixed(1) + 'px';
    });
    var ep = scr(W.earth.x, W.earth.y);
    place(el.lblEarth, ep.x, ep.y - (9 * s + 32));
    el.lblEarth.style.opacity = Math.max(0, 1 - ez * 2);
    place(el.lblSys, ccx, ccy + 70); el.lblSys.style.opacity = ez.toFixed(2);
    el.modeText.textContent = ez > 0.5 ? 'Межзвёздный масштаб' : 'Солнечная система';

    var tg, tr;
    if (isFar(sel)) { tg = { x: STARS[sel].x, y: STARS[sel].y }; tr = STARS[sel].ring; }
    else { tg = scr(W[sel].x, W[sel].y); tr = W[sel].r * s + 9; }
    var e = ep;
    var dx = tg.x - e.x, dy = tg.y - e.y, len = Math.sqrt(dx * dx + dy * dy) || 1;
    var nx = -dy / len, ny = dx / len;
    if (ny > 0) { nx = -nx; ny = -ny; }
    var bow = Math.min(len * 0.22, 160);
    var c1 = { x: (e.x + tg.x) / 2 + nx * bow, y: (e.y + tg.y) / 2 + ny * bow };
    var pr = (reduce || paused) ? 1 : Math.max(0, Math.min(1, (now - drawAt) / 1400));
    var pe = 1 - Math.pow(1 - pr, 3);
    var A = lerp(e, c1, pe), B = lerp(c1, tg, pe), Q = lerp(A, B, pe);
    var d = 'M' + e.x.toFixed(1) + ' ' + e.y.toFixed(1) + ' Q' + A.x.toFixed(1) + ' ' + A.y.toFixed(1) + ' ' + Q.x.toFixed(1) + ' ' + Q.y.toFixed(1);
    el.routePath.setAttribute('d', d); el.routeGlow.setAttribute('d', d);
    el.routeG.setAttribute('opacity', (reduce || paused || now >= drawAt) ? 1 : 0);
    el.selRing.setAttribute('cx', tg.x); el.selRing.setAttribute('cy', tg.y); el.selRing.setAttribute('r', Math.max(0, tr));
    el.selRing.style.display = tr > 0 ? '' : 'none';
    var u = pr < 1 ? pe : (reduce ? 0.55 : rocketPhase);
    var q0 = (1 - u) * (1 - u), q1 = 2 * (1 - u) * u, q2 = u * u;
    var rx = q0 * e.x + q1 * c1.x + q2 * tg.x, ry = q0 * e.y + q1 * c1.y + q2 * tg.y;
    var tx = 2 * (1 - u) * (c1.x - e.x) + 2 * u * (tg.x - c1.x), ty = 2 * (1 - u) * (c1.y - e.y) + 2 * u * (tg.y - c1.y);
    el.rocket.setAttribute('transform', 'translate(' + rx.toFixed(1) + ' ' + ry.toFixed(1) + ') rotate(' + (Math.atan2(ty, tx) * 180 / Math.PI).toFixed(1) + ') scale(1.6)');
  }

  function frame(now) {
    requestAnimationFrame(frame);
    var dt = Math.min(0.1, (now - last) / 1000); last = now;
    if (document.hidden) return;
    var moving = !paused && !reduce;
    if (moving) sim += dt;
    if (moving && now - drawAt > 1400) rocketPhase = (rocketPhase + dt / 3.6) % 1;
    var target = isFar(sel) ? 1 : 0;
    if (reduce) zoom = target;
    else { zoom += (target - zoom) * Math.min(1, dt * 2.4); if (Math.abs(target - zoom) < 0.002) zoom = target; }

    if (counting) {
      var cp = reduce ? 1 : Math.max(0, Math.min(1, (now - selAt) / 1000));
      renderNumbers(1 - Math.pow(1 - cp, 3));
      if (cp >= 1) counting = false;
    }

    if (!mapVisible) return;
    if (moving) {
      pmx += (mx - pmx) * Math.min(1, dt * 4); pmy += (my - pmy) * Math.min(1, dt * 4);
      var f = [[6, 5], [14, 10], [26, 18]];
      el.layers.forEach(function (L, i) { L.style.transform = 'translate3d(' + (-pmx * f[i][0]).toFixed(2) + 'px,' + (-pmy * f[i][1]).toFixed(2) + 'px,0)'; });
      el.map.style.transform = 'translate3d(' + (pmx * 4).toFixed(2) + 'px,' + (pmy * 3).toFixed(2) + 'px,0)';
    }
    drawMap(now);
  }

  setPaused(paused);
  select('mars', false);
  setScen('craft');
  el.status.textContent = '';
  requestAnimationFrame(frame);

  // ---------- observers ----------
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { mapVisible = en[0].isIntersecting; }).observe(el.mapBox);

    var revs = document.querySelectorAll('[data-reveal]');
    if (!reduce) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
      }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
      revs.forEach(function (n) {
        var r = n.getBoundingClientRect();
        if (r.top < window.innerHeight) n.classList.add('in'); else io.observe(n);
      });
      document.documentElement.classList.add('reveal-ready');
    }

    var links = document.querySelectorAll('#nav a[data-nav]');
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        links.forEach(function (a) { if (a.getAttribute('data-nav') === en.target.id) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['route', 'speeds', 'facts', 'about'].forEach(function (id) { spy.observe($(id)); });
  }

  // ---------- mobile menu ----------
  var nav = $('nav'), toggle = $('navToggle');
  function closeNav() { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', 'Открыть меню'); }
  toggle.addEventListener('click', function () {
    var open = !nav.classList.contains('open');
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) closeNav(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('open')) { closeNav(); toggle.focus(); } });
})();
