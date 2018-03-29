$(document).ready(function(){
  $(".ans").hide();
  $(".question").click(function(){
    $(this).next().slideToggle(400);
  })
});
