// Animation handlers

function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        reveals.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
}

function initTechCardAnimation() {
    const techCards = document.querySelectorAll('.tech-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    techCards.forEach(card => observer.observe(card));
}

function initTypingAnimation() {
    const tagline = "Engineering full-stack and blockchain systems built to scale";
    const typedTextElement = document.getElementById('typed-text');
    let charIndex = 0;

    function typeText() {
        if (charIndex < tagline.length) {
            typedTextElement.innerHTML = tagline.substring(0, charIndex + 1) + '<span class="typing-cursor"></span>';
            charIndex++;
            setTimeout(typeText, 40);
        }
    }

    setTimeout(typeText, 2500);
}

function initTiltEffect() {
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 25;
            const rotateY = (centerX - x) / 25;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });
}

function initSkillItemInteraction() {
    const skillItems = document.querySelectorAll('.skill-item');

    skillItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const dots = item.querySelectorAll('.rounded-full');
            dots.forEach((dot, i) => {
                setTimeout(() => {
                    dot.style.transform = 'scale(1.3)';
                    setTimeout(() => {
                        dot.style.transform = 'scale(1)';
                    }, 150);
                }, i * 50);
            });
        });
    });
}

function initAnimations() {
    initScrollReveal();
    initTechCardAnimation();
    initTypingAnimation();
    initTiltEffect();
    initSkillItemInteraction();
}

document.addEventListener('DOMContentLoaded', initAnimations);
