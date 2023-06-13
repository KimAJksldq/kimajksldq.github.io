const cardArray = [];
let completedImgCnt = 0;
const loadingImg = () => {
  completedImgCnt = completedImgCnt + 1;
  // if (completedImgCnt === 16) {
  //   $('.loadingWrap.pencil').addClass('open');
  // }
  console.log(completedImgCnt);
  $('.loadingWrap.pencil').addClass('open');
};
const userId = 'caribo1129';
const ptId = 'ptid01';
// fetch('http://localhost:3000/site/popolInfo', {
fetch('https://kimjihodo.synology.me:3001/site/popolInfo', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId,
    ptId,
  }),
})
  .then((res) => res.json())
  .then((res) => {
    const popolInfo = res.response.popolInfo;
    const worksInfo = res.response.worksInfo;
    const snsJson = popolInfo.sns !== '' && popolInfo.sns !== null ? JSON.parse(popolInfo.sns) : {};
    const snsKeys = Object.keys(snsJson);
    const snsValues = Object.values(snsJson);
    let webtoonSize = 0;
    let gallerySize = 1;

    const initWorks = (callback) => {
      let completedCount = 0;
      const totalWorks = worksInfo.length;

      function checkCompletion() {
        completedCount++;
        if (completedCount === totalWorks) {
          callback();
          $('nav>ul').append(`
          <li>
            <span class="icon"></span>
            <span>
              <p class="f__tb">그 외 작업물</p>
            </span>
          </li>
          `);
        }
      }

      if (snsKeys.length > 0) {
        snsKeys.map((obj, idx) => {
          $('#userInfoList').append(`
              <li>
                <a href="${snsValues[idx].link}" target="_blank">
                  <dl>
                    <dt>
                      <img src="https://site.mypopol.com/src/img/icon/${popolInfo.icon}/${obj}.png" alt="${obj}" />  
                    </dt>  
                    <dd class="f__tb">${snsValues[idx].id}</dd>
                  </dl>  
                </a>
              </li>
            `);
        });
      }

      for (let i = 0; i < worksInfo.length; i++) {
        if (worksInfo[i].workId === 1) {
          webtoonSize += 1;
          const siteArray = [];
          const etcJson = JSON.parse(worksInfo[i].etc);
          etcJson.website.map((obj, idx) => {
            if (['lezhin', 'kakao', 'naver', 'ridi', 'series'].includes(obj.name)) {
              siteArray.push(`
                          <li class="${obj.name}">
                            <a href="${obj.link}" target="_blank">
                              <img src="https://site.mypopol.com/src/img/icon/${obj.name}.png" />
                            </a>
                          </li>
                        `);
            } else {
              siteArray.push(`
                          <li style="background: ${obj.color};box-shadow : 0 10px 20px -6px ${
                obj.color === '#fff' ? 'rgb(211, 211, 211)' : obj.color
              }">
                            <a href="${obj.link}" target="_blank">
                              <img src="./img//${obj.img}" />
                            </a>
                          </li>
                        `);
            }
          });
          const newEl = `
          <section>
            <div class="inner">
              <img onload="loadingImg()" src="./img/${
                worksInfo[i].poster
              }" alt="제3경호팀 포스터" />
              <dl>
                <dt>
                  <img onload="loadingImg()" src="./img/${etcJson.logo}" alt="제3경호팀 로고" />
                  <ul>
                    <li class="f__tb">${worksInfo[i].subTitle}</li>
                    <li class="f__yun">
                      ${worksInfo[i].summary.replace(/\n/g, '<br>')}
                    </li>
                  </ul>
                </dt>
                <dd>
                  <ul>${siteArray.join('').replace(/\n|\s{2,}/g, '')}</ul>
                </dd>
              </dl>
            </div>
          </section>
          `;
          const parentEl = $('#main>.inner');
          const nthChild = parentEl.children().eq(0 + i);
          nthChild.after(newEl);
          $('nav>ul').append(`
          <li>
            <span class="icon"></span>
            <span>
              <p class="f__tb">${worksInfo[i].title}</p>
            </span>
          </li>
          `);
          checkCompletion();
        }
        // else if (worksInfo[i].workId === 2) {
        //   const subImgArray = [];
        //   const etcJson = worksInfo[i].etc !== '' ? JSON.parse(worksInfo[i].etc) : {};
        //   const imgSrc = `./img/${worksInfo[i].poster}`;
        //   cardArray.push({
        //     image: imgSrc,
        //   });

        //   if ('subImg' in etcJson) {
        //     console.log('키가 유효합니다.');
        //     etcJson.subImg.map((obj, idx) => {
        //       subImgArray.push(`
        //         <div class="swiper-slide">
        //           <div class="img__box">
        //             <img onload="loadingImg()" src="./img/${obj.img}" alt="${obj.title}" />
        //           </div>
        //         </div>
        //       `);
        //     });
        //     $('#galleryImgWrap').append(`
        //       <div>
        //         ${subImgArray.join('').replace(/\n|\s{2,}/g, '')}
        //       </div>
        //     `);
        //   } else {
        //     console.log('키가 유효하지 않습니다.');
        //   }
        //   checkCompletion();
        // }
      }
      callback();
    };

    const initDetail = () => {
      const viewHeight = (2 + webtoonSize + gallerySize) * 100;
      $('main>.inner').css({ height: `calc(${viewHeight}vh + ${90 + viewHeight}px)` });
      $('#titleTxt').html(popolInfo.title.replace(/\n/g, '<br>'));
      $('#userInfoList .phone dd').text(popolInfo.phone);
      $('#userInfoList .email dd').text(popolInfo.email);
      $('#phoneIcon').attr(
        'src',
        `https://site.mypopol.com/src/img/icon/${popolInfo.icon}/phone.png`
      );
      $('#emailIcon').attr(
        'src',
        `https://site.mypopol.com/src/img/icon/${popolInfo.icon}/mail.png`
      );
      if (popolInfo.profileImg !== null && popolInfo.profileImg !== '') {
        $('#profileImg').attr('src', './img/' + popolInfo.profileImg);
      } else {
        $('#profileImg').attr('src', 'https://site.mypopol.com/src/img/profile.jpg');
      }
      $('#main.scroll').smoothWheel();
    };

    initWorks(initDetail);

    const rgbaTxt = popolInfo.mainColor.replace('rgb', 'rgba').replace(')', '');
    document.documentElement.style.setProperty('--main-color', popolInfo.mainColor);
    document.documentElement.style.setProperty('--main-color_08', rgbaTxt + ', .8)');
    document.documentElement.style.setProperty('--main-color_06', rgbaTxt + ', .6)');
    document.documentElement.style.setProperty('--main-color_04', rgbaTxt + ', .4)');
    document.documentElement.style.setProperty('--main-color_02', rgbaTxt + ', .2)');
    pageInit();
  })
  .catch((e) => {
    console.log(e);
  });
