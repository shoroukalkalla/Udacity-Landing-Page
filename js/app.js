/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
 */

/**
 * Define Global Variables
 *
 */
const navBarList = document.querySelector("#navbar__list");
const allSections = document.querySelectorAll("section");
const bar = document.querySelector(".bar");
let activeSection = allSections[0];
/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
const buildNav = () => {
  for (let section of allSections) {
    let dataNav = section.dataset.nav;
    let navList = document.createElement("li");
    let navLink = document.createElement("a");
    let sectionId = section.getAttribute("id");
    navLink.setAttribute("href", "#");
    navLink.setAttribute("data-section", sectionId);
    navLink.classList.add("menu__link");
    navLink.textContent = dataNav;
    navList.appendChild(navLink);
    navBarList.appendChild(navList);
  }
};

// Add class 'active' to section when near top of viewport
const setActiveSection = (e) => {
  activeSection.classList.remove("your-active-class");
  const navLink = document.querySelectorAll("nav ul li a");
  let currentSection = "";
  let flag = false;

  allSections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (scrollY >= sectionTop - 150) {
      currentSection = section.getAttribute("id");
      activeSection = section;
      flag = true;
    }
  });

  if (flag) activeSection.classList.add("your-active-class");

  navLink.forEach((link) => {
    link.parentElement.classList.remove("active");
    if (link.getAttribute("data-section") == currentSection) {
      link.parentElement.classList.add("active");
    }
  });
};

// Scroll to anchor ID using scrollTO event
const scrollToSection = (e) => {
  e.preventDefault();
  let sectionID = e.target.dataset.section;
  let section = document.querySelector(`#${sectionID}`);
  window.scrollTo({
    top: section.offsetTop,
    behavior: "smooth",
  });
};

// Menu Bar Toggling
const menuBar = (e) => {
  e.preventDefault();
  navBarList.classList.toggle("display");
};

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
window.addEventListener("DOMContentLoaded", buildNav());

// Responsive Bar
bar.addEventListener("click", menuBar);

// Scroll to section on link click
navBarList.addEventListener("click", scrollToSection);

// Set sections as active
window.addEventListener("scroll", setActiveSection);
