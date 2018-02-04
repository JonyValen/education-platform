var numPost = 4

$(document).ready(function(){
  /*POST BOX LISTENERS*/
  $("textarea").focusin(function(){
    $(this).parent().append("<button class='post-btn'>Create Post</button>")
  });

  $("textarea").focusout(function(){
    $(".post-btn").remove()
  });
  /*END --- POST BOX LISTENERS --- END*/

  /*ENDORSE BUTTON LISTENERS*/
  //Note: endorse comes from ajax call, so must use this particular listener
  $(document).on("click", ".endorse", function(){
    if(!$(this).hasClass("liked"))
      $(this).addClass("liked")
    else
      $(this).removeClass("liked")
  });
  /*END --- ENDORSE BUTTON LISTENERS --- END*/

  /*SHARE BUTTON LISTENERS*/
  $(document).on("click", ".share", function(){
  });
  /*END --- SHARE BUTTON LISTENERS --- END*/

  /*AJAX RETRIEVE POSTS ASYNCHRONOUSLY*/
  var i = 0
  var requestPosts = {
    url: 'post.html',
    async: true,
    type: 'get',
    success: function(data){
      updatePosts(data)
    },
    error: function(){
      $(".center-feed").append('<div class="item">Could not load posts. Please try again later.</div>')
    }
  }

  function updatePosts(data) {
    if(i >= numPost) return
    $(".center-feed").append(data)
    $(".temp .topic").text("Sample Topic "+i)
    $(".temp").removeClass("temp")
    i++
    $.ajax(requestPosts);
  }

  $.ajax(requestPosts);
  /*END --- AJAX RETRIEVE POSTS ASYNCHRONOUSLY --- END*/

  /*CONNECT DIV LISTENER*/
  $(".connect").click(function(){
  });
  /*END --- CONNECT DIV LISTENER --- END*/

  /*RETRIEVE NOTIFICATIONS*/
  /*END --- RETRIEVE NOTIFICATIONS --- END*/
});
