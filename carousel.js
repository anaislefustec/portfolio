const swiper = new Swiper('.slider-wrapper', {
    loop: true,
    spaceBetween: 50,
  
    pagination: {
      el: '.swiper-pagination',
      clickable : true,
      dynamicBullets : true
    },
  
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        0: {
            slidesPerView : 1
        },
        769: {
            slidesPerView : 2
        },
        1024: {
            slidesPerView : 3
        },
    }
  
  });

