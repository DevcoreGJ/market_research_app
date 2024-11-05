document.addEventListener("DOMContentLoaded", function () {
    const navbarContainer = document.getElementById("navbar-container");

    if (!navbarContainer) {
        console.error("Navbar container not found. Please check the HTML structure.");
        return;
    }

    fetch("navbar.html")
        .then(response => {
            // Check if the fetch was successful
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }
            return response.text();
        })
        .then(data => {
            navbarContainer.innerHTML = data;
            console.log("Navbar content loaded successfully.");

            // Check if the navbar is visible
            if (!isElementVisible(navbarContainer)) {
                console.warn("Navbar container is not visible after loading.");
            } else {
                console.log("Navbar container is visible.");
            }

            // Initialize dark mode toggle if it exists
            const darkModeToggle = document.getElementById("dark-mode-toggle");
            if (darkModeToggle) {
                darkModeToggle.addEventListener("click", toggleDarkMode);
                console.log("Dark mode toggle found and event listener added.");
                // Check if dark mode toggle is visible
                if (!isElementVisible(darkModeToggle)) {
                    console.warn("Dark mode toggle is not visible.");
                }
            } else {
                console.warn("Dark mode toggle not found in navbar.");
            }

            // Initialize the hamburger menu
            const navbarToggler = document.querySelector(".navbar-toggler");
            if (navbarToggler) {
                navbarToggler.addEventListener("click", () => {
                    const navbarMenu = document.querySelector(".navbar-collapse");
                    if (navbarMenu) {
                        navbarMenu.classList.toggle("show");
                        console.log("Hamburger menu toggled.");

                        // Check if the menu is visible after toggling
                        if (navbarMenu.classList.contains("show")) {
                            console.log("Navbar menu is now visible.");
                        } else {
                            console.log("Navbar menu is now hidden.");
                        }
                    } else {
                        console.error("Navbar menu not found.");
                    }
                });
            } else {
                console.error("Navbar toggler not found.");
            }

            // Additional checks for other elements in the navbar (example)
            const navbarLinks = document.querySelectorAll(".navbar-nav .nav-link");
            navbarLinks.forEach(link => {
                if (!isElementVisible(link)) {
                    console.warn(`Navbar link "${link.textContent}" is not visible.`);
                } else {
                    console.log(`Navbar link "${link.textContent}" is visible.`);
                }
            });
        })
        .catch(error => {
            console.error("Failed to load navbar:", error);
        });

    function toggleDarkMode() {
        document.body.classList.toggle("dark-mode");
        const isDarkMode = document.body.classList.contains("dark-mode");
        const modeText = isDarkMode ? "Light Mode" : "Dark Mode";
        darkModeToggle.textContent = modeText;
        console.log(`Switched to ${modeText}.`);
    }

    function isElementVisible(el) {
        if (!el) return false;
        const style = window.getComputedStyle(el);
        return style.display !== "none" && style.visibility !== "hidden" && style.opacity > 0;
    }
});
