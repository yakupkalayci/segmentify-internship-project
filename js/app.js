const swiper = new Swiper(".swiper", {
    // Optional parameters
    direction: "horizontal",
    autoHeight: true,
    slidesPerView: 4,

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    // Responsive Breakpoints
    breakpoints: {
      250: {
         slidesPerView: 1,
      },
      480: {
        slidesPerView: 2,
      },
      710: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
      },
    },
});
