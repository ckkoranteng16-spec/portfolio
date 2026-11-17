
/* =========================================
   1. AUTOMATIC FOOTER YEAR
========================================= */

const currentYear = document.getElementById("current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================
   2. ACTIVE NAVIGATION HIGHLIGHT
========================================= */

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function setActiveLink(sectionId) {
    navLinks.forEach(link => {
        const isActive = link.getAttribute("href") === `#${sectionId}`;

        if (isActive) {
            link.classList.add("active");
            link.setAttribute("aria-current", "location");
        } else {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
        }
    });
}


/* =========================================
   3. SECTION OBSERVER
========================================= */

const observerOptions = {
    root: null,
    rootMargin: "-30% 0px -55% 0px",
    threshold: 0
};

if ("IntersectionObserver" in window) {

    const sectionObserver = new IntersectionObserver(entries => {

        const visibleSections = entries
            .filter(entry => entry.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleSections.length > 0) {
            setActiveLink(visibleSections[0].target.id);
        }

    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
}


/* =========================================
   4. INITIAL NAVIGATION STATE
========================================= */

const currentSection = window.location.hash.substring(1);

if (currentSection && document.getElementById(currentSection)) {
    setActiveLink(currentSection);
} else {
    setActiveLink("home");
}
