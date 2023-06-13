const pageInit = () => {
  $('nav>ul').append(`
  <li>
    <span class="icon"></span>
    <span>
      <p class="f__tb">문의하기</p>
    </span>
  </li>
`);

  $('#main>.inner').append(`
<section class="contactus">
        <div class="inner">
          <form id="contactForm">
            <div>
              <ul>
                <li>
                  <label class="f__tb" for="subjectInput">카테고리</label>
                  <span>
                    <input type="text" id="subjectInput" readonly value="웹툰문의" name="subject" />
                    <ul id="categorySelect">
                      <li class="on">웹툰문의</li>
                      <li>디자인문의</li>
                      <li>기타문의</li>
                    </ul>
                  </span>
                </li>
                <li>
                  <label class="f__tb" for="titleInput">제목</label>
                  <span>
                    <input type="text" id="titleInput" name="title" />
                  </span>
                </li>
                <li>
                  <label class="f__tb" for="bodyInput">내용</label>
                  <span>
                    <textarea name="body" id="bodyInput"></textarea>
                  </span>
                </li>
                <li>
                  <label class="f__tb" for="phoneInput">연락처</label>
                  <span>
                    <input type="number" id="phoneInput" name="phone" placeholder="- 빼고 숫자만 입력해주세요." />
                  </span>
                </li>
                <li>
                  <label class="f__tb" for="emailInput">이메일</label>
                  <span>
                    <input placeholder="연락받을 이메일을 적어주세요." type="email" id="emailInput" name="email" />
                  </span>
                </li>
                <li>
                  <button class="f__tb" id="submitBtn">보내기</button>
                </li>
              </ul>
            </div>
          </form>
        </div>
      </section> `);

  let timerId = null;
  let scrollY = 0;

  const msgCardActive = () => {
    clearTimeout(timerId);
    $('#messageCard').addClass('on');
    timerId = setTimeout(function () {
      $('#messageCard').removeClass('on');
    }, 3000);
  };

  $('#subjectInput').click(function () {
    $('#categorySelect').addClass('on');
  });

  $('#categorySelect li').click(function () {
    $('#categorySelect li').removeClass('on');
    $(this).addClass('on');
    $('#subjectInput').val($(this).text());
    $('#categorySelect').removeClass('on');
  });

  $('#submitBtn').click(function (e) {
    e.preventDefault();
    const v1 = $('#subjectInput').val();
    const v2 = $('#titleInput').val();
    const v3 = $('#emailInput').val();
    const v4 = $('#phoneInput').val();
    const v5 = $('#bodyInput').val();
    if (v2 === '') {
      $('#messageCard p').text('제목을 입력해주세요.');
      msgCardActive();
      return;
    }
    if (v3 === '' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v3)) {
      $('#messageCard p').text('이메일을 확인해주세요.');
      msgCardActive();
      return;
    }
    if (v4 === '' || !/^[0-9]{9,11}$/i.test(v4)) {
      $('#messageCard p').text('번호를 확인해주세요.');
      msgCardActive();
      return;
    }
    if (v5 === '') {
      $('#messageCard p').text('내용을 입력해주세요.');
      msgCardActive();
      return;
    }
    $('.loadingWrap.email').removeClass('open');
    const param = {
      pw: 'WlGhks010!@#',
      from: v3,
      to: 'wlghks0106@naver.com',
      // nnkstory@naver.com
      subject: `[${v1}] ${v2}`,
      title: v2,
      body: `
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
        `,
    };

    try {
      fetch('https://kimjihodo.synology.me:3001/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(param),
      })
        .then((response) => response.text())
        .then((text) => {
          $('#titleInput').val('');
          $('#emailInput').val('');
          $('#phoneInput').val('');
          $('#bodyInput').val('');
          alert('메일 전송되었습니다!');
          $('.loadingWrap.email').addClass('open');
        })
        .catch((error) => {
          console.log(error);
          alert('메일 전송이 실패했습니다.');
          $('.loadingWrap.email').addClass('open');
        });
    } catch (error) {
      console.log(error);
      alert('메일 전송이 실패했습니다.');
      $('.loadingWrap.email').addClass('open');
    }
  });
  //

  const sectionArray = $('section');

  $('#phoneCopyBtn').click(function () {
    $('#messageCard p').text('클립보드에 복사되었습니다.');
    navigator.clipboard.writeText($('#userInfoList .phone dd').text().replaceAll('-', '')).then(
      () => {
        msgCardActive();
      },
      (error) => {
        console.error('Error copying text: ', error);
      }
    );
  });
  $('#mailCopyBtn').click(function () {
    $('#messageCard p').text('클립보드에 복사되었습니다.');
    navigator.clipboard.writeText($('#userInfoList .email dd').text()).then(
      () => {
        msgCardActive();
      },
      (error) => {
        console.error('Error copying text: ', error);
      }
    );
  });

  $('.close__btn').click(function () {
    $('#swiperWrap').removeClass('on');
  });

  $('nav ul>li>.icon').click(function () {
    const idx = $(this).parent().index();
    if (scrollY < idx) {
      $('#main').animate({ scrollTop: sectionArray[idx].offsetTop + 10 }, 400);
    } else {
      $('#main').animate({ scrollTop: sectionArray[idx].offsetTop - 10 }, 400);
      $('#main').animate({ scrollTop: sectionArray[idx].offsetTop + 0.0001 }, 10);
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
        if (sectionArray[i].offsetTop - 20 < $('#main').scrollTop()) {
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
        if (sectionArray[i].offsetTop + $(sectionArray[i]).height() / 2 < $('#main').scrollTop()) {
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
};
