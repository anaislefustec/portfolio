document.addEventListener('DOMContentLoaded', function() {
    
    // Parallax effect pour le hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImg = document.querySelector('.hero-img');
        if (heroImg) {
            heroImg.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
    
    // Animation des étoiles au clic
    const stars = document.querySelectorAll('[class*="star-"]');
    stars.forEach(star => {
        star.addEventListener('click', function() {
            this.style.animation = 'rotate 1s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 1000);
        });
    });
    
    // Animation des fleurs au clic
    const flowers = document.querySelectorAll('[class*="flower-"]');
    flowers.forEach(flower => {
        flower.addEventListener('click', function() {
            this.style.animation = 'bounce 0.6s ease-in-out';
            setTimeout(() => {
                this.style.animation = '';
            }, 600);
        });
    });
    
    // Hover effect sur les images de projets
    const projectImages = document.querySelectorAll('[class*="img"]');
    projectImages.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Animation des compétences au scroll
    const skillItems = document.querySelectorAll('.skill-item');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const skillObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
                entry.target.style.animationDelay = Math.random() * 0.3 + 's';
            }
        });
    }, observerOptions);
    
    skillItems.forEach(skill => {
        skillObserver.observe(skill);
    });
    
    // Animation de la timeline au scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInLeft 0.8s ease-out forwards';
            }
        });
    }, observerOptions);
    
    timelineItems.forEach(item => {
        timelineObserver.observe(item);
    });
    
    // Ajout des animations CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rotate {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        
        @keyframes bounce {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeInLeft {
            from {
                opacity: 0;
                transform: translateX(-50px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        .skill-item {
            opacity: 0;
        }
        
        .timeline-item {
            opacity: 0;
        }
    `;
    document.head.appendChild(style);
    
    console.log('Portfolio Anaïs - Exact replica with new sections loaded! 🎨');
});