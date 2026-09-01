/**
 * DASHRIDES - FLEET GALLERY, FILTERING & QUICK ACTIONS
 */

document.addEventListener('DOMContentLoaded', () => {
  initFleetFilters();
  initFleetQuickBook();
});

function initFleetFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const fleetCards = document.querySelectorAll('.fleet-card[data-category]');

  if (!filterBtns.length || !fleetCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      fleetCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

function initFleetQuickBook() {
  const bookBtns = document.querySelectorAll('.btn-quick-book');
  bookBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modelName = btn.getAttribute('data-model') || 'Dash Phantom Pro';
      // Store selected model in sessionStorage and redirect to booking / dashboard
      sessionStorage.setItem('dashrides_selected_model', modelName);
      showToast(`Selected "${modelName}". Redirecting to booking...`, 'success');
      setTimeout(() => {
        window.location.href = 'dashboard.html#booking';
      }, 800);
    });
  });
}
