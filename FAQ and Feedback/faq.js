$(document).ready(function(){
  $(".answer").hide();
  $(".arrow").click(function(){
    $(this).parent().next().toggle(400);
    $(this).toggleClass("arrow-toggle");
  })
})
