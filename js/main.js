/**
 * Created by Darre on 17/5/22.
 */
$(function () {
  try {
    document.getElementById("BGM").play();
  }catch(err){}
  if (!window.showQuestion) {
    showQuestion = new renderQuestion();
    showQuestion.render(1);  //页面初始化时渲染第一则问题
    showQuestion.current = 1;
  }
  window.loadingindex =  0;
  ~function loading(){
    window.loading = setInterval(function(){
      loadingindex++;
      if(loadingindex%4===3){
        $(".loadingindex2,.loadingindex3,.loadingindex1").show();
      }else if(loadingindex%4===2){
        $(".loadingindex2,.loadingindex3,.loadingindex1").show();
        $(".loadingindex3").hide();
      }else if(loadingindex%4===1){
        $(".loadingindex2,.loadingindex3,.loadingindex1").hide();
        $(".loadingindex1").show();
      }else if(loadingindex%4===0){
        $(".loadingindex2,.loadingindex3,.loadingindex1").hide();
      }
    },300)
    setTimeout(function(){
      window.loadingindex =  0;
      clearInterval(window.loading);
      $(".loading").hide();
      $(".beginPage").show(500);
    },1500)
  }()
  var pauseflag = false;    //暂停开关'
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
  //狂点页面逻辑
  var timeCount = 10;
  var clickChance = 0
  function caltime(){
    window.calTimeCount = setInterval(function () {
      if(timeCount>=1){
        timeCount--;
        var str = timeCount+'S'
        $(".gaming .time").html(str);
      }else if(timeCount==0){
        clearInterval(window.calTimeCount)
        // alert("时间到,您总共的点击次数是"+clickChance);
        var goStr = '';
        if(clickChance<=40){
          goStr = "#toreveive1"
        }else if(clickChance>=41&&clickChance<=50){
          goStr = "#toreveive2"
        }else if(clickChance>=51&&clickChance<=60){
          goStr = "#toreveive3"
        }else if(clickChance>=61&&clickChance<=70){
          goStr = "#toreveive4"
        }else if(clickChance>=71){
          goStr = "#toreveive5"
        }
        clickChance = 0;
        timeCount = 10;
        $(".gaming").hide();
        $(goStr).show();
      }
    },1000)
  }
  $(".toreveive .receivebtn").on("click",function () {
    var _this = $(this);
    setTimeout(function () {
      _this.parent(".toreveive").hide();
      $(".forminput").addClass("problemup");
    },200)
  })
  //狂点按钮
  $(".gaming .clickbtn").on("touchstart",function () {
    if(timeCount>=1){
      clickChance ++;
      $(".gaming .chance").html(clickChance)
    }else if(timeCount==0){

    }


  })
  $(".beginPage .btn").on("click", function () {
    var _this = $(this)
    setTimeout(function () {
      _this.parent(".beginPage").hide();
      showQuestion.show();   //开始问题已
    }, 200)

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
    },200)
  })
  $(".questionRetry .applyerror,.questionEnd .applysuccess").on("click",function () {
    var _this = $(this);
    var type = $(this).find('img').attr('type');
    var direct = $(this).find("img").attr("direct");
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
        $(".crazyclickBegin").show();
        // $(direct).addClass('rightslide')
      }
    },200)
  });
  //跳转狂点页面
  $(".crazyclickBegin .clickbtn").on("click",function(){
    var _this = $(this);
    $(".crazyclickBegin").hide();
    $(".gaming").show();
    $(".gaming .time").html('10S');
    caltime();
  })


  $(".gameEnd .endredpack").on("click",function(){
    var _this = $(this);
    setTimeout(function(){
      _this.parent(".page").hide();
      $(".forminput").addClass("problemup");
    },200)
  });
  //formbtn表单提交
  $('.forminput .formBtn').on("click",function () {
    var _this = $(this);
    setTimeout(function () {
      // $(".forminput").hide();
      // $(".receivesuccess").show();
      var name = $("#name").val();
      if (!validate.isEmpty(name)) {
        alert("请输入姓名");
        return false;
      }
      var tel = $("#tel").val();
      if (!validate.isMobile(tel)) {
        alert("请输入正确的手机号码");
        return false;
      }
      var province = $("#pro option:selected").text();
      if (province == "请选择") {
        alert("请选择省份");
        return false;
      }
      var city = $("#city option:selected").text();
      if (city == "请选择") {
        alert("请选择城市");
        return false;
      }
      var delear = $("#delear option:selected").text();
      if (delear == "请选择") {
        alert("请选择经销商");
        return false;
      }
      addInfo(name, tel, $("#pro option:selected").attr("sid"), $("#city option:selected").attr("sid"), $("#delear option:selected").attr("sid"))
    },200)
  })
  $(".receivesuccess .btn1").on("click",function () {
    $(".receivesuccess").find('.shareCon').fadeIn();
  })
  $(".receivesuccess .btn2").on("click",function () {
    $(".receivesuccess").hide();
    $("#questionTemplate").addClass("problemup");
    init();
  })
  $(".receivesuccess .shareCon").on("click",function (e) {
    $(this).hide();
    e = e|| event;
    e.stopPropagation();
  })
  function init(){
    showQuestion.current = 1;
    showQuestion.render(1);
  }
  //form表单联动
  function createPro() {
    $("#pro").empty();
    $("#pro").append('<option sid="-1">请选择</option>');
    for (var i = 0; i < provinceData.length; i++) {
      $("#pro").append('<option sid=' + provinceData[i].proid + '>' + provinceData[i].proname + '</option>');
    }
  }
  createPro();
  $("#pro").change(function(event) {
    var _id = $("#pro option:selected").attr("sid");

    $("#city").empty();
    $("#city").append('<option sid="-1">请选择</option>');
    for (var i = 0; i < cicyData.length; i++) {
      if (cicyData[i].proID == _id) {
        $("#city").append('<option sid=' + cicyData[i].cityID + '>' + cicyData[i].cityName + '</option>');
      }
    }

    var _id = $("#city option:selected").attr("sid");

    $("#delear").empty();
    $("#delear").append('<option sid="-1">请选择</option>');
    for (var i = 0; i < WuLingdealers.length; i++) {
      if (WuLingdealers[i].city == _id) {
        $("#delear").append('<option sid=' + WuLingdealers[i].dealerCode + '>' + WuLingdealers[i].company + '</option>');
      }
    }
  });

  $("#city").change(function(event) {
    var _id = $("#city option:selected").attr("sid");

    $("#delear").empty();
    for (var i = 0; i < WuLingdealers.length; i++) {
      if (WuLingdealers[i].city == _id) {
        $("#delear").append('<option sid=' + WuLingdealers[i].dealerCode + '>' + WuLingdealers[i].company + '</option>');
      }
    }
  });
  var validate = {
      isEmpty: function (val) {
          if (val == "") {
              return false;
          } else {
              return true;
          }
      },
      isMobile: function (val) {
          if (val == "") {
              return false;
          }
          if (!val.match(/^1[3|4|5|7|8][0-9]\d{4,8}$/) || val.length != 11) {
              return false;
          } else {
              return true;
          }
      },
  }
  function addInfo(_name, _tel, _province, _city, _dealer) {
    clickFlag = false;
    $.ajax({
        url: "http://www.sgmw.com.cn/ashx/reservation_json.aspx",
        dataType: 'jsonp',
        data: {
            aid: 165,
            fid: $_GET('MediaID'),
            lid: 0,
            name: _name,
            phone: _tel,
            key: md5(_tel).toUpperCase().substr(0, 10),
            province: _province,
            city: _city,
            dealercode: _dealer,
            cartype: '宝骏730',
            mark: '',
            source: '全新宝骏730预约试驾',
            ordering: 0,
            driving: 1,
            credit: 0

        },
        jsonp: 'callback',
        success: function (result) {
            var wr = result.success[0].result;
            if (wr == 1) {
                alert('提交成功');
                $('.forminput').fadeOut();
                $('.receivesuccess').fadeIn(300);
                // var p = $("#pro option:selected").text();
                // var c = $("#city option:selected").text();
                // var d = $("#delear option:selected").text();
                // _tel = _tel.replace(_tel.substr(3,4),'****');
                // _gsq.push(['T', 'GWD-002942', 'trackEvent', 'click', '730',location.pathname]);
                // if (window.gsTracker) {
                //     var orderid = leadsID;
                //     gsTracker.addOrder(orderid, 1);
                //     gsTracker.setEcomProperty(orderid, "1", _name);
                //     gsTracker.setEcomProperty(orderid, "2", _tel);
                //     gsTracker.setEcomProperty(orderid, "3", "宝骏730");
                //     gsTracker.setEcomProperty(orderid, "4", p);
                //     gsTracker.setEcomProperty(orderid, "5", c);
                //     gsTracker.setEcomProperty(orderid, "6", _dealer);
                //     gsTracker.addProduct(orderid, location.pathname, location.pathname, 1, 1, "全新宝骏730");
                //     gsTracker.trackECom();
                //     gsTracker.track("/targetpage/formsubmit/sqtywlpc");
                // }
            } else if (wr == 2) {
                alert('您已预约成功,请勿重复提交');
            } else {
                alert('预约失败，请稍后重试');
            }
            clickFlag = true;
        }

    });
}
function $_GET(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return "";
}






















})