$(function() { // Clear comment box upon clicking "Post"
  $('#submit-post').click(function() {
    $("textarea").val("")
  });
});



$(document).ready(function(){ // Change documents in the document viewer
  // $("#attachments").ready(function(){ // Does NOT support .doc/.docx. Files must be in .pdf format or hosted remotely. Replace: http://infolab.stanford.edu/pub/papers/google.pdf
  //   $(".document-content").html("");
  // });

  $("#contributors").click(function(){
    $(".list-of-doc").hide();
    $(".contributor-list").show();
    $(".document").hide();
    $(".tags-list").hide();
  });

  $("#attachments").click(function(){
    $(".list-of-doc").show();
    $(".document").hide();
    $(".contributor-list").hide();
    $(".tags-list").hide();
  });

  $("#tags").click(function(){
    $(".list-of-doc").hide();
    $(".document").hide();
    $(".contributor-list").hide();
    $(".tags-list").show();
  });

  $("#doc1").click(function() {
    $(".list-of-doc").hide();
    $(".document").show();
    $(".contributor-list").hide();
    $(".tags-list").hide();
  });

  // $(".document").on('load', function() { 
  //   var iframeSize = document.documentElement.clientHeight + document.documentElement.scrollHeight + document.documentElement.offsetHeight;
  //   var size = document.documentElement.scrollHeight;
  //   console.log(size);
  //   $("iframe").height(iframeSize);
  // });

  $(document).scroll(function() { // Controls bottom right scroll to top and scroll to comments functionality
    var screenTop = $(document).scrollTop();
    if (screenTop == 0) {
  	  $("#top-down-navigate").removeClass("fa-chevron-up");
  	  $("#top-down-navigate").addClass("fa-chevron-down");
  	  $("#to-top-or-comments").attr("href", "#comments");
    }
    else {
  	  $("#top-down-navigate").addClass("fa-chevron-up");
  	  $("#top-down-navigate").removeClass("fa-chevron-down");
  	  $("#to-top-or-comments").attr("href", "#top");
    }
  });
});

function openTab(evt, tabName) { // Open different tabs in document viewer
    // Declare all variables
    var i, tabcontent, tablinks;
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}
