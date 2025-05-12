// Wait for the HTML document to be fully loaded and parsed
document.addEventListener('DOMContentLoaded', function() {

    // --- Update Copyright Year ---
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) { // Check if the element exists
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = currentYear;
    }

    // --- Basic Mobile Menu Toggle (Example - requires burger icon in HTML) ---
    // const mobileMenuButton = document.getElementById('mobile-menu-toggle'); // Needs an ID on a button/icon
    // const navList = document.querySelector('header nav ul'); // Select the nav list

    // if (mobileMenuButton && navList) {
    //     mobileMenuButton.addEventListener('click', function() {
    //         navList.classList.toggle('active'); // Add/remove an 'active' class to show/hide
    //         // You would need CSS rules for .active state (e.g., display: block;)
    //     });
    // }

    // --- Smooth Scrolling for Anchor Links (Example) ---
    // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    //     anchor.addEventListener('click', function (e) {
    //         e.preventDefault(); // Prevent default jump behavior
    //         const targetId = this.getAttribute('href');
    //         const targetElement = document.querySelector(targetId);

    //         if(targetElement) {
    //             targetElement.scrollIntoView({
    //                 behavior: 'smooth' // Smooth scroll animation
    //             });
    //         }
    //     });
    // });

    // --- Basic Form Validation Feedback (Example) ---
    // const contactForm = document.querySelector('#contact-form-section form'); // Assuming the form has an ID or is unique
    // if (contactForm) {
    //     contactForm.addEventListener('submit', function(event) {
    //         let isValid = true;
    //         // Very basic check - real validation is more complex
    //         const emailInput = contactForm.querySelector('#email');
    //         if (emailInput && !emailInput.value.includes('@')) {
    //             alert('Please enter a valid email address.');
    //             isValid = false;
    //             event.preventDefault(); // Stop form submission
    //         }
    //         // Add more checks for required fields, etc.
    //         // if (!isValid) {
    //         //     event.preventDefault(); //