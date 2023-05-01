$(document).ready(function () {
  let scrollY = 0;
  let screenHeight = screen.height;
  // console.log($('#main .inner').children());
  const sectionArray = [
    $('#section1'),
    $('#section2'),
    $('#section3'),
    $('#section4'),
    $('#section5'),
    $('#section6'),
    $('#section7'),
  ];

  $('#phoneCopyBtn').click(function () {
    navigator.clipboard.writeText('01027251185').then(
      () => {
        alert('텍스트가 복사되었습니다.');
      },
      (error) => {
        console.error('Error copying text: ', error);
      }
    );
  });
  $('#mailCopyBtn').click(function () {
    navigator.clipboard.writeText('nnkstory@naver.com').then(
      () => {
        alert('텍스트가 복사되었습니다.');
      },
      (error) => {
        console.error('Error copying text: ', error);
      }
    );
  });

  // window.navigator.clipboard.writeText('테스트 복사').then(
  //   () => {
  //     // 복사가 완료되면 이 부분이 호출된다.
  //     alert('복사 완료!');
  //   },
  //   (error) => {
  //     console.error('Error copying text: ', error);
  //   }
  // );

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

  $('.close__btn').click(function () {
    $('#swiperWrap').removeClass('on');
  });

  $('nav ul>li>.icon').click(function () {
    const idx = $(this).parent().index();
    if (scrollY < idx) {
      $('#main').animate({ scrollTop: sectionArray[idx][0].offsetTop + 10 }, 400);
    } else {
      $('#main').animate({ scrollTop: sectionArray[idx][0].offsetTop - 10 }, 400);
      $('#main').animate({ scrollTop: sectionArray[idx][0].offsetTop + 0.0001 }, 10);
    }
  });

  let lastScrollY = 0;
  $('#main.scroll').scroll(function () {
    const lScrollY = $('#main').scrollTop();
    // 이전의 스크롤 위치와 비교하기
    const direction = lScrollY > lastScrollY ? 'Scroll Down' : 'Scroll Up';
    // 현재의 스크롤 값을 저장
    lastScrollY = lScrollY;
    if (direction === 'Scroll Down') {
      for (let i = 0; i < sectionArray.length; i++) {
        if (sectionArray[i][0].offsetTop - 20 < $('#main').scrollTop()) {
          if (scrollY < i) {
            scrollY = i;
            activeSection(i);
          }
        } else {
          if ($('#main').scrollTop() === 0) {
            scrollY = 0;
            activeSection(0);
          }
          if (scrollY > i) {
            scrollY = i;
            activeSection(i);
          }
        }
      }
    } else if (direction === 'Scroll Up') {
      for (let i = 0; i < sectionArray.length; i++) {
        if (
          sectionArray[i][0].offsetTop + $(sectionArray[i][0]).height() / 2 <
          $('#main').scrollTop()
        ) {
          if (scrollY < i) {
            scrollY = i;
            activeSection(i);
          }
        } else {
          if ($('#main').scrollTop() === 0) {
            scrollY = 0;
            activeSection(0);
          }
          if (scrollY > i) {
            scrollY = i;
            activeSection(i);
          }
        }
      }
    }
  });

  const activeSection = (idx) => {
    $('nav ul>li').removeClass('on');
    $('#main>.inner>section').removeClass('on');
    $('nav ul>li').eq(idx).addClass('on');
    $('#main>.inner>section').eq(idx).addClass('on');
  };

  $(window).resize(function () {
    if (screenHeight < $(window).height()) {
      screenHeight = $(window).height();
      $('#main.scroll').smoothWheel();
    }
  });
  $('#main.scroll').smoothWheel();
});
