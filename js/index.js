"use strict";

$(function () {
  $(".local").click(function () {
    $(".localList").slideToggle("active");
  });
  $(".personNumber").click(function (e) {
    e.preventDefault();
    $(".number").slideToggle("active");
  });
  $(".tab").each(function (index) {
    $(this).click(function () {
      $(this).addClass("active").siblings().removeClass("active");
      $(".tabInner").eq(index).show().siblings().hide();
    });
  });
  $(".localList .text").click(function () {
    $(".local > .text").text($(this).text());
  });
  $(".minus").click(function () {
    var numVal = $(this).parent().find("input[class*=input]");
    numVal.val(parseInt(numVal.val()) - 1);

    if (parseInt(numVal.val()) <= 0) {
      numVal.val(0);
      $(this).attr("disabled", true);
      $(this).css("color", "#eee");
    }
  });
  $(".add").click(function () {
    var numVal = $(this).parent().find("input[class*=input]");
    numVal.val(parseInt(numVal.val()) + 1);

    if (parseInt(numVal.val()) >= 1) {
      $(this).parent().find(".minus").attr("disabled", false);
      $(this).parent().find(".minus").css("color", "#666");
    }
  });
});
var swiper = new Swiper(".mySwiper", {
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  observer: true,
  observeParents: true
});
var swiper1 = new Swiper(".mySwiper1", {
  slidesPerView: 4,
  spaceBetween: 30,
  navigation: {
    nextEl: ".swiper-button-next.next1",
    prevEl: ".swiper-button-prev.prev1"
  },
  grabCursor: true,
  observer: true,
  observeParents: true,
  breakpoints: {
    1024: {
      slidesPerView: 4,
      spaceBetween: 30
    },
    767: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    375: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    }
  }
});
var swiper2 = new Swiper(".mySwiper2", {
  slidesPerView: 4,
  spaceBetween: 30,
  navigation: {
    nextEl: ".swiper-button-next.next2",
    prevEl: ".swiper-button-prev.prev2"
  },
  grabCursor: true,
  observer: true,
  observeParents: true,
  breakpoints: {
    1024: {
      slidesPerView: 4,
      spaceBetween: 30
    },
    767: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    375: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    }
  }
});
var swiper3 = new Swiper(".mySwiper3", {
  slidesPerView: 4,
  spaceBetween: 30,
  navigation: {
    nextEl: ".swiper-button-next.next3",
    prevEl: ".swiper-button-prev.prev3"
  },
  grabCursor: true,
  observer: true,
  observeParents: true,
  breakpoints: {
    1024: {
      slidesPerView: 4,
      spaceBetween: 30
    },
    767: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    375: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    }
  }
});
var swiper4 = new Swiper(".mySwiper4", {
  slidesPerView: 2,
  spaceBetween: 20,
  navigation: {
    nextEl: ".swiper-button-next.next4",
    prevEl: ".swiper-button-prev.prev4"
  },
  observer: true,
  observeParents: true,
  breakpoints: {
    375: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    }
  }
});
var i18n = {
  months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
  weekdays: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
  weekdaysShort: ["日", "一", "二", "三", "四", "五", "六"]
};
var picker = new Pikaday({
  field: document.querySelector(".datepicker"),
  numberOfMonths: 2,
  format: "YYYY/MM/DD",
  i18n: i18n,
  toString: function toString(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return "".concat(year, "/").concat(month, "/").concat(day);
  }
});
var picker1 = new Pikaday({
  field: document.querySelector(".datepicker1"),
  numberOfMonths: 2,
  format: "YYYY/MM/DD",
  i18n: i18n,
  toString: function toString(date) {
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    return "".concat(year, "/").concat(month, "/").concat(day);
  }
});