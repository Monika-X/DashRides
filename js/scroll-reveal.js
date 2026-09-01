/**
 * DASHRIDES - SCROLL REVEAL & STATS COUNTER
 * Intersection Observer driven animations for seamless performance
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initStatsCounter();
});

function initScrollReveal() {
  const revealElements = document.querySelectorAll('[class*="reveal-"]');
  if (!revealElements.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => revealObserver.observe(el));
}

/* Number Counter for Stats */
function initStatsCounter() {
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  if (!statNumbers.length) return;

  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => counterObserver.observe(el));
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const suffix = el.getAttribute('data-suffix') || '';
  const prefix = el.getAttribute('data-prefix') || '';
  const duration = 2000;
  const frameRate = 1000 / 60;
  const totalFrames = Math.round(duration / frameRate);
  let frame = 0;

  const timer = setInterval(() => {
    frame++;
    const progress = frame / totalFrames;
    // Ease-out quad
    const current = Math.round(target * (progress * (2 - progress)));

    el.textContent = `${prefix}${current.toLocaleString()}${suffix}`;

    if (frame >= totalFrames) {
      clearInterval(timer);
      el.textContent = `${prefix}${target.toLocaleString()}${suffix}`;
    }
  }, frameRate);
}
