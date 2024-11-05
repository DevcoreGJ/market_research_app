document.addEventListener("DOMContentLoaded", function() {
    console.log('Loading navbar...');

    fetch('navbar.html')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
            console.log("Navbar content loaded successfully.");

            // Ensure dark mode toggle is set up only after navbar is fully loaded
            initializeDarkModeToggle();
        })
        .catch(error => console.error('Error loading navbar:', error));
});

function initializeDarkModeToggle() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        console.log("Dark mode toggle found.");
        darkModeToggle.addEventListener('change', function() {
            document.body.classList.toggle('dark-mode');
            if (darkModeToggle.checked) {
                localStorage.setItem('darkMode', 'enabled');
            } else {
                localStorage.removeItem('darkMode');
            }
        });

        // Initialize toggle state based on saved preference
        if (localStorage.getItem('darkMode') === 'enabled') {
            darkModeToggle.checked = true;
            document.body.classList.add('dark-mode');
        }
    } else {
        console.warn('Dark mode toggle not found in navbar.');
    }
}
