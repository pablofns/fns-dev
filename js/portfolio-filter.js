/**
 * Portfolio Filtering & Project Modal Inspector
 */
(function() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  const modalBackdrop = document.getElementById('project-modal');
  const modalCloseBtn = document.querySelector('.modal-close-btn');

  // Modal elements
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalDesc = document.getElementById('modal-desc');
  const modalStack = document.getElementById('modal-stack');
  const modalHighlights = document.getElementById('modal-highlights');
  const modalLiveLink = document.getElementById('modal-live-link');
  const modalCodeLink = document.getElementById('modal-code-link');

  // Filter functionality
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filterValue === 'all' || category.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px) scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // Modal trigger
  projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't trigger modal if user clicked directly on external link icons
      if (e.target.closest('.project-link-btn')) return;

      const title = card.querySelector('.project-title').textContent;
      const category = card.querySelector('.project-category-tag').textContent;
      const desc = card.querySelector('.project-description').textContent;
      const techBadges = card.querySelectorAll('.tech-badge');
      const liveUrl = card.getAttribute('data-live') || '#';
      const codeUrl = card.getAttribute('data-github') || '#';
      const highlights = card.getAttribute('data-highlights') || '';

      if (modalTitle) modalTitle.textContent = title;
      if (modalCategory) modalCategory.textContent = category;
      if (modalDesc) modalDesc.textContent = desc;
      if (modalLiveLink) modalLiveLink.href = liveUrl;
      if (modalCodeLink) modalCodeLink.href = codeUrl;

      if (modalStack) {
        modalStack.innerHTML = '';
        techBadges.forEach(badge => {
          const clone = badge.cloneNode(true);
          modalStack.appendChild(clone);
        });
      }

      if (modalHighlights && highlights) {
        modalHighlights.innerHTML = highlights.split('|').map(item => `<li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg> ${item}</li>`).join('');
      }

      if (modalBackdrop) {
        modalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  function closeModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
})();
