//temp variable just for front end sample functionality
let numPost = 4

$(document).ready(function(){
  const homeHTML = $(".center-content").html()

  //listens for the click of the buttons below the navbar
  feedBtnsListener(homeHTML)

  $(".purpose > button").click(function() {
    let $parent = $(this).parent()
    if($parent.hasClass("purpose-vertical")){
      $parent.width($parent.css("max-width"))
      $(".purpose-horizontal").hide(250, () => {
        $(".purpose-vertical").css("max-width", "100%")
        $(".purpose-vertical").css("width", "100%")
        $("#vert-btn").hide()
      })
    }
  })
})

function feedBtnsListener(homeHTML) {
  $("#home-btn").click(function(){
    $(".center-content").css("padding", "0 0 20px 0")
    $(".selected-feed-type").removeClass("selected-feed-type");
    $(this).addClass("selected-feed-type")
    $(".center-content").html(homeHTML)
  });

  $("#latest-btn").click(function(){
    if(!$(this).hasClass("selected-feed-type")){
      $(".center-content").css("padding", "20px")
      $(".selected-feed-type").removeClass("selected-feed-type")
      $(this).addClass("selected-feed-type")
      $(".center-content").html("")
      /*AJAX RETRIEVE POSTS ASYNCHRONOUSLY*/
      let i = 0
      const requestPosts = {
        url: 'post.html',
        async: true,
        type: 'get',
        success: data => updatePosts(data),
        error: () => $(".center-feed").append('<div class="item">Could not load posts. Please try again later.</div>')
      }

      const updatePosts = data => {
        if(i >= numPost) return
        $(".center-content").append(data)
        $(".temp .topic").text("Sample Topic "+i)
        $(".temp").removeClass("temp")
        i++
        $.ajax(requestPosts)
      }
      $.ajax(requestPosts)
      /*END --- AJAX RETRIEVE POSTS ASYNCHRONOUSLY --- END*/
    }
  })

  $("#feedback-btn").click(function(){
    $(".center-content").css("padding", "0 0 20px 0")
    $(".selected-feed-type").removeClass("selected-feed-type")
    $(this).addClass("selected-feed-type")
    $(".center-content").html("")
  })
}
