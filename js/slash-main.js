// Main JavaScript for Stickman Slash
let enemyPool = [];
let weaponCache = [];
let testimonialData = [];

// Initialize the page when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  executeSlashStrike();
  loadHeaderFooter();
  spawnEnemyWave();
  initializeAnchorNavigation();
});

// Initialize anchor navigation for cross-page linking
function initializeAnchorNavigation() {
  // Handle anchor links in navigation
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("nav-link")) {
      const href = e.target.getAttribute("href");

      // Check if it's an anchor link (starts with #)
      if (href && href.startsWith("#")) {
        e.preventDefault();

        // If we're not on the main page, redirect to root with anchor
        if (
          window.location.pathname !== "/" &&
          !window.location.pathname.endsWith("index.html")
        ) {
          window.location.href = "/" + href;
        } else {
          // If we're already on the main page, scroll to the section
          const targetElement = document.querySelector(href);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }
      }
    }
  });
}

// Load header and footer dynamically
async function loadHeaderFooter() {
  try {
    const headerResponse = await fetch("slash-header.html");
    const footerResponse = await fetch("blade-footer.html");

    if (headerResponse.ok) {
      const headerContent = await headerResponse.text();
      document.getElementById("header-container").innerHTML = headerContent;
      initializeMobileMenu();
      initializeAnchorNavigation();
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

// Load main content from JSON
async function executeSlashStrike() {
  try {
    const response = await fetch("data/main-content.json");
    if (response.ok) {
      const data = await response.json();
      testimonialData = data.testimonials;
      weaponCache = data.weapons;

      renderTestimonials();
      renderWeapons();
    }
  } catch (error) {
    console.error("Error loading main content:", error);
  }
}

// Render testimonials section
function renderTestimonials() {
  const container = document.getElementById("testimonials");
  if (!container) return;

  container.innerHTML = testimonialData
    .map(
      (testimonial) => `
        <div class="testimonial-card">
            <div class="testimonial-avatar">${testimonial.avatar}</div>
            <div class="testimonial-content">
                <h3 class="testimonial-name">${testimonial.name}</h3>
                <p class="testimonial-comment">${testimonial.comment}</p>
                <div class="testimonial-rating">
                    ${"⭐".repeat(testimonial.rating)}
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

// Render weapons section
function renderWeapons() {
  const container = document.getElementById("weapons");
  if (!container) return;

  container.innerHTML = weaponCache
    .map(
      (weapon) => `
        <div class="weapon-card">
            <div class="weapon-icon">${weapon.icon}</div>
            <div class="weapon-info">
                <h3 class="weapon-name">${weapon.name}</h3>
                <p class="weapon-description">${weapon.description}</p>
                <div class="weapon-stats">
                    <span class="stat damage">Damage: ${weapon.damage}</span>
                    <span class="stat speed">Speed: ${weapon.speed}</span>
                </div>
                <div class="weapon-rarity ${weapon.rarity.toLowerCase()}">${
        weapon.rarity
      }</div>
            </div>
        </div>
    `
    )
    .join("");
}

// Spawn enemy wave for visual effects
function spawnEnemyWave() {
  // Create floating particles for visual effect
  const heroSection = document.querySelector(".hero-arena");
  if (heroSection) {
    for (let i = 0; i < 5; i++) {
      createFloatingParticle(heroSection);
    }
  }
}

// Create floating particle effect
function createFloatingParticle(container) {
  const particle = document.createElement("div");
  particle.className = "floating-particle";
  particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--blade-red);
        border-radius: 50%;
        opacity: 0.6;
        pointer-events: none;
        animation: floatParticle 8s linear infinite;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
    `;

  container.appendChild(particle);

  // Remove particle after animation
  setTimeout(() => {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle);
    }
  }, 8000);
}

// Launch game function
function launchGame() {
  // Simulate game launch
  const button = event.target;
  button.textContent = "Launching...";
  button.disabled = true;

  setTimeout(() => {
    button.textContent = "Game Launched!";
    setTimeout(() => {
      button.textContent = "Play Now";
      button.disabled = false;
    }, 2000);
  }, 1000);

  // Add launch effect
  button.style.transform = "scale(1.1)";
  button.style.boxShadow = "0 0 30px rgba(220, 38, 38, 0.8)";

  setTimeout(() => {
    button.style.transform = "scale(1)";
    button.style.boxShadow = "0 8px 25px rgba(220, 38, 38, 0.4)";
  }, 300);
}

// Add CSS for floating particles
const style = document.createElement("style");
style.textContent = `
    @keyframes floatParticle {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.6;
        }
        50% {
            opacity: 0.3;
        }
        100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
        }
    }
    
    .testimonial-card {
        background: linear-gradient(135deg, var(--steel-blue) 0%, var(--impact-grey) 100%);
        padding: 1.5rem;
        border-radius: 15px;
        text-align: center;
        flex: 1;
        min-width: 280px;
        max-width: 350px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
        border: 2px solid transparent;
    }
    
    .testimonial-card:hover {
        transform: translateY(-5px);
        border-color: var(--steel-blue);
        box-shadow: 0 15px 35px rgba(30, 64, 175, 0.3);
    }
    
    .testimonial-avatar {
        font-size: 2.5rem;
        margin-bottom: 0.8rem;
    }
    
    .testimonial-name {
        color: var(--light-steel);
        margin-bottom: 0.8rem;
        font-size: 1.1rem;
        font-weight: 700;
    }
    
    .testimonial-comment {
        margin-bottom: 0.8rem;
        line-height: 1.5;
        font-size: 0.95rem;
        color: var(--light-steel);
    }
    
    .testimonial-rating {
        color: var(--victory-gold);
        font-size: 1.1rem;
    }
    
    .weapon-card {
        background: linear-gradient(135deg, var(--steel-blue) 0%, var(--impact-grey) 100%);
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        flex: 1;
        min-width: 300px;
        max-width: 400px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease;
        border: 2px solid transparent;
        position: relative;
        overflow: hidden;
    }
    
    .weapon-card::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(
            45deg,
            transparent 0%,
            rgba(255, 255, 255, 0.1) 50%,
            transparent 100%
        );
        transform: translateX(-100%);
        transition: transform 0.6s ease;
    }
    
    .weapon-card:hover::before {
        transform: translateX(100%);
    }
    
    .weapon-card:hover {
        transform: translateY(-8px);
        border-color: var(--steel-blue);
        box-shadow: 0 15px 35px rgba(30, 64, 175, 0.4);
    }
    
    .weapon-icon {
        font-size: 3.5rem;
        margin-bottom: 1.5rem;
        filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
        transition: all 0.3s ease;
    }
    
    .weapon-card:hover .weapon-icon {
        transform: scale(1.1);
        filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.4));
    }
    
    .weapon-name {
        color: var(--light-steel);
        margin-bottom: 1rem;
        font-size: 1.3rem;
        font-weight: 800;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        transition: all 0.3s ease;
    }
    
    .weapon-card:hover .weapon-name {
        color: var(--victory-gold);
        text-shadow: 2px 2px 8px rgba(217, 119, 6, 0.6);
    }
    
    .weapon-description {
        margin-bottom: 1.5rem;
        line-height: 1.6;
        color: var(--light-steel);
        font-size: 0.95rem;
        opacity: 0.9;
        transition: all 0.3s ease;
    }
    
    .weapon-card:hover .weapon-description {
        opacity: 1;
        color: var(--light-steel);
    }
    
    .weapon-stats {
        display: flex;
        justify-content: space-around;
        margin-bottom: 1.5rem;
        gap: 0.5rem;
    }
    
    .stat {
        padding: 0.6rem 1rem;
        background: var(--shadow-dark);
        border-radius: 10px;
        font-size: 0.9rem;
        font-weight: 600;
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 0.3s ease;
    }
    
    .stat:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
    }
    
    .stat.damage {
        color: var(--defeat-red);
        background: linear-gradient(135deg, var(--shadow-dark) 0%, rgba(153, 27, 27, 0.2) 100%);
    }
    
    .stat.speed {
        color: var(--combat-orange);
        background: linear-gradient(135deg, var(--shadow-dark) 0%, rgba(234, 88, 12, 0.2) 100%);
    }
    
    .weapon-rarity {
        padding: 0.7rem 1.2rem;
        border-radius: 12px;
        font-weight: 700;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        transition: all 0.3s ease;
        border: 2px solid transparent;
    }
    
    .weapon-rarity:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    }
    
    .weapon-rarity.common {
        background: linear-gradient(135deg, var(--light-steel) 0%, #e5e7eb 100%);
        color: var(--shadow-dark);
        border-color: var(--light-steel);
    }
    
    .weapon-rarity.rare {
        background: linear-gradient(135deg, var(--steel-blue) 0%, #3b82f6 100%);
        color: white;
        border-color: var(--steel-blue);
    }
    
    .weapon-rarity.epic {
        background: linear-gradient(135deg, var(--combat-orange) 0%, #f97316 100%);
        color: white;
        border-color: var(--combat-orange);
    }
    
    .weapon-rarity.legendary {
        background: linear-gradient(135deg, var(--victory-gold) 0%, #f59e0b 100%);
        color: var(--shadow-dark);
        border-color: var(--victory-gold);
        animation: legendaryGlow 2s ease-in-out infinite alternate;
    }
    
    @keyframes legendaryGlow {
        from {
            box-shadow: 0 0 10px rgba(217, 119, 6, 0.5);
        }
        to {
            box-shadow: 0 0 20px rgba(217, 119, 6, 0.8), 0 0 30px rgba(217, 119, 6, 0.3);
        }
    }
`;
document.head.appendChild(style);

// Cookie Consent Bar Functionality
function initializeCookieConsent() {
  const cookieBar = document.getElementById("cookie-consent-bar");
  const acceptButton = document.getElementById("accept-cookies");

  // Check if user has already accepted cookies
  const cookiesAccepted = localStorage.getItem("cookiesAccepted");

  if (!cookiesAccepted && cookieBar && acceptButton) {
    // Show cookie bar after a short delay
    setTimeout(() => {
      cookieBar.classList.add("show");
    }, 1000);

    // Handle accept button click
    acceptButton.addEventListener("click", function () {
      // Save to localStorage
      localStorage.setItem("cookiesAccepted", "true");

      // Hide cookie bar with animation
      cookieBar.classList.remove("show");

      // Remove from DOM after animation
      setTimeout(() => {
        cookieBar.remove();
      }, 500);
    });
  } else if (cookiesAccepted && cookieBar) {
    // Remove cookie bar if already accepted
    cookieBar.remove();
  }
}

// Initialize cookie consent when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initializeCookieConsent();
});
