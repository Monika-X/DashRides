/**
 * DASHRIDES - BOOKING & FORM VALIDATION
 */

document.addEventListener('DOMContentLoaded', () => {
  initBookingForms();
  initContactForms();
});

function initBookingForms() {
  const bookingForm = document.getElementById('rental-booking-form');
  if (!bookingForm) return;

  // Pre-fill model if selected from fleet
  const savedModel = sessionStorage.getItem('dashrides_selected_model');
  if (savedModel) {
    const modelSelect = bookingForm.querySelector('select[name="scooter-model"]');
    if (modelSelect) {
      for (let option of modelSelect.options) {
        if (option.text.includes(savedModel)) {
          option.selected = true;
          break;
        }
      }
    }
  }

  // Set default and min date to today, default time to next hour
  const setupDateTimeDefaults = () => {
    const dateInput = document.getElementById('booking-pickup-date');
    const timeInput = document.getElementById('booking-pickup-time');
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    const todayStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
    
    if (dateInput) {
      dateInput.min = todayStr;
      if (!dateInput.value) dateInput.value = todayStr;
    }
    if (timeInput && !timeInput.value) {
      const nextHour = new Date(now.getTime() + 60 * 60 * 1000);
      timeInput.value = `${pad(nextHour.getHours())}:00`;
    }
  };
  setupDateTimeDefaults();

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isValid = true;
    const requiredInputs = bookingForm.querySelectorAll('[required]');

    requiredInputs.forEach(input => {
      const parent = input.closest('.form-group') || input.parentElement;
      if (!input.value.trim()) {
        isValid = false;
        parent.classList.add('has-error');
      } else {
        parent.classList.remove('has-error');
      }
    });

    if (isValid) {
      const submitBtn = bookingForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Securing Reservation... <i class="fa-solid fa-hourglass-half"></i>';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        showToast('<i class="fa-solid fa-champagne-glasses"></i> Reservation Confirmed! Check your email for QR unlock code.', 'success');
        bookingForm.reset();
        setupDateTimeDefaults();
      }, 1500);
    } else {
      showToast('Please fill in all mandatory booking fields.', 'error');
    }
  });
}

function initContactForms() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;
    const requiredInputs = contactForm.querySelectorAll('[required]');

    requiredInputs.forEach(input => {
      const parent = input.closest('.form-group') || input.parentElement;
      if (!input.value.trim()) {
        isValid = false;
        parent.classList.add('has-error');
      } else {
        parent.classList.remove('has-error');
      }
    });

    if (isValid) {
      showToast('Message sent! Our support team will respond within 15 minutes.', 'success');
      contactForm.reset();
    } else {
      showToast('Please correct the highlighted fields.', 'error');
    }
  });
}
