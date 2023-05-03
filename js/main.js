$(document).ready(function () {
  
  let timerId = null;
  let scrollY = 0;
  let screenHeight = screen.height;

  const msgCardActive = () => {
    clearTimeout(timerId);
    $('#messageCard').addClass('on');
    timerId = setTimeout(function () {
      $('#messageCard').removeClass('on');
    }, 3000);
  }

  let userAgent = navigator.userAgent;
  let isPC = !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  
  if (isPC) {
    $(window).resize(function () {
      if (screenHeight < $(window).height()) {
        screenHeight = $(window).height();
        $('#main.scroll').smoothWheel();
      }
    });
    $('#main.scroll').smoothWheel();
  } else {
    const wh = $(window).height();
    $(window).resize(function () {
      if(wh === $(document).height()) {
        $('#main')[0].scrollTo(0,999999);
      }
    });
  }

  $("#testP").click(function(){
    $('#main').animate({ scrollTop: sectionArray[7][0].offsetTop + 10 }, 400);
  })

  const form = document.getElementById('contactForm');
  $("#submitBtn").click(function(e){
    e.preventDefault();
    console.log("클릭")
    const v1 = $("#subjectInput").val();
    const v2 = $("#titleInput").val();
    const v3 = $("#emailInput").val();
    const v4 = $("#phoneInput").val();
    const v5 = $("#bodyInput").val();
    if(v2 === ""){
      $('#messageCard p').text("제목을 입력해주세요.");
      msgCardActive();
      return;
    }
    if(v3 === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v3)){
      $('#messageCard p').text("이메을을 확인해주세요.");
      msgCardActive();
      return;
    }
    if(v4 === "" || !/^[0-9]{9,11}$/i.test(v4)){
      $('#messageCard p').text("번호를 확인해주세요.");
      msgCardActive();
      return;
    }
    if(v5 === ""){
      $('#messageCard p').text("내용을 입력해주세요.");
      msgCardActive();
      return;
    }
    $(".loadingWrap.email").removeClass("open");
    const param = {
      pw : "WlGhks010!@#",
      from : v3,
      to : "nnkstory@naver.com",
      subject : `[${v1}] ${v2}`,
      title : v2,
      body : `
      <div style="margin: 16px 0 0 0; padding: 12px 12px 60px 12px;box-sizing: border-box;">
        <div style="padding: 34px; box-sizing: border-box;background: #fff;border-radius: 12px;box-shadow: 0 0.75rem 2rem 0 rgba(0, 0, 0, 0.1);">
          <h1 style="margin: 0;padding: 0; color: #414141;">'카리보'님의 사이트로부터 문의 메일이 도착했습니다.</h1>
          <p style="color: #999; margin: 8px 0 34px 0; padding: 0;">메일 내용은 아래와 같습니다.</p>
      
          <ul style="list-style: none;margin: 0 0 38px 0;padding: 0 0 18px 0; border-bottom: 1px solid rgb(231, 231, 231);">
            <li style="margin-bottom: 12px;">
              <dl style="display: flex;align-items: flex-start;">
                <dt style="min-width: 60px;opacity: .6; white-space: nowrap;">제목&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</dt>
                <dd style="margin: 0;padding: 0; font-weight: 600; opacity: .7">[${v1}] ${v2}</dd>
              </dl>  
            </li>
            <li style="margin-bottom: 12px;">
              <dl style="display: flex;align-items: flex-start;">
                <dt style="min-width: 60px;opacity: .6; white-space: nowrap;">이메일&nbsp;&nbsp;:&nbsp;&nbsp;</dt>
                <dd style="margin: 0;padding: 0; font-weight: 600; opacity: .7;">${v3}</dd>
              </dl>  
            </li>
            <li>
              <dl style="display: flex;align-items: flex-start;">
                <dt style="min-width: 60px;opacity: .6; white-space: nowrap;">연락처&nbsp;&nbsp;:&nbsp;&nbsp;</dt>
                <dd style="margin: 0;padding: 0; font-weight: 600; opacity: .7;">${v4}</dd>
              </dl>  
            </li>
          </ul>
          <p style="margin-top:30px;">${v5}</p>
        </div>
      </div>
      `
    }

    try {
      fetch ('https://port-0-email-service-687p2alh73yb2l.sel4.cloudtype.app/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(param),
      })
      .then((response) => response.text())
      .then((text) => {
        $("#titleInput").val("");
        $("#emailInput").val("");
        $("#phoneInput").val("");
        $("#bodyInput").val("");
        alert("메일 전송되었습니다!");
        $(".loadingWrap.email").addClass("open");
      })
      .catch((error) => {
        alert("메일 전송이 실패했습니다.");
        $(".loadingWrap.email").addClass("open");
      });
    } catch (error) {
      alert("메일 전송이 실패했습니다.");
      $(".loadingWrap.email").addClass("open");
    }
  })
  // 
  
  const sectionArray = [
    $('#section1'),
    $('#section2'),
    $('#section3'),
    $('#section4'),
    $('#section5'),
    $('#section6'),
    $('#section7'),
    $('#section8'),
  ];

  $('#phoneCopyBtn').click(function () {
    $('#messageCard p').text("클립보드에 복사되었습니다.")
    navigator.clipboard.writeText('01027251185').then(
      () => {
        msgCardActive();
      },
      (error) => {
        console.error('Error copying text: ', error);
      }
    );
  });
  $('#mailCopyBtn').click(function () {
    $('#messageCard p').text("클립보드에 복사되었습니다.")
    navigator.clipboard.writeText('nnkstory@naver.com').then(
      () => {
        msgCardActive();
      },
      (error) => {
        console.error('Error copying text: ', error);
      }
    );
  });

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
          sectionArray[i][0].offsetTop + $(sectionArray[i][0]).height() / 2 < $('#main').scrollTop()
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

});
