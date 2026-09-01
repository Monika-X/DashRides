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
    btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
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
  
  let icon = '✓';
  if (type === 'warning') icon = '⚠️';
  if (type === 'error') icon = '✕';
  if (type === 'info') icon = 'ℹ️';

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
