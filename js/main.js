/* =============================================
   NAV — shrink on scroll + hamburger
   ============================================= */
const nav = document.getElementById('nav');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav__links');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

/* Close mobile menu on link click */
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* =============================================
   SCROLL REVEAL
   ============================================= */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* Section title underline animation (reuses in-view) */
const titleObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    entry.target.classList.toggle('in-view', entry.isIntersecting);
  });
}, { threshold: 0.5 });

document.querySelectorAll('.section__title').forEach(el => titleObserver.observe(el));

/* =============================================
   ACTIVE NAV LINK on scroll
   ============================================= */
const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const link = document.querySelector(`.nav__links a[href="#${id}"]`);
    if (!link) return;
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav__links a').forEach(a => a.removeAttribute('data-active'));
      link.setAttribute('data-active', 'true');
      link.style.color = 'var(--accent)';
    } else {
      link.style.color = '';
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => navObserver.observe(s));

/* =============================================
   FOOTER YEAR
   ============================================= */
document.getElementById('year').textContent = new Date().getFullYear();
