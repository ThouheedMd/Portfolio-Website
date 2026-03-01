// script.js
// All interactive behaviors: theme toggle, typing effect, cursor glow, tilt, scroll reveal, form validation, mobile menu, project filter
// Sections are clearly marked for easy customization and maintenance

/* =========================
   UTILITIES
   ========================= */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* =========================
   THEME TOGGLE
   #CUSTOMIZE: Theme toggle and localStorage
   ========================= */
const themeToggle = $('#themeToggle');
const root = document.documentElement;
const THEME_KEY = 'portfolio_theme';

// Initialize theme from localStorage or system preference
function initTheme(){
  const saved = localStorage.getItem(THEME_KEY);
  if(saved){
    root.setAttribute('data-theme', saved);
  } else {
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    root.setAttribute('data-theme', prefersLight ? 'light' : 'dark');
  }
  updateThemeIcon();
}
function toggleTheme(){
  const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  const next = current === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  localStorage.setItem(THEME_KEY, next);
  updateThemeIcon();
}
function updateThemeIcon(){
  const theme = root.getAttribute('data-theme');
  themeToggle.textContent = theme === 'light' ? '🌙' : '🌗';
}
themeToggle?.addEventListener('click', toggleTheme);
initTheme();

/* =========================
   SMOOTH SCROLL (native)
   ========================= */
document.documentElement.style.scrollBehavior = 'smooth';

/* =========================
   MOBILE HAMBURGER MENU
   ========================= */
const hamburger = $('#hamburger');
const navLinks = $('#navLinks');
hamburger?.addEventListener('click', () => {
  const open = navLinks.style.display !== 'flex';
  if(open){
    navLinks.style.display = 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.right = '16px';
    navLinks.style.top = '64px';
    navLinks.style.background = 'var(--panel)';
    navLinks.style.padding = '0.8rem';
    navLinks.style.borderRadius = '12px';
    navLinks.style.backdropFilter = 'blur(8px)';
    hamburger.classList.add('open');
  } else {
    navLinks.style.display = '';
    hamburger.classList.remove('open');
  }
});

/* Close mobile menu on link click */
$$('.nav-link').forEach(a => a.addEventListener('click', () => {
  if(window.innerWidth <= 900){
    navLinks.style.display = '';
    hamburger.classList.remove('open');
  }
}));

/* =========================
   TYPING EFFECT (Hero)
   #CUSTOMIZE: Change phrases below
   ========================= */
const typedTextEl = $('#typedText');
const phrases = [
  'I craft interfaces that feel alive.',
  'Performance-first Frontend Engineer.',
  'Micro-interactions & pixel-perfect UI.',
  'Let\'s build something futuristic.'
];
let typingIndex = 0;
let charIndex = 0;
let typingDelay = 60;
let erasingDelay = 30;
let nextDelay = 1200;

function type(){
  if(typingIndex >= phrases.length) typingIndex = 0;
  const current = phrases[typingIndex];
  if(charIndex < current.length){
    typedTextEl.textContent += current.charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, nextDelay);
  }
}
function erase(){
  const current = phrases[typingIndex];
  if(charIndex > 0){
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
   CURSOR GLOW FOLLOWER
   ========================= */
const cursorGlow = $('#cursorGlow');
document.addEventListener('mousemove', (e) => {
  // Move the glow smoothly
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
  // Slight scale on hover for interactive elements
  const target = e.target;
  if(target.closest && (target.closest('a') || target.closest('button') || target.closest('.btn'))){
    cursorGlow.style.transform = 'translate(-50%,-50%) scale(1.25)';
    cursorGlow.style.opacity = '1';
  } else {
    cursorGlow.style.transform = 'translate(-50%,-50%) scale(1)';
    cursorGlow.style.opacity = '0.9';
  }
});

/* =========================
   TILT EFFECT (3D) for profile image
   ========================= */
const tiltCard = $('#tiltCard');
if(tiltCard){
  tiltCard.addEventListener('mousemove', (e) => {
    const rect = tiltCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (x - cx) / cx;
    const dy = (y - cy) / cy;
    const tiltX = dy * 8;
    const tiltY = dx * -8;
    tiltCard.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
  });
  tiltCard.addEventListener('mouseleave', () => {
    tiltCard.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale(1)';
  });
}

/* =========================
   SKILL BARS ANIMATION
   ========================= */
function animateSkillBars(){
  $$('.skill-fill').forEach(el => {
    const value = el.getAttribute('data-fill') || '0';
    el.style.width = value + '%';
  });
}

/* =========================
   SCROLL REVEAL
   Simple IntersectionObserver to reveal elements
   ========================= */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      // Trigger skill bars when about section visible
      if(entry.target.closest && entry.target.closest('#about')){
        animateSkillBars();
      }
    }
  });
}, { threshold: 0.12 });

$$('.reveal').forEach(el => revealObserver.observe(el));

/* =========================
   PROJECT FILTER (optional)
   ========================= */
const filterBtns = $$('.filter-btn');
const projectGrid = $('#projectGrid');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    const cards = $$('.project-card');
    cards.forEach(card => {
      const cat = card.dataset.category;
      if(filter === 'all' || cat === filter){
        card.style.display = '';
        // small reveal animation
        card.classList.remove('visible');
        setTimeout(()=>card.classList.add('visible'), 40);
      } else {
        card.style.display = 'none';
      }
    });
  });
});

/* =========================
   FORM VALIDATION & SUBMIT
   - Client-side validation only
   - Replace submit handler with real endpoint as needed
   ========================= */
const contactForm = $('#contactForm');
const nameInput = $('#name');
const emailInput = $('#email');
const messageInput = $('#message');
const nameError = $('#nameError');
const emailError = $('#emailError');
const messageError = $('#messageError');
const formSuccess = $('#formSuccess');

function validateEmail(email){
  // Simple email regex
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;
  // Name
  if(!nameInput.value.trim()){
    nameError.textContent = 'Please enter your name.';
    valid = false;
  } else {
    nameError.textContent = '';
  }
  // Email
  if(!validateEmail(emailInput.value.trim())){
    emailError.textContent = 'Please enter a valid email.';
    valid = false;
  } else {
    emailError.textContent = '';
  }
  // Message
  if(messageInput.value.trim().length < 10){
    messageError.textContent = 'Message should be at least 10 characters.';
    valid = false;
  } else {
    messageError.textContent = '';
  }

  if(!valid) return;

  // Simulate sending (replace with fetch to your backend)
  formSuccess.textContent = 'Sending message...';
  const payload = {
    name: nameInput.value.trim(),
    email: emailInput.value.trim(),
    message: messageInput.value.trim()
  };

  // Simulated async
  setTimeout(() => {
    formSuccess.textContent = 'Thanks! Your message has been sent.';
    contactForm.reset();
  }, 900);
});

/* =========================
   STICKY NAVBAR BLUR ON SCROLL
   ========================= */
const navbar = $('#navbar');
window.addEventListener('scroll', () => {
  if(window.scrollY > 24){
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

/* =========================
   FOOTER YEAR
   ========================= */
$('#footerYear').textContent = new Date().getFullYear();

/* =========================
   INITIAL REVEAL FOR HERO
   ========================= */
window.addEventListener('load', () => {
  // Reveal hero elements
  const heroReveals = [$('.hero-title'), $('.hero-subtitle'), $('.hero-role'), $('.hero-cta')];
  heroReveals.forEach((el, i) => {
    if(!el) return;
    el.style.opacity = 0;
    setTimeout(()=>{ el.style.transition = 'opacity 600ms ease, transform 600ms ease'; el.style.opacity = 1; }, i * 160);
  });
});

/* =========================
   ACCESSIBILITY: reduce motion preference
   ========================= */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if(reduceMotion.matches){
  // Disable animations that may be motion-heavy
  document.documentElement.style.scrollBehavior = 'auto';
  $$('.skill-fill').forEach(el => el.style.transition = 'none');
  $$('.reveal').forEach(el => { el.style.transition = 'none'; el.classList.add('visible'); });
}