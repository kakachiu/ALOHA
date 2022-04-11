"use strict";

$(function () {
  $(".add").click(function () {
    $(".editRoomNum").addClass("active");
    var numVal = $(this).parent().find("input[class*=input]");
    numVal.val(parseInt(numVal.val()) + 1);

    if (parseInt(numVal.val()) >= 1) {
      $(this).parent().find(".min").attr("disabled", false);
      $(this).parent().find(".min").css("color", "#666");
    }
  });
  $(".min").click(function () {
    var numVal = $(this).parent().find("input[class*=input]");
    numVal.val(parseInt(numVal.val()) - 1);

    if (parseInt(numVal.val()) <= 0) {
      numVal.val(0);
      $(this).attr("disabled", true);
      $(this).css("color", "#eee");
    }
  });
  $(".cancelBtn").click(function () {
    $(".editRoomNum").removeClass("active");
  });
});
var swiper = new Swiper(".mySwiper", {
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  }
});