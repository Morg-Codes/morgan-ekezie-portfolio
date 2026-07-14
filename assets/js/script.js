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