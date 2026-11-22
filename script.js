/* ═══════════════════════════════════════════════════════════════
   SHINSHIKI CLAN — script.js
   All interactions in clean vanilla JavaScript. No frameworks.
   ═══════════════════════════════════════════════════════════════ */
'use strict';

/* ─────────────────────────────────────────────────────────────
   1. EDITABLE CONFIG — projects, members, philosophy teachings.
   Replace the example entries with real data whenever ready.
   ───────────────────────────────────────────────────────────── */
const CONFIG = {
  cvPath: 'assets/cv/shinshiki-cv.pdf',

  projects: [
    {
      title: 'Shinshiki Archive',
      category: 'webapp',
      categoryLabel: 'Web Application',
      description: 'An interactive digital archive concept for storing clan records — filterable timeline, searchable inscriptions, and elegant dark UI.',
      tech: ['HTML5', 'CSS3', 'JavaScript'],
      demo: '#',
      code: '#'
    },
    {
      title: 'Kagemaru Landing',
      category: 'website',
      categoryLabel: 'Website',
      description: 'A cinematic one-page website concept with scroll-driven storytelling, atmospheric gradients, and refined typography.',
      tech: ['HTML5', 'CSS Grid', 'CSS Animations'],
      demo: '#',
      code: '#'
    },
    {
      title: 'Emerald Dashboard',
      category: 'uiux',
      categoryLabel: 'UI/UX',
      description: 'A dashboard interface design study — glassmorphism panels, data hierarchy, and a restrained emerald-and-gold palette.',
      tech: ['Figma', 'Design System', 'Prototyping'],
      demo: '#',
      code: '#'
    },
    {
      title: 'Particle Shrine',
      category: 'experiment',
      categoryLabel: 'Experiment',
      description: 'A canvas particle experiment: floating embers reacting to the cursor, tuned for performance and reduced-motion preferences.',
      tech: ['Canvas API', 'requestAnimationFrame'],
      demo: '#',
      code: '#'
    },
    {
      title: 'Renga Notes',
      category: 'webapp',
      categoryLabel: 'Web Application',
      description: 'A minimalist note-taking web app concept with localStorage persistence, keyboard-first design, and distraction-free writing.',
      tech: ['JavaScript', 'localStorage', 'Accessibility'],
      demo: '#',
      code: '#'
    },
    {
      title: 'Mono no Aware',
      category: 'website',
      categoryLabel: 'Website',
      description: 'A poetic photography journal concept — full-bleed imagery, gentle fade transitions, and bilingual English/Sinhala captions.',
      tech: ['HTML5', 'CSS3', 'Intersection Observer'],
      demo: '#',
      code: '#'
    }
  ],

  members: [
    {
      name: 'Member One',
      rank: '61st Shinshiki',
      description: 'Placeholder profile — replace with a real member of the Shinshiki Clan.',
      qualities: ['Intelligence', 'Innovation', 'Determination'],
      detail: 'This is a placeholder entry. Add the member\'s story, recognized rank, and qualities here. Ranks are never assigned automatically — recognition requires the unified agreement of the clan.'
    },
    {
      name: 'Member Two',
      rank: 'Clan Member',
      description: 'Placeholder profile — replace with a real member of the Shinshiki Clan.',
      qualities: ['Courage', 'Loyalty'],
      detail: 'This is a placeholder entry. Add the member\'s story, recognized rank, and qualities here.'
    },
    {
      name: 'Member Three',
      rank: 'Clan Member',
      description: 'Placeholder profile — replace with a real member of the Shinshiki Clan.',
      qualities: ['Humanity', 'Selflessness'],
      detail: 'This is a placeholder entry. Add the member\'s story, recognized rank, and qualities here.'
    },
    {
      name: 'Member Four',
      rank: 'Future Recognition',
      description: 'Placeholder profile — reserved for a future recognized member.',
      qualities: ['To be revealed'],
      detail: 'This is a placeholder entry. Add the member\'s story, recognized rank, and qualities here.'
    }
  ],

  philosophies: {
    death: {
      symbol: '死',
      title: 'The Nature of Death',
      body: [
        'The clan believes that <strong>death is the universal experience</strong> shared by all living beings. Everything that is created eventually changes, transforms, and disappears.',
        'Permanent immortality is therefore viewed as an <strong>illusion</strong>. Death is not necessarily something to fear, but an inevitable opportunity to understand the nature of existence.',
        'By accepting impermanence, a Shinshiki learns to value the present moment and to act with clarity rather than denial.'
      ]
    },
    love: {
      symbol: '愛',
      title: 'The Reality of Love',
      body: [
        'The clan maintains a <strong>highly unconventional and realistic philosophical perspective</strong> on love. It views many forms of love as biological and evolutionary mechanisms that contribute to the continuation of life.',
        'Parental affection protects children who cannot survive independently, while romantic attraction can encourage reproduction and the continuation of generations.',
        'This is presented as <strong>the clan\'s philosophical viewpoint</strong> — a lens for questioning emotions — rather than an established scientific conclusion.'
      ]
    },
    equality: {
      symbol: '同',
      title: 'The Illusion of Absolute Equality',
      body: [
        'The Shinshiki philosophy <strong>questions the idea of absolute sameness</strong>. Every living being and object exists under different conditions and possesses its own characteristics.',
        'Therefore, absolute identity or perfect sameness between two separate entities is considered <strong>impossible</strong>.',
        'True understanding, the clan argues, begins when we accept difference as fundamental — and treat each being according to its own nature rather than an imagined uniformity.'
      ]
    }
  }
};

/* ─────────────────────────────────────────────────────────────
   2. Helpers
   ───────────────────────────────────────────────────────────── */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─────────────────────────────────────────────────────────────
   3. Loading screen
   ───────────────────────────────────────────────────────────── */
window.addEventListener('load', () => {
  const loader = $('#loader');
  setTimeout(() => loader.classList.add('is-done'), prefersReducedMotion ? 0 : 900);
});
/* Safety fallback: never trap the user behind the loader. */
setTimeout(() => $('#loader')?.classList.add('is-done'), 4000);

/* ─────────────────────────────────────────────────────────────
   4. Custom cursor (desktop, fine pointers only)
   ───────────────────────────────────────────────────────────── */
(function initCursor() {
  const dot = $('#cursorDot');
  const ring = $('#cursorRing');
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || prefersReducedMotion) return;

  let rx = -100, ry = -100, tx = -100, ty = -100;
  document.addEventListener('mousemove', (e) => {
    tx = e.clientX; ty = e.clientY;
    dot.style.transform = `translate(${tx}px, ${ty}px) translate(-50%, -50%)`;
  });
  (function animate() {
    rx += (tx - rx) * 0.16;
    ry += (ty - ry) * 0.16;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(animate);
  })();
  $$('a, button, [role="button"]').forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('is-hover'));
  });
})();

/* ─────────────────────────────────────────────────────────────
   5. Navigation: sticky state, mobile burger, smooth scroll
   ───────────────────────────────────────────────────────────── */
(function initNav() {
  const nav = $('#navbar');
  const burger = $('#navBurger');
  const links = $('#navLinks');

  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  burger.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  /* Close the mobile menu after choosing a destination. */
  links.addEventListener('click', (e) => {
    if (e.target.closest('a')) {
      links.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
})();

/* ─────────────────────────────────────────────────────────────
   6. Active navigation highlighting (scrollspy)
   ───────────────────────────────────────────────────────────── */
(function initScrollSpy() {
  const sections = $$('main section[id]');
  const navLinks = $$('.nav__link');
  if (!('IntersectionObserver' in window)) return;

  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach((s) => spy.observe(s));
})();

/* ─────────────────────────────────────────────────────────────
   7. Scroll-triggered reveals + animated counters
   ───────────────────────────────────────────────────────────── */
(function initReveals() {
  const revealEls = $$('.reveal');
  if (!('IntersectionObserver' in window) || prefersReducedMotion) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
    $$('.stat__num[data-count]').forEach((n) => { n.textContent = n.dataset.count; });
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach((el) => io.observe(el));

  /* Counters */
  const counters = $$('.stat__num[data-count]');
  const cio = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 1400;
      const start = performance.now();
      (function tick(now) {
        const p = Math.min((now - start) / duration, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3))); /* easeOutCubic */
        if (p < 1) requestAnimationFrame(tick);
      })(start);
      cio.unobserve(el);
    });
  }, { threshold: 0.6 });
  counters.forEach((c) => cio.observe(c));
})();

/* ─────────────────────────────────────────────────────────────
   8. Theme switching (dark ⇄ light), persisted
   ───────────────────────────────────────────────────────────── */
(function initTheme() {
  const root = document.documentElement;
  const saved = localStorage.getItem('shinshiki-theme');
  if (saved) root.dataset.theme = saved;

  $('#themeToggle').addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    localStorage.setItem('shinshiki-theme', next);
  });
})();

/* ─────────────────────────────────────────────────────────────
   9. Hero particles (subtle floating embers)
   ───────────────────────────────────────────────────────────── */
(function initParticles() {
  const canvas = $('#particleCanvas');
  if (!canvas || prefersReducedMotion) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const COUNT = Math.min(60, Math.floor(W / 22));
  for (let i = 0; i < COUNT; i++) {
    particles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.8 + 0.4,
      vy: -(Math.random() * 0.35 + 0.08),
      vx: (Math.random() - 0.5) * 0.15,
      a: Math.random() * 0.5 + 0.1,
      gold: Math.random() < 0.22
    });
  }

  (function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach((p) => {
      p.x += p.vx; p.y += p.vy;
      if (p.y < -4) { p.y = H + 4; p.x = Math.random() * W; }
      if (p.x < -4) p.x = W + 4;
      if (p.x > W + 4) p.x = -4;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.gold
        ? `rgba(198, 164, 91, ${p.a})`
        : `rgba(0, 200, 120, ${p.a})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  })();
})();

/* ─────────────────────────────────────────────────────────────
   10. Stone tablet — click / Enter to reveal the inscription
   ───────────────────────────────────────────────────────────── */
(function initTablet() {
  const tablet = $('#stoneTablet');
  const inscription = $('#tabletInscription');
  const hint = $('.tablet__hint');
  if (!tablet) return;

  function reveal() {
    inscription.hidden = false;
    hint.style.display = 'none';
    tablet.classList.add('is-revealed');
    tablet.setAttribute('aria-label', 'Ancient stone tablet. The inscription has been revealed.');
  }
  tablet.addEventListener('click', reveal);
  tablet.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); reveal(); }
  });
})();

/* ─────────────────────────────────────────────────────────────
   11. Expandable timeline
   ───────────────────────────────────────────────────────────── */
(function initTimeline() {
  $$('.timeline__item').forEach((item) => {
    const head = $('.timeline__head', item);
    const body = $('.timeline__body', item);
    head.addEventListener('click', () => {
      const isOpen = item.classList.toggle('is-open');
      head.setAttribute('aria-expanded', String(isOpen));
      body.style.maxHeight = isOpen ? body.scrollHeight + 'px' : '0px';
    });
  });
})();

/* ─────────────────────────────────────────────────────────────
   12. Philosophy modals (accessible: Esc, backdrop, focus)
   ───────────────────────────────────────────────────────────── */
(function initModals() {
  let lastFocused = null;

  function openModal(modal) {
    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    $('.modal__close', modal).focus();
  }
  function closeModal(modal) {
    modal.hidden = true;
    document.body.style.overflow = '';
    lastFocused?.focus();
  }

  /* Philosophy cards */
  const pm = $('#philosophyModal');
  $$('.p-card').forEach((card) => {
    card.addEventListener('click', () => {
      const data = CONFIG.philosophies[card.dataset.philosophy];
      if (!data) return;
      $('#pmSymbol').textContent = data.symbol;
      $('#pmTitle').textContent = data.title;
      $('#pmBody').innerHTML = data.body.map((p) => `<p>${p}</p>`).join('');
      openModal(pm);
    });
  });

  /* Member modal (bound after member cards are rendered) */
  window.__openMemberModal = (index) => {
    const m = CONFIG.members[index];
    if (!m) return;
    const mm = $('#memberModal');
    $('#mmSymbol').textContent = '神';
    $('#mmName').textContent = m.name;
    $('#mmRank').textContent = m.rank;
    $('#mmBody').innerHTML =
      `<p>${m.detail}</p>` +
      `<p><strong>Qualities:</strong> ${m.qualities.join(' · ')}</p>`;
    openModal(mm);
  };

  /* Close on backdrop, close buttons, and Escape */
  $$('.modal').forEach((modal) => {
    modal.addEventListener('click', (e) => {
      if (e.target.closest('[data-modal-close]')) closeModal(modal);
    });
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') $$('.modal:not([hidden])').forEach(closeModal);
  });
})();

/* ─────────────────────────────────────────────────────────────
   13. Projects — render from CONFIG + category filtering
   ───────────────────────────────────────────────────────────── */
(function initProjects() {
  const grid = $('#projectsGrid');
  if (!grid) return;

  /* Decorative SVG thumb per project (replace with real images later) */
  function thumbSVG(i) {
    const hue = ['#00C878', '#C6A45B', '#0e6b46'][i % 3];
    return `
      <svg viewBox="0 0 320 200" width="60%" aria-hidden="true">
        <circle cx="160" cy="100" r="62" fill="none" stroke="${hue}" stroke-width="2" opacity="0.9"/>
        <path d="M160 52 L196 100 L160 148 L124 100 Z" fill="none" stroke="${hue}" stroke-width="2"/>
        <circle cx="160" cy="100" r="8" fill="${hue}"/>
        <line x1="20" y1="180" x2="300" y2="180" stroke="${hue}" stroke-width="1" opacity="0.4"/>
      </svg>`;
  }

  grid.innerHTML = CONFIG.projects.map((p, i) => `
    <article class="project-card reveal" data-category="${p.category}">
      <div class="project-card__thumb">${thumbSVG(i)}</div>
      <div class="project-card__body">
        <p class="project-card__cat">${p.categoryLabel}</p>
        <h3 class="project-card__title">${p.title}</h3>
        <p class="project-card__desc">${p.description}</p>
        <ul class="project-card__tech">${p.tech.map((t) => `<li>${t}</li>`).join('')}</ul>
        <div class="project-card__links">
          <a href="${p.demo}" target="_blank" rel="noopener">Live Demo</a>
          <a href="${p.code}" target="_blank" rel="noopener">Source Code</a>
        </div>
      </div>
    </article>
  `).join('');

  /* Filtering */
  const buttons = $$('.filter-btn');
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      buttons.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const filter = btn.dataset.filter;
      $$('.project-card', grid).forEach((card) => {
        const show = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('is-hidden', !show);
      });
    });
  });

  /* Reveal the freshly rendered cards */
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.1 });
    $$('.project-card', grid).forEach((c) => io.observe(c));
  } else {
    $$('.project-card', grid).forEach((c) => c.classList.add('is-visible'));
  }
})();

/* ─────────────────────────────────────────────────────────────
   14. Members — render from CONFIG + detail modals
   ───────────────────────────────────────────────────────────── */
(function initMembers() {
  const grid = $('#membersGrid');
  if (!grid) return;

  grid.innerHTML = CONFIG.members.map((m, i) => `
    <article class="member-card reveal">
      <div class="member-card__avatar" aria-hidden="true">
        <svg viewBox="0 0 64 64" width="40" height="40" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="32" cy="24" r="11"/>
          <path d="M10 56 C10 42 20 37 32 37 C44 37 54 42 54 56"/>
        </svg>
      </div>
      <h3 class="member-card__name">${m.name}</h3>
      <p class="member-card__rank">${m.rank}</p>
      <p class="member-card__desc">${m.description}</p>
      <button class="member-card__btn" data-member-index="${i}">View Profile</button>
    </article>
  `).join('');

  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-member-index]');
    if (btn) window.__openMemberModal(parseInt(btn.dataset.memberIndex, 10));
  });

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.1 });
    $$('.member-card', grid).forEach((c) => io.observe(c));
  } else {
    $$('.member-card', grid).forEach((c) => c.classList.add('is-visible'));
  }
})();

/* ─────────────────────────────────────────────────────────────
   15. Contact form — client-side validation only
   ───────────────────────────────────────────────────────────── */
(function initContactForm() {
  const form = $('#contactForm');
  if (!form) return;
  const status = $('#formStatus');

  const rules = {
    cfName:    (v) => v.trim().length >= 2      || 'Please enter your name (at least 2 characters).',
    cfEmail:   (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) || 'Please enter a valid email address.',
    cfSubject: (v) => v.trim().length >= 3      || 'Please add a subject (at least 3 characters).',
    cfMessage: (v) => v.trim().length >= 10     || 'Your message should be at least 10 characters.'
  };

  function validateField(input) {
    const rule = rules[input.id];
    const result = rule(input.value);
    const field = input.closest('.form__field');
    const errorEl = $(`[data-error-for="${input.id}"]`, form);
    if (result === true) {
      field.classList.remove('has-error');
      errorEl.textContent = '';
      return true;
    }
    field.classList.add('has-error');
    errorEl.textContent = result;
    return false;
  }

  Object.keys(rules).forEach((id) => {
    const input = $(`#${id}`);
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.closest('.form__field').classList.contains('has-error')) validateField(input);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const allValid = Object.keys(rules)
      .map((id) => validateField($(`#${id}`)))
      .every(Boolean);

    status.classList.remove('is-success', 'is-error');
    if (!allValid) {
      status.textContent = 'Please correct the highlighted fields.';
      status.classList.add('is-error');
      return;
    }
    /* Frontend-only: no backend configured. Be honest with the user. */
    status.textContent = 'Your message is valid and ready. Connect a backend or email service (e.g. Formspree or EmailJS) to enable actual delivery.';
    status.classList.add('is-success');
    form.reset();
  });
})();

/* ─────────────────────────────────────────────────────────────
   16. Footer: dynamic year + Back to Top
   ───────────────────────────────────────────────────────────── */
(function initFooter() {
  $('#copyrightYear').textContent = new Date().getFullYear();
  $('#backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });
})();
