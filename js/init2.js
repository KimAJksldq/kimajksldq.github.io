document.addEventListener('DOMContentLoaded', function () {
  let userAgent = navigator.userAgent;
  let isPC = !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  let screenHeight = screen.height;
  if (isPC) {
    $(window).resize(function () {
      if (screenHeight < $(window).height()) {
        screenHeight = $(window).height();
        $('#main.scroll').smoothWheel();
      }
    });
    // $('#main.scroll').smoothWheel();
  } else {
    const dh = $(document).height();
    $(window).resize(function () {
      if (dh === $(document).height()) {
        $('#main')[0].scrollTo(0, 999999);
      }
    });
  }

  $('td-card').click(function () {
    if ($(this).attr('class') === 'card-0') {
      $('#swiperWrap .mySwiper').remove();
      $('#swiperWrap').append(`
          <section class="mySwiper swiper-container"></section>
        `);
      $('#galleryImgWrap')
        .children()
        .eq($(this).attr('data-index'))
        .clone()
        .addClass('swiper-wrapper')
        .appendTo('.mySwiper.swiper-container');
      $('#swiperWrap').addClass('on');
      const mySwiper = new Swiper('.swiper-container', options);
      mySwiper.init();
    }
  });
});
