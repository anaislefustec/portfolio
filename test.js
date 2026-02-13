document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll pour la nouvelle Navbar
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target){
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation au survol des projets (les accordéons)
    const labels = document.querySelectorAll('.project-label');
    labels.forEach(label => {
        label.addEventListener('mouseenter', () => {
            const icon = label.querySelector('.plus-icon');
            if(icon) icon.style.transform = 'rotate(90deg)';
        });
        label.addEventListener('mouseleave', () => {
            const icon = label.querySelector('.plus-icon');
            if(icon) icon.style.transform = 'rotate(0deg)';
        });
    });
    
    // Animation simple des images
    const images = document.querySelectorAll('img');
    const observerOptions = { threshold: 0.1 };
    
    const imgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Initialiser les images pour l'animation
    images.forEach(img => {
        // On évite d'animer le hero trop violemment
        if(!img.classList.contains('hero-img-framed')) {
            img.style.transition = 'all 0.6s ease-out';
            img.style.opacity = '0';
            img.style.transform = 'translateY(20px)';
            imgObserver.observe(img);
        }
    });

    console.log('Portfolio Anaïs - Pop & Retro version loaded! 🍊');
});


    // --- DRAGGABLE ELEMENTS LOGIC ---

        const draggables = document.querySelectorAll('.draggable-item');
        let isDragging = false;
        let currentDraggable = null;
        // Variables pour stocker le décalage entre la souris et le coin de l'élément
        let offsetX = 0;
        let offsetY = 0;

        draggables.forEach(item => {
            item.addEventListener('mousedown', function(e) {
                isDragging = true;
                currentDraggable = item;

            // On récupère la position actuelle de l'élément
            const rect = item.getBoundingClientRect();
            
            // On calcule la distance entre la souris et le bord de l'élément
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;

                
                item.style.cursor = 'grabbing';
            });
        });

        // On écoute le mouvement sur tout le document
        document.addEventListener('mousemove', function(e) {
            if (!isDragging || !currentDraggable) return;

            e.preventDefault(); // Empêche la sélection de texte pendant le drag

            // Nouvelle position = position souris - décalage initial
            let x = e.clientX - offsetX;
            let y = e.clientY - offsetY;

            // On applique la nouvelle position. 
            // On utilise left/top fixes car les éléments sont en position: absolute
            // et on retire les transforms initiaux (rotation) qui gêneraient le calcul.
            currentDraggable.style.left = `${x}px`;
            currentDraggable.style.top = `${y}px`;
            // On réapplique une rotation nulle ou fixe pendant le déplacement pour éviter les bugs visuels
        });

        // Quand on relâche la souris n'importe où
        document.addEventListener('mouseup', function() {
            if (currentDraggable) {
                currentDraggable.style.cursor = 'grab';
                // Optionnel : remettre une petite rotation aléatoire quand on lâche
                // const randomRot = Math.random() * 10 - 5;
                // currentDraggable.style.transform = `scale(1) rotate(${randomRot}deg)`;
            }
            isDragging = false;
            currentDraggable = null;
        });