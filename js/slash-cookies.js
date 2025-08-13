// Cookie Policy page JavaScript for Stickman Slash

// Initialize the page when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  loadHeaderFooter();
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
