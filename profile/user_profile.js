$(document).ready(function(){
  $("#contributors").click(function(){
    $(".post-box").html("");
  });

  $("#attachments").click(function(){
    $(".post-box").html("Upload files: <input type='file' name='attach-file' multiple>");
  });

  $("#tags").click(function(){
    $(".post-box").html("");
  });
});
