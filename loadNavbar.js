document.addEventListener("DOMContentLoaded", function() {
    console.log('Navbar loading script initialized.');

    // Load the navbar
    fetch('navbar.html')
        .then(response => {
            console.log('Fetch response status:', response.status);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(data => {
            console.log('Navbar content loaded successfully.');
            document.getElementById('navbar-container').innerHTML = data;

            // Initialize dark mode toggle
            const darkModeToggle = document.getElementById('darkModeToggle');
            if (darkModeToggle) { // Check if the toggle exists
                darkModeToggle.addEventListener('change', function() {
                    document.body.classList.toggle('dark-mode');
                    if (darkModeToggle.checked) {
                        // Save preference in local storage
                        localStorage.setItem('darkMode', 'enabled');
                    } else {
                        localStorage.removeItem('darkMode');
                    }
                });

                // Check for saved dark mode preference
                if (localStorage.getItem('darkMode') === 'enabled') {
                    darkModeToggle.checked = true;
                    document.body.classList.add('dark-mode');
                }
            } else {
                console.warn('Dark mode toggle not found in navbar.');
            }
        })
        .catch(error => console.error('Error loading the navbar:', error));
});
