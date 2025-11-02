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

    // Video rotation (YouTube, privacy-enhanced mode)
    const videoFrame = document.getElementById('videoFrame');
    if (videoFrame) {
        const videoIds = [
            'CTUZdPQ6FtM'  // https://youtu.be/CTUZdPQ6FtM
        ];
        const base = 'https://www.youtube-nocookie.com/embed/';
        let index = 0;

        function setVideo(i) {
            const id = videoIds[i % videoIds.length];
            // autoplay muted for seamless rotation; modestbranding & rel for a cleaner UI
            const params = '?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0&playsinline=1';
            videoFrame.src = base + id + params;
        }

        setVideo(index);
        setInterval(() => {
            index = (index + 1) % videoIds.length;
            setVideo(index);
        }, 8000); // 8s per video
    }
});