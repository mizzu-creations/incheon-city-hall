const swiperVisual = new Swiper(".swiper.visual", {
  loop: true,
  speed: 500,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".sc-visual .swiper-pagination",
    type: "fraction",
  },
  navigation: {
    nextEl:
      ".sc-visual .swiper-button-next, .sc-visual .swiper-footer .btn-next",
    prevEl:
      ".sc-visual .swiper-button-prev,  .sc-visual .swiper-footer .btn-prev",
  },
});

const swiperParticipation = new Swiper(".swiper.participation", {
  loop: true,
  speed: 500,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".group-participation .swiper-pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".group-participation .swiper-button-next, .next",
    prevEl: ".group-participation .swiper-button-prev, .prev",
  },
});

$(".swiper-pagination").html((_, html) => html.replace(" / ", " - "));

const swiperCitizen = new Swiper(".swiper.citizen", {
  slidesPerView: 4,
  spaceBetween: 16,
  speed: 1000,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".sc-for-citizen .next",
    prevEl: ".sc-for-citizen .prev",
  },
});
