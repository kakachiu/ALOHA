"use strict";

var email = document.querySelector(".email");
var password = document.querySelector(".password");
var emailRegex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
var loginBtn = document.querySelector(".loginBtn");
loginBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (email.value == "" || !emailRegex.test(email.value)) {
    Swal.fire({
      icon: "error",
      title: "請輸入 E-MAIL 或是格式錯誤",
      width: "500px"
    });
    return;
  } else if (password.value == "") {
    Swal.fire({
      icon: "error",
      title: "請輸入密碼",
      width: "400px"
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
      title: "登入成功"
    });
    setTimeout(function () {
      location.href = "member.html";
    }, 1300);
  }
});