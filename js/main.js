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

    // Video rotation (YouTube, privacy-enhanced mode with thumbnail)
    const videoFrame = document.getElementById('videoFrame');
    const videoThumbnail = document.getElementById('videoThumbnail');
    
    if (videoFrame && videoThumbnail) {
        const videoIds = [
            'CcrkhRgmGVg'  // https://youtu.be/CcrkhRgmGVg
        ];
        const base = 'https://www.youtube.com/embed/';
        let index = 0;
        let isPlaying = false;

        function setVideoThumbnail(i) {
            const id = videoIds[i % videoIds.length];
        
            const hqUrl = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
            const maxresUrl = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
        
            // 1. Always set HQ first (guaranteed to exist)
            videoThumbnail.style.backgroundImage = `url(${hqUrl})`;
        
            // 2. Try to upgrade to maxres only if it's a real image
            const img = new Image();
            img.onload = function () {
                // YouTube maxres placeholders are exactly 120x90 or very small
                if (img.naturalWidth > 300) {
                    videoThumbnail.style.backgroundImage = `url(${maxresUrl})`;
                }
            };
            img.src = maxresUrl;
        }

        function loadVideo(i) {
            const id = videoIds[i % videoIds.length];
            // Ensure controls are always enabled and autoplay is disabled
            const params = '?controls=1&modestbranding=1&rel=0&playsinline=1';
            videoFrame.src = base + id + params;
            videoThumbnail.style.display = 'none';
            videoFrame.style.display = 'block';
            isPlaying = true;
        }

        // Show initial thumbnail
        setVideoThumbnail(index);

        let rotationInterval = null;

        // Click to play
        videoThumbnail.addEventListener('click', () => {
            loadVideo(index);
            // Stop rotation once video starts playing
            if (rotationInterval) {
                clearInterval(rotationInterval);
                rotationInterval = null;
            }
        });

        // Video rotation - only rotate thumbnails when not playing
        rotationInterval = setInterval(() => {
            if (!isPlaying) {
                // Only rotate if not playing and there are multiple videos
                if (videoIds.length > 1) {
                    index = (index + 1) % videoIds.length;
                    setVideoThumbnail(index);
                }
            }
        }, 8000); // 8s per video
    }
});