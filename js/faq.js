/**
 * DASHRIDES - FAQ ACCORDION & COUNTDOWN UTILITIES
 */

document.addEventListener('DOMContentLoaded', () => {
  initFaqAccordion();
  initMaintenanceCountdown();
});

function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const content = item.querySelector('.faq-content');

    if (!header || !content) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close siblings
      faqItems.forEach(sibling => {
        if (sibling !== item) {
          sibling.classList.remove('active');
          const siblingContent = sibling.querySelector('.faq-content');
          if (siblingContent) siblingContent.style.maxHeight = null;
        }
      });

      // Toggle current
      if (isActive) {
        item.classList.remove('active');
        content.style.maxHeight = null;
      } else {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });
}

function initMaintenanceCountdown() {
  const daysEl = document.getElementById('m-days');
  const hoursEl = document.getElementById('m-hours');
  const minutesEl = document.getElementById('m-minutes');
  const secondsEl = document.getElementById('m-seconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  // Target date 3 days from now
  const targetDate = new Date().getTime() + (3 * 24 * 60 * 60 * 1000) + (14 * 60 * 60 * 1000);

  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  setInterval(update, 1000);
  update();
}
