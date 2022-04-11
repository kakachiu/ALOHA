"use strict";

$(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".toTop").addClass("active");
    } else {
      $(".toTop").removeClass("active");
    }
  });
  $(".toTop a").click(function (e) {
    e.preventDefault();
    $("html,body").animate({
      scrollTop: 0
    }, 1000);
  });
  $(".phoneIcon").click(function () {
    $(".phoneDropDown").slideToggle();
  });
});