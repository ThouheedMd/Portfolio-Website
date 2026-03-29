/* =========================
   UTILITIES
   ========================= */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* =========================
   PAGE LOADER
   ========================= */
window.addEventListener('load', () => {
  const loader = $('#pageLoader');
  if (!loader) return;
  setTimeout(() => {
    loader.classList.add('fade-out');
    setTimeout(() => {
      loader.style.display = 'none';
      // Trigger hero entrance after loader hides
      triggerHeroEntrance();
    }, 700);
  }, 1400);
});

/* =========================
   SCROLL PROGRESS BAR
   ========================= */
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
}, { passive: true });

/* =========================
   ANIMATED BACKGROUND ORBS
   ========================= */
function injectBgOrbs() {
  for (let i = 1; i <= 3; i++) {
    const orb = document.createElement('div');
    orb.className = `bg-orb bg-orb-${i}`;
    document.body.appendChild(orb);
  }
  const grid = document.createElement('div');
  grid.className = 'bg-grid';
  document.body.appendChild(grid);
}
injectBgOrbs();

/* =========================
   CUSTOM CURSOR
   ========================= */
function initCursor() {
  if (window.innerWidth <= 900) return;

  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.appendChild(dot);
  document.body.appendChild(ring);

  let mx = 0, my = 0;
  let rx = 0, ry = 0;
  let rafId;

  document.addEventListener('mousemove', (e) => {
    mx = e.clientX;
    my = e.clientY;
    // Dot follows instantly
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';

    // Check hover targets
    const hoverable = e.target.closest('a, button, .btn, .project-card, .cert-card, .edu-card, .card, .social, input, textarea');
    if (hoverable) {
      dot.classList.add('hovering');
      ring.classList.add('hovering');
    } else {
      dot.classList.remove('hovering');
      ring.classList.remove('hovering');
    }

    // Update cursor glow
    const glow = $('#cursorGlow');
    if (glow) {
      glow.style.left = mx + 'px';
      glow.style.top = my + 'px';
    }
  }, { passive: true });

  // Ring follows with lag
  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    rafId = requestAnimationFrame(animateRing);
  }
  animateRing();
}
initCursor();

/* =========================
   THEME TOGGLE
   ========================= */
const themeToggle = $('#themeToggle');
const root = document.documentElement;
const THEME_KEY = 'portfolio_theme';

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) {
    root.setAttribute('data-theme', saved);
  } else {
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    root.setAttribute('data-theme', prefersLight ? 'light' : 'dark');
  }
  updateThemeIcon();
}
function toggleTheme() {
  const current = root.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  localStorage.setItem(THEME_KEY, next);
  updateThemeIcon();
}
function updateThemeIcon() {
  if (!themeToggle) return;
  themeToggle.textContent = root.getAttribute('data-theme') === 'light' ? '🌙' : '🌗';
}
themeToggle?.addEventListener('click', toggleTheme);
initTheme();

/* =========================
   SMOOTH SCROLL
   ========================= */
document.documentElement.style.scrollBehavior = 'smooth';

/* =========================
   MOBILE HAMBURGER
   ========================= */
const hamburger = $('#hamburger');
const navLinks = $('#navLinks');
hamburger?.addEventListener('click', () => {
  const open = navLinks.style.display !== 'flex';
  if (open) {
    navLinks.style.display = 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.right = '16px';
    navLinks.style.top = '64px';
    navLinks.style.background = 'rgba(6,13,31,0.95)';
    navLinks.style.backdropFilter = 'blur(16px)';
    navLinks.style.padding = '0.8rem';
    navLinks.style.borderRadius = '14px';
    navLinks.style.border = '1px solid rgba(255,255,255,0.07)';
    hamburger.classList.add('open');
  } else {
    navLinks.style.display = '';
    hamburger.classList.remove('open');
  }
});
$$('.nav-link').forEach(a => a.addEventListener('click', () => {
  if (window.innerWidth <= 900) {
    navLinks.style.display = '';
    hamburger?.classList.remove('open');
  }
}));

/* =========================
   STICKY NAVBAR BLUR
   ========================= */
const navbar = $('#navbar');
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });

/* =========================
   ACTIVE NAV LINK on SCROLL
   ========================= */
function updateActiveNav() {
  const sections = $$('section[id]');
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = $(`.nav-link[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active-section', scrollY >= top && scrollY < top + height);
    }
  });
}
window.addEventListener('scroll', updateActiveNav, { passive: true });

/* =========================
   TYPING EFFECT
   ========================= */
const typedTextEl = $('#typedText');
const phrases = [
  'Building scalable cloud solutions.',
  'Azure DevOps Engineer.',
  'CI/CD pipeline specialist.',
  "Let's automate the future."
];
let typingIndex = 0, charIndex = 0;
const typingDelay = 65, erasingDelay = 32, nextDelay = 1400;

function type() {
  if (typingIndex >= phrases.length) typingIndex = 0;
  const current = phrases[typingIndex];
  if (charIndex < current.length) {
    typedTextEl.textContent += current.charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, nextDelay);
  }
}
function erase() {
  const current = phrases[typingIndex];
  if (charIndex > 0) {
    typedTextEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    typingIndex++;
    setTimeout(type, typingDelay);
  }
}
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(type, 600);
});

/* =========================
   HERO ENTRANCE ANIMATION
   ========================= */
function triggerHeroEntrance() {
  const items = [
    $('.hero-tag'),
    $('.hero-title'),
    $('.hero-subtitle'),
    $('.hero-role'),
    $('.hero-cta'),
    $('.hero-card')
  ];
  items.forEach((el, i) => {
    if (!el) return;
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 700ms ease, transform 700ms cubic-bezier(0.34,1.56,0.64,1)';
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, i * 140);
  });
}

/* =========================
   TILT EFFECT (3D card)
   ========================= */
function initTilt(el) {
  if (!el) return;
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (x - cx) / cx;
    const dy = (y - cy) / cy;
    const tiltX = dy * 10;
    const tiltY = dx * -10;
    el.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.03)`;
    el.style.boxShadow = `
      ${-tiltY * 2}px ${tiltX * 2}px 40px rgba(124,92,255,0.2),
      0 20px 60px rgba(0,0,0,0.5)
    `;
  });
  el.addEventListener('mouseleave', () => {
    el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale(1)';
    el.style.boxShadow = '';
  });
}
initTilt($('#tiltCard'));

/* =========================
   3D TILT FOR PROJECT CARDS
   ========================= */
function init3DCards() {
  $$('.project-card, .cert-card, .edu-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * 5;
      const rotY = ((x - cx) / cx) * -5;
      card.style.setProperty('--tiltX', `${rotX}deg`);
      card.style.setProperty('--tiltY', `${rotY}deg`);

      // Moving shine effect
      const shine = card.querySelector('.card-shine');
      if (shine) {
        shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.08), transparent 70%)`;
      }
    });
    card.addEventListener('mouseleave', () => {
      card.style.setProperty('--tiltX', '0deg');
      card.style.setProperty('--tiltY', '0deg');
      const shine = card.querySelector('.card-shine');
      if (shine) shine.style.background = 'transparent';
    });

    // Add shine layer
    const shine = document.createElement('div');
    shine.className = 'card-shine';
    shine.style.cssText = `
      position:absolute;inset:0;pointer-events:none;z-index:10;
      border-radius:inherit;transition:background 150ms ease;
    `;
    card.style.position = 'relative';
    card.appendChild(shine);
  });
}
document.addEventListener('DOMContentLoaded', init3DCards);

/* =========================
   SKILL BARS ANIMATION
   ========================= */
function animateSkillBars() {
  $$('.skill-fill').forEach((el, i) => {
    const value = el.getAttribute('data-fill') || '0';
    setTimeout(() => { el.style.width = value + '%'; }, i * 150);
  });
}
function animateEduBars() {
  $$('.edu-fill').forEach((el, i) => {
    const value = el.getAttribute('data-fill') || '0';
    setTimeout(() => { el.style.width = value + '%'; }, i * 200);
  });
}

/* =========================
   SECTION TITLE LINE ANIMATION
   ========================= */
const titleObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('line-in');
      titleObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.addEventListener('DOMContentLoaded', () => {
  $$('.section-title').forEach(el => titleObserver.observe(el));
});

/* =========================
   SCROLL REVEAL (IntersectionObserver)
   ========================= */
let skillsAnimated = false;
let eduAnimated = false;

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');

      // Skills in about section
      if (entry.target.closest('#about') && !skillsAnimated) {
        skillsAnimated = true;
        setTimeout(animateSkillBars, 300);
      }
      // Education bars
      if (entry.target.classList.contains('edu-card') && !eduAnimated) {
        eduAnimated = true;
        setTimeout(animateEduBars, 300);
      }
    }
  });
}, { threshold: 0.1 });

document.addEventListener('DOMContentLoaded', () => {
  $$('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => revealObserver.observe(el));
});

/* =========================
   CANVAS PARTICLE BACKGROUND
   ========================= */
function initParticleCanvas() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = `
    position:fixed;inset:0;z-index:0;pointer-events:none;
    width:100%;height:100%;opacity:0.35;
  `;
  document.body.insertBefore(canvas, document.body.firstChild);

  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const COLORS = ['rgba(124,92,255,', 'rgba(0,240,255,', 'rgba(255,78,205,'];

  class Particle {
    constructor() { this.reset(true); }
    reset(initial = false) {
      this.x = Math.random() * W;
      this.y = initial ? Math.random() * H : H + 10;
      this.size = Math.random() * 1.5 + 0.5;
      this.speedY = -(Math.random() * 0.4 + 0.15);
      this.speedX = (Math.random() - 0.5) * 0.2;
      this.alpha = Math.random() * 0.5 + 0.1;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.life = 0;
      this.maxLife = Math.random() * 200 + 100;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life++;
      if (this.y < -5 || this.life > this.maxLife) this.reset();
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.fill();
    }
  }

  for (let i = 0; i < 80; i++) particles.push(new Particle());

  let lastTime = 0;
  function animate(time) {
    if (time - lastTime < 33) { requestAnimationFrame(animate); return; } // ~30fps cap
    lastTime = time;
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
}
initParticleCanvas();

/* =========================
   BUTTON RIPPLE EFFECT
   ========================= */
function initRipples() {
  $$('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = document.createElement('span');
      const size = Math.max(rect.width, rect.height) * 2;
      ripple.style.cssText = `
        position:absolute;
        width:${size}px;height:${size}px;
        left:${x - size/2}px;top:${y - size/2}px;
        border-radius:50%;
        background:rgba(255,255,255,0.15);
        transform:scale(0);
        animation:rippleAnim 0.6s linear forwards;
        pointer-events:none;
      `;
      if (!document.querySelector('#rippleStyles')) {
        const style = document.createElement('style');
        style.id = 'rippleStyles';
        style.textContent = '@keyframes rippleAnim{to{transform:scale(1);opacity:0;}}';
        document.head.appendChild(style);
      }
      btn.style.overflow = 'hidden';
      btn.style.position = 'relative';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}
document.addEventListener('DOMContentLoaded', initRipples);

/* =========================
   PROJECT FILTER
   ========================= */
const filterBtns = $$('.filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    $$('.project-card').forEach((card, i) => {
      const cat = card.dataset.category;
      const show = filter === 'all' || cat === filter;
      if (show) {
        card.style.display = '';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.transition = 'opacity 400ms ease, transform 400ms ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, i * 60);
      } else {
        card.style.transition = 'opacity 250ms ease';
        card.style.opacity = '0';
        setTimeout(() => { card.style.display = 'none'; }, 250);
      }
    });
  });
});

/* =========================
   PROJECT CARD — hover media overlay text
   ========================= */
document.addEventListener('DOMContentLoaded', () => {
  $$('.project-card').forEach(card => {
    const media = card.querySelector('.project-media');
    if (!media) return;
    if (media.querySelector('.project-media-overlay')) return;
    const overlay = document.createElement('div');
    overlay.className = 'project-media-overlay';
    overlay.innerHTML = '<span>VIEW PROJECT</span>';
    media.appendChild(overlay);
  });
});

/* =========================
   FORM VALIDATION & SUBMIT
   ========================= */
const contactForm = $('#contactForm');
const nameInput = $('#name');
const emailInput = $('#email');
const messageInput = $('#message');
const nameError = $('#nameError');
const emailError = $('#emailError');
const messageError = $('#messageError');
const formSuccess = $('#formSuccess');

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;
  if (!nameInput.value.trim()) {
    nameError.textContent = 'Please enter your name.';
    valid = false;
  } else { nameError.textContent = ''; }

  if (!validateEmail(emailInput.value.trim())) {
    emailError.textContent = 'Please enter a valid email.';
    valid = false;
  } else { emailError.textContent = ''; }

  if (messageInput.value.trim().length < 10) {
    messageError.textContent = 'Message should be at least 10 characters.';
    valid = false;
  } else { messageError.textContent = ''; }

  if (!valid) return;

  const submitBtn = contactForm.querySelector('[type=submit]');
  if (submitBtn) {
    submitBtn.textContent = 'Sending…';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
  }
  formSuccess.textContent = '';

  setTimeout(() => {
    formSuccess.textContent = '✓ Message sent! I\'ll get back to you soon.';
    contactForm.reset();
    if (submitBtn) {
      submitBtn.textContent = 'Send Message';
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
    }
  }, 1200);
});

/* =========================
   CERTIFICATE CARDS
   ========================= */
function initCertificateCards() {
  $$('.cert-card.project-like').forEach(card => {
    const link = card.getAttribute('data-cert-link') || null;
    if (!link) return;
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'link');
    card.setAttribute('aria-label', `Open certificate: ${card.querySelector('h4')?.textContent || ''}`);
    card.addEventListener('click', (e) => {
      if (e.target.closest && e.target.closest('a')) return;
      window.open(link, '_blank', 'noopener');
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.open(link, '_blank', 'noopener');
      }
    });
  });
}
document.addEventListener('DOMContentLoaded', initCertificateCards);

/* =========================
   FOOTER YEAR
   ========================= */
const footerYear = $('#footerYear');
if (footerYear) footerYear.textContent = new Date().getFullYear();

/* =========================
   COUNTER ANIMATION for stat numbers
   ========================= */
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      el.textContent = target + (el.dataset.suffix || '');
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start) + (el.dataset.suffix || '');
    }
  }, 16);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      animateCounter(el, target);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });
document.addEventListener('DOMContentLoaded', () => {
  $$('[data-count]').forEach(el => counterObserver.observe(el));
});

/* =========================
   MAGNETIC HOVER on social links
   ========================= */
function initMagnetic() {
  $$('.social, .btn.primary').forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.25;
      const dy = (e.clientY - cy) * 0.25;
      el.style.transform = `translate(${dx}px, ${dy}px) translateY(-4px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
      el.style.transition = 'transform 400ms cubic-bezier(0.34,1.56,0.64,1)';
      setTimeout(() => { el.style.transition = ''; }, 400);
    });
  });
}
document.addEventListener('DOMContentLoaded', initMagnetic);

/* =========================
   GLITCH EFFECT on hero name (subtle)
   ========================= */
function initGlitch() {
  const name = $('.name-future');
  if (!name) return;
  setInterval(() => {
    if (Math.random() > 0.94) {
      name.style.textShadow = `
        2px 0 rgba(0,240,255,0.5),
        -2px 0 rgba(255,78,205,0.5),
        0 0 20px rgba(124,92,255,0.4)
      `;
      name.style.transform = 'skewX(-1deg)';
      setTimeout(() => {
        name.style.textShadow = '';
        name.style.transform = '';
      }, 80);
    }
  }, 3000);
}
document.addEventListener('DOMContentLoaded', initGlitch);

/* =========================
   ACCESSIBILITY: reduce motion
   ========================= */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (reduceMotion.matches) {
  document.documentElement.style.scrollBehavior = 'auto';
  $$('.skill-fill, .edu-fill').forEach(el => el.style.transition = 'none');
  $$('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    el.style.transition = 'none';
    el.classList.add('visible');
  });
}