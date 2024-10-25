// swiper slide 설정
function setSwiperSlide() {
  // 재생, 일시정지 전환
  function toggleSlideAutoplay(
    swiper,
    $container,
    pauseSelector,
    playSelector
  ) {
    const $pauseBtn = $container.find(pauseSelector);
    const $playBtn = $container.find(playSelector);

    $pauseBtn.on("click", () => {
      swiper.autoplay.stop();
      $playBtn.removeClass("hidden");
      $pauseBtn.addClass("hidden");
    });

    $playBtn.on("click", () => {
      swiper.autoplay.start();
      $pauseBtn.removeClass("hidden");
      $playBtn.addClass("hidden");
    });
  }
  // visual, participation 공통 Swiper 생성 함수
  function createSwiper(selector, paginationEl, navigationConfig) {
    return new Swiper(selector, {
      loop: true,
      speed: 500,
      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
      },
      pagination: {
        el: paginationEl,
        type: "custom",
        renderCustom: (_, current, total) => {
          return `<span><span style="color: #f7b02a; font-weight: 600;">${current}</span> - ${total}</span>`;
        },
      },
      navigation: navigationConfig,
    });
  }

  const swiperVisual = createSwiper(
    ".swiper.visual",
    ".sc-visual .swiper-pagination",
    {
      nextEl: ".sc-visual .swiper-button-next, .sc-visual .btn-next",
      prevEl: ".sc-visual .swiper-button-prev, .sc-visual .btn-prev",
    }
  );
  const swiperParticipation = createSwiper(
    ".swiper.participation",
    ".group-participation .swiper-pagination",
    {
      nextEl:
        ".group-participation .swiper-button-next, .group-participation .btn-next",
      prevEl:
        ".group-participation .swiper-button-prev, .group-participation .btn-prev",
    }
  );
  const swiperCitizen = new Swiper(".swiper.citizen", {
    slidesPerView: 4,
    spaceBetween: 16,
    speed: 1000,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper.citizen .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".sc-for-citizen .btn-next",
      prevEl: ".sc-for-citizen .btn-prev",
    },
  });

  toggleSlideAutoplay(swiperVisual, $(".sc-visual"), ".btn-pause", ".btn-play");
  toggleSlideAutoplay(
    swiperParticipation,
    $(".group-participation"),
    ".btn-pause",
    ".btn-play"
  );
  toggleSlideAutoplay(
    swiperCitizen,
    $(".sc-for-citizen"),
    ".btn-pause",
    ".btn-play"
  );
}
// #btn-top 동작
function scrollToTop() {
  $("#btn-top").on("click", () => {
    $("html, body").animate({ scrollTop: 0 }, "slow");
  });
}
// .group-news 탭 메뉴, 콘텐츠 전환
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
// header fixed 전환
function toggleHeaderFixed() {
  const mainTopPosition = $("#contents").offset().top;

  $(window).on("scroll", () => {
    const $header = $("#header");
    const isFixed = $(window).scrollTop() >= mainTopPosition;

    $header.toggleClass("fixed", isFixed);
    $("#contents").css("margin-top", isFixed ? "305px" : "0");
  });
}

$(function () {
  setSwiperSlide();
  scrollToTop();
  changeNewsTab();
  toggleHeaderFixed();
});

// json 기반 메가메뉴 생성
// api 기반 날씨 업데이트
