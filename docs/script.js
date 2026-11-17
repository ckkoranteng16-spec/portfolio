
/* =========================================
   1. PROJECT DATA

   Add new projects to this array.
========================================= */

const projects = [

    {
        category: "AI APPLICATION",

        title: "Gemini Function-Calling Agent",

        description:
            "A Python-based AI agent powered by Google's Gemini API. It interprets user requests and uses function calling to select and execute predefined Python functions. A FastAPI backend connects the agent's functionality to its web interface.",

        technologies: [
            "Python",
            "Gemini API",
            "FastAPI",
            "Pydantic",
            "Git & GitHub"
        ],

        status: "Frontend deployed",

        statusType: "complete",

        links: [
            {
                label: "View Source Code ↗",
                url: "https://github.com/ckkoranteng16-spec/first-agent"
            },
            {
                label: "Frontend Preview ↗",
                url: "https://ckkoranteng16-spec.github.io/first-agent/"
            }
        ],

        notes: [
            "The frontend is hosted on GitHub Pages. Backend deployment is pending."
        ]
    },


    {
        category: "MACHINE LEARNING",

        title: "Telco Customer Churn Analysis",

        description:
            "A machine-learning study investigating how preprocessing choices influence customer churn classification. The experiments compare preprocessing configurations and examine how different algorithms respond to those changes.",

        technologies: [
            "Python",
            "Pandas",
            "Scikit-learn",
            "Seaborn",
            "Jupyter Notebook"
        ],

        status: "Complete",

        statusType: "complete",

        links: [
            {
                label: "View Source Code ↗",
                url: "https://github.com/ckkoranteng16-spec/Telco-Churn-Project"
            }
        ],

        notes: [
            "Completed machine learning project investigating how preprocessing techniques affect customer churn prediction.",

            "Compared Decision Tree and Logistic Regression models across missing-value handling, feature scaling, and class weighting.",

            "Best result: Logistic Regression with class weighting achieved an F1-score of 0.6286 and recall of 0.8118."
        ]
    }

];


/* =========================================
   2. GENERATE PROJECT CARDS
========================================= */

const projectsGrid = document.getElementById("projects-grid");


function createProjectCard(project) {

    const card = document.createElement("article");
    card.className = "project-card";


    // Project category and status

    const top = document.createElement("div");
    top.className = "project-top";

    const category = document.createElement("span");
    category.className = "project-category";
    category.textContent = project.category;

    const status = document.createElement("span");
    status.className = "project-status";

    const dot = document.createElement("span");
    dot.className = "status-dot";

    if (project.statusType === "progress") {
        dot.classList.add("status-dot-progress");
    }

    status.appendChild(dot);
    status.appendChild(document.createTextNode(project.status));

    top.appendChild(category);
    top.appendChild(status);


    // Project title

    const title = document.createElement("h3");
    title.textContent = project.title;


    // Project description

    const description = document.createElement("p");
    description.className = "project-description";
    description.textContent = project.description;


    // Technologies

    const techContainer = document.createElement("div");
    techContainer.className = "project-tech";

    project.technologies.forEach(technology => {

        const tech = document.createElement("span");
        tech.textContent = technology;

        techContainer.appendChild(tech);

    });


    // Project links

    const linksContainer = document.createElement("div");
    linksContainer.className = "project-links";

    project.links.forEach(link => {

        const anchor = document.createElement("a");

        anchor.href = link.url;
        anchor.textContent = link.label;
        anchor.target = "_blank";
        anchor.rel = "noopener noreferrer";

        linksContainer.appendChild(anchor);

    });


    // Assemble the project card

    card.appendChild(top);
    card.appendChild(title);
    card.appendChild(description);
    card.appendChild(techContainer);


    // Add links if available

    if (project.links.length > 0) {
        card.appendChild(linksContainer);
    }


    // Project notes

    if (project.notes) {

        project.notes.forEach(note => {

            const noteParagraph = document.createElement("p");

            noteParagraph.className = "project-note";
            noteParagraph.textContent = note;

            card.appendChild(noteParagraph);

        });

    }

    return card;
}


// Render all project cards

if (projectsGrid) {

    projects.forEach(project => {

        const projectCard = createProjectCard(project);

        projectsGrid.appendChild(projectCard);

    });

}


/* =========================================
   3. AUTOMATIC FOOTER YEAR
========================================= */

const currentYear = document.getElementById("current-year");

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}


/* =========================================
   4. ACTIVE NAVIGATION HIGHLIGHT
========================================= */

const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function setActiveLink(sectionId) {

    navLinks.forEach(link => {

        const isActive =
            link.getAttribute("href") === `#${sectionId}`;

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
   5. SECTION OBSERVER
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
            .sort(
                (a, b) => b.intersectionRatio - a.intersectionRatio
            );

        if (visibleSections.length > 0) {

            setActiveLink(visibleSections[0].target.id);

        }

    }, observerOptions);


    sections.forEach(section => {

        sectionObserver.observe(section);

    });

}


/* =========================================
   6. INITIAL NAVIGATION STATE
========================================= */

const currentSection = window.location.hash.substring(1);

if (currentSection && document.getElementById(currentSection)) {

    setActiveLink(currentSection);

} else {

    setActiveLink("home");

}
