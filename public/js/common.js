"use strict";

const $ = jQuery;

function eventHandler() {
  JSCCommon.init();

  function whenResize() {
    JSCCommon.setFixedNav();
  }

  window.addEventListener(
    "scroll",
    () => {
      JSCCommon.setFixedNav();
    },
    { passive: true }
  );
  window.addEventListener(
    "resize",
    () => {
      whenResize();
    },
    { passive: true }
  );

  whenResize();

  function dropDown(btn, dropdown) {
    btn.addEventListener("click", (event) => {
      if (dropdown.classList.contains("active")) {
        console.log("Дропдаун содержит актив");
        dropdown.classList.remove("active");
      } else {
        console.log("Дропдаун НЕ содержит актив");
        dropdown.classList.add("active");
      }
    });
    document.addEventListener("click", (event) => {
      if (event.composedPath().includes(dropdown)) {
        return;
      } else if (
        !event.composedPath().includes(dropdown) &&
        !event.composedPath().includes(btn)
      ) {
        dropdown.classList.remove("active");
      }
    });
  }

  const stepsBtn = document.querySelector(".steps__dd-header");
  if (stepsBtn) {
    const stepsList = document.querySelector(".steps__list");
    dropDown(stepsBtn, stepsList);
  }

  const accountBtn = document.querySelector(".topLine__account");
  if (accountBtn) {
    const accountList = document.querySelector(".topLine__account-menu");
    dropDown(accountBtn, accountList);
  }

  let defaultSl = {
    spaceBetween: 0,
    lazy: {
      loadPrevNext: true,
    },
    watchOverflow: true,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: " .swiper-pagination",
      type: "bullets",
      clickable: true,
      // renderBullet: function (index, className) {
      // 	return '<span class="' + className + '">' + (index + 1) + '</span>';
      // }
    },
  };

  new Swiper(".breadcrumb-slider--js", {
    slidesPerView: "auto",
    freeMode: true,
    watchOverflow: true,
  });

  const swiper4 = new Swiper(".sBanners__slider--js", {
    // если не используешь методы swiper  - можно обращаться без нее к Swiper
    // slidesPerView: 5,
    ...defaultSl,
    slidesPerView: "auto",
    freeMode: true,
    loopFillGroupWithBlank: true,
    touchRatio: 0.2,
    slideToClickedSlide: true,
    freeModeMomentum: true,
  });

  const scheduleContainer = document.querySelector(".sSchedule__slider-wrap");
  if (scheduleContainer) {
    const scheduleSlider = new Swiper(".sSchedule__slider", {
      slidesPerView: 1,
      breakpoints: {
        576: {
          slidesPerView: "auto",
        },
      },
      navigation: {
        nextEl: scheduleContainer.querySelector(".swiper-button-next"),
        prevEl: scheduleContainer.querySelector(".swiper-button-prev"),
      },
    });
  }

  $(".select-block-wrapper").each(function () {
    const self = $(this);
    self.find("select").select2({
      allowClear: false,
      dropdownParent: self,
    });
  });

  $(document).on("click", ".sSchedule__time.btn", function () {
    $(this).toggleClass("sSchedule__time--cancel");
    // $(this).slideToggle(()=>{
    // })
  });

  const dataPickers = document.querySelectorAll(".data-picker-wrap");
  for (const dataPickerEll of dataPickers) {
    const dataPicker = dataPickerEll.querySelector(".data-picker--js");
    const dataPickerIcon = dataPickerEll.querySelector(`.data-picker ~ .icon`);

    new AirDatepicker(dataPicker, {
      autoClose: false,
      // inline: true,
      container: dataPickerEll,
      onShow() {
        dataPickerEll.classList.add("active");
      },
      onHide() {
        dataPickerEll.classList.remove("active");
      },
      navTitles: {
        days: "yyyy <i>MMMM</i>",
      },
    });
  }
  // let times = document.querySelectorAll(".time-item-moderator");

  // if (times) {
  //   times.forEach((element) => {
  //     let input = element.querySelector("input");
  //     let max = element.dataset.maxValue;
  //     let min = element.dataset.maxValue;
  //     const btnMinus = element.querySelector(".addBlock__btn--minus");
  //     const btnPlus = element.querySelector(".addBlock__btn--plus");
  //     btnMinus.addEventListener("click", function () {
  //       setValue(input, +max, +min, -1);
  //     });

  //     btnPlus.addEventListener("click", function () {
  //       setValue(input, +max, +min);
  //     });

  //     function setValue(input, max, min, status = 1) {
  //       let value = input.value;
  //       if (status < 1 && status > min) {
  //         value = value > 0 ? +value + status : 0;
  //       } else if (status < min) {
  //         value = value > min ? +value + status : min;
  //       } else {
  //         value = value < max ? +value + status : max;
  //       }
  //       input.value = value;
  //       element.querySelector(
  //         ".time-item-moderator__count"
  //       ).innerHTML = `${value}/${max}`;

  //       if (+value > 0 || +value > min) {
  //         input.classList.add("active");
  //         btnMinus.classList.add("active");
  //       } else {
  //         input.classList.remove("active");
  //         btnMinus.classList.remove("active");
  //       }
  //       console.log(value);
  //       // if (+value == max) {
  //       //   btnPlus.classList.add("disabled");
  //       // } else {
  //       //   btnPlus.classList.remove("disabled");
  //       // }
  //     }
  //   });
  // }

  const mainCheck = document.querySelector(".main-check");

  if (mainCheck) {
    mainCheck.addEventListener("change", function () {
      if (this.checked) {
        $(".other-check").attr("checked", "checked");
      } else {
        $(".other-check").each(function () {
          if (this.checked) this.checked = false;
        });
      }
    });
  }
}

if (document.readyState !== "loading") {
  eventHandler();
} else {
  document.addEventListener("DOMContentLoaded", eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }
