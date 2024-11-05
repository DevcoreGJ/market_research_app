// Wait until the document is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    console.log('Initializing navbar loading...');

    // Fetch the navbar HTML content
    fetch('navbar.html')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(data => {
            // Inject the navbar HTML into the specified container
            document.getElementById('navbar-container').innerHTML = data;
            console.log("Navbar content loaded successfully.");

            // Initialize the dark mode toggle functionality after navbar is fully loaded
            initializeDarkModeToggle();
        })
        .catch(error => console.error('Error loading navbar:', error));
});

// Function to initialize the dark mode toggle functionality
function initializeDarkModeToggle() {
    // Locate the dark mode toggle element by its ID
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Check if dark mode toggle element is present in the DOM
    if (darkModeToggle) {
        console.log("Dark mode toggle found. Setting up event listener...");

        // Set up the event listener for the dark mode toggle switch
        darkModeToggle.addEventListener('change', function() {
            // Toggle the dark mode class on the body element
            document.body.classList.toggle('dark-mode');

            // Save the dark mode preference to localStorage
            if (darkModeToggle.checked) {
                localStorage.setItem('darkMode', 'enabled');
                console.log("Dark mode enabled.");
            } else {
                localStorage.removeItem('darkMode');
                console.log("Dark mode disabled.");
            }
        });

        // Initialize the toggle state based on the user's saved preference
        if (localStorage.getItem('darkMode') === 'enabled') {
            darkModeToggle.checked = true;
            document.body.classList.add('dark-mode');
            console.log("Dark mode is enabled on page load.");
        } else {
            console.log("Dark mode is disabled on page load.");
        }
    } else {
        console.warn('Dark mode toggle not found in navbar.');
    }
}
