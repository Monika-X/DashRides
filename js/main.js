/**
 * DASHRIDES - MAIN CLIENT SCRIPT
 * Manages Global Header, Themes, RTL, Navigation, and Global Micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initRtlToggle();
  initStickyHeader();
  initMobileNavigation();
  initBackToTop();
  initCurrentYear();
  initNewsletter();
  initUserMenu();
  initGenericForms();
});

/* 1. Theme Toggle (Dark / Light Mode) */
function initThemeToggle() {
  const themeToggles = document.querySelectorAll('.theme-toggle');
  const html = document.documentElement;
  
  // Check local storage or system preference
  const savedTheme = localStorage.getItem('dashrides_theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);

  themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('dashrides_theme', newTheme);
      updateThemeIcons(newTheme);
      showToast(`Switched to ${newTheme.toUpperCase()} mode`, 'info');
    });
  });
}

function updateThemeIcons(theme) {
  const icons = document.querySelectorAll('.theme-toggle i, .theme-toggle svg');
  // If SVG or text is used
  const buttons = document.querySelectorAll('.theme-toggle');
  buttons.forEach(btn => {
    btn.innerHTML = theme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`);
  });
}

/* 2. RTL Toggle (Right-to-Left Layout) */
function initRtlToggle() {
  const rtlToggles = document.querySelectorAll('.rtl-toggle');
  const html = document.documentElement;

  const savedDir = localStorage.getItem('dashrides_dir') || 'ltr';
  html.setAttribute('dir', savedDir);
  updateRtlButtonText(savedDir);

  rtlToggles.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentDir = html.getAttribute('dir');
      const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';

      html.setAttribute('dir', newDir);
      localStorage.setItem('dashrides_dir', newDir);
      updateRtlButtonText(newDir);
      showToast(`Direction set to ${newDir.toUpperCase()}`, 'info');
    });
  });
}

function updateRtlButtonText(dir) {
  const buttons = document.querySelectorAll('.rtl-toggle');
  buttons.forEach(btn => {
    btn.innerText = dir === 'rtl' ? 'LTR' : 'RTL';
  });
}

/* 3. Sticky Header on Scroll */
function initStickyHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* 4. Mobile Navigation Drawer */
function initMobileNavigation() {
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  if (!menuToggle || !mobileNav || !mobileOverlay) return;

  const toggleMenu = () => {
    const isOpen = mobileNav.classList.contains('open');
    if (isOpen) {
      mobileNav.classList.remove('open');
      menuToggle.classList.remove('active');
      mobileOverlay.classList.remove('active');
      document.body.style.overflow = '';
    } else {
      mobileNav.classList.add('open');
      menuToggle.classList.add('active');
      mobileOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  menuToggle.addEventListener('click', toggleMenu);
  mobileOverlay.addEventListener('click', toggleMenu);

  // Close when nav link is clicked
  const mobileLinks = mobileNav.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileNav.classList.contains('open')) toggleMenu();
    });
  });
}

/* 5. Back to Top Button */
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* 6. Current Year in Footer */
function initCurrentYear() {
  const yearEls = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearEls.forEach(el => el.textContent = currentYear);
}

/* 7. Global Toast Notification */
window.showToast = function(message, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = '<i class="fa-solid fa-check"></i>';
  if (type === 'warning') icon = '<i class="fa-solid fa-triangle-exclamation"></i>';
  if (type === 'error') icon = '<i class="fa-solid fa-xmark"></i>';
  if (type === 'info') icon = '<i class="fa-solid fa-circle-info"></i>';

  toast.innerHTML = `
    <span>${icon}</span>
    <div>${message}</div>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
};

/* 8. User Profile Dropdown */
function initUserMenu() {
  const menus = document.querySelectorAll('.user-menu');
  if (!menus.length) return;

  menus.forEach(menu => {
    const btn = menu.querySelector('.user-profile-btn');
    const dropdown = menu.querySelector('.user-dropdown');
    if (!btn || !dropdown) return;

    const close = () => {
      dropdown.classList.remove('open');
      btn.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
    };

    const toggle = (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.contains('open');
      // close others
      document.querySelectorAll('.user-dropdown.open').forEach(d => {
        if (d !== dropdown) d.classList.remove('open');
      });
      document.querySelectorAll('.user-profile-btn.active').forEach(b => {
        if (b !== btn) b.classList.remove('active');
      });
      if (isOpen) {
        close();
      } else {
        dropdown.classList.add('open');
        btn.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    };

    btn.addEventListener('click', toggle);

    // close on item click (allow navigation, then close)
    dropdown.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => setTimeout(close, 150));
    });

    // login/signup demo toasts
    dropdown.querySelectorAll('[data-toast]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const msg = el.getAttribute('data-toast');
        if (typeof window.showToast === 'function') window.showToast(msg, 'info');
        close();
      });
    });
  });

  // close on outside click / Esc
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.user-menu')) {
      document.querySelectorAll('.user-dropdown.open').forEach(d => d.classList.remove('open'));
      document.querySelectorAll('.user-profile-btn.active').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-expanded', 'false');
      });
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.user-dropdown.open').forEach(d => d.classList.remove('open'));
      document.querySelectorAll('.user-profile-btn.active').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-expanded', 'false');
      });
    }
  });
}

/* 9a. Generic Forms - success toast + reset only inputs (no page reload) */
function initGenericForms() {
  const skipIds = new Set(['login-form','signup-form','rental-booking-form','profile-edit-form','admin-booking-form','fleet-add-form']);
  document.querySelectorAll('form').forEach(form => {
    if (form.dataset.genericBound) return;
    if (skipIds.has(form.id)) return;
    if (form.classList.contains('footer-newsletter-form')) return;
    if (form.hasAttribute('onsubmit')) return;
    if (form.id === 'contact-form') return;
    form.dataset.genericBound = 'true';
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach(inp => {
        const group = inp.closest('.form-group');
        if (!inp.value.trim() || (inp.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inp.value))) {
          valid = false;
          if (group) group.classList.add('has-error');
        } else {
          if (group) group.classList.remove('has-error');
        }
      });
      if (!valid) {
        if (typeof window.showToast === 'function') window.showToast('Please correct the highlighted fields.', 'error');
        return;
      }
      if (typeof window.showToast === 'function') window.showToast('Submitted successfully! Thank you — we will be in touch soon.', 'success');
      form.reset();
      form.querySelectorAll('.has-error').forEach(el => el.classList.remove('has-error'));
    });
  });
}

/* 9. Footer Newsletter Subscription */
function initNewsletter() {
  const forms = document.querySelectorAll('.footer-newsletter-form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('.footer-newsletter-input');
      const email = input ? input.value.trim() : '';
      if (email) {
        if (typeof window.showToast === 'function') {
          window.showToast('Thank you for subscribing! Check your inbox for exclusive mobility offers.', 'success');
        }
        form.reset();
      }
    });
  });
}

