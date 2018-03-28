$(document).ready(function(){
  /*POST BOX LISTENERS*/
  postBoxListener()
  /*END --- POST BOX LISTENERS --- END*/
})

function postBoxListener(){
  $("textarea").focusin(function(){
    let numPosts = $(".feed").children().length
    $(this).height($(this).height() + 100)
    $("#post-button-options").append("<button class='privacy-btn'>Privacy</button>")
    $("#post-button-options").append("<button class='post-btn'>Create Post</button>")
    for(let i = 0; i < numPosts; i++)
      $("#i"+i).css("opacity", "0.5")
  })
  $("textarea").focusout(function(){
    let numPosts = $(".feed").children().length
    $(".post-btn").remove()
    $(".privacy-btn").remove()
    $(this).height($(this).height() - 100)

    for(let i = 0; i < numPosts; i++)
      $("#i"+i).css("opacity", "1")
  })
  $(".post-tab").click(function(){
    let activeId = $(".active").attr("id")
    if(activeId == "contrib-tab" && this.id != "contrib-tab")
      $("textarea[name='write-post']").hide()
    else if(activeId == "attach-tab" && this.id != "attach-tab")
      $("#attachments-section").hide()
    else if(activeId == "tags-tab" && this.id != "tags-tab")
      $("#tags-section").hide()
    $(".active").removeClass("active")
    $(this).addClass("active");
  })
  $("#contrib-tab").click(() => $("textarea[name='write-post']").show())
  $("#attach-tab").click(() => {
    $("#attachments-section").show()
  })
  $("#tags-tab").click(() => $("#tags-section").show())
  $("#upload-files").change(function(){
    $("#files-list").text("")
    let filesToUpload = this.files;
    for(let i = 0; i < filesToUpload.length; i++)
      $("#files-list").append(`${filesToUpload[i].name}<br/>`)
  })
  $("input[name='enter-tag']").keypress(function(e) {
    let key = e.which || e.keyCode
    if(key == 13){
      $(".tag-list").append(`<div class='pre-tag'>${$(this).val()}<i class='fa fa-times remove-tag'></i></i></div>`)
      $(this).val("")
    }
  })
  $(document).on("mouseenter", ".pre-tag", function(){
    $(this).children(".remove-tag").show()
    $(".remove-tag").click(function(){
      $(this).parent().remove()
    })
  }).on("mouseleave", ".pre-tag", function(){
    $(this).children(".remove-tag").hide()
  })
}
