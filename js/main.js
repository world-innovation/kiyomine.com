// ─── Fade-in on scroll ───────────────────────────────
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
);
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ─── Stagger delay for card grids ────────────────────
document.querySelectorAll(
  '.trust-grid, .services-grid, .approach-grid, .pricing-grid, .vision-pillars, .testi-grid, .process-steps'
).forEach(grid => {
  grid.querySelectorAll('.fade-in').forEach((el, i) => {
    el.style.transitionDelay = `${i * 0.07}s`;
  });
});

// ─── Mouse-follow glow on service cards ──────────────
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', ((e.clientX - r.left) / r.width  * 100) + '%');
    card.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100) + '%');
  });
});

// ─── Hamburger nav toggle ────────────────────────────
const navEl  = document.querySelector('nav');
const burger = document.querySelector('.nav-hamburger');

if (burger && navEl) {
  burger.addEventListener('click', () => {
    const isOpen = navEl.classList.toggle('open');
    burger.setAttribute('aria-expanded', isOpen);
    burger.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close on nav link click
  navEl.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      navEl.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (navEl.classList.contains('open') && !navEl.contains(e.target)) {
      navEl.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

// ─── Nav scroll shadow ───────────────────────────────
window.addEventListener('scroll', () => {
  if (navEl) {
    navEl.style.boxShadow = window.scrollY > 10
      ? '0 1px 32px rgba(0,0,0,0.5)'
      : 'none';
  }
}, { passive: true });
