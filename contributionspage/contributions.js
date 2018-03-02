$(function() { // Clear comment box upon clicking "Post"
  $('#submit-post').click(function() {
    $("textarea").val("")
  });
});



$(document).ready(function(){ // Change documents in the document viewer
  $("#attachments").ready(function(){
    $(".document-content").html("Upload files: <input type='file' name='attach-file' multiple>");
  });

  $("#contributors").click(function(){
    $(".document-content").html("");
  });

  $("#attachments").click(function(){
    $(".document-content").html("Upload files: <input type='file' name='attach-file' multiple>");
  });

  $("#tags").click(function(){
    $(".document-content").html("");
  });

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