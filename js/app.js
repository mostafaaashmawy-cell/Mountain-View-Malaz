/**
 * Mountain View Luxury Landing Page - properties-e
 * Interactive JavaScript & Zapier Webhook Integration
 */

// ============================================================================
// CONFIGURATION
// ============================================================================
// Replace the URL below with your Zapier "Catch Hook" Webhook URL:
const ZAPIER_WEBHOOK_URL = 'https://hooks.zapier.com/hooks/catch/XXXXXX/YYYYYY/';

const WHATSAPP_PHONE = '01033373331';
const WHATSAPP_INTL = '201033373331';

document.addEventListener('DOMContentLoaded', () => {
  initFormHandler();
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
  const phoneInput = form.querySelector('input[name="phone"]');

  // Format phone input nicely
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      // Keep only numbers
      e.target.value = e.target.value.replace(/[^0-9]/g, '');
    });
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fullName = form.querySelector('input[name="fullName"]').value.trim();
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const projectSelect = form.querySelector('select[name="project"]');
    const project = projectSelect ? projectSelect.value : 'Mountain View General Inquiry';

    // Basic Validation
    if (!fullName || fullName.length < 2) {
      alert('Please enter your full name.');
      return;
    }

    if (!phone || phone.length < 9) {
      alert('Please enter a valid phone number (e.g. 01033373331).');
      return;
    }

    // Set Loading State
    if (submitBtn) {
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
    }

    // Extract URL query params for marketing tracking (UTM tags)
    const urlParams = new URLSearchParams(window.location.search);
    const trackingData = {
      utm_source: urlParams.get('utm_source') || '',
      utm_medium: urlParams.get('utm_medium') || '',
      utm_campaign: urlParams.get('utm_campaign') || '',
      utm_content: urlParams.get('utm_content') || '',
      utm_term: urlParams.get('utm_term') || ''
    };

    // Prepare Webhook Payload
    const payload = {
      fullName: fullName,
      phone: phone,
      formattedPhone: phone.startsWith('0') ? `+20${phone.substring(1)}` : phone,
      project: project,
      consultancy: 'properties-e',
      submissionDate: new Date().toISOString(),
      submissionDateFormatted: new Date().toLocaleString('en-US', { timeZone: 'Africa/Cairo' }),
      pageUrl: window.location.href,
      referrer: document.referrer || 'Direct',
      ...trackingData
    };

    try {
      // Check if Zapier Webhook is configured
      const isPlaceholder = ZAPIER_WEBHOOK_URL.includes('XXXXXX');
      
      if (!isPlaceholder) {
        // Send payload to Zapier webhook
        await fetch(ZAPIER_WEBHOOK_URL, {
          method: 'POST',
          mode: 'no-cors', // Standard for Zapier webhook endpoints to prevent browser CORS blocks
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
      } else {
        console.info('Zapier Webhook is in simulation mode (placeholder URL). Payload dispatched:', payload);
        // Simulate small network delay for smooth UX
        await new Promise(resolve => setTimeout(resolve, 600));
      }

      // Success feedback
      showSuccessModal(fullName, project);
      form.reset();

    } catch (error) {
      console.error('Error submitting form to Zapier:', error);
      // Even in case of network variance, show confirmation and provide instant WhatsApp fallback
      showSuccessModal(fullName, project);
    } finally {
      if (submitBtn) {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
      }
    }
  });
}

/**
 * Success modal display
 */
function showSuccessModal(name, project) {
  const modal = document.getElementById('success-modal');
  if (!modal) return;

  const modalName = modal.querySelector('.user-name-display');
  if (modalName) {
    modalName.textContent = name;
  }

  const waBtn = modal.querySelector('.btn-modal-wa');
  if (waBtn) {
    const encodedMsg = encodeURIComponent(`Hello properties-e, I just submitted an inquiry for ${project}. My name is ${name}.`);
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
