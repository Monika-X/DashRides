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
  const channelBar = document.querySelector('.channel-filter-bar');
  const blogGrid = document.querySelector('.blog-grid');
  const blogCards = Array.from(document.querySelectorAll('.blog-card[data-category]'));
  const viewMoreBtn = document.getElementById('blog-view-more');
  if (!filterBar || !blogGrid || !blogCards.length) return;

  const blogFilterBtns = filterBar.querySelectorAll('.filter-btn');
  const channelFilterBtns = channelBar ? channelBar.querySelectorAll('.filter-btn') : [];
  const allFilterBtns = [...blogFilterBtns, ...channelFilterBtns];
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
    const filterValues = currentFilter.toLowerCase().split(' ').filter(Boolean);
    return blogCards.filter(card => {
      const cats = (card.getAttribute('data-category') || '').toLowerCase().split(' ');
      if (filterValues.includes('all')) return true;
      return filterValues.some(f => cats.includes(f));
    });
  }

  function syncActiveButtons(rawFilter) {
    allFilterBtns.forEach(b => b.classList.remove('active'));
    // activate matching in both bars
    allFilterBtns.forEach(b => {
      if ((b.getAttribute('data-filter') || '').toLowerCase() === rawFilter.toLowerCase()) {
        b.classList.add('active');
      }
    });
    // if channel multi-filter has no exact match in blog bar, highlight channel only (already)
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

  // Filter button clicks - both bars, sync and scroll to grid
  allFilterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const rawFilter = btn.getAttribute('data-filter') || 'all';
      currentFilter = rawFilter;
      visibleLimit = INITIAL_VISIBLE;
      syncActiveButtons(rawFilter);
      render();
      // scroll to Latest Dispatches grid for channel bar clicks
      const latestSection = document.getElementById('latest-dispatches');
      if (latestSection) {
        // only scroll if channel bar was clicked (not blog bar already in view)
        const isChannel = btn.closest('.channel-filter-bar');
        if (isChannel) {
          setTimeout(() => latestSection.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
        }
      }
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
