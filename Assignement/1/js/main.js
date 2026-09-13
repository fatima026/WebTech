/* ==========================================================================
   BookHaven — main.js
   Handles: loading shared header/nav/footer, mobile menu toggle,
   active nav link, book filtering + "add to cart" buttons,
   about page accordion, gallery carousel + modal, contact form validation.
   ========================================================================== */

/* ---------- 1. Load shared header, nav and footer into every page ----------
   Each page has three empty containers with these IDs. We fetch the small
   HTML fragments and drop them in, so we don't repeat the same markup
   in every file. */
function loadIncludes() {
  const includes = [
    { id: 'header-placeholder', file: 'components/header.html' },
    { id: 'nav-placeholder', file: 'components/nav.html' },
    { id: 'footer-placeholder', file: 'components/footer.html' }
  ];

  includes.forEach(item => {
    const target = document.getElementById(item.id);
    if (!target) return;

    fetch(item.file)
      .then(response => response.text())
      .then(html => {
        target.innerHTML = html;
        // Once the nav is actually in the page, wire up its behaviour
        if (item.id === 'nav-placeholder') {
          setupNav();
        }
      });
  });
}

/* ---------- 2. Mobile hamburger menu + highlight the current page link ---------- */
function setupNav() {
  const toggleBtn = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  // Open/close the mobile dropdown menu
  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Mark the link matching the current page as "active" (adds underline)
  const currentPage = document.body.dataset.page;
  const links = navLinks.querySelectorAll('a');
  links.forEach(link => {
    if (link.dataset.page === currentPage) {
      link.classList.add('active');
    }
  });
}

/* ---------- 3. Books page: category filter + add-to-cart buttons ---------- */
function setupBookFiltering() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const bookCards = document.querySelectorAll('.book-card');
  if (filterButtons.length === 0) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Reset all buttons, then mark this one as active
      filterButtons.forEach(b => b.classList.remove('active'));
      button.classList.add('active');

      const category = button.dataset.category;

      // Show only books that match the chosen category ("all" shows everything)
      bookCards.forEach(card => {
        const matches = category === 'all' || card.dataset.category === category;
        card.style.display = matches ? 'block' : 'none';
      });
    });
  });
}

function setupAddToCart() {
  const addButtons = document.querySelectorAll('.add-btn');

  addButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Simple visual feedback: swap the label and lock the button briefly
      button.textContent = 'Added ✓';
      button.classList.add('added');
      button.disabled = true;

      setTimeout(() => {
        button.textContent = 'Add to cart';
        button.classList.remove('added');
        button.disabled = false;
      }, 1500);
    });
  });
}

/* ---------- 4. About page: FAQ accordion ---------- */
function setupAccordion() {
  const items = document.querySelectorAll('.accordion-item');
  if (items.length === 0) return;

  items.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close any other open item so only one answer shows at a time
      items.forEach(other => other.classList.remove('open'));

      // Re-open this one only if it was closed before the click
      if (!isOpen) item.classList.add('open');
    });
  });
}

/* ---------- 5. Gallery page: image carousel + click-to-enlarge modal ---------- */
function setupCarousel() {
  const track = document.getElementById('carouselTrack');
  if (!track) return;

  const slides = track.children;
  let currentIndex = 0;

  function goToSlide(index) {
    // Wrap around so "next" from the last slide returns to the first
    currentIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  document.getElementById('prevSlide').addEventListener('click', () => goToSlide(currentIndex - 1));
  document.getElementById('nextSlide').addEventListener('click', () => goToSlide(currentIndex + 1));
}

function setupGalleryModal() {
  const galleryItems = document.querySelectorAll('.gallery-item');
  const overlay = document.getElementById('modalOverlay');
  if (!overlay) return;

  const modalTitle = document.getElementById('modalTitle');
  const modalText = document.getElementById('modalText');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      // Pull the caption straight from the clicked thumbnail's data attribute
      modalTitle.textContent = item.dataset.title;
      modalText.textContent = item.dataset.desc;
      overlay.classList.add('visible');
    });
  });

  document.getElementById('modalClose').addEventListener('click', () => {
    overlay.classList.remove('visible');
  });

  // Also close the modal if the dark backdrop itself is clicked
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) overlay.classList.remove('visible');
  });
}

/* ---------- 6. Contact page: client-side form validation ---------- */
function setupContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // stop the page from reloading (no backend to send to)

    let formIsValid = true;

    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const messageField = document.getElementById('message');

    // Name: just needs to be non-empty
    formIsValid = validateField(nameField, nameField.value.trim().length > 0) && formIsValid;

    // Email: basic pattern check for something@something.something
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    formIsValid = validateField(emailField, emailPattern.test(emailField.value.trim())) && formIsValid;

    // Message: require at least 10 characters so it's not empty/junk
    formIsValid = validateField(messageField, messageField.value.trim().length >= 10) && formIsValid;

    const successBanner = document.getElementById('formSuccess');

    if (formIsValid) {
      successBanner.classList.add('visible');
      form.reset();
      // Hide the success message again after a few seconds
      setTimeout(() => successBanner.classList.remove('visible'), 4000);
    } else {
      successBanner.classList.remove('visible');
    }
  });
}

// Adds/removes the "invalid" class on a field's wrapper based on a condition,
// returning true/false so the caller can track overall form validity
function validateField(field, isValid) {
  const wrapper = field.closest('.form-group');
  wrapper.classList.toggle('invalid', !isValid);
  return isValid;
}

/* ---------- Run everything once the page has loaded ---------- */
document.addEventListener('DOMContentLoaded', () => {
  loadIncludes();
  setupBookFiltering();
  setupAddToCart();
  setupAccordion();
  setupCarousel();
  setupGalleryModal();
  setupContactForm();
});
