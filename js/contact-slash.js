// Contact page JavaScript for Stickman Slash
let contactFormData = {};

// Initialize the page when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  loadHeaderFooter();
  initializeContactForm();
  loadContactInfo();
});

// Load header and footer dynamically
async function loadHeaderFooter() {
  try {
    const headerResponse = await fetch("slash-header.html");
    const footerResponse = await fetch("blade-footer.html");

    if (headerResponse.ok) {
      const headerContent = await headerResponse.text();
      document.getElementById("header-container").innerHTML = headerContent;
      initializeMobileMenu();
    }

    if (footerResponse.ok) {
      const footerContent = await footerResponse.text();
      document.getElementById("footer-container").innerHTML = footerContent;
      updateCopyrightYear();
    }
  } catch (error) {
    console.error("Error loading header/footer:", error);
  }
}

// Initialize mobile menu functionality
function initializeMobileMenu() {
  const burgerButton = document.getElementById("burgerMenu");
  const mobileMenu = document.getElementById("mobileMenu");

  if (burgerButton && mobileMenu) {
    burgerButton.addEventListener("click", function () {
      mobileMenu.classList.toggle("active");

      // Animate burger lines
      const lines = burgerButton.querySelectorAll(".burger-line");
      lines.forEach((line, index) => {
        if (mobileMenu.classList.contains("active")) {
          line.style.transform = `rotate(${45 + index * 90}deg)`;
        } else {
          line.style.transform = "rotate(0deg)";
        }
      });
    });
  }
}

// Update copyright year
function updateCopyrightYear() {
  const yearElement = document.getElementById("currentYear");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

// Initialize contact form
function initializeContactForm() {
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", handleFormSubmit);

    // Add input event listeners for real-time validation
    const inputs = form.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.addEventListener("input", validateField);
      input.addEventListener("blur", validateField);
    });
  }
}

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault();

  if (validateForm()) {
    submitForm();
  }
}

// Validate individual field
function validateField(event) {
  const field = event.target;
  const value = field.value.trim();
  const fieldName = field.name;

  // Remove existing error styling
  field.classList.remove("error");
  const errorElement = document.getElementById(`${fieldName}-error`);
  if (errorElement) {
    errorElement.textContent = "";
  }

  let isValid = true;
  let errorMessage = "";

  // Simple validation - just check if field is filled
  if (!value) {
    isValid = false;
    errorMessage = "This field is required";
  }

  if (!isValid) {
    field.classList.add("error");
    if (errorElement) {
      errorElement.textContent = errorMessage;
    }
  }

  return isValid;
}

// Validate entire form
function validateForm() {
  const form = document.getElementById("contactForm");
  const inputs = form.querySelectorAll("input, textarea");
  let isValid = true;

  inputs.forEach((input) => {
    if (!validateField({ target: input })) {
      isValid = false;
    }
  });

  return isValid;
}

// Submit form
function submitForm() {
  const form = document.getElementById("contactForm");
  const submitButton = form.querySelector(".submit-button");

  // Show processing overlay with countdown
  showProcessingOverlay();

  // Simulate form submission with countdown
  let countdown = 3;
  const countdownInterval = setInterval(() => {
    countdown--;
    updateCountdown(countdown);

    if (countdown <= 0) {
      clearInterval(countdownInterval);
      hideProcessingOverlay();

      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });

      // Show notification with progress bar
      setTimeout(() => {
        showNotificationWithProgress();
      }, 500);

      // Reset form
      form.reset();
      submitButton.textContent = "Send Message";
      submitButton.disabled = false;
    }
  }, 1000);
}

// Show processing overlay
function showProcessingOverlay() {
  const overlay = document.createElement("div");
  overlay.className = "processing-overlay";
  overlay.innerHTML = `
    <div class="processing-content">
      <div class="processing-spinner"></div>
      <h3>Processing...</h3>
      <div class="countdown">3</div>
    </div>
  `;
  document.body.appendChild(overlay);
}

// Update countdown
function updateCountdown(count) {
  const countdownElement = document.querySelector(".countdown");
  if (countdownElement) {
    countdownElement.textContent = count;
  }
}

// Hide processing overlay
function hideProcessingOverlay() {
  const overlay = document.querySelector(".processing-overlay");
  if (overlay) {
    overlay.classList.add("fade-out");
    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    }, 300);
  }
}

// Show notification with progress bar
function showNotificationWithProgress() {
  const notification = document.createElement("div");
  notification.className = "notification-slide";
  notification.innerHTML = `
    <div class="notification-content">
      <div class="notification-text">
        <h4>Success!</h4>
        <p>Message sent successfully! We'll get back to you soon.</p>
      </div>
      <div class="progress-bar">
        <div class="progress-fill"></div>
      </div>
    </div>
  `;

  document.body.appendChild(notification);

  // Animate progress bar for disappearance
  const progressFill = notification.querySelector(".progress-fill");

  // Start progress bar animation
  setTimeout(() => {
    progressFill.style.width = "100%";
  }, 100);

  // Remove notification after progress completes
  setTimeout(() => {
    notification.classList.add("slide-out");
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Load contact information
function loadContactInfo() {
  // Contact info is already in HTML, but we could load it from JSON if needed
  console.log("Contact information loaded");
}

// Add CSS for form validation and success messages
const style = document.createElement("style");
style.textContent = `
    .form-group input.error,
    .form-group textarea.error {
        border-color: var(--defeat-red);
        box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.2);
    }
    
    .form-group input:focus.error,
    .form-group textarea:focus.error {
        border-color: var(--defeat-red);
        box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.3);
    }
    
    .error-message {
        color: var(--defeat-red);
        font-size: 0.8rem;
        margin-top: 0.5rem;
        display: block;
    }
    
    /* Processing Overlay */
    .processing-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 1;
        transition: opacity 0.3s ease;
    }
    
    .processing-overlay.fade-out {
        opacity: 0;
    }
    
    .processing-content {
        text-align: center;
        color: white;
    }
    
    .processing-spinner {
        width: 60px;
        height: 60px;
        border: 4px solid rgba(255, 255, 255, 0.3);
        border-top: 4px solid var(--victory-gold);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 2rem;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .processing-content h3 {
        font-size: 1.5rem;
        margin-bottom: 1rem;
        color: var(--light-steel);
    }
    
    .countdown {
        font-size: 3rem;
        font-weight: bold;
        color: var(--victory-gold);
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    }
    
    /* Notification */
    .notification-slide {
        position: fixed;
        top: 20px;
        right: -400px;
        width: 350px;
        background: linear-gradient(135deg, var(--victory-gold), var(--combat-orange));
        color: white;
        border-radius: 10px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        z-index: 9998;
        animation: slideInRight 0.5s ease-out forwards;
        overflow: hidden;
    }
    
    .notification-slide.slide-out {
        animation: slideOutRight 0.3s ease-in forwards;
    }
    
    @keyframes slideInRight {
        to {
            right: 20px;
        }
    }
    
    @keyframes slideOutRight {
        to {
            right: -400px;
        }
    }
    
         .notification-content {
         padding: 1.5rem;
     }
     
     .notification-text h4 {
        margin: 0 0 0.5rem 0;
        font-size: 1.2rem;
        font-weight: 600;
    }
    
    .notification-text p {
        margin: 0 0 1rem 0;
        font-size: 0.9rem;
        opacity: 0.9;
    }
    
    .progress-bar {
        width: 100%;
        height: 4px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 2px;
        overflow: hidden;
    }
    
    .progress-fill {
        height: 100%;
        background: white;
        width: 0%;
        transition: width 3s linear;
    }
    
    .battle-command-center {
        margin-bottom: 4rem;
    }
    
    .command-center-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        align-items: start;
    }
    
    .battle-intel-section {
        background: linear-gradient(135deg, var(--steel-blue) 0%, var(--impact-grey) 100%);
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        border: 2px solid transparent;
        transition: all 0.3s ease;
    }
    
    .battle-intel-section:hover {
        transform: translateY(-5px);
        border-color: var(--steel-blue);
        box-shadow: 0 15px 35px rgba(30, 64, 175, 0.3);
    }
    
    .intel-title {
        color: var(--light-steel);
        font-size: 1.4rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        text-align: center;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }
    
    .intel-details {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
    
    .intel-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 0.3s ease;
    }
    
    .intel-item:hover {
        transform: translateX(5px);
        background: rgba(0, 0, 0, 0.5);
        border-color: var(--victory-gold);
    }
    
    .intel-icon {
        font-size: 1.5rem;
        background: var(--blade-red);
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        transition: all 0.3s ease;
    }
    
    .intel-item:hover .intel-icon {
        transform: scale(1.1) rotate(5deg);
        background: var(--blood-crimson);
    }
    
    .intel-item h4 {
        color: var(--victory-gold);
        font-size: 1.1rem;
        font-weight: 600;
        margin: 0 0 0.5rem 0;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
    }
    
    .intel-item p {
        color: var(--light-steel);
        margin: 0;
        font-size: 0.95rem;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
    }
    
    .battle-map-section {
        background: linear-gradient(135deg, var(--impact-grey) 0%, var(--slash-vibe) 100%);
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        border: 2px solid transparent;
        transition: all 0.3s ease;
    }
    
    .battle-map-section:hover {
        transform: translateY(-5px);
        border-color: var(--combat-orange);
        box-shadow: 0 15px 35px rgba(251, 146, 60, 0.3);
    }
    
    .map-title {
        color: var(--light-steel);
        font-size: 1.4rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        text-align: center;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    }
    
    .battle-map-container {
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
        transition: all 0.3s ease;
    }
    
    .battle-map-container:hover {
        transform: scale(1.02);
        box-shadow: 0 12px 35px rgba(0, 0, 0, 0.6);
    }
    
    .battle-map-container iframe {
        display: block;
        transition: all 0.3s ease;
    }
    
    @media (max-width: 768px) {
        .command-center-container {
            grid-template-columns: 1fr;
            gap: 2rem;
        }
        
        .battle-intel-section,
        .battle-map-section {
            padding: 1.5rem;
        }
        
        .intel-item {
            padding: 0.8rem;
        }
        
        .intel-icon {
            width: 40px;
            height: 40px;
            font-size: 1.2rem;
        }
        
        .intel-title,
        .map-title {
            font-size: 1.2rem;
        }
    }
    
    @media (max-width: 480px) {
        .battle-intel-section,
        .battle-map-section {
            padding: 1rem;
        }
        
        .intel-item {
            flex-direction: column;
            text-align: center;
            gap: 0.8rem;
        }
        
        .intel-icon {
            width: 45px;
            height: 45px;
        }
        
        .intel-title,
        .map-title {
            font-size: 1.1rem;
        }
    }
`;
document.head.appendChild(style);
