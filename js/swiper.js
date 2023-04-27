const swiperEl = document.querySelector('.swiper-wrapper');

const bannerActive = (index) => {};

const options = {
  init: false,
  speed: 1500,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    350: {
      slidesPerView: 1,
      spaceBetween: 0,
      allowTouchMove: true,
      // 터치 방지
    },
  },
  // Events
  on: {
    imagesReady: function () {
      this.el.classList.remove('loading');
    },
    activeIndexChange: function () {
      bannerActive(this.realIndex);
    },
  },
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
};
