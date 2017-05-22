/**
 * Created by Darre on 17/5/22.
 */
$(function () {
  if (!window.showQuestion) {
    showQuestion = new renderQuestion();
    showQuestion.render(1);  //页面初始化时渲染第一则问题
    showQuestion.current = 1;
  }
  var pauseflag = false;    //暂停开关
  $(".musicbtn").on("click", function () {
    var bgm = document.getElementById("BGM");
    if (!pauseflag) {
      bgm.pause();
      $(this).addClass("close");
    } else {
      bgm.play();
      $(this).removeClass("close");
    }
    pauseflag = !pauseflag;
  })
  $(".beginPage .btn").on("click", function () {
    var _this = $(this)
    setTimeout(function () {
      _this.parent(".beginPage").hide();
      showQuestion.show();   //开始问题已
    }, 400)

  })
  $("#questionTemplate .answers ul li").on("click",function(){
    $(this).parent('ul').find("li").removeClass("choosed");
    $(this).addClass("choosed");
  })

  $("#questionTemplate .answer_confirm").on("click",function(){
    setTimeout(function(){
      var char = showQuestion.template.find(".choosed").attr("index");
      var question = window.question;
      var direct = question[showQuestion.current-1]['answer'+char].direct;
      $("#questionTemplate").removeClass("problemup");
      $(direct).show();
      console.log(direct)
    },400)
  })
  $(".questionRetry .applyerror,.questionEnd .applysuccess").on("click",function () {
    var _this = $(this);
    var type = $(this).find('img').attr('type');



    setTimeout(function(){
      if(showQuestion.current<=3){
        _this.parent('.page').hide();
        if(type=='back'){
          //返回当前问题
          showQuestion.show();
        }else if(type=='forwards'){
          showQuestion.current++;
          showQuestion.render(showQuestion.current);
          showQuestion.show();
        }
      }else if(showQuestion.current==4){
        //跳转到填信息界面
        _this.parent('.page').hide();
        var domStr = ".gameEnd";
        $(domStr).addClass('rightslide')

      }
    },200)
  });
})