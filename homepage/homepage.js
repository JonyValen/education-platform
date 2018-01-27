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
            $(".center-content").append(data)
            $(".temp .question").text("Sample Topic "+i+"?")
            $(".temp .tag").text("Tag "+i)
            $(".temp").removeClass("temp")
          },
          error: function(){
            $(".center-content").text("Could not load :( If you are a developer, please run through a local server instead.")
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
