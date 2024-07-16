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
    nextEl: ".sc-visual .swiper-button-next",
    prevEl: ".sc-visual .swiper-button-prev",
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
    nextEl: ".group-participation .swiper-button-next",
    prevEl: ".group-participation .swiper-button-prev",
  },
});

$(".swiper-pagination").html((_, html) => html.replace(" / ", " - "));

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
