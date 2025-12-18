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
            'JT9XQl3Kd6I'  // https://youtu.be/JT9XQl3Kd6I
        ];
        const base = 'https://www.youtube-nocookie.com/embed/';
        let index = 0;
        let isPlaying = false;

        function setVideoThumbnail(i) {
            const id = videoIds[i % videoIds.length];
            // Use maxresdefault for best quality, fallback to hqdefault
            const maxresUrl = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
            const hqUrl = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
            
            // Test if maxresdefault exists, otherwise use hqdefault
            const testImg = new Image();
            testImg.onload = function() {
                videoThumbnail.style.backgroundImage = `url(${maxresUrl})`;
            };
            testImg.onerror = function() {
                videoThumbnail.style.backgroundImage = `url(${hqUrl})`;
            };
            testImg.src = maxresUrl;
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

        // Load video when thumbnail is clicked
        videoThumbnail.addEventListener('click', function() {
            if (!isPlaying) {
                loadVideo(index);
                // Stop rotation once video starts playing
                if (rotationInterval) {
                    clearInterval(rotationInterval);
                    rotationInterval = null;
                }
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