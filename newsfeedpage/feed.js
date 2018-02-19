var numPost = 4
var numUsers = 3
var numTags = 6

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
    if($(this).hasClass("liked"))
      $(this).removeClass("liked")
    else
      $(this).addClass("liked")

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
    $(".temp").attr("id", "i"+i)
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
    var index = $(".selected-post").attr("id")[1];
    $(".temp-user .name").text("User "+(index*numUsers+j))
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
      $(".online-users").append("<p>Error: Could not load user</p>")
      j++;
    }
  }

  $(".connect").click(function(){
    if($(".online-users").parent(".connect").length){
      $(".online-users").remove()
      $(".connect .arrowhead").removeClass("rotate")
    }  else {
      if($(".selected-post").length)
        $(".connect .arrowhead").addClass("rotate")
        $(this).append("<div class='online-users'></div>")
        if($(".selected-post")[0]){
          $.ajax(connectUsers)
          j = 0
        } else {
          $(".online-users").append("Click on a post to view its contributors.")
        }
    }
  });
  /*END --- CONNECT DIV LISTENER --- END*/

  var k = 0
  function getTags(data){
    if(k >= numTags) return
    $(".tags").append(data);
    var index = $(".selected-post").attr("id")[1];
    $(".temp-tag .tag-name").text("Tag "+(index*numTags+k))
    $(".temp-tag").removeClass("temp-tag")
    k++;
    $.ajax(requestTags)
  }

  var requestTags = {
    type: 'get',
    url: 'tags.html',
    success: function(data){
      getTags(data)
    },
    error: function(){
      $(".tags").append("<p>Error: Could not load user</p>")
      k++;
    }
  }

  /*POST TAGS DIV LISTENER*/
  $(".post-tags").click(function(){
    if($(".tags").parent(".post-tags").length){
      $(".tags").remove()
      $(".post-tags .arrowhead").removeClass("rotate")
    }  else {
      if($(".selected-post").length)
        $(".post-tags .arrowhead").addClass("rotate")
        $(this).append("<div class='tags'></div>")
        if($(".selected-post")[0]){
          $.ajax(requestTags)
          k = 0
        } else {
          $(".tags").append("Click on a post to view its tags.")
        }
    }
  });
  /*END --- POST TAGS DIV LISTENER -- END*/

  /*SELECT POST LISTENER*/
  $(document).on("click", ".post-content", function(){
    $(".selected-post").removeClass("selected-post")
    $(this).parent().addClass("selected-post")
    if($(".connect").children(".online-users").length){
      $(".online-users").html("")
      $(".tags").html("")
    } else{
      $(".arrowhead").addClass("rotate")
      $(".connect").append("<div class='online-users'></div>")
      $(".post-tags").append("<div class='tags'></div>")
    }
    $.ajax(connectUsers)
    $.ajax(requestTags)
    j = 0
    k = 0
  });
  /*END --- SELECT POST LISTENER --- END*/

  /*RETRIEVE NOTIFICATIONS*/
  /*END --- RETRIEVE NOTIFICATIONS --- END*/
});
