document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. Opening Sequence & Audio ---
    const stageGanpati = document.getElementById('stageGanpati');
    const openingScreen = document.getElementById('openingScreen');
    const mainContent = document.getElementById('mainContent');
    const openBtn = document.getElementById('openInvitationBtn');
    
    const audioControls = document.getElementById('audioControls');
    const templeBells = document.getElementById('templeBells');
    const bgMusic = document.getElementById('bgMusic');
    const togglePlay = document.getElementById('togglePlay');
    const toggleMute = document.getElementById('toggleMute');
    
    // Attempt to play temple bells immediately, or on first click
    let bellsPlayed = false;
    const playBells = () => {
        if (!bellsPlayed) {
            templeBells.volume = 0.4;
            templeBells.play().catch(e => console.log("Autoplay prevented for temple bells"));
            bellsPlayed = true;
        }
    };
    
    // Try autoplay
    playBells();
    // Fallback: play on any click on the Ganpati screen
    stageGanpati.addEventListener('click', playBells);

    // Enter Invitation Button Click
    openBtn.addEventListener('click', () => {
        // Fade out opening screen
        openingScreen.style.opacity = '0';
        
        // Stop bells, start main music
        templeBells.pause();
        bgMusic.volume = 0.4;
        bgMusic.play().catch(e => console.log("Audio play failed:", e));
        
        setTimeout(() => {
            openingScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');
            // Small delay for fade in
            setTimeout(() => {
                mainContent.style.opacity = '1';
                audioControls.classList.remove('hidden');
                reveal(); // Trigger initial scroll reveals
            }, 50);
        }, 1500);
    });

    // Audio Controls logic
    let isPlaying = true;
    togglePlay.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            togglePlay.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            bgMusic.play();
            togglePlay.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    });

    let isMuted = false;
    toggleMute.addEventListener('click', () => {
        isMuted = !isMuted;
        bgMusic.muted = isMuted;
        if (isMuted) {
            toggleMute.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            toggleMute.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    });

    // --- 2. Countdown Timer ---
    const targetDate = new Date("July 01, 2026 12:30:00").getTime();

    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById("days").innerText = "00";
            document.getElementById("hours").innerText = "00";
            document.getElementById("minutes").innerText = "00";
            document.getElementById("seconds").innerText = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
    }, 1000);

    // --- 3. Scroll Animations (Reveal) ---
    function reveal() {
        var reveals = document.querySelectorAll(".reveal");
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 100; // Trigger point

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            }
        }
    }
    window.addEventListener("scroll", reveal);

    // --- 4. Parallax Effect for Hero ---
    window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY;
        const heroBg = document.querySelector('.hero-bg');
        if (heroBg) {
            heroBg.style.transform = `scale(1.05) translateY(${scrollValue * 0.4}px)`;
        }
    });

    // --- 5. RSVP Form Handling (Mock) ---
    const rsvpForm = document.getElementById('rsvpForm');
    if(rsvpForm) {
        rsvpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = "Thank You!";
            btn.style.background = "#25D366";
            btn.style.color = "#fff";
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.background = "var(--gold-dark)";
                btn.style.color = "var(--black-bg)";
                e.target.reset();
            }, 3000);
        });
    }
});
