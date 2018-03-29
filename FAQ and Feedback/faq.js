$(document).ready(function(){
  $(".answer").hide();
  $(".question").click(function(){
    $(this).next().toggle(400);
  })
})
