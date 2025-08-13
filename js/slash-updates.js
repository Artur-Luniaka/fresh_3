// Updates page JavaScript for Stickman Slash
let battleUpdatesData = [];
let chronicleData = [];

// Initialize the page when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  loadHeaderFooter();
  loadUpdatesContent();
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

// Load updates content from JSON
async function loadUpdatesContent() {
  try {
    const response = await fetch("data/updates-content.json");
    if (response.ok) {
      const data = await response.json();
      battleUpdatesData = data.battleUpdates;
      chronicleData = data.chronicles;

      renderBattleUpdates();
      renderBattleChronicles();
    }
  } catch (error) {
    console.error("Error loading updates content:", error);
  }
}

// Render battle updates section
function renderBattleUpdates() {
  const container = document.getElementById("battle-updates");
  if (!container) return;

  container.innerHTML = battleUpdatesData
    .map(
      (update) => `
        <div class="battle-update-card" data-update-id="${update.id}">
            <div class="battle-update-header">
                <div class="battle-update-version">${update.version}</div>
                <div class="battle-update-type ${update.type
                  .toLowerCase()
                  .replace(" ", "-")}">${update.type}</div>
            </div>
                         <h3 class="battle-update-title">
                 ${update.title}
                 <span class="expand-indicator">📋</span>
             </h3>
            <div class="battle-update-summary">${update.summary}</div>
            <div class="battle-update-date">${formatDate(update.date)}</div>
                         <ul class="battle-update-changes">
                 ${update.changes
                   .map((change) => `<li>${change}</li>`)
                   .join("")}
             </ul>
                           <div class="battle-update-expand-button">
                  <span class="expand-button-text">More Info</span>
                  <span class="expand-button-icon">▼</span>
              </div>
             <div class="battle-update-expanded" style="display: none;">
                <div class="battle-update-detailed">
                    <h4>Detailed Changes:</h4>
                    <ul class="battle-update-detailed-changes">
                        ${update.detailedChanges
                          .map((change) => `<li>${change}</li>`)
                          .join("")}
                    </ul>
                </div>
                <div class="battle-update-developer-notes">
                    <h4>Developer Notes:</h4>
                    <p>${update.developerNotes}</p>
                </div>
            </div>
        </div>
    `
    )
    .join("");

  // Add click event listeners to cards
  addBattleUpdateCardListeners();
}

// Render battle chronicles section
function renderBattleChronicles() {
  const container = document.getElementById("chronicles");
  if (!container) return;

  container.innerHTML = chronicleData
    .map(
      (chronicle) => `
        <div class="chronicle-card">
            <div class="chronicle-header">
                <h3 class="chronicle-title">${chronicle.title}</h3>
                <div class="chronicle-category ${chronicle.category
                  .toLowerCase()
                  .replace(" ", "-")}">${chronicle.category}</div>
            </div>
            <div class="chronicle-meta">
                <span class="chronicle-player">By ${chronicle.player}</span>
                <span class="chronicle-date">${formatDate(
                  chronicle.date
                )}</span>
            </div>
            <p class="chronicle-story">${chronicle.story}</p>
        </div>
    `
    )
    .join("");
}

// Format date for display
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Add click event listeners to battle update cards
function addBattleUpdateCardListeners() {
  const cards = document.querySelectorAll(".battle-update-card");
  cards.forEach((card) => {
    card.addEventListener("click", function () {
      const expandedContent = this.querySelector(".battle-update-expanded");
      const expandButton = this.querySelector(".battle-update-expand-button");
      const expandIcon = expandButton.querySelector(".expand-button-icon");
      const expandText = expandButton.querySelector(".expand-button-text");
      const isExpanded = expandedContent.style.display !== "none";

      if (isExpanded) {
        expandedContent.style.display = "none";
        this.classList.remove("expanded");
        expandIcon.textContent = "▼";
        expandText.textContent = "More Info";
      } else {
        expandedContent.style.display = "block";
        this.classList.add("expanded");
        expandIcon.textContent = "▲";
        expandText.textContent = "Less Info";
      }
    });
  });
}
// Add CSS for battle updates and chronicles
const style = document.createElement("style");
style.textContent = `
    .updates-hero {
        margin-bottom: 4rem;
        text-align: center;
    }
    
    .battle-updates {
        margin-bottom: 4rem;
    }
    
    .battle-updates-container {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
    
    .battle-update-card {
        background: linear-gradient(135deg, var(--impact-grey) 0%, var(--slash-vibe) 100%);
        padding: 2rem;
        border-radius: 15px;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
        transition: all 0.4s ease;
        border: 2px solid transparent;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    
    .battle-update-card:hover {
        transform: translateY(-5px);
        border-color: var(--steel-blue);
        box-shadow: 0 15px 35px rgba(30, 64, 175, 0.3);
    }
    
         .battle-update-card.expanded {
         transform: translateY(-8px);
         box-shadow: 0 20px 40px rgba(30, 64, 175, 0.4);
         border-color: var(--victory-gold);
     }
     
     .battle-update-card.expanded .battle-update-expand-button {
         display: none;
     }
     
     .battle-update-card.expanded .expand-indicator {
         display: none;
     }
    
    .battle-update-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    
    .battle-update-version {
        background: var(--blade-red);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        font-weight: 700;
        font-size: 0.9rem;
    }
    
    .battle-update-type {
        padding: 0.5rem 1rem;
        border-radius: 8px;
        font-weight: 600;
        font-size: 0.8rem;
        text-transform: uppercase;
    }
    
    .battle-update-type.major-update {
        background: var(--blood-crimson);
        color: white;
    }
    
    .battle-update-type.performance {
        background: var(--steel-blue);
        color: white;
    }
    
    .battle-update-type.content {
        background: var(--combat-orange);
        color: white;
    }
    
         .battle-update-title {
         color: var(--light-steel);
         margin-bottom: 0.8rem;
         font-size: 1.5rem;
         font-weight: 700;
         display: flex;
         align-items: center;
         gap: 0.8rem;
     }
     
     .expand-indicator {
         font-size: 1rem;
         opacity: 0.7;
         transition: all 0.3s ease;
     }
     
     .battle-update-card:hover .expand-indicator {
         opacity: 1;
         transform: scale(1.1);
     }
    
    .battle-update-summary {
        color: var(--victory-gold);
        font-size: 1rem;
        margin-bottom: 1rem;
        font-style: italic;
        line-height: 1.4;
    }
    
    .battle-update-date {
        color: var(--light-steel);
        font-size: 0.9rem;
        margin-bottom: 1rem;
        opacity: 0.8;
    }
    
    .battle-update-changes {
        list-style: none;
        padding: 0;
        margin-bottom: 1rem;
    }
    
    .battle-update-changes li {
        padding: 0.5rem 0;
        border-bottom: 1px solid var(--impact-grey);
        position: relative;
        padding-left: 1.5rem;
        color: var(--light-steel);
        font-size: 0.9rem;
        line-height: 1.4;
    }
    
    .battle-update-changes li:before {
        content: '⚔️';
        position: absolute;
        left: 0;
        top: 0.5rem;
        color: var(--blade-red);
        font-size: 0.8rem;
    }
    
         .battle-update-changes li:last-child {
         border-bottom: none;
     }
     
     .battle-update-expand-button {
         display: inline-flex;
         align-items: center;
         gap: 0.5rem;
         margin-top: 1rem;
         padding: 0.6rem 1rem;
         background: var(--blade-red);
         color: white;
         border: none;
         border-radius: 6px;
         font-size: 0.8rem;
         font-weight: 600;
         cursor: pointer;
         transition: all 0.3s ease;
         align-self: flex-start;
     }
     
     .battle-update-card:hover .battle-update-expand-button {
         background: var(--blood-crimson);
         transform: translateY(-2px);
         box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
     }
     
     .expand-button-text {
         font-size: 0.8rem;
         font-weight: 600;
         text-transform: uppercase;
         letter-spacing: 0.5px;
     }
     
     .expand-button-icon {
         font-size: 0.7rem;
         transition: transform 0.3s ease;
     }
     
     .battle-update-card:hover .expand-button-icon {
         transform: translateY(2px);
     }
     
     .battle-update-expanded {
        margin-top: 1.5rem;
        padding-top: 1.5rem;
        border-top: 2px solid var(--steel-blue);
        animation: expandContent 0.4s ease-out;
    }
    
    @keyframes expandContent {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .battle-update-detailed h4,
    .battle-update-developer-notes h4 {
        color: var(--victory-gold);
        margin-bottom: 1rem;
        font-size: 1.1rem;
        font-weight: 600;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    }
    
    .battle-update-detailed-changes {
        list-style: none;
        padding: 0;
        margin-bottom: 1.5rem;
    }
    
    .battle-update-detailed-changes li {
        padding: 0.4rem 0;
        border-bottom: 1px solid rgba(55, 65, 81, 0.3);
        position: relative;
        padding-left: 1.5rem;
        color: var(--light-steel);
        font-size: 0.85rem;
        line-height: 1.4;
    }
    
    .battle-update-detailed-changes li:before {
        content: '🔧';
        position: absolute;
        left: 0;
        top: 0.4rem;
        color: var(--steel-blue);
        font-size: 0.7rem;
    }
    
    .battle-update-detailed-changes li:last-child {
        border-bottom: none;
    }
    
    .battle-update-developer-notes p {
        color: var(--light-steel);
        line-height: 1.6;
        font-size: 0.9rem;
        font-style: italic;
        background: rgba(30, 64, 175, 0.1);
        padding: 1rem;
        border-radius: 8px;
        border-left: 3px solid var(--steel-blue);
    }
    
         .battle-chronicles {
         margin-bottom: 4rem;
     }
     
     .chronicles-container {
         display: grid;
         grid-template-columns: repeat(2, 1fr);
         gap: 2rem;
     }
    
         .chronicle-card {
         padding: 2rem;
         border-radius: 15px;
         box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
         transition: all 0.3s ease;
         border: 2px solid transparent;
         position: relative;
         overflow: hidden;
         min-height: 300px;
         display: flex;
         flex-direction: column;
         justify-content: space-between;
     }
    
    .chronicle-card:hover {
        transform: translateY(-5px);
        border-color: var(--steel-blue);
        box-shadow: 0 15px 35px rgba(30, 64, 175, 0.3);
    }
    
    .chronicle-card::before {
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
    
    .chronicle-card:hover::before {
        transform: translateX(100%);
    }
    
         .chronicle-header {
         display: flex;
         justify-content: space-between;
         align-items: flex-start;
         margin-bottom: 1.5rem;
         background: rgba(0, 0, 0, 0.7);
         padding: 1rem;
         border-radius: 10px;
         backdrop-filter: blur(10px);
     }
     
     .chronicle-title {
         color: var(--light-steel);
         margin-bottom: 0;
         font-size: 1.4rem;
         flex: 1;
         margin-right: 1rem;
         font-weight: 700;
         text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
         line-height: 1.3;
     }
    
         .chronicle-category {
         padding: 0.6rem 1.2rem;
         border-radius: 12px;
         font-weight: 700;
         font-size: 0.75rem;
         text-transform: uppercase;
         white-space: nowrap;
         box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
         border: 2px solid rgba(255, 255, 255, 0.2);
         backdrop-filter: blur(5px);
     }
    
    .chronicle-category.epic-victory {
        background: var(--victory-gold);
        color: var(--shadow-dark);
    }
    
    .chronicle-category.survival-story {
        background: var(--steel-blue);
        color: white;
    }
    
    .chronicle-category.funny-moment {
        background: var(--combat-orange);
        color: white;
    }
    
    .chronicle-category.speed-run {
        background: var(--blood-crimson);
        color: white;
    }
    
         .chronicle-meta {
         display: flex;
         gap: 1rem;
         margin-bottom: 1.5rem;
         font-size: 0.9rem;
         background: rgba(0, 0, 0, 0.6);
         padding: 0.8rem 1rem;
         border-radius: 8px;
         backdrop-filter: blur(8px);
         border: 1px solid rgba(255, 255, 255, 0.1);
     }
     
     .chronicle-player {
         color: var(--victory-gold);
         font-weight: 700;
         text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
         font-size: 0.95rem;
     }
     
     .chronicle-date {
         color: var(--light-steel);
         font-weight: 500;
         opacity: 0.9;
         text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
     }
    
         .chronicle-story {
         line-height: 1.7;
         color: var(--light-steel);
         font-size: 0.95rem;
         background: rgba(0, 0, 0, 0.7);
         padding: 1.2rem;
         border-radius: 10px;
         backdrop-filter: blur(10px);
         border: 1px solid rgba(255, 255, 255, 0.15);
         text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
         flex-grow: 1;
         display: flex;
         align-items: center;
     }
    
         @media (max-width: 768px) {
         .battle-update-header,
         .chronicle-header {
             flex-direction: column;
             gap: 1rem;
             align-items: flex-start;
         }
         
         .battle-update-type,
         .chronicle-category {
             align-self: flex-start;
         }
         
         .chronicle-meta {
             flex-direction: column;
             gap: 0.5rem;
         }
         
         .battle-update-card {
             padding: 1.5rem;
         }
         
         .battle-update-expanded {
             margin-top: 1rem;
             padding-top: 1rem;
         }
         
         .battle-update-expand-button {
             padding: 0.5rem 0.8rem;
             font-size: 0.75rem;
         }
         
         .chronicles-container {
             grid-template-columns: 1fr;
             gap: 1.5rem;
         }
         
         .chronicle-card {
             min-height: 280px;
             padding: 1.5rem;
         }
         
         .chronicle-header {
             padding: 0.8rem;
             margin-bottom: 1rem;
         }
         
         .chronicle-title {
             font-size: 1.2rem;
         }
         
         .chronicle-meta {
             padding: 0.6rem 0.8rem;
             margin-bottom: 1rem;
         }
         
         .chronicle-story {
             padding: 1rem;
             font-size: 0.9rem;
         }
     }
     
     @media (max-width: 480px) {
         .chronicle-card {
             min-height: 250px;
             padding: 1rem;
         }
         
         .chronicle-header {
             padding: 0.6rem;
         }
         
         .chronicle-title {
             font-size: 1.1rem;
         }
         
         .chronicle-category {
             padding: 0.5rem 1rem;
             font-size: 0.7rem;
         }
         
         .chronicle-meta {
             padding: 0.5rem 0.7rem;
         }
         
         .chronicle-story {
             padding: 0.8rem;
             font-size: 0.85rem;
         }
     }
`;
document.head.appendChild(style);
