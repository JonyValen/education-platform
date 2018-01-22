var numItems = 4;

$(document).ready(function(){
  $(".nav-substitute").height($(".nav").height());
  var homeHTML = $(".center-content").html();

  $("#home-btn").click(function(){
    $(".center-content").css("padding", "0 0 20px 0")
    $(".selected-feed-type").removeClass("selected-feed-type");
    $("#"+this.id).addClass("selected-feed-type");
    $(".center-content").html(homeHTML);
  });

  $("#trending-btn").click(function(){
    if(!$("#trending-btn").hasClass("selected-feed-type")){
      $(".center-content").html("");
      $(".center-content").css("padding", "20px")
      for(var i = 0; i < numItems; i++){
        var html = '<div class="item" id="i'+i+'"></div>'
        $(".center-content").append(html);
        var question = '<a class="question" href="#">Sample Topic 1?</a>'
        var author = '<a class="author" href="#"> Author 1</a>'
        var date = '<span class="date">2 days ago</span>'
        $("#i"+i).append(question+'by '+author+date);
        var numTags = 2;
        $("#i"+i).append('<div class="tags"> Tags |</div>');
        for(var j = 0; j < numTags; j++)
          $("#i"+i+" .tags").html('<button class="tag t'+i+'">Tag..</button>')
        $(".selected-feed-type").removeClass("selected-feed-type");
        $("#"+this.id).addClass("selected-feed-type");
      }
    }
  });

  $("#latest-btn").click(function(){
    $(".center-content").css("padding", "0 0 20px 0")
    $(".selected-feed-type").removeClass("selected-feed-type");
    $("#"+this.id).addClass("selected-feed-type");
    $(".center-content").html("");
  });
});
