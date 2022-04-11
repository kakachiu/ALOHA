"use strict";

$(function () {
  $(".phoneSort").click(function () {
    $(".sort").toggleClass("active");
  });
});
var slider = document.querySelector(".slider");
noUiSlider.create(slider, {
  start: [800, 4000],
  connect: true,
  range: {
    min: 0,
    max: 6000
  }
});
var marginMin = document.getElementById("valueMin"),
    marginMax = document.getElementById("valueMax");
slider.noUiSlider.on("update", function (values, handle) {
  if (handle) {
    marginMax.innerHTML = Math.floor(values[handle]).toLocaleString();
  } else {
    marginMin.innerHTML = Math.floor(values[handle]).toLocaleString();
  }
});
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 0,
  grabCursor: true,
  breakpoints: {
    767: {
      slidesPerView: 3
    },
    320: {
      slidesPerView: 2
    }
  }
});
var filterItem = document.querySelector(".filterItem");
var filter = document.querySelector(".filter");
var delIcon = document.querySelector(".delIcon");
var flterResult = document.querySelector(".flterResult");
var clearBtn = document.querySelector(".clearBtn");
var filterBtn = document.querySelector(".filterBtn");
filter.addEventListener("click", function () {
  filterItem.classList.add("active");
  flterResult.classList.add("active");
});
delIcon.addEventListener("click", function () {
  filterItem.classList.remove("active");
  flterResult.classList.remove("active");
});
clearBtn.addEventListener("click", function () {
  filterItem.classList.remove("active");
  flterResult.classList.remove("active");
});
filterBtn.addEventListener("click", function () {
  filterItem.classList.remove("active");
  flterResult.classList.remove("active");
});