//temporary variables for sample front end functionality
let numPost = 4
const numUsers = 3
const numTags = 6
const brandColor = "#17223d"

$(document).ready(function(){
  let firstLoad = true
  //Note: endorse comes from ajax call, so must use this particular listener
  endorseBtnListener()
  shareBtnListener()
  tagVoteListener()

  /*AJAX RETRIEVE POSTS*/
  let i = j = k = l = 0
  const requestPosts = {
    url: '../globals-html/post.html',
    async: true,
    type: 'get',
    success: data => updatePosts(data),
    error: () => $(".feed").append('<div class="item">Could not load posts. Please try again later.</div>')
  }

  const updatePosts = data => {
    if(i >= numPost) {
      if(firstLoad){
        $("#i0").addClass("selected-post")
        firstLoad = false
        getUserTags()
      }
      return
    }
    $(".feed").append(data)
    $(".temp").attr("id", `i${i}`)
    $(".temp .topic").text(`Sample Topic ${i}`)
    $(".temp").removeClass("temp")
    i++
    $.ajax(requestPosts)
  }

  $.ajax(requestPosts)

  $("button.load-more").click(() => {
    numPost += 4
    $.ajax(requestPosts)
  })
  /*END --- AJAX RETRIEVE POSTS --- END*/

  /*CONNECT DIV LISTENER*/
  const getUsers = data => {
    if(j >= numUsers) return
    $(".online-users").append(data)
    const index = $(".selected-post").attr("id")[1]
    $(".temp-user .name").text("User "+(index*numUsers+j))
    if(j % 2 == 0) $(".temp-user .user-status-icon").addClass("online")
    else $(".temp-user .user-status-icon").addClass("offline")
    $(".temp-user").removeClass("temp-user")
    j++;
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
  /*END --- CONNECT DIV LISTENER --- END*/

  /*POST TAGS DIV LISTENER*/
    const getTags = data => {
      if(k >= numTags) return
      $(".tags").addClass("related-tags")
      $(".related-tags").append(data)
      const index = $(".selected-post").attr("id")[1]
      const tempTag = ".related-tags .temp-tag"
      $(`${tempTag} .tag-name`).text(`Tag ${index*numTags+k}`)
      $(tempTag).append('<div class="vote-tag"><div class="arrow arrowUp"></div><div class="arrow arrowDown"></div></div>')
      $(tempTag).removeClass("temp-tag")
      k++
      $.ajax(requestTags)
    }

    const requestTags = {
      type: 'get',
      url: 'tags.html',
      success: data => getTags(data),
      error: () => {
        $(".related-tags").append("<p>Error: Could not load user</p>")
        k++
      }
    }
  /*END --- POST TAGS DIV LISTENER -- END*/

  /*SELECT POST LISTENER*/
  $(document).on("click", ".item", function(){
    $(".selected-post").removeClass("selected-post")
    $(this).addClass("selected-post")
    getUserTags()
  })
  /*END --- SELECT POST LISTENER --- END*/

  /*FILTER SEARCH LISTENER*/
  {
    const getFilterTags = data => {
      if(l >= numTags) return
      $(".post-tags").css('max-height', `calc(95% - ${$(".filter-searchbar").height()}px)`)
      $(".tags:not('.related-tags')").addClass("filter-tags")
      $(".filter-tags").append(data)
      $(".filter-tags .temp-tag .tag-name").html(`Tag ${l}`)
      $(".temp-tag").removeClass("temp-tag")
      l++
      $.ajax(requestFilterTags)
    }

    const requestFilterTags = {
      type: 'get',
      url: 'tags.html',
      success: data => getFilterTags(data),
      error: () => {
        $(".filter-tags").append("<p>Error: Could not load tags</p>")
        l++
      }
    }

    $(".filter-search").keypress(e => {
      let key = e.which || e.keyCode;
      if(key == 13){
        $(".filter-tags").html("");
        l = 0
        $.ajax(requestFilterTags)
      }
    })
  }
  /*END --- FILTER SEARCH LISTENER --- END*/

  /*RETRIEVE NOTIFICATIONS*/
  /*END --- RETRIEVE NOTIFICATIONS --- END*/

  const getUserTags = () => {
    $(".tags").html("")
    $(".online-users").html("")
    $.ajax(connectUsers)
    $.ajax(requestTags)
    j = 0
    k = 0
  }
})

function endorseBtnListener(){
  $(document).on("click", ".endorse", function(){
    $(this).hasClass("liked") ? $(this).removeClass("liked"): $(this).addClass("liked")
  })
}

function shareBtnListener(){
  $(document).on("click", ".share", function(){
  })
}

function tagVoteListener(){
  //when you click on a voting arrow, it should light up green if voted up
  //or light up red if voted down
  const green = "rgb(0, 128, 0)"
  const red = "rgb(200, 0, 0)"
  $(document).on("click", ".arrow", function(){
    if($(this).hasClass("arrowUp")){
      if($(this).css("border-bottom-color") == green)
        $(this).css("border-bottom-color", brandColor)
      else
        $(this).css("border-bottom-color", green)
    }
    else if($(this).hasClass("arrowDown")){
      if($(this).css("border-top-color") == red)
        $(this).css("border-top-color", brandColor)
      else
        $(this).css("border-top-color", red)
    }
  })
}
