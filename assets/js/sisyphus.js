(function () {
  'use strict';

  // ─── Canvas & DOM ───────────────────────────────────────────────────────
  const canvas  = document.getElementById('game');
  const ctx     = canvas.getContext('2d');
  const textEl  = document.getElementById('sis-text');
  const hintEl  = document.getElementById('sis-hint');
  const tallyEl = document.getElementById('sis-tally');
  const endEl   = document.getElementById('sis-end');

  const GOLD = '212, 178, 108';

  // ─── Geometry (recomputed on resize) ────────────────────────────────────
  let W, H, foot, summit, dir, nrm, slopeLen, rockR, figGap, groundLeft;

  function computeGeom() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;

    foot   = { x: W * 0.13, y: H * 0.90 };
    summit = { x: W * 0.80, y: H * 0.24 };

    const dx = summit.x - foot.x, dy = summit.y - foot.y;
    slopeLen = Math.hypot(dx, dy);
    dir = { x: dx / slopeLen, y: dy / slopeLen };   // up-slope
    nrm = { x: dy / slopeLen, y: -dx / slopeLen };  // outward normal (up-left)

    rockR  = Math.max(16, Math.min(40, Math.min(W, H) * 0.035));
    figGap = (rockR * 1.5) / slopeLen;

    // extend the slope line down past the foot to the ground (for the silhouette)
    const s = (H + 20 - foot.y) / (-dir.y);
    groundLeft = { x: foot.x - dir.x * s, y: foot.y - dir.y * s };
  }

  function posAt(t) {
    return { x: foot.x + dir.x * slopeLen * t, y: foot.y + dir.y * slopeLen * t };
  }
  function rockCenter(t) {
    const p = posAt(t);
    return { x: p.x + nrm.x * rockR, y: p.y + nrm.y * rockR };
  }

  // ─── State ──────────────────────────────────────────────────────────────
  let phase = 0;
  let t = 0;            // rock position along slope [0,1]
  let v = 0;            // velocity in t-units / second
  let holding = false;
  let slipping = false; // near-summit forced fall in progress
  let rollbacks = 0;
  let reveal = 0;       // 0→1 fade-in of the scene
  let revealStart = 0;
  let figureAlpha = 1;
  let dissolving = false;
  const particles = [];

  let lastRelease = 0;
  let phase3Ref = 0;       // timer reference for "letting go"
  let phase3Armed = false; // the "you can stop" prompt has shown
  let nudged = false;      // "no one is making you" shown once
  let climbStart = 0;
  let firstTouch = false;

  // ─── Physics constants ──────────────────────────────────────────────────
  const PUSH = 0.55, GRAV = 0.32, VMAX_UP = 0.40, VMAX_DOWN = 0.80;
  const SUMMIT_T = 0.93, LET_GO_MS = 4000, CLIMB_TIMEOUT = 95000;

  // ─── localStorage ───────────────────────────────────────────────────────
  let prior = null;
  try { prior = JSON.parse(localStorage.getItem('sisyphus_v1') || 'null'); } catch (_) {}

  function save(completed) {
    try {
      localStorage.setItem('sisyphus_v1', JSON.stringify({
        rollbacks: rollbacks,
        completed: !!completed,
        lastVisit: Date.now()
      }));
    } catch (_) {}
  }

  // ─── Narration ──────────────────────────────────────────────────────────
  function showText(html) {
    textEl.style.transition = 'opacity 0.6s ease';
    textEl.style.opacity = '0';
    clearTimeout(showText._t);
    showText._t = setTimeout(function () {
      textEl.innerHTML = html ? '<p class="s-para">' + html + '</p>' : '';
      textEl.style.opacity = '1';
    }, 550);
  }
  function after(ms, fn) { return setTimeout(fn, ms); }

  function updateTally() {
    if (rollbacks <= 0) return;
    tallyEl.textContent = rollbacks + (rollbacks === 1 ? ' fall' : ' falls');
    tallyEl.classList.add('show');
  }

  // ─── Phase machine ──────────────────────────────────────────────────────
  function setPhase(n) {
    if (n <= phase && n !== 0) return;
    phase = n;

    if (n === 1) {
      hintEl.classList.add('show');
      climbStart = performance.now();
      after(6500, function () {
        if (phase === 1 && rollbacks === 0)
          showText('One must imagine Sisyphus happy.');
      });
    }

    if (n === 3) {
      hintEl.classList.remove('show');
      showText('Who is pushing?');
      after(3900, function () {
        if (phase === 3) showText('The gods condemned Sisyphus.<br>But who keeps climbing?');
      });
      after(8200, function () {
        if (phase !== 3) return;
        showText('You can stop.<br>No one is holding the rock but you.');
        phase3Armed = true;
        phase3Ref = performance.now();
      });
    }

    if (n === 4) {
      dissolving = true;
      hintEl.classList.remove('show');
      spawnDissolve();
      showText('The rock remains.');
      after(2400, function () { showText('The mountain remains.'); });
      after(4900, function () { showText('The one who carried it does not.'); });
      after(7600, function () { showText('I am not.'); });
      after(11200, function () { setPhase(5); });
    }

    if (n === 5) {
      showText('');
      renderEnd();
      save(true);
    }
  }

  // ─── Rollback (the rock slips from near the summit) ─────────────────────
  function onRollback() {
    rollbacks++;
    updateTally();
    save(false);
    if (phase < 3) {
      if (rollbacks === 1) { setPhase(2); showText('The rock will fall.<br>You knew this when you started.'); }
      else if (rollbacks === 2) { showText('And still — you reach for it again.'); }
      else if (rollbacks >= 3) { setPhase(3); }
    }
  }

  // ─── Dissolution particles ──────────────────────────────────────────────
  function figureFeet() {
    const ft = Math.max(0, t - figGap);
    const p = posAt(ft);
    return { x: p.x + nrm.x * 2, y: p.y + nrm.y * 2, ft: ft };
  }
  function spawnDissolve() {
    const f = figureFeet();
    const h = rockR * 1.7;
    const cx = f.x + nrm.x * h * 0.5;
    const cy = f.y + nrm.y * h * 0.5;
    for (let i = 0; i < 60; i++) {
      const ang = Math.random() * Math.PI * 2;
      const sp  = Math.random() * 22 + 6;
      particles.push({
        x: cx + (Math.random() - 0.5) * rockR,
        y: cy + (Math.random() - 0.5) * h,
        vx: Math.cos(ang) * sp * 0.4,
        vy: -Math.abs(Math.sin(ang) * sp) - 12,   // drift upward
        r: Math.random() * 1.6 + 0.5,
        a: Math.random() * 0.5 + 0.4,
        life: 1
      });
    }
  }

  // ─── Input ──────────────────────────────────────────────────────────────
  function startHold(e) {
    if (e && e.cancelable) e.preventDefault();
    if (phase === 5) return;
    if (!firstTouch) { firstTouch = true; hintEl.classList.remove('show'); }
    holding = true;
    if (phase >= 3 && phase3Armed && !nudged) {
      nudged = true;
      showText('No one is making you.');
    }
  }
  function endHold() {
    if (!holding) return;
    holding = false;
    lastRelease = performance.now();
  }

  window.addEventListener('pointerdown', startHold, { passive: false });
  window.addEventListener('pointerup', endHold);
  window.addEventListener('pointercancel', endHold);
  window.addEventListener('blur', endHold);
  window.addEventListener('keydown', function (e) {
    if (e.code === 'Space' || e.key === ' ') { e.preventDefault(); if (!holding) startHold(); }
  });
  window.addEventListener('keyup', function (e) {
    if (e.code === 'Space' || e.key === ' ') endHold();
  });
  window.addEventListener('resize', computeGeom);

  // ─── Update ─────────────────────────────────────────────────────────────
  function update(dt, now) {
    // scene reveal
    if (revealStart && reveal < 1) reveal = Math.min(1, reveal + dt / 2.2);

    // physics — frozen once dissolving begins
    if (!dissolving) {
      if (slipping) {
        v -= GRAV * 1.4 * dt;
        if (v < -VMAX_DOWN) v = -VMAX_DOWN;
        if (t < 0.5) slipping = false;
      } else {
        if (holding && phase >= 1) v += PUSH * dt;
        v -= GRAV * dt;
        if (v > VMAX_UP)   v = VMAX_UP;
        if (v < -VMAX_DOWN) v = -VMAX_DOWN;
      }

      t += v * dt;

      if (t <= 0) { t = 0; if (v < 0) v = 0; }
      if (t >= SUMMIT_T && !slipping) {        // it always falls
        t = SUMMIT_T;
        slipping = true;
        v = -0.45;
        onRollback();
      }
    }

    // fallback so a player who barely pushes still reaches the turn
    if (phase >= 1 && phase < 3 && climbStart && now - climbStart > CLIMB_TIMEOUT) setPhase(3);

    // "letting go" detection
    if (phase === 3 && phase3Armed && !holding) {
      const ref = Math.max(phase3Ref, lastRelease);
      if (now - ref > LET_GO_MS) setPhase(4);
    }

    // dissolving figure fade
    if (dissolving && figureAlpha > 0) figureAlpha = Math.max(0, figureAlpha - dt / 2.4);

    // particles
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 3 * dt;          // slight settling, then they keep rising mostly
      p.life -= dt / 4.5;
      if (p.life <= 0) particles.splice(i, 1);
    }
  }

  // ─── Render ─────────────────────────────────────────────────────────────
  function drawMountain() {
    ctx.save();
    ctx.globalAlpha = reveal;
    ctx.beginPath();
    ctx.moveTo(groundLeft.x, groundLeft.y);
    ctx.lineTo(summit.x, summit.y);
    ctx.lineTo(W + 20, H + 20);
    ctx.lineTo(groundLeft.x, H + 20);
    ctx.closePath();
    const g = ctx.createLinearGradient(summit.x, summit.y, foot.x, H);
    g.addColorStop(0, 'rgba(26, 23, 17, 0.96)');
    g.addColorStop(1, 'rgba(10, 10, 12, 0.98)');
    ctx.fillStyle = g;
    ctx.fill();

    // edge-lit rim along the slope the rock climbs
    ctx.beginPath();
    ctx.moveTo(groundLeft.x, groundLeft.y);
    ctx.lineTo(summit.x, summit.y);
    ctx.strokeStyle = 'rgba(' + GOLD + ', 0.16)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
  }

  function drawRock() {
    const c = rockCenter(t);
    ctx.save();
    ctx.globalAlpha = reveal;
    // glow
    const glow = ctx.createRadialGradient(c.x, c.y, rockR * 0.4, c.x, c.y, rockR * 2.1);
    glow.addColorStop(0, 'rgba(' + GOLD + ', 0.16)');
    glow.addColorStop(1, 'rgba(' + GOLD + ', 0)');
    ctx.fillStyle = glow;
    ctx.beginPath(); ctx.arc(c.x, c.y, rockR * 2.1, 0, Math.PI * 2); ctx.fill();
    // body
    const body = ctx.createRadialGradient(
      c.x - rockR * 0.35, c.y - rockR * 0.4, rockR * 0.2, c.x, c.y, rockR);
    body.addColorStop(0, 'rgba(58, 52, 40, 1)');
    body.addColorStop(1, 'rgba(20, 18, 14, 1)');
    ctx.fillStyle = body;
    ctx.beginPath(); ctx.arc(c.x, c.y, rockR, 0, Math.PI * 2); ctx.fill();
    // rim
    ctx.strokeStyle = 'rgba(' + GOLD + ', 0.55)';
    ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.arc(c.x, c.y, rockR, 0, Math.PI * 2); ctx.stroke();
    ctx.restore();
  }

  function drawFigure() {
    if (figureAlpha <= 0) return;
    const f = figureFeet();
    const h = rockR * 1.7;
    const lean = holding ? 0.32 : 0.12;
    const head = {
      x: f.x + nrm.x * h + dir.x * h * lean,
      y: f.y + nrm.y * h + dir.y * h * lean
    };
    ctx.save();
    ctx.globalAlpha = reveal * figureAlpha;
    ctx.strokeStyle = 'rgba(' + GOLD + ', 0.7)';
    ctx.lineWidth = 2.2;
    ctx.lineCap = 'round';
    // body
    ctx.beginPath(); ctx.moveTo(f.x, f.y); ctx.lineTo(head.x, head.y); ctx.stroke();
    // arm reaching toward the rock
    const rc = rockCenter(t);
    const mid = { x: (f.x + head.x) / 2, y: (f.y + head.y) / 2 };
    ctx.beginPath(); ctx.moveTo(mid.x, mid.y);
    ctx.lineTo(rc.x - nrm.x * rockR * 0.6, rc.y - nrm.y * rockR * 0.6);
    ctx.stroke();
    // head
    ctx.fillStyle = 'rgba(' + GOLD + ', 0.78)';
    ctx.beginPath(); ctx.arc(head.x, head.y, rockR * 0.22, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  function drawParticles() {
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(' + GOLD + ', ' + (p.a * Math.max(0, p.life)) + ')';
      ctx.fill();
    }
  }

  // Hybrid loop: requestAnimationFrame for smoothness, plus a setInterval
  // catch-up so the simulation keeps advancing even where rAF is throttled
  // (background/headless tabs). dt is real-time based, so both schedulers
  // driving it stays correct; a short dedupe guard avoids redundant draws.
  let lastT = 0;
  function tick(now) {
    now = now || performance.now();
    if (lastT && now - lastT < 10) return;          // dedupe overlapping calls
    const dt = Math.min(0.05, (now - (lastT || now)) / 1000);
    lastT = now;

    update(dt, now);

    ctx.clearRect(0, 0, W, H);
    drawMountain();
    drawRock();
    drawFigure();
    drawParticles();
  }
  function rafLoop(now) { requestAnimationFrame(rafLoop); tick(now); }

  // ─── Ending ─────────────────────────────────────────────────────────────
  const ESSAY_URL = '/just-drop-the-rock-mr-sisyphus-you-re-not-a-hero-of-a-tragic-story/';
  function renderEnd() {
    const n = rollbacks;
    const stat = n > 0
      ? 'The rock rolled back <b>' + n + '</b> ' + (n === 1 ? 'time' : 'times') + '.<br>Then you let it.'
      : 'You never forced it to the top.<br>Perhaps you already knew.';

    endEl.innerHTML =
      '<p class="s-stat">' + stat + '</p>' +
      '<p><a class="s-post-link" href="' + ESSAY_URL + '">Just Drop the Rock, Mr. Sisyphus →</a></p>' +
      '<div class="s-actions">' +
        '<button class="s-share" type="button">share this</button>' +
        '<a class="s-home-link" href="/">← return to Shakya Mirror</a>' +
      '</div>';

    after(60, function () { endEl.classList.add('show'); });

    const btn = endEl.querySelector('.s-share');
    btn.addEventListener('click', function () {
      const url = 'https://harendra-shakya.github.io/drop-the-rock/';
      if (navigator.share) {
        navigator.share({ title: 'Drop the Rock', text: 'A game you win by letting go.', url: url }).catch(function () {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(url).then(function () {
          btn.textContent = 'link copied';
          after(1800, function () { btn.textContent = 'share this'; });
        }).catch(function () {});
      }
    });
  }

  // ─── Init ───────────────────────────────────────────────────────────────
  computeGeom();
  requestAnimationFrame(rafLoop);
  // Watchdog: only drive the simulation if rAF has stalled (a throttled or
  // backgrounded tab). Zero overhead while rAF is healthy, since lastT stays
  // fresh and the condition never fires.
  setInterval(function () {
    var now = performance.now();
    if (now - lastT > 200) tick(now);
  }, 250);

  if (prior && prior.completed) {
    showText('You have been here before.');
    after(3200, function () { showText('There is a rock. There is a hill. There is you.'); });
  } else {
    showText('There is a rock. There is a hill. There is you.');
  }
  after(1200, function () { revealStart = performance.now(); });
  after(4200, function () { setPhase(1); });
})();
