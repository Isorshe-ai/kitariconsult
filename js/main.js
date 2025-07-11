document.addEventListener('DOMContentLoaded', function() {
  function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenuBtn && navLinks) {
      mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
        mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
      });
    }
  }

  // Run after header is loaded
  if (document.getElementById('header-include')) {
    const observer = new MutationObserver(() => {
      setupMobileMenu();
    });
    observer.observe(document.getElementById('header-include'), { childList: true });
  } else {
    setupMobileMenu();
  }

  // Testimonial Slider Logic
  function setupTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial-slider .testimonial');
    if (!testimonials.length) return;
    let current = 0;
    function showTestimonial(idx) {
      testimonials.forEach((t, i) => t.classList.toggle('active', i === idx));
    }
    function nextTestimonial() {
      current = (current + 1) % testimonials.length;
      showTestimonial(current);
    }
    // Start with the first testimonial
    showTestimonial(current);
    setInterval(nextTestimonial, 5000); // Change every 5 seconds
  }

  // Run after footer is loaded (ensures DOM is ready)
  if (document.getElementById('footer-include')) {
    const observer2 = new MutationObserver(() => {
      setupTestimonialSlider();
    });
    observer2.observe(document.getElementById('footer-include'), { childList: true });
  } else {
    setupTestimonialSlider();
  }

  // Partners Image Slider Logic
  function setupPartnersSlider() {
    const slider = document.querySelector('.partners-slider');
    if (!slider) return;
    const images = slider.querySelectorAll('.slider-image');
    const leftBtn = document.querySelector('.slider-arrow.left');
    const rightBtn = document.querySelector('.slider-arrow.right');
    let current = 0;
    let intervalId;
    function showImage(idx) {
      images.forEach((img, i) => img.classList.toggle('active', i === idx));
    }
    function prevImage() {
      current = (current - 1 + images.length) % images.length;
      showImage(current);
      resetInterval();
    }
    function nextImage() {
      current = (current + 1) % images.length;
      showImage(current);
      resetInterval();
    }
    function startInterval() {
      intervalId = setInterval(() => {
        current = (current + 1) % images.length;
        showImage(current);
      }, 5000);
    }
    function resetInterval() {
      clearInterval(intervalId);
      startInterval();
    }
    if (leftBtn && rightBtn) {
      leftBtn.addEventListener('click', prevImage);
      rightBtn.addEventListener('click', nextImage);
    }
    showImage(current);
    startInterval();
  }
  // Run after DOM is ready (footer loaded)
  if (document.getElementById('footer-include')) {
    const observer3 = new MutationObserver(() => {
      setupPartnersSlider();
    });
    observer3.observe(document.getElementById('footer-include'), { childList: true });
  } else {
    setupPartnersSlider();
  }

  // Hero Slider Logic
  function setupHeroSlider() {
    const slider = document.querySelector('.hero-slider .slider-container');
    if (!slider) return;
    const slides = slider.querySelectorAll('.slide');
    const leftBtn = slider.querySelector('.slider-arrow.left');
    const rightBtn = slider.querySelector('.slider-arrow.right');
    const dotsContainer = slider.querySelector('.slider-dots');
    let current = 0;
    let intervalId;
    // Create dots
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
      dot.addEventListener('click', () => {
        showSlide(i);
        resetInterval();
      });
      dotsContainer.appendChild(dot);
    });
    const dots = dotsContainer.querySelectorAll('.slider-dot');
    function showSlide(idx) {
      slides.forEach((slide, i) => slide.classList.toggle('active', i === idx));
      dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
      current = idx;
    }
    function prevSlide() {
      showSlide((current - 1 + slides.length) % slides.length);
      resetInterval();
    }
    function nextSlide() {
      showSlide((current + 1) % slides.length);
      resetInterval();
    }
    function startInterval() {
      intervalId = setInterval(() => {
        showSlide((current + 1) % slides.length);
      }, 6000);
    }
    function resetInterval() {
      clearInterval(intervalId);
      startInterval();
    }
    if (leftBtn && rightBtn) {
      leftBtn.addEventListener('click', prevSlide);
      rightBtn.addEventListener('click', nextSlide);
    }
    showSlide(0);
    startInterval();
  }
  // Run after DOM is ready (footer loaded)
  if (document.querySelector('.hero-slider')) {
    setupHeroSlider();
  }

  // Gallery Lightbox Logic
  function setupGalleryLightbox() {
    const galleryLinks = document.querySelectorAll('.gallery-grid a');
    const modal = document.getElementById('lightbox-modal');
    if (!galleryLinks.length || !modal) return;
    const modalImg = modal.querySelector('.lightbox-img');
    const closeBtn = modal.querySelector('.lightbox-close');
    const prevBtn = modal.querySelector('.lightbox-prev');
    const nextBtn = modal.querySelector('.lightbox-next');
    const overlay = modal.querySelector('.lightbox-overlay');
    const captionDiv = modal.querySelector('.lightbox-caption');
    let current = 0;
    function showModal(idx) {
      current = idx;
      modalImg.src = galleryLinks[idx].href;
      modalImg.alt = galleryLinks[idx].querySelector('img').alt;
      captionDiv.textContent = galleryLinks[idx].getAttribute('data-caption') || '';
      modal.style.display = 'flex';
      prevBtn.disabled = idx === 0;
      nextBtn.disabled = idx === galleryLinks.length - 1;
      document.body.style.overflow = 'hidden';
    }
    function closeModal() {
      modal.style.display = 'none';
      document.body.style.overflow = '';
    }
    function showPrev() {
      if (current > 0) showModal(current - 1);
    }
    function showNext() {
      if (current < galleryLinks.length - 1) showModal(current + 1);
    }
    galleryLinks.forEach((link, i) => {
      link.addEventListener('click', e => {
        e.preventDefault();
        showModal(i);
      });
    });
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', showPrev);
    nextBtn.addEventListener('click', showNext);
    document.addEventListener('keydown', e => {
      if (modal.style.display !== 'flex') return;
      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    });
  }
  // Run after DOM is ready
  if (document.querySelector('.gallery-grid')) {
    setupGalleryLightbox();
  }

  // Insight Modal & Slider Logic
  function setupInsightModals() {
    const viewBtns = document.querySelectorAll('.insight-view-btn');
    const modals = document.querySelectorAll('.insight-modal');
    const body = document.body;
    viewBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const modalId = this.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
          modals.forEach(m => m.classList.remove('active'));
          modal.classList.add('active');
          body.style.overflow = 'hidden';
          // Start slider at first slide
          const slides = modal.querySelectorAll('.insight-slide');
          slides.forEach((s, i) => s.classList.toggle('active', i === 0));
          modal.setAttribute('data-current', 0);
        }
      });
    });
    // Close modal logic
    document.querySelectorAll('.insight-modal-close').forEach(closeBtn => {
      closeBtn.addEventListener('click', function() {
        this.closest('.insight-modal').classList.remove('active');
        body.style.overflow = '';
      });
    });
    // Close modal on outside click
    modals.forEach(modal => {
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          modal.classList.remove('active');
          body.style.overflow = '';
        }
      });
    });
    // Slider controls
    document.querySelectorAll('.insight-slider-controls').forEach(ctrls => {
      const modal = ctrls.closest('.insight-modal');
      const slides = modal.querySelectorAll('.insight-slide');
      const prevBtn = ctrls.querySelector('.insight-slider-prev');
      const nextBtn = ctrls.querySelector('.insight-slider-next');
      function showSlide(idx) {
        slides.forEach((s, i) => s.classList.toggle('active', i === idx));
        modal.setAttribute('data-current', idx);
      }
      prevBtn.addEventListener('click', function() {
        let idx = parseInt(modal.getAttribute('data-current')) || 0;
        idx = (idx - 1 + slides.length) % slides.length;
        showSlide(idx);
      });
      nextBtn.addEventListener('click', function() {
        let idx = parseInt(modal.getAttribute('data-current')) || 0;
        idx = (idx + 1) % slides.length;
        showSlide(idx);
      });
    });
    // Keyboard support for modals
    document.addEventListener('keydown', function(e) {
      const openModal = document.querySelector('.insight-modal.active');
      if (!openModal) return;
      const slides = openModal.querySelectorAll('.insight-slide');
      let idx = parseInt(openModal.getAttribute('data-current')) || 0;
      if (e.key === 'Escape') {
        openModal.classList.remove('active');
        body.style.overflow = '';
      } else if (e.key === 'ArrowLeft') {
        idx = (idx - 1 + slides.length) % slides.length;
        slides.forEach((s, i) => s.classList.toggle('active', i === idx));
        openModal.setAttribute('data-current', idx);
      } else if (e.key === 'ArrowRight') {
        idx = (idx + 1) % slides.length;
        slides.forEach((s, i) => s.classList.toggle('active', i === idx));
        openModal.setAttribute('data-current', idx);
      }
    });
  }
  // Run after DOM is ready (footer loaded)
  if (document.getElementById('footer-include')) {
    const observer4 = new MutationObserver(() => {
      setupInsightModals();
    });
    observer4.observe(document.getElementById('footer-include'), { childList: true });
  } else {
    setupInsightModals();
  }
}); 