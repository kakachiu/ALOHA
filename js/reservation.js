"use strict";

$(function () {
  $(".phoneDetail").click(function () {
    $(".detail").slideToggle();
    $(".arrow").toggleClass("active");
    $(".total").toggleClass("active");
  });
});
var reserveBtn = document.querySelector(".reserveBtn");
var nameInput = document.querySelector(".name");
var email = document.querySelector(".email");
var emailRegex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
reserveBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (nameInput.value == "") {
    Swal.fire({
      icon: "error",
      title: "請輸入姓名",
      width: "400px"
    });
    return;
  } else if (email.value == "" || !emailRegex.test(email.value)) {
    Swal.fire({
      icon: "error",
      title: "請輸入 E-MAIL 或是格式錯誤",
      width: "500px"
    });
    return;
  } else {
    var Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1400,
      width: "200px",
      background: "#ebf7ed",
      color: "#60bf5b",
      timerProgressBar: true,
      didOpen: function didOpen(toast) {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      }
    });
    Toast.fire({
      icon: "success",
      title: "填寫成功"
    });
    setTimeout(function () {
      location.href = "received.html";
    }, 1300);
  }
});