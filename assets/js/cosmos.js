(function () {
  'use strict';

  const canvas = document.getElementById('cosmos');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H, particles;

  // Warm gold — the colour of old manuscripts, lamp flame, the Gita's margins
  const R = 212, G = 178, B = 108;

  const CFG = {
    count: 88,
    maxDist: 155,
    speed: 0.11,
  };

  const isDark = () => document.body.getAttribute('data-theme') === 'dark';

  // ── resize ────────────────────────────────────────────────────────────────
  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  // ── particle factory ──────────────────────────────────────────────────────
  function mkParticle() {
    return {
      x:     Math.random() * W,
      y:     Math.random() * H,
      vx:    (Math.random() - 0.5) * CFG.speed,
      vy:    (Math.random() - 0.5) * CFG.speed,
      r:     Math.random() * 1.1 + 0.4,       // tiny — like distant stars
      base:  Math.random() * 0.32 + 0.07,     // low opacity — not shouting
      phase: Math.random() * Math.PI * 2,
      freq:  Math.random() * 0.006 + 0.001,   // very slow breath
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: CFG.count }, mkParticle);
  }

  // ── draw loop ─────────────────────────────────────────────────────────────
  function tick() {
    requestAnimationFrame(tick);
    ctx.clearRect(0, 0, W, H);

    if (!isDark()) return; // invisible in light mode — nothing to draw

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // drift
      p.x += p.vx;
      p.y += p.vy;
      p.phase += p.freq;

      // wrap at edges
      if (p.x < 0) p.x = W;  else if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;  else if (p.y > H) p.y = 0;

      // breathing opacity
      const a = p.base * (0.6 + 0.4 * Math.sin(p.phase));

      // particle dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${R},${G},${B},${a})`;
      ctx.fill();

      // draw connections to neighbours
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const d  = Math.sqrt(dx * dx + dy * dy);

        if (d < CFG.maxDist) {
          // line fades out toward its ends — very faint, like sutra threads
          const lineA = (1 - d / CFG.maxDist) * 0.065;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(${R},${G},${B},${lineA})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }

  window.addEventListener('resize', resize);

  init();
  tick();
})();
