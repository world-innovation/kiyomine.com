// Fade-in on scroll
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.1 }
);
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Mouse-follow glow on service cards
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
    card.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
  });
});

// Scroll-hide nav: transparent at top, scrolled-in on scroll, hides on down, shows on up
const nav = document.querySelector('nav');
let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > 60) {
    nav.classList.add('nav--scrolled');
    if (y > lastY + 8) {
      nav.classList.add('nav--hidden');
    } else if (y < lastY - 4) {
      nav.classList.remove('nav--hidden');
    }
  } else {
    nav.classList.remove('nav--scrolled', 'nav--hidden');
  }
  lastY = y;
}, { passive: true });
