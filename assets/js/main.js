$(function () {
  // swiper slide 설정
  setSwiperSlide();
  // #btn-top 동작
  scrollToTop();
  // .group-news 탭 메뉴, 콘텐츠 전환
  changeNewsTab();

  $(window).on("scroll", () => {
    // header fixed 전환
    toggleHeaderFixed();
  });
});

function setSwiperSlide() {
  // 재생, 일시정지 전환
  function toggleSlideAutoplay(
    swiper,
    containerSelector,
    pauseSelector,
    playSelector
  ) {
    const container = $(containerSelector);
    container.find(pauseSelector).on("click", () => {
      swiper.autoplay.stop();
      container.find(playSelector).removeClass("hidden");
      container.find(pauseSelector).addClass("hidden");
    });
    container.find(playSelector).on("click", () => {
      swiper.autoplay.start();
      container.find(pauseSelector).removeClass("hidden");
      container.find(playSelector).addClass("hidden");
    });
  }

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

  $(".swiper-pagination").html((_, html) => html.replace(" / ", " - "));

  toggleSlideAutoplay(swiperVisual, ".sc-visual", ".btn-pause", ".btn-play");
  toggleSlideAutoplay(
    swiperParticipation,
    ".group-participation",
    ".pause",
    ".play"
  );
  toggleSlideAutoplay(swiperCitizen, ".sc-for-citizen", ".pause", ".play");
}
function toggleHeaderFixed() {
  let currentScroll = $(window).scrollTop();
  const mainTopPosition = $("#contents").offset().top;

  if (currentScroll < mainTopPosition) {
    $("#header").removeClass("fixed");
    $("#contents").css("margin-top", "0");
  } else {
    $("#header").addClass("fixed");
    $("#contents").css("margin-top", "305px");
  }
}
function scrollToTop() {
  $("#btn-top").on("click", () => {
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });
}
function changeNewsTab() {
  $(".group-news .tab").click(function (e) {
    e.preventDefault();
    const tabId = $(this).data("tab");

    // 단순 링크인 마지막 tab을 제외한
    if (tabId) {
      $(".group-news .tab").removeClass("on");
      $(this).addClass("on");
      $(".tab-item .content").removeClass("on");
      $(tabId).addClass("on");
    }
  });
}
