/**
 * DASHRIDES - CUSTOMER DASHBOARD CONTROLLER
 */

document.addEventListener('DOMContentLoaded', () => {
  initDashboardTabs();
  initDeadlineCountdown();
  initOneClickExtension();
  initDocDownloads();
  initProfileSettings();
});

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
        showToast('⚡ Rental extended by +2 Hours! Updated return deadline.', 'success');
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
