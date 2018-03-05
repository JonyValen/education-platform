const numPost = 4
const numUsers = 3
const numTags = 6

$(document).ready(function(){
  $(".post-info").height($(window).height() - 130)
  $(".connect").width("100%")
  $(".connect").height($(".connect").height()) //not sure why this is needed? some css sizing issues?
  const connectLblHeight = $(".connect").height()
  const postInfoMargin = 20;
  $(".post-tags").css({"top": connectLblHeight+postInfoMargin+"px", "height": $(".post-info").height()-(connectLblHeight+postInfoMargin)+"px"})
  $(".filter-search").height($(".post-info").height())

  /*POST BOX LISTENERS*/
  postBoxListener();
  /*END --- POST BOX LISTENERS --- END*/

  /*ENDORSE BUTTON LISTENERS*/
  //Note: endorse comes from ajax call, so must use this particular listener
  endorseBtnListener();
  /*END --- ENDORSE BUTTON LISTENERS --- END*/

  /*SHARE BUTTON LISTENERS*/
  shareBtnListener();
  /*END --- SHARE BUTTON LISTENERS --- END*/

  /*AJAX RETRIEVE POSTS ASYNCHRONOUSLY*/
  var i = 0
  const requestPosts = {
    url: 'post.html',
    async: true,
    type: 'get',
    success: data => updatePosts(data),
    error: () => {
      $(".center-feed").append('<div class="item">Could not load posts. Please try again later.</div>')
    }
  }

  const updatePosts = data => {
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
  const getUsers = data => {
    if(j >= numUsers) return
    $(".online-users").append(data)
    const index = $(".selected-post").attr("id")[1]
    $(".temp-user .name").text("User "+(index*numUsers+j))
    if(j % 2 == 0)
      $(".temp-user .user-status-icon").addClass("online")
    else
      $(".temp-user .user-status-icon").addClass("offline")
    $(".temp-user").removeClass("temp-user")
    j++;
    $.ajax(connectUsers)
  }

  const connectUsers = {
    type: 'get',
    url: 'user.html',
    success: data => getUsers(data),
    error: () => {
      $(".online-users").append("<p>Error: Could not load user</p>")
      j++;
    }
  }

  $(".connect").click(function(){
    if($(this).children(".online-users").length){
      $(this).height(connectLblHeight)
      $(".online-users").remove()
      $(".connect .arrowhead").removeClass("rotate")
    }  else {
      $(this).height($(this).parent().height())
      $(".connect .arrowhead").addClass("rotate")
      $(this).append("<div class='online-users'></div>")
      if($(".selected-post")[0]){
          $.ajax(connectUsers)
          j = 0
      } else
          $(".online-users").append("<p class='post-notif'>Click on a post to view its contributors.</p>")
    }
  });
  /*END --- CONNECT DIV LISTENER --- END*/

  /*POST TAGS DIV LISTENER*/
  var k = 0
  const getTags = data => {
    if(k >= numTags) return
    $(".tags").append(data)
    const index = $(".selected-post").attr("id")[1]
    $(".temp-tag .tag-name").text("Tag "+(index*numTags+k))
    $(".temp-tag").removeClass("temp-tag")
    k++;
    $.ajax(requestTags)
  }

  const requestTags = {
    type: 'get',
    url: 'tags.html',
    success: data => getTags(data),
    error: () => {
      $(".tags").append("<p>Error: Could not load user</p>")
      k++;
    }
  }
  /*END --- POST TAGS DIV LISTENER -- END*/

  /*SELECT POST LISTENER*/
  $(document).on("click", ".post-content", function(){
    $(".selected-post").removeClass("selected-post")
    $(this).parent().addClass("selected-post")
    $(".tags").html("")
    if($(".connect").children(".online-users").length){
      $(".online-users").html("")
    } else{
      $(".arrowhead").addClass("rotate")
      $(".connect").height($(".connect").parent().height())
      $(".connect").append("<div class='online-users'></div>")
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

function postBoxListener(){
  $("textarea").focusin(function(){
    $(this).height($(this).height() + 100)
    $(this).parent().append("<button class='post-btn'>Create Post</button>")
  });
  $("textarea").focusout(function(){
    $(".post-btn").remove()
    $(this).height($(this).height() - 100);
  });
}

function endorseBtnListener(){
  $(document).on("click", ".endorse", function(){
    if($(this).hasClass("liked"))
      $(this).removeClass("liked")
    else
      $(this).addClass("liked")

  });
}

function shareBtnListener(){
  $(document).on("click", ".share", function(){
  });
}
