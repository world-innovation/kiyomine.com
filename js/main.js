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

// Scroll-hide nav
const nav = document.querySelector('nav');
const navMobile = document.querySelector('.nav-mobile');
const hamburger = document.querySelector('.nav-hamburger');
let lastY = 0;

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (y > 60) {
    nav.classList.add('nav--scrolled');
    if (y > lastY + 8) {
      nav.classList.add('nav--hidden');
      // Close mobile menu when nav hides on scroll
      navMobile?.classList.remove('is-open');
      hamburger?.classList.remove('is-open');
    } else if (y < lastY - 4) {
      nav.classList.remove('nav--hidden');
    }
  } else {
    nav.classList.remove('nav--scrolled', 'nav--hidden');
  }
  lastY = y;
}, { passive: true });

// Desktop dropdown (click-based)
const dropdownParent = document.querySelector('.nav-dropdown-parent');
if (dropdownParent) {
  const trigger = dropdownParent.querySelector('.nav-dropdown-trigger');
  const panel = dropdownParent.querySelector('.nav-dropdown');

  trigger.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = dropdownParent.classList.toggle('is-open');
    trigger.setAttribute('aria-expanded', String(isOpen));
  });

  // Keep open when clicking inside the panel
  panel?.addEventListener('click', e => e.stopPropagation());

  // Close on outside click or Escape
  document.addEventListener('click', () => {
    dropdownParent.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      dropdownParent.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });
}

// Hamburger + mobile nav panel
if (hamburger && navMobile) {
  hamburger.addEventListener('click', () => {
    const isOpen = navMobile.classList.toggle('is-open');
    hamburger.classList.toggle('is-open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });
}

// Mobile accordion for サービス
const mobileAccordion = document.querySelector('.mobile-accordion');
if (mobileAccordion) {
  const trigger = mobileAccordion.querySelector('.mobile-accordion-trigger');
  trigger.addEventListener('click', () => {
    const isOpen = mobileAccordion.classList.toggle('is-open');
    trigger.setAttribute('aria-expanded', String(isOpen));
  });
}
