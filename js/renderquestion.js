/**
 * Created by Darre on 17/5/19.
 */
function renderQuestion() {
  this.defaultIndex = 0;
  this.template = $("#questionTemplate");
}
renderQuestion.prototype = {
  constructor:renderQuestion,
  init:function () {
  },
  render:function(index){
    window.methodIndex = index;
    this.template.find(".answers").find("li").removeClass("choosed");
    var question = window.question;
    var index = JSON.parse(index)-1;
    console.log(question)
    this.template.find('.descCon').find('.desc').html(question[index].title);
    this.template.find('.answer').eq(0).find('p').html(question[index].answerA.msg).attr("methodindex",question[index].answerA.methodIndex);
    this.template.find('.answer').eq(1).find('p').html(question[index].answerB.msg).attr("methodindex",question[index].answerB.methodIndex);
    this.template.find('.answer').eq(2).find('p').html(question[index].answerC.msg).attr("methodindex",question[index].answerC.methodIndex);
    this.template.find('.answer').eq(0).parent("li").addClass("choosed");
  },
  clear:function(){
    this.template.find('.desc').html("");
    this.template.fint(".answer p").html("");
  },
  show:function(){
    this.template.addClass("problemup");
  }
}