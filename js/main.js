document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinksWrapper = document.querySelector('.nav-links-wrapper');
    const currentYearSpan = document.getElementById('currentYear');

    if (menuBtn && navLinksWrapper) {
        menuBtn.addEventListener('click', function() {
            const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true' || false;
            menuBtn.setAttribute('aria-expanded', !isExpanded);
            navLinksWrapper.classList.toggle('active');
            document.body.classList.toggle('no-scroll'); // Optional: to prevent scrolling when menu is open
        });
    }

    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Optional: Close mobile menu when a link is clicked
    const navLinks = navLinksWrapper.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinksWrapper.classList.contains('active')) {
                menuBtn.setAttribute('aria-expanded', 'false');
                navLinksWrapper.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });
});