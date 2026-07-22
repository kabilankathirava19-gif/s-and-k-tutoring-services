document.addEventListener("DOMContentLoaded", () => {
    
    // 1. SPLASH SCREEN
    const splashScreen = document.getElementById("splash-screen");
    if (splashScreen) {
        setTimeout(() => {
            splashScreen.classList.add("fade-out");
        }, 1800);
    }

    // 2. MOBILE MENU TOGGLE
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const navLinks = document.getElementById("nav-links");

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            const icon = mobileMenuBtn.querySelector("i");
            if (icon) {
                icon.classList.toggle("fa-bars");
                icon.classList.toggle("fa-times");
            }
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                const icon = mobileMenuBtn.querySelector("i");
                if (icon) {
                    icon.classList.add("fa-bars");
                    icon.classList.remove("fa-times");
                }
            });
        });
    }

    // 3. TUTOR FILTER
    const tutorChips = document.querySelectorAll(".tutor-filter-chip");
    const tutorCards = document.querySelectorAll("#tutor-team-grid .team-card");

    tutorChips.forEach(chip => {
        chip.addEventListener("click", () => {
            tutorChips.forEach(c => c.classList.remove("active"));
            chip.classList.add("active");

            const filterValue = chip.getAttribute("data-filter").toLowerCase();

            tutorCards.forEach(card => {
                const cardSubjects = card.getAttribute("data-subjects").toLowerCase();
                if (filterValue === "all" || cardSubjects.includes(filterValue)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // 4. SUBJECT MODAL POPUP
    const modalOverlay = document.getElementById("subject-modal");
    const modalBody = document.getElementById("modal-body");
    const modalCloseBtn = document.getElementById("modal-close-btn");
    const subjectCards = document.querySelectorAll(".subject-card");

    const subjectDetails = {
        math: {
            title: "Mathematics",
            grade: "Grades 4 - 9",
            description: "Building strong numeric reasoning, step-by-step problem-solving methods, and algebraic confidence.",
            focus: ["Numbers & Operations", "Patterns & Algebra", "Geometry", "Measurement & Data Handling"]
        },
        english: {
            title: "English",
            grade: "Grades 4 - 9",
            description: "Developing fluency in reading comprehension, formal writing structures, and language mechanics.",
            focus: ["Reading Comprehension", "Grammar & Editing", "Creative Writing", "Vocabulary"]
        },
        afrikaans: {
            title: "Afrikaans (FAL)",
            grade: "Grades 4 - 9",
            description: "Mastering foundational rules, sentence structures, and oral/written comprehension.",
            focus: ["STOMPI Rules", "Taal Rules", "Comprehension Passages", "Paragraph Writing"]
        },
        ems: {
            title: "EMS",
            grade: "Grades 7 - 9",
            description: "Introducing double-entry accounting principles and basic macroeconomic concepts.",
            focus: ["Accounting Equations", "Cash Receipts/Payments Journals", "General Ledger", "Entrepreneurship"]
        },
        geography: {
            title: "Geography",
            grade: "Grades 4 - 9",
            description: "Mastering practical map skills, grid references, scale, and natural geography concepts.",
            focus: ["Mapwork Skills", "Latitudes & Time Zones", "Climate & Weathering", "Settlement Studies"]
        },
        biology: {
            title: "Biology",
            grade: "Grades 4 - 9",
            description: "Exploring living systems, human biology, ecology, and biological processes.",
            focus: ["Photosynthesis & Respiration", "Human Systems", "Ecosystems", "Scientific Method"]
        },
        physics: {
            title: "Physical Sciences",
            grade: "Grades 4 - 9",
            description: "Simplifying physical concepts, chemical reactions, electrical circuits, and energy.",
            focus: ["Matter & Atoms", "Chemical Reactions", "Electric Circuits", "Forces & Energy"]
        },
        history: {
            title: "History",
            grade: "Grades 4 - 9",
            description: "Developing critical source evaluation skills, timeline analysis, and structured essay writing.",
            focus: ["Source Analysis", "Historical Timelines", "Essay Writing", "CAPS History Eras"]
        },
        technology: {
            title: "Technology",
            grade: "Grades 7 - 9",
            description: "Understanding design loops, mechanical systems, structures, and electrical systems.",
            focus: ["Design Process", "Structures & Gears", "Materials Processing", "Circuits"]
        },
        homework: {
            title: "Homework Support",
            grade: "Grades 4 - 9",
            description: "Daily structured support to help learners complete school assignments accurately without stress.",
            focus: ["Task Breakdown", "Clarifying Instructions", "Project Guidance", "Study Habits"]
        },
        exam: {
            title: "Exam Preparation",
            grade: "Grades 4 - 9",
            description: "Targeted past paper practice, time management skills, and confidence boosting before tests.",
            focus: ["Syllabus Review", "Past Paper Drills", "Closing Knowledge Gaps", "Time Management"]
        }
    };

    subjectCards.forEach(card => {
        card.addEventListener("click", () => {
            const subjectKey = card.getAttribute("data-subject");
            const data = subjectDetails[subjectKey];

            if (data && modalOverlay && modalBody) {
                modalBody.innerHTML = `
                    <h2 style="color:#0f172a; margin-bottom: 5px;">${data.title}</h2>
                    <span style="background:#0284c7; color:#fff; font-size:0.8rem; padding: 2px 10px; border-radius:10px; display:inline-block; margin-bottom:15px;">${data.grade}</span>
                    <p style="color:#475569; margin-bottom: 15px;">${data.description}</p>
                    <h4 style="color:#0f172a; margin-bottom: 8px;">Core Focus Areas:</h4>
                    <ul style="padding-left: 20px; color:#334155;">
                        ${data.focus.map(item => `<li style="margin-bottom:5px;">${item}</li>`).join('')}
                    </ul>
                `;
                modalOverlay.classList.add("active");
                document.body.classList.add("modal-open");
            }
        });
    });

    if (modalCloseBtn && modalOverlay) {
        const closeModal = () => {
            modalOverlay.classList.remove("active");
            document.body.classList.remove("modal-open");
        };

        modalCloseBtn.addEventListener("click", closeModal);
        modalOverlay.addEventListener("click", (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    // 5. FAQ ACCORDION
    const faqQuestions = document.querySelectorAll(".faq-question");

    faqQuestions.forEach(question => {
        question.addEventListener("click", () => {
            const faqItem = question.parentElement;
            const answer = faqItem.querySelector(".faq-answer");
            const icon = question.querySelector("i");

            document.querySelectorAll(".faq-answer").forEach(item => {
                if (item !== answer) {
                    item.style.display = "none";
                    const otherIcon = item.parentElement.querySelector(".faq-question i");
                    if (otherIcon) otherIcon.style.transform = "rotate(0deg)";
                }
            });

            if (answer.style.display === "block") {
                answer.style.display = "none";
                if (icon) icon.style.transform = "rotate(0deg)";
            } else {
                answer.style.display = "block";
                if (icon) icon.style.transform = "rotate(180deg)";
            }
        });
    });

});