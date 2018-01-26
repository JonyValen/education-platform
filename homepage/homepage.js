var numItems = 4;

$(document).ready(function(){
  var homeHTML = $(".center-content").html();

  $("#home-btn").click(function(){
    $(".center-content").css("padding", "0 0 20px 0")
    $(".selected-feed-type").removeClass("selected-feed-type");
    $(this).addClass("selected-feed-type");
    $(".center-content").html(homeHTML);
  });

  $("#trending-btn").click(function(){
    if(!$("#trending-btn").hasClass("selected-feed-type")){
      $(".center-content").css("padding", "20px")
      $(".selected-feed-type").removeClass("selected-feed-type")
      $(this).addClass("selected-feed-type")
      $(".center-content").html("")
      for(var i = 0; i < numItems; i++){
        $.ajax({
          url: 'post.html',
          type:'get',
          success: function(data){
           $(".center-content").append($(data).html())
          }
        });
        
      }
    }
  });

  $("#latest-btn").click(function(){
    $(".center-content").css("padding", "0 0 20px 0")
    $(".selected-feed-type").removeClass("selected-feed-type");
    $(this).addClass("selected-feed-type");
    $(".center-content").html("");
  });
});
