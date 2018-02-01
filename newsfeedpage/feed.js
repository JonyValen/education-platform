var numPost = 2

$(document).ready(function(){
  $("textarea").focusin(function(){
    $(this).parent().append("<button class='post-btn'>Create Post</button>")
  });

  $("textarea").focusout(function(){
    $(".post-btn").remove()
  });

  $(".endorse").click(function(){
    alert("t")
    if(!$(this).hasClass("liked"))
      $(this).addClass("liked")
    else
      $(this).removeClass("liked")
  });

  for(var i = 0; i < numPost; i++){
    $.ajax({
      url: 'post.html',
      async: true,
      type: 'get',
      success: function(data){
        $(".center-feed").append(data)
        $(".temp .topic").text("Sample Topic "+i)
        $(".temp").removeClass("temp")
      },
      error: function(){
        $(".center-feed").append('<div class="item">Could not load posts. Please try again later.</div>')
      }
    });
  }
});
