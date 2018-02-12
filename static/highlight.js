document.addEventListener("DOMContentLoaded", function(event) {
  document.querySelectorAll('[href="' + "/" + window.location.pathname.split("/")[1] + '"]')[0].setAttribute("current","true");
});
