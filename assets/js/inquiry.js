(function () {
  'use strict';

  // ─── State ────────────────────────────────────────────────────────────────
  let tree = null;
  let session = { patterns: {}, history: [] };

  // ─── Pattern display names ────────────────────────────────────────────────
  const PATTERN_NAMES = {
    achiever:        'the Achiever',
    approval_seeker: 'the Approval-Seeker',
    protector:       'the Protector',
    awareness:       'the Witness',
    social:          'the Social Self'
  };

  // ─── Posts suggested per pattern (from the site) ─────────────────────────
  const PATTERN_POSTS = {
    achiever: {
      title: 'Bhagavad Gita 3.25 — Not A or B, But Freedom',
      url:   '/bhagavad-gita-3-25-not-a-or-b-but-freedom/'
    },
    approval_seeker: {
      title: 'We Live as One Lives — On Imitation, Ego, and Borrowed Life',
      url:   '/we-live-as-one-lives-on-imitation-ego-and-borrowed-life/'
    },
    protector: {
      title: 'Predetermined Lives and the Myth of Control',
      url:   '/predetermined-lives-and-the-myth-of-control/'
    },
    awareness: {
      title: 'Ishavasya Upanishad — Fullness as the Absence of Division',
      url:   '/ishavasya-upanishad-fullness-as-the-absence-of-division/'
    },
    social: {
      title: 'Liberation Is the End of Inner Slavery, Not Escape from Life',
      url:   '/liberation-is-the-end-of-inner-slavery-not-escape-from-life/'
    }
  };

  // ─── DOM ──────────────────────────────────────────────────────────────────
  const textEl    = document.getElementById('inquiry-text');
  const choicesEl = document.getElementById('inquiry-choices');

  // ─── Typing speed: no paragraph takes longer than MAX_TIME ───────────────
  const MAX_TIME  = 2800; // ms
  const MIN_SPEED = 18;   // ms per char (fastest)

  function typingSpeed(text) {
    return Math.max(MIN_SPEED, Math.floor(MAX_TIME / text.length));
  }

  // ─── Typewriter ───────────────────────────────────────────────────────────
  function typewrite(el, text) {
    return new Promise(resolve => {
      const speed = typingSpeed(text);
      let i = 0;
      el.textContent = '';

      (function tick() {
        if (i < text.length) {
          el.textContent += text[i++];
          setTimeout(tick, speed);
        } else {
          resolve();
        }
      })();
    });
  }

  function delay(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  // ─── Resolve dynamic text (replace [PATTERN] token) ─────────────────────
  function resolveText(text) {
    if (!text) return '';
    const p = dominantPattern();
    return text.replace('[PATTERN]', PATTERN_NAMES[p] || 'this pattern');
  }

  // ─── Pattern tracking ────────────────────────────────────────────────────
  function recordPattern(tag) {
    if (!tag) return;
    session.patterns[tag] = (session.patterns[tag] || 0) + 1;
    saveSession();
  }

  function dominantPattern() {
    let max = 0, dominant = 'achiever';
    for (const [k, v] of Object.entries(session.patterns)) {
      if (v > max) { max = v; dominant = k; }
    }
    return dominant;
  }

  // ─── localStorage ────────────────────────────────────────────────────────
  function saveSession() {
    try {
      localStorage.setItem('inquiry_v1', JSON.stringify({
        patterns:  session.patterns,
        lastVisit: Date.now()
      }));
    } catch (_) {}
  }

  function loadSession() {
    try {
      const s = localStorage.getItem('inquiry_v1');
      if (s) {
        const parsed = JSON.parse(s);
        session.patterns = parsed.patterns || {};
      }
    } catch (_) {}
  }

  // ─── Render a node ───────────────────────────────────────────────────────
  async function renderNode(node) {
    const text = resolveText(node.text);
    const paragraphs = text.split('\n\n').filter(p => p.trim());

    textEl.innerHTML = '';
    choicesEl.innerHTML = '';
    choicesEl.style.opacity = '0';

    // Fade text container in
    textEl.style.opacity = '0';
    textEl.style.transition = 'opacity 0.6s ease';
    await delay(100);
    textEl.style.opacity = '1';

    // Typewrite each paragraph
    for (let i = 0; i < paragraphs.length; i++) {
      const p = document.createElement('p');
      p.className = 'i-para';
      textEl.appendChild(p);
      await typewrite(p, paragraphs[i].trim());
      if (i < paragraphs.length - 1) await delay(550);
    }

    // Post-text pause
    if (node.pause) await delay(node.pause);

    // Next step
    if (node.type === 'end') {
      await renderEnd();
    } else if (node.choices && node.choices.length) {
      renderChoices(node.choices);
    } else if (node.next) {
      await delay(600);
      goToNode(node.next);
    }
  }

  // ─── Render choices ──────────────────────────────────────────────────────
  function renderChoices(choices) {
    choicesEl.innerHTML = '';

    choices.forEach(choice => {
      const btn = document.createElement('button');
      btn.className  = 'i-choice';
      btn.textContent = choice.label;

      btn.addEventListener('click', () => {
        recordPattern(choice.pattern_tag);
        choicesEl.style.opacity = '0';
        setTimeout(() => goToNode(choice.next), 500);
      });

      choicesEl.appendChild(btn);
    });

    // Fade choices in
    setTimeout(() => {
      choicesEl.style.opacity  = '1';
      choicesEl.style.transition = 'opacity 0.7s ease';
    }, 400);
  }

  // ─── Render end ──────────────────────────────────────────────────────────
  async function renderEnd() {
    const p    = dominantPattern();
    const post = PATTERN_POSTS[p] || PATTERN_POSTS['awareness'];

    await delay(600);

    const linkP = document.createElement('p');
    linkP.className = 'i-para i-link-para';
    linkP.innerHTML = `<a class="i-post-link" href="${post.url}">${post.title} →</a>`;
    textEl.appendChild(linkP);

    await delay(400);

    const homeP = document.createElement('p');
    homeP.className = 'i-para i-home-para';
    homeP.innerHTML = `<a class="i-home-link" href="/">← return to Shakya Mirror</a>`;
    textEl.appendChild(homeP);
  }

  // ─── Navigate to node ────────────────────────────────────────────────────
  function goToNode(nodeId) {
    const node = tree.nodes[nodeId];
    if (!node) { console.error('Node not found:', nodeId); return; }

    session.history.push(nodeId);
    renderNode(node);
  }

  // ─── Init ────────────────────────────────────────────────────────────────
  async function init() {
    loadSession();

    try {
      const res = await fetch('/assets/js/inquiry-tree.json');
      tree = await res.json();

      // Deep-link from the homepage hero: ?q=N pre-selects an opening choice.
      // The mapping lives in the tree (intro_question.choices), so the hero
      // only passes an index and the two can never drift apart.
      const q = new URLSearchParams(location.search).get('q');
      const intro = tree.nodes['intro_question'];
      const picked = (q !== null && intro && intro.choices) ? intro.choices[parseInt(q, 10)] : null;

      if (picked) {
        recordPattern(picked.pattern_tag);
        goToNode(picked.next);
      } else {
        goToNode(tree.start);
      }
    } catch (e) {
      textEl.innerHTML = '<p class="i-para">The inquiry could not begin. Please refresh the page.</p>';
    }
  }

  init();
})();
