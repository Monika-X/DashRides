/**
 * DASHRIDES - BLOG CATEGORY FILTER
 * Filters Latest Dispatches blog cards by data-category
 */
document.addEventListener('DOMContentLoaded', () => {
  initBlogFilter();
});

function initBlogFilter() {
  const filterBar = document.querySelector('.blog-filter-bar');
  const blogCards = document.querySelectorAll('.blog-card[data-category]');
  if (!filterBar || !blogCards.length) return;

  const filterBtns = filterBar.querySelectorAll('.filter-btn');
  if (!filterBtns.length) return;

  // Create empty state message
  let emptyMsg = document.getElementById('blog-filter-empty');
  if (!emptyMsg) {
    emptyMsg = document.createElement('div');
    emptyMsg.id = 'blog-filter-empty';
    emptyMsg.style.display = 'none';
    emptyMsg.style.textAlign = 'center';
    emptyMsg.style.padding = '3rem 1rem';
    emptyMsg.style.color = 'var(--text-muted)';
    emptyMsg.style.gridColumn = '1 / -1';
    emptyMsg.innerHTML = '<p style="font-size:1.05rem;">No articles found for this category.</p><button class="btn btn-outline btn-sm" style="margin-top:1rem;" onclick="document.querySelector(\'.blog-filter-bar .filter-btn[data-filter=all]\')?.click()">Show All Topics</button>';
    const grid = document.querySelector('.blog-grid');
    if (grid) grid.appendChild(emptyMsg);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter');

      let visibleCount = 0;
      blogCards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').toLowerCase().split(' ');
        const shouldShow = filterValue === 'all' || categories.includes(filterValue);
        if (shouldShow) {
          card.style.display = 'flex';
          // animate in
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
          });
          visibleCount++;
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(12px)';
          card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
          setTimeout(() => {
            if (card.style.opacity === '0') card.style.display = 'none';
          }, 310);
        }
      });

      // toggle empty message
      setTimeout(() => {
        if (emptyMsg) emptyMsg.style.display = visibleCount === 0 ? 'block' : 'none';
      }, 320);

      // optional toast for feedback
      if (typeof window.showToast === 'function' && filterValue !== 'all') {
        const label = btn.textContent.trim();
        // avoid spamming toast on every click, only when filtered
        // showToast(`Filtered: ${label} (${visibleCount})`, 'info');
      }
    });
  });
}
