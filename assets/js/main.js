const swiperVisual = new Swiper(".swiper.visual", {
  loop: true,
  speed: 500,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-footer .swiper-pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".sc-visual .swiper-button-next",
    prevEl: ".sc-visual .swiper-button-prev",
  },
});

$(".group-right .swiper-pagination").html((_, html) =>
  html.replace(" / ", " - ")
);

const swiperParticipation = new Swiper(".swiper.participation", {
  loop: true,
  speed: 500,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const swiperCitizen = new Swiper(".swiper.citizen", {
  loop: true,
  slidesPerView: 4,
  spaceBetween: 10,
  speed: 1000,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
