document.addEventListener("DOMContentLoaded", () => {
    
    // REMOVE NETFLIX SPLASH SCREEN
    const splash = document.getElementById('splash-screen');
    if (splash) {
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

    // HOLIDAY SPECIAL COUNTDOWN TIMER
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

    // SUBJECT POPUP MODAL STORAGE DATABASE
    const subjectDetails = {
        math: {
            title: "Mathematics",
            tag: "Grades 4 - 9 Core Alignment",
            icon: "fa-calculator math-icon",
            description: "We help students master numeric operations and eliminate math anxiety by building strong foundational rules.",
            topics: ["Fractions, decimals, and percentages", "Long division and problem-solving tracking", "Introductory Algebra, expressions & equations", "Geometry and perimeter/area breakdown"]
        },
        english: {
            title: "English First Additional / Home Language",
            tag: "Language Perfection",
            icon: "fa-book english-icon",
            description: "Developing confident reading, precise grammatical skills, and articulate essay writing systems.",
            topics: ["Tenses, punctuation, and parts of speech", "Comprehension strategy and test analysis", "Creative writing structure and essay layout", "Vocabulary expansion exercises"]
        },
        afrikaans: {
            title: "Afrikaans (FAL)",
            tag: "Vocabulary & Sentence Building",
            icon: "fa-font afrikaans-icon",
            description: "Simplifying language rules so students feel confident writing and answering assessment queries.",
            topics: ["STOMPI sentence structures", "Tye (Present, Past, Future tenses)", "Plural forms (Meervoude) and Diminutives (Verkleinwoorde)", "Reading comprehension text practice"]
        },
        ems: {
            title: "Economic & Management Sciences",
            tag: "Grades 7 - 9 Accounting Foundations",
            icon: "fa-chart-line math-icon",
            description: "Clear guidelines preparing senior phase learners for accounting templates and economy theories.",
            topics: ["The Accounting Equation (A = O + L)", "General Ledgers, Cash Receipt & Payment Journals", "National Budgets and economic cyclic flows", "Entrepreneurship definitions"]
        },
        geography: {
            title: "Geography",
            tag: "Mapwork Mastery",
            icon: "fa-globe-africa afrikaans-icon",
            description: "Visual strategies to break down atlas tracking, scaling, and environmental analysis structures.",
            topics: ["Compass points, grid references, and coordinates", "Scale conversions and map features", "Climate regions and population tracking", "Sustainable resource modules"]
        },
        biology: {
            title: "Biology (Life Sciences)",
            tag: "Natural Systems & Concepts",
            icon: "fa-dna science-icon",
            description: "Interactive visual summaries to help students comprehend complex living organism interactions.",
            topics: ["Photosynthesis and respiration cycles", "Human digestive, circulatory, and respiratory systems", "Ecosystem balances and biodiversity tracking", "Microscope cell theory basics"]
        },
        physics: {
            title: "Physics (Physical Sciences)",
            tag: "Matter, Energy & Mechanics",
            icon: "fa-atom tech-icon",
            description: "Demystifying formulas, chemistry balances, and scientific methods with clear practice problems.",
            topics: ["Atomic structures and the periodic table", "Forces, friction, and kinetic energy calculations", "Electrical circuits, series, and parallel setups", "Chemical reactions and observation rules"]
        },
        history: {
            title: "History",
            tag: "Source Analysis Skills",
            icon: "fa-book science-icon",
            description: "Teaching critical evaluation to extract facts from historical sources and write top-tier answers.",
            topics: ["Evaluating primary vs secondary source documents", "Recognizing bias and contextual historical settings", "Structuring timeline timelines accurately", "Paragraph writing for descriptive test marks"]
        },
        technology: {
            title: "Technology",
            tag: "Design Process & Theory",
            icon: "fa-cog tech-icon",
            description: "Bridging the gap between structural theory systems and engineering drawing practices.",
            topics: ["Mechanical systems (levers, gears, and pulleys)", "The 5-stage design loop (Investigate to Evaluate)", "Structural designs and raw material integrity", "Basic electrical safety components"]
        },
        homework: {
            title: "Homework Support",
            tag: "Daily Accountability Guidance",
            icon: "fa-pencil-alt homework-icon",
            description: "A patient space assisting kids through daily work hurdles, ensuring assignments are fully mastered.",
            topics: ["Clarifying dense classroom instructions", "Structured task timelines to avoid cramming", "Concept review before submitting assignments", "Productive study habit mentoring"]
        },
        exam: {
            title: "Exam Preparation",
            tag: "High-Performance Revision",
            icon: "fa-graduation-cap exam-icon",
            description: "Targeted revision strategies that show students how to manage exam panic and structure answers.",
            topics: ["Working through past exam papers under time constraints", "Spotting common question trap indicators", "Summarization mapping methods", "Time allocation breakdowns per section"]
        }
    };

    const modalOverlay = document.getElementById('subject-modal');
    const modalBody = document.getElementById('modal-body');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const interactiveCards = document.querySelectorAll('.subject-card.interactive');

    // Open Modal
    interactiveCards.forEach(card => {
        card.addEventListener('click', () => {
            const subjectKey = card.getAttribute('data-subject');
            const data = subjectDetails[subjectKey];
            
            if (data) {
                modalBody.innerHTML = `
                    <div class="modal-info-title">
                        <i class="fas ${data.icon}"></i>
                        <span>${data.title}</span>
                    </div>
                    <div class="modal-info-tag">${data.tag}</div>
                    <div class="modal-info-body">
                        <h4>Overview</h4>
                        <p>${data.description}</p>
                        <h4>Key Focus Areas Include:</h4>
                        <ul>
                            ${data.topics.map(topic => `<li>${topic}</li>`).join('')}
                        </ul>
                    </div>
                `;
                modalOverlay.classList.add('active');
                document.body.classList.add('modal-open');
            }
        });
    });

    // Close Modal
    const closeModal = () => {
        modalOverlay.classList.remove('active');
        document.body.classList.remove('modal-open');
    };

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    
    window.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // SCROLL REVEAL ANIMATIONS
    const revealItems = document.querySelectorAll('.subject-card, .feature-card, .testimonial-card, .team-card');
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