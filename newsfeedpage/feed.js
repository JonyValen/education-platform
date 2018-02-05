var numPost = 4
var numUsers = 3

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
  var j = 0;
  function getUsers(data){
    if(j >= numUsers) return
    $(".online-users").append(data);
    $(".temp-user .name").text("User "+j)
    if(j % 2 == 0)
      $(".temp-user .user-status-icon").addClass("online")
    else {
      $(".temp-user .user-status-icon").addClass("offline")
    }
    $(".temp-user").removeClass("temp-user")
    j++;
    $.ajax(connectUsers)
  }

  var connectUsers = {
    type: 'get',
    url: 'user.html',
    success: function(data){
      getUsers(data)
    },
    error: function(){
      $(".online-users").append("Error: Could not load user")
      j++;
    }
  }

  $(".connect").click(function(){
    if($(".online-users").parent(".connect").length)
      $(".online-users").remove()
    else {
      $(this).append("<div class='online-users'></div>")
      $.ajax(connectUsers)
      j = 0
    }
  });
  /*END --- CONNECT DIV LISTENER --- END*/

  /*RETRIEVE NOTIFICATIONS*/
  /*END --- RETRIEVE NOTIFICATIONS --- END*/
});
