var numUsers = 4;

$(document).ready(function(){
  /*CHANGE PROFILE PIC LISTENER*/
  changeProfilePicListener()
  /*END -- CHANGE PROFILE PIC LISTENER -- END*/

  /*CONNECT DIV LISTENER*/
  const connectLblHeight = $(".connect").height()
  $(".connect").height(connectLblHeight) //not sure why this is needed? some css sizing issues?
  $(".col-1").height($(".col-1").height() + 82)

  var j = 0;
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
  $(".picture-div").hover(() => $("#change-picture").show(), () => $("#change-picture").hide())
  $("#change-picture").hover(() => {
    $("#change-picture").show()
    $(".picture-div").css("filter", "brightness(50%)")
  }, () => $(".picture-div").css("filter", "brightness(100%)"))
}
