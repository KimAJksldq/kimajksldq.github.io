$(document).ready(function () {
    let scrollY = 0;
    let screenHeight = screen.height;
    const sectionArray  = [
      $("#section1"),
      $("#section2"),
      $("#section3"),
      $("#section4"),
      $("#section5"),
      $("#section6"),
    ]

    $("td-card").click(function(){
      if($(this).attr("class") === "card-0"){
        $("#swiperWrap").addClass("on")
      }
    })

    $(".close__btn").click(function(){
      $("#swiperWrap").removeClass("on")
    })

    $("nav ul>li>.icon").click(function () {
      const idx = $(this).parent().index();
      if(scrollY < idx) {
        $('#main').animate({scrollTop : sectionArray[idx][0].offsetTop + 10 }, 400);
      } else {
        $('#main').animate({scrollTop : sectionArray[idx][0].offsetTop - 10  }, 400);
        $('#main').animate({scrollTop : sectionArray[idx][0].offsetTop + 0.0001 }, 10);
      }
    });

    let lastScrollY = 0;
    $("#main.scroll").scroll(function(){
        const lScrollY = $("#main").scrollTop();
        // 이전의 스크롤 위치와 비교하기
        const direction = lScrollY > lastScrollY ? "Scroll Down" : "Scroll Up";
         // 현재의 스크롤 값을 저장
        lastScrollY = lScrollY;
        if(direction === "Scroll Down"){
          for(let i = 0 ; i < sectionArray.length ; i ++) {
            if(sectionArray[i][0].offsetTop - 20 < $("#main").scrollTop()) {
              if(scrollY < i) {
                scrollY = i;
                activeSection(i)
              } 
            } else {
              if($("#main").scrollTop() === 0) {
                scrollY = 0
                activeSection(0)
              }
              if(scrollY > i) {
                scrollY = i
                activeSection(i)
              } 
            }
          } 
        } else if (direction === "Scroll Up") {
          for(let i = 0 ; i < sectionArray.length ; i ++) {
            if(sectionArray[i][0].offsetTop + $(sectionArray[i][0]).height() / 2 < $("#main").scrollTop()) {
              if(scrollY < i) {
                scrollY = i;
                activeSection(i)
              } 
            } else {
              if($("#main").scrollTop() === 0) {
                scrollY = 0
                activeSection(0)
              }
              if(scrollY > i) {
                scrollY = i
                activeSection(i)
              } 
            }
          } 
        }
    })

    const activeSection = (idx) => {
      $("nav ul>li").removeClass("on")
      $("#main>.inner>section").removeClass("on")
      $("nav ul>li").eq(idx).addClass("on")
      $("#main>.inner>section").eq(idx).addClass("on")
    }

    $(window).resize(function(){
      if(screenHeight < $(window).height()){
        screenHeight = $(window).height()
        $("#main.scroll").smoothWheel();
      } 
    })
    $("#main.scroll").smoothWheel();
  });