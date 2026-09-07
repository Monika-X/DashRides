/**
 * DASHRIDES - BLOG CATEGORY FILTER + VIEW MORE PAGINATION
 * Default 6 cards, View More shows 3 more per click (6 -> 9 -> 12 -> 15 -> 18)
 * Works with category filter (3 per category, All 18)
 */
document.addEventListener('DOMContentLoaded', () => {
  initBlogFilter();
});

function initBlogFilter() {
  const filterBar = document.querySelector('.blog-filter-bar');
  const blogGrid = document.querySelector('.blog-grid');
  const blogCards = Array.from(document.querySelectorAll('.blog-card[data-category]'));
  const viewMoreBtn = document.getElementById('blog-view-more');
  if (!filterBar || !blogGrid || !blogCards.length) return;

  const filterBtns = filterBar.querySelectorAll('.filter-btn');
  const INITIAL_VISIBLE = 6;
  const BATCH_SIZE = 3;
  let currentFilter = 'all';
  let visibleLimit = INITIAL_VISIBLE;

  // Empty state
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
    blogGrid.appendChild(emptyMsg);
  }

  function getFilteredCards() {
    return blogCards.filter(card => {
      const cats = (card.getAttribute('data-category') || '').toLowerCase().split(' ');
      return currentFilter === 'all' || cats.includes(currentFilter);
    });
  }

  function render() {
    const filtered = getFilteredCards();

    // Hide all first
    blogCards.forEach(card => {
      card.style.display = 'none';
      card.style.opacity = '0';
      card.style.transform = 'translateY(12px)';
    });

    // Show filtered up to visibleLimit
    const toShow = filtered.slice(0, visibleLimit);
    const toHideFiltered = filtered.slice(visibleLimit);

    toShow.forEach((card, idx) => {
      card.style.display = 'flex';
      requestAnimationFrame(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
        card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      });
    });

    // Hide filtered beyond limit but keep display none
    toHideFiltered.forEach(card => {
      card.style.display = 'none';
    });

    // Non-matching remain hidden (already)

    // Empty state
    if (filtered.length === 0) {
      emptyMsg.style.display = 'block';
    } else {
      emptyMsg.style.display = 'none';
    }

    // View More button visibility
    if (viewMoreBtn) {
      if (filtered.length <= INITIAL_VISIBLE || visibleLimit >= filtered.length) {
        viewMoreBtn.style.display = 'none';
      } else {
        viewMoreBtn.style.display = 'inline-flex';
        const remaining = filtered.length - visibleLimit;
        const nextBatch = Math.min(BATCH_SIZE, remaining);
        viewMoreBtn.textContent = `View More (${nextBatch} more)`;
      }
    }
  }

  // Filter button clicks
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter') || 'all';
      visibleLimit = INITIAL_VISIBLE;
      render();
    });
  });

  // View More click
  if (viewMoreBtn) {
    viewMoreBtn.addEventListener('click', () => {
      visibleLimit += BATCH_SIZE;
      render();
      // optional smooth scroll to first newly revealed card
      const filtered = getFilteredCards();
      const newlyVisibleIndex = visibleLimit - BATCH_SIZE;
      const targetCard = filtered[newlyVisibleIndex];
      if (targetCard) {
        setTimeout(() => targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 100);
      }
    });
  }

  // Initial render 6
  render();
}
