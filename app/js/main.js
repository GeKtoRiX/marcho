$(function () {

  // --- ОБРАБОТЧИК 1: УПРАВЛЕНИЕ АКТИВНОЙ КНОПКОЙ ---
  // Этот код отвечает ТОЛЬКО за переключение класса --active
  $('.shop__content-filter-btn').on('click', function () {
    // Проверяем, не является ли кнопка уже активной
    if (!$(this).hasClass('shop__content-filter-btn--active')) {
      // Убираем класс у всех кнопок
      $('.shop__content-filter-btn').removeClass('shop__content-filter-btn--active');
      // Добавляем класс только нажатой кнопке
      $(this).addClass('shop__content-filter-btn--active');
    }
  });

  // --- ОБРАБОТЧИК 2: КЛИК ПО КНОПКЕ "СПИСОК" ---
  // Этот код отвечает ТОЛЬКО за включение режима списка
  $('.button-list').on('click', function () {
    $('.product-item').addClass('product-item--list');
    $('.shop__content-inner').addClass('shop__content-inner--list');
  });

  // --- ОБРАБОТЧИК 3: КЛИК ПО КНОПКЕ "СЕТКА" ---
  // Этот код отвечает ТОЛЬКО за включение режима сетки
  $('.button-grid').on('click', function () {
    $('.product-item').removeClass('product-item--list');
    $('.shop__content-inner').removeClass('shop__content-inner--list');
  });

  // select styles
  $(".select-style").styler();

  //rangeSlider
  $(".filter-price__input").ionRangeSlider({
    skin: "flat",
    type: "double",
    hide_min_max: true,
    hide_from_to: true,
    onStart: function (data) {
      $(".filter-price__from").text(data.from);
      $(".filter-price__to").text(data.to);
    },
    onChange: function (data) {
      $(".filter-price__from").text(data.from);
      $(".filter-price__to").text(data.to);
    },
  });

  // Slider
  $(".top-slider__inner").slick({
    dots: true,
    arrows: false,
    fade: true,
    autoplay: true,
    autoplaySpeed: 8000,
  });

  // Rating stars
  $(".stars").rateYo({
    starWidth: "17px",
    normalFill: "#ccccce",
    ratedFill: "#ffc35b",
    readOnly: true,
  });

  // Countdown
  function getTimeRemaining(endtime) {
    var t = Date.parse(endtime) - Date.parse(new Date());
    var seconds = Math.floor((t / 1000) % 60);
    var minutes = Math.floor((t / 1000 / 60) % 60);
    var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    var days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      total: t,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  }

  function initializeClock(id, endtime) {
    var clock = document.querySelector(".countdown");
    var daysSpan = clock.querySelector(".countdown__days");
    var hoursSpan = clock.querySelector(".countdown__hours");
    var minutesSpan = clock.querySelector(".countdown__minutes");
    var secondsSpan = clock.querySelector(".countdown__seconds");

    function updateClock() {
      var t = getTimeRemaining(endtime);

      daysSpan.innerHTML = ("0" + t.days).slice(-2);
      hoursSpan.innerHTML = ("0" + t.hours).slice(-2);
      minutesSpan.innerHTML = ("0" + t.minutes).slice(-2);
      secondsSpan.innerHTML = ("0" + t.seconds).slice(-2);

      if (t.total <= 0) {
        clearInterval(timeinterval);
      }
    }

    updateClock();
    var timeinterval = setInterval(updateClock, 1000);
  }
  var deadline = $(".countdown").attr("data-time");
  initializeClock(".countdown", deadline);

});
