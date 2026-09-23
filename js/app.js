/**
 * Mountain View Luxury Landing Page - properties-e
 * High-Conversion Interactive JavaScript & Live Zapier Webhook Integration
 */

// ============================================================================
// CONFIGURATION & ZAPIER WEBHOOK
// ============================================================================
const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/25429357/uclzmpn/';

const WHATSAPP_PHONE = '01033373331';
const WHATSAPP_INTL = '201033373331';

document.addEventListener('DOMContentLoaded', () => {
  initFormHandler();
  initProjectFormTriggers();
  initScrollAnimations();
  initModal();
});

/**
 * Handle lead capture form submission to Zapier
 */
function initFormHandler() {
  const form = document.getElementById('lead-form');
  if (!form) return;

  const submitBtn = form.querySelector('.btn-submit');
  const phoneInput = form.querySelector('input[name="phoneNumber"]');
  const countrySelect = form.querySelector('select[name="countryCode"]');
  const formSuccessBox = document.getElementById('form-success-box');

  // Format phone input nicely (digits only)
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const fullName = (formData.get('fullName') || '').toString().trim();
    const rawPhone = (formData.get('phoneNumber') || '').toString().trim();
    const countryCode = countrySelect ? countrySelect.value : '+20';

    // Validation
    if (!fullName || fullName.length < 2) {
      alert('Please enter your full name.');
      return;
    }

    if (!rawPhone || rawPhone.length < 7) {
      alert('Please enter a valid mobile number.');
      return;
    }

    // Strip leading 0 if present and country code is attached
    let sanitizedPhone = rawPhone;
    if (sanitizedPhone.startsWith('0')) {
      sanitizedPhone = sanitizedPhone.substring(1);
    }
    const fullPhoneNumber = `${countryCode}${sanitizedPhone}`;

    // Set Loading State
    if (submitBtn) {
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
    }

    // Extract URL query params for marketing tracking (UTM tags)
    const urlParams = new URLSearchParams(window.location.search);
    const utm_source = urlParams.get('utm_source') || '';
    const utm_medium = urlParams.get('utm_medium') || '';
    const utm_campaign = urlParams.get('utm_campaign') || '';

    // Prepare Webhook Payload matching Zapier requirements
    const data = {
      fullName: fullName,
      phoneNumber: fullPhoneNumber,
      landingPageUrl: window.location.href,
      submissionDate: new Date().toISOString(),
      countryCode: countryCode,
      consultancy: 'properties-e',
      utm_source: utm_source,
      utm_medium: utm_medium,
      utm_campaign: utm_campaign
    };

    try {
      // POST to Zapier Webhook
      await fetch(ZAPIER_WEBHOOK_URL, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      // Show in-form success state
      if (formSuccessBox) {
        form.style.display = 'none';
        formSuccessBox.style.display = 'block';
        const nameSpan = formSuccessBox.querySelector('.client-name');
        if (nameSpan) nameSpan.textContent = fullName;
      }

      // Google Tag Conversion Event
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', {
          event_category: 'engagement',
          event_label: 'Mountain View Lead Form'
        });
      }

      // Also trigger the luxury modal for high-engagement conversion
      showSuccessModal(fullName, fullPhoneNumber);
      form.reset();

    } catch (error) {
      console.error('Submission notification:', error);
      // Graceful fallback display
      if (formSuccessBox) {
        form.style.display = 'none';
        formSuccessBox.style.display = 'block';
      }
      showSuccessModal(fullName, fullPhoneNumber);
    } finally {
      if (submitBtn) {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
      }
    }
  });
}

/**
 * Quick-action: clicking "Request Floor Plans & Prices" on any project card
 * scrolls directly to the form and focuses the name input
 */
function initProjectFormTriggers() {
  const triggerBtns = document.querySelectorAll('.trigger-project-form');
  const formCard = document.querySelector('.lead-card');
  const nameInput = document.getElementById('fullName');

  triggerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (formCard) {
        formCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
        formCard.classList.add('highlight-form');
        if (nameInput) {
          setTimeout(() => nameInput.focus(), 600);
        }
        setTimeout(() => {
          formCard.classList.remove('highlight-form');
        }, 1500);
      }
    });
  });
}

/**
 * Success modal display with instant WhatsApp follow-up CTA
 */
function showSuccessModal(name, phone) {
  const modal = document.getElementById('success-modal');
  if (!modal) return;

  const modalName = modal.querySelector('.user-name-display');
  if (modalName) {
    modalName.textContent = name;
  }

  const waBtn = modal.querySelector('.btn-modal-wa');
  if (waBtn) {
    const encodedMsg = encodeURIComponent(`Hello properties-e, I just submitted an inquiry for Mountain View residences. My name is ${name} (${phone}).`);
    waBtn.href = `https://wa.me/${WHATSAPP_INTL}?text=${encodedMsg}`;
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function initModal() {
  const modal = document.getElementById('success-modal');
  if (!modal) return;

  const closeBtns = modal.querySelectorAll('.close-modal-trigger');
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

/**
 * Subtle Scroll reveal animations
 */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-up');
  if (!elements.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    elements.forEach(el => observer.observe(el));
  } else {
    elements.forEach(el => el.classList.add('visible'));
  }
}
