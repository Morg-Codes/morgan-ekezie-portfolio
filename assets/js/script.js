"use strict";

document.documentElement.classList.add("js");

const currentYearElement = document.querySelector("#current-year");
const menuToggle = document.querySelector(".menu-toggle");
const navigationMenu = document.querySelector(".nav-menu");
const navigationLinks = document.querySelectorAll(".nav-menu a");

if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

function closeMobileMenu() {
    if (!menuToggle || !navigationMenu) {
        return;
    }

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    navigationMenu.classList.remove("is-open");
}

if (menuToggle && navigationMenu) {
    menuToggle.addEventListener("click", () => {
        const isMenuOpen =
            menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute(
            "aria-expanded",
            String(!isMenuOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isMenuOpen
                ? "Open navigation menu"
                : "Close navigation menu"
        );

        navigationMenu.classList.toggle("is-open");
    });

    navigationLinks.forEach((link) => {
        link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMobileMenu();
            menuToggle.focus();
        }
    });

    document.addEventListener("click", (event) => {
        const clickedInsideNavigation =
            event.target.closest(".navbar");

        if (!clickedInsideNavigation) {
            closeMobileMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            closeMobileMenu();
        }
    });
}

/* ---------- Active navigation link ---------- */

const pageSections = document.querySelectorAll("main section[id]");
const pageNavigationLinks = document.querySelectorAll(
    '.nav-links a[href^="#"]'
);

function updateActiveNavigation(sectionId) {
    pageNavigationLinks.forEach((link) => {
        const isCurrentSection =
            link.getAttribute("href") === `#${sectionId}`;

        link.classList.toggle("is-active", isCurrentSection);

        if (isCurrentSection) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

if (pageSections.length && pageNavigationLinks.length) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    updateActiveNavigation(entry.target.id);
                }
            });
        },
        {
            rootMargin: "-20% 0px -70% 0px",
            threshold: 0
        }
    );

    pageSections.forEach((section) => {
        sectionObserver.observe(section);
    });

    updateActiveNavigation("home");
}

/* ---------- Scroll reveal animations ---------- */

const revealElements = document.querySelectorAll(
    [
        ".hero-content",
        ".hero-visual",
        ".about-heading",
        ".about-content",
        ".about-card",
        ".skills-heading",
        ".skill-card",
        ".skills-footer",
        ".projects-heading",
        ".project-card",
        ".projects-note",
        ".credentials-heading",
        ".education-card",
        ".certification-card",
        ".learning-card",
        ".credentials-note",
        ".contact-content",
        ".contact-card"
    ].join(", ")
);

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (prefersReducedMotion) {
    revealElements.forEach((element) => {
        element.classList.add("is-visible");
    });
} else if (revealElements.length) {
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        {
            rootMargin: "0px 0px -10% 0px",
            threshold: 0.12
        }
    );

    revealElements.forEach((element, index) => {
        element.classList.add("reveal");
        element.style.setProperty(
            "--reveal-delay",
            `${Math.min(index % 4, 3) * 80}ms`
        );

        revealObserver.observe(element);
    });
}