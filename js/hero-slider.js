/**
 * DASHRIDES - HERO SLIDER COMPONENT
 * Cinematic auto-sliding hero with manual navigation & pause on hover
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();
});

function initHeroSlider() {
  const sliderWrapper = document.querySelector('.hero-slider-wrapper');
  if (!sliderWrapper) return;

  const slides = sliderWrapper.querySelectorAll('.hero-slide');
  const prevBtn = document.querySelector('.slider-prev');
  const nextBtn = document.querySelector('.slider-next');
  const dotsContainer = document.querySelector('.slider-dots');

  if (!slides.length) return;

  let currentIndex = 0;
  let slideInterval = null;
  const slideDuration = 6000;

  // Build dots if empty
  if (dotsContainer && dotsContainer.children.length === 0) {
    slides.forEach((_, idx) => {
      const dot = document.createElement('div');
      dot.className = `slider-dot ${idx === 0 ? 'active' : ''}`;
      dot.setAttribute('data-index', idx);
      dot.addEventListener('click', () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });
  }

  function updateDots() {
    if (!dotsContainer) return;
    const dots = dotsContainer.querySelectorAll('.slider-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  }

  function goToSlide(index) {
    slides[currentIndex].classList.remove('active');
    currentIndex = (index + slides.length) % slides.length;
    slides[currentIndex].classList.add('active');
    updateDots();
    resetInterval();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function startInterval() {
    slideInterval = setInterval(nextSlide, slideDuration);
  }

  function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
  }

  if (nextBtn) nextBtn.addEventListener('click', nextSlide);
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);

  // Pause on hover
  sliderWrapper.addEventListener('mouseenter', () => clearInterval(slideInterval));
  sliderWrapper.addEventListener('mouseleave', () => startInterval());

  // Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  sliderWrapper.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  sliderWrapper.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const threshold = 50;
    const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
    if (touchEndX < touchStartX - threshold) {
      isRtl ? prevSlide() : nextSlide();
    }
    if (touchEndX > touchStartX + threshold) {
      isRtl ? nextSlide() : prevSlide();
    }
  }

  startInterval();
}
