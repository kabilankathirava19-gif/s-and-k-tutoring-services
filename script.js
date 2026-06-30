document.addEventListener("DOMContentLoaded", () => {
    
    // REMOVE NETFLIX SPLASH SCREEN ONCE LOADED
    const splash = document.getElementById('splash-screen');
    if (splash) {
        // Keeps the splash cinematic intro sequence running for 1.8 seconds total
        setTimeout(() => {
            splash.style.opacity = '0';
            splash.style.visibility = 'hidden';
        }, 1800); 
    }

    // MOBILE NAVBAR TOGGLE
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');
        });
    }

    // HOLIDAY SPECIAL TIMER COUNTDOWN
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 7);

        const updateTimer = () => {
            const now = new Date().getTime();
            const difference = targetDate - now;

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

            if (difference < 0) {
                clearInterval(timerInterval);
                countdownElement.innerHTML = "OFFER EXTENDED";
            }
        };
        const timerInterval = setInterval(updateTimer, 1000);
        updateTimer();
    }

    // FAQ ACCORDION INTERACTIVITY
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const icon = question.querySelector('i');
            
            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                icon.style.transform = 'rotate(0deg)';
            } else {
                document.querySelectorAll('.faq-answer').forEach(ans => ans.style.maxHeight = null);
                document.querySelectorAll('.faq-question i').forEach(ic => ic.style.transform = 'rotate(0deg)');
                
                answer.style.maxHeight = answer.scrollHeight + "px";
                icon.style.transform = 'rotate(180deg)';
            }
        });
    });

    // SCROLL REVEAL ANIMATIONS
    const revealItems = document.querySelectorAll('.subject-card, .feature-card, .testimonial-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.05 });

    revealItems.forEach(item => {
        item.style.opacity = "0";
        item.style.transform = "translateY(25px)";
        item.style.transition = "all 0.5s ease-out";
        observer.observe(item);
    });
});