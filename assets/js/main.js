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
          return `<div class="count-wrap"><span class="current">${current}</span><span class="total">${total}</span></div>`;
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
// 현재 날씨 api 불러오기
function updateCurrentWeather() {
  // DOM 요소 선택 함수
  const select = (selector) => document.querySelector(selector);
  // 켈빈 값 섭씨 전환 함수
  const kelvinToCelsius = (kelvin) => Number((kelvin - 273.15).toFixed(1));
  // 현재 미세먼지 농도 판별 함수
  const getDustLevel = (value, criteria) => {
    return criteria.find(({ max }) => value < max)?.level;
  };

  // 날씨 아이콘 매칭 데이터
  const weatherConditions = {
    Clear: [1, "맑음"],
    Clouds: [2, "구름많음"],
    Atmosphere: [3, "흐림"],
    Drizzle: [4, "약간 비"],
    Rain: [5, "비"],
    Thunderstorm: [5, "비"],
    Snow: [6, "눈"],
  };
  // 미세먼지 등급 기준 정의 데이터
  const DUST_LEVEL_CRITERIA = {
    MISE: [
      { max: 20, level: "매우좋음" },
      { max: 50, level: "좋음" },
      { max: 100, level: "보통" },
      { max: 200, level: "나쁨" },
      { max: Infinity, level: "매우나쁨" },
    ],
    CHOMISE: [
      { max: 10, level: "매우좋음" },
      { max: 25, level: "좋음" },
      { max: 50, level: "보통" },
      { max: 75, level: "나쁨" },
      { max: Infinity, level: "매우나쁨" },
    ],
  };

  // API 설정
  const API_KEY = "a0c827574282769ea9891a4c77025012";
  const WEATHER_API = "https://api.openweathermap.org/data/2.5/weather";
  const POLLUTION_API = "https://api.openweathermap.org/data/2.5/air_pollution";

  async function getWeatherData() {
    try {
      // 날씨 정보와 대기오염 정보를 동시에 가져오기
      const [weatherResponse, pollutionResponse] = await Promise.all([
        fetch(`${WEATHER_API}?q=incheon&appid=${API_KEY}`),
        fetch(`${POLLUTION_API}?lat=37.45&lon=126.4161&appid=${API_KEY}`),
      ]);

      if (!weatherResponse.ok || !pollutionResponse.ok) {
        throw new Error(`
        날씨 API 상태: ${weatherResponse.status}
        대기오염 API 상태: ${pollutionResponse.status}
      `);
      }

      // 응답 데이터 파싱
      const weatherData = await weatherResponse.json();
      const pollutionData = await pollutionResponse.json();

      // 필요한 데이터 추출
      const weatherMainCode = weatherData.weather[0].main;
      const temperature = kelvinToCelsius(weatherData.main.temp);
      const pm10 = pollutionData.list[0].components.pm10;
      const pm25 = pollutionData.list[0].components.pm2_5;

      // 날씨 아이콘 업데이트
      select(".current-weather > a").insertAdjacentHTML(
        "afterbegin",
        `<img class="weather-icon" data-weather-icon src="" alt />`
      );
      const weatherIcon = `weather_0${weatherConditions[weatherMainCode][0]}.png`;
      const weatherAlt = weatherConditions[weatherMainCode][1];

      // 미세먼지 등급 계산
      const miseLevel = getDustLevel(pm10, DUST_LEVEL_CRITERIA.MISE);
      const chomiseLevel = getDustLevel(pm25, DUST_LEVEL_CRITERIA.CHOMISE);

      // DOM 업데이트
      select(
        "[data-weather-icon]"
      ).src = `assets/images/weather/${weatherIcon}`;
      select("[data-weather-icon]").alt = weatherAlt;
      select("[data-weather-temper]").textContent = temperature;
      select("[data-dust-mise]").textContent = miseLevel;
      select("[data-dust-chomise]").textContent = chomiseLevel;
    } catch (error) {
      console.error("날씨 정보 조회 실패:", error);
    }
  }

  getWeatherData();
}

$(function () {
  setSwiperSlide();
  scrollToTop();
  changeNewsTab();
  toggleHeaderFixed();
  updateCurrentWeather();
});

// json 기반 메가메뉴 생성
// keydown
