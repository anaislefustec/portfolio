var swiper = new Swiper(".swiperMinimal", {
    slidesPerView: 4, // Nombre d'icônes visibles (ajuste selon ton goût)
    spaceBetween: 20, // Espace entre les icônes
    loop: true,       // Boucle infinie
    
    // Configuration de l'autoplay continu
    speed: 1500,      // Vitesse (plus le chiffre est grand, plus c'est lent)
    autoplay: {
        delay: 0,     // Pas de pause entre les mouvements
        disableOnInteraction: false, // Continue même si on touche
    },
    
    breakpoints: {
        320: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 5,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 7,
            spaceBetween: 40,
        },
    },
});