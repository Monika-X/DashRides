/**
 * DASHRIDES - CUSTOMER DASHBOARD CONTROLLER
 */

document.addEventListener('DOMContentLoaded', () => {
  initDashboardTabs();
  initDeadlineCountdown();
  initOneClickExtension();
  initDocDownloads();
  initProfileSettings();
  initDashSidebarToggle();
});

/* 0. Dashboard sidebar responsive toggle - logo left, toggles right */
function initDashSidebarToggle() {
  const toggle = document.querySelector('.dash-menu-toggle');
  const sidebar = document.querySelector('.dash-sidebar');
  const overlay = document.querySelector('.dash-overlay');
  if (!toggle || !sidebar || !overlay) return;
  const toggleSidebar = () => {
    const isOpen = sidebar.classList.contains('open');
    if (isOpen) {
      sidebar.classList.remove('open');
      toggle.classList.remove('active');
      overlay.classList.remove('active');
      document.documentElement.classList.remove('no-scroll');
      document.body.classList.remove('no-scroll');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    } else {
      sidebar.classList.add('open');
      toggle.classList.add('active');
      overlay.classList.add('active');
      document.documentElement.classList.add('no-scroll');
      document.body.classList.add('no-scroll');
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    }
  };
  toggle.addEventListener('click', toggleSidebar);
  overlay.addEventListener('click', toggleSidebar);
  overlay.addEventListener('touchmove', (e) => { if (sidebar.classList.contains('open')) e.preventDefault(); }, { passive: false });
  sidebar.addEventListener('touchmove', (e) => e.stopPropagation(), { passive: true });
  // close when nav button clicked
  sidebar.querySelectorAll('.dash-nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      if (sidebar.classList.contains('open')) toggleSidebar();
    });
  });
}

/* 1. Tab Switching */
function initDashboardTabs() {
  const tabBtns = document.querySelectorAll('.dash-nav-btn[data-tab]');
  const tabPanes = document.querySelectorAll('.dash-tab-pane');

  if (!tabBtns.length) return;

  function activateTab(tabId) {
    tabBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
    });

    tabPanes.forEach(pane => {
      pane.classList.toggle('active', pane.id === tabId);
    });

    // Update URL hash
    window.location.hash = tabId;
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = btn.getAttribute('data-tab');
      activateTab(tabId);
    });
  });

  // Check URL Hash on load
  const currentHash = window.location.hash.replace('#', '');
  if (currentHash && document.getElementById(currentHash)) {
    activateTab(currentHash);
  }
}

/* 2. Active Rental Return Deadline Countdown */
function initDeadlineCountdown() {
  const countdownEl = document.getElementById('rental-countdown');
  if (!countdownEl) return;

  // Set mock return deadline 4 hours from now
  let timeRemaining = 4 * 3600 + 28 * 60 + 45; // 4h 28m 45s

  function updateDisplay() {
    const hours = Math.floor(timeRemaining / 3600);
    const minutes = Math.floor((timeRemaining % 3600) / 60);
    const seconds = timeRemaining % 60;

    countdownEl.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    if (timeRemaining > 0) {
      timeRemaining--;
    } else {
      countdownEl.textContent = 'OVERDUE';
      countdownEl.style.color = 'var(--color-danger)';
    }
  }

  setInterval(updateDisplay, 1000);
  updateDisplay();
}

/* 3. One-Click Rental Extension */
function initOneClickExtension() {
  const extendBtns = document.querySelectorAll('.btn-extend-rental');
  extendBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const originalText = btn.innerHTML;
      btn.innerHTML = 'Extending...';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
        showToast('<i class="fa-solid fa-bolt"></i> Rental extended by +2 Hours! Updated return deadline.', 'success');
      }, 1000);
    });
  });
}

/* 4. Document & Receipt Simulated Downloads */
function initDocDownloads() {
  const downloadBtns = document.querySelectorAll('.btn-download-doc');
  downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const docName = btn.getAttribute('data-doc-name') || 'Receipt_DR-9021.pdf';
      showToast(`Generating & downloading ${docName}...`, 'info');
      
      setTimeout(() => {
        // Create virtual download anchor
        const element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(`DASHRIDES OFFICIAL DOCUMENT: ${docName}\n\nThank you for choosing DashRides Urban Luxury Mobility.\nVerified Digital Signature: SHA256-DR-VERIFIED-99214`));
        element.setAttribute('download', docName.replace('.pdf', '.txt'));
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
        showToast(`Downloaded ${docName} successfully!`, 'success');
      }, 1200);
    });
  });
}

/* 5. Profile & Settings Persistence */
function initProfileSettings() {
  const profileForm = document.getElementById('profile-edit-form');
  if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = profileForm.querySelector('input[name="full-name"]');
      if (nameInput && nameInput.value.trim()) {
        const userNames = document.querySelectorAll('.user-name');
        userNames.forEach(el => el.textContent = nameInput.value.trim());
      }
      showToast('Profile updated successfully!', 'success');
    });
  }
}
