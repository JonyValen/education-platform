$(document).ready(function(){
  $(".answer").hide();
  $(".question").click(function(){
    $(this).next().slideToggle(400);
  })
})
