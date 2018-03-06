const numPost = 4;

$(document).ready(function(){
  const homeHTML = $(".center-content").html();

  $("#home-btn").click(function(){
    $(".center-content").css("padding", "0 0 20px 0")
    $(".selected-feed-type").removeClass("selected-feed-type");
    $(this).addClass("selected-feed-type");
    $(".center-content").html(homeHTML);
  });

  $("#trending-btn").click(function(){
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
        $.ajax(requestPosts);
      }
      $.ajax(requestPosts);
      /*END --- AJAX RETRIEVE POSTS ASYNCHRONOUSLY --- END*/
    }
  });

  $("#latest-btn").click(function(){
    $(".center-content").css("padding", "0 0 20px 0")
    $(".selected-feed-type").removeClass("selected-feed-type");
    $(this).addClass("selected-feed-type");
    $(".center-content").html("");
  });
});
