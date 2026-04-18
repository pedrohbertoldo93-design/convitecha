document.addEventListener('DOMContentLoaded', () => {
    console.log('Landing Page Moderna: Chá de Revelação & Chá de Fralda');

    // Intersection Observer for section entries
    const sectionObserverOptions = {
        threshold: 0.2
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                
                // Animate children if they have reveal classes
                const children = entry.target.querySelectorAll('.glass-card, .reveal-card, .section-title, .main-title');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0) scale(1)';
                    }, index * 200);
                });
            }
        });
    }, sectionObserverOptions);

    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        sectionObserver.observe(section);
        
        // Initial state for animation
        const animatedElements = section.querySelectorAll('.glass-card, .reveal-card, .section-title, .main-title');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px) scale(0.95)';
            el.style.transition = 'all 1s cubic-bezier(0.23, 1, 0.32, 1)';
        });
    });

    // Parallax Effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        // Background clouds parallax
        const clouds = document.querySelectorAll('.bg-cloud');
        clouds.forEach((cloud, index) => {
            const speed = (index + 1) * 0.15;
            cloud.style.transform = `translateY(${scrolled * speed}px)`;
        });

        // Hero Parallax
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
            heroContent.style.opacity = 1 - (scrolled / 700);
        }

        // Active Nav Link highlight
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrolled >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href').includes(current)) {
                link.style.color = 'var(--accent-gold)';
            }
        });
    });

    // Handle Reveal Card Interactions
    const cards = document.querySelectorAll('.reveal-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
});
