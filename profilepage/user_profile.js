let numUsers = 4;
let numPost = 4;

$(document).ready(function(){
  /*CHANGE PROFILE PIC LISTENER*/
  changeProfilePicListener()
  /*END -- CHANGE PROFILE PIC LISTENER -- END*/

  /*CHECKBOX LISTENER*/
  checkBoxListener()
  /*END -- CHECKBOX LISTENER -- END*/

  /*AJAX RETRIEVE POSTS ASYNCHRONOUSLY*/
  let i = j = 0
  const requestPosts = {
    url: '../globals-html/post.html',
    async: true,
    type: 'get',
    success: data => updatePosts(data),
    error: () => $(".feed").append(`<div class="item">Could not load posts. Please try again later.</div>`)
  }

  const updatePosts = data => {
    if(i >= numPost) return
    $(".feed").append(data)
    $(".temp").attr("id", "i"+i)
    $(".temp .topic").text("Sample Topic "+i)
    $(".temp").removeClass("temp")
    i++
    $.ajax(requestPosts);
  }

  $.ajax(requestPosts);

  $("button.load-more").click(() => {
    numPost += 4
    $.ajax(requestPosts);
  })
  /*END --- AJAX RETRIEVE POSTS ASYNCHRONOUSLY --- END*/

  /*CONNECT DIV LISTENER*/
  const connectLblHeight = $(".connect").height()
  $(".connect").height(connectLblHeight) //not sure why this is needed? some css sizing issues?
  $(".col-1").height($(".col-1").height() + 82)

  const getUsers = data => {
    if(j >= numUsers) return
    $(".online-users").append(data)
    $(".temp-user .name").text("User "+j)
    if(j % 2 == 0) $(".temp-user .user-status-icon").addClass("online")
    else $(".temp-user .user-status-icon").addClass("offline")
    $(".temp-user").removeClass("temp-user")
    j++
    $.ajax(connectUsers)
  }

  const connectUsers = {
    type: 'get',
    url: '../globals-html/user.html',
    success: data => getUsers(data),
    error: () => {
      $(".online-users").append("<p>Error: Could not load user</p>")
      j++
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
      $.ajax(connectUsers)
      j = 0
    }
  })
  /*END -- CONNECT DIV LISTENER -- END*/
});

function changeProfilePicListener(){
  $(".picture-box").hover(() => $("label[for=change-picture]").show(), () => $("label[for=change-picture]").hide())
  $("label[for=change-picture]").hover(() => $("label[for=change-picture]").show())
}

function checkBoxListener(){
  $(".category").click(function(){
    let $checkBox = $(this).children("input[type=checkbox]")
    $checkBox.prop("checked", !$checkBox.prop("checked"))
  })
}
