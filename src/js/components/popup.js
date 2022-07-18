const Popup = () => {
  console.log("open");

  debugger;

  const body = document.querySelector("body");
  const lockPadding = document.querySelectorAll(".lock-padding");

  let unlock = true;

  const timeout = 800;
  console.log("open");
  const currentPopup = document.querySelector(".popup");
  console.log("open");
  popupOpen(currentPopup);

  console.log("open");

//   const popupCloseIcon = document.querySelectorAll(".close-popup");
//   if (popupCloseIcon.length > 0) {
//     for (let i = 0; i < popupCloseIcon.length; i++) {
//       const el = popupCloseIcon[i];
//       el.addEventListener("click", function (e) {
//         popupClose(el.closest(".popup.open"));

//         e.preventDefault();
//       });
//     }
//   }

  console.log("open");
  function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
      const popupActive = document.querySelector(".popup.open");

      if (popupActive) {
        popupClose(popupActive, false);
      } else {
        bodyLock();
      }
      currentPopup.classList.add("open");
    }
  }

  function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
      popupActive.classList.remove("open");
      if (doUnlock) {
        bodyUnlock();
      }
    }
  }

  function bodyLock() {
    const lockPaddingValue =
      window.innerWidth -
      document.querySelector(".scroll-content").offsetWidth +
      "px";
    if (lockPadding.length > 0) {
      for (let i = 0; i < lockPadding.length; i++) {
        const el = lockPadding[i];
        el.style.paddingRight = lockPaddingValue;
      }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add("lock");

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  function bodyUnlock() {
    setTimeout(function () {
      if (lockPadding.length > 0) {
        for (let i = 0; i < lockPadding.length; i++) {
          const el = lockPadding[i];
          el.style.paddingRight = "0px";
        }
      }
      body.style.paddingRight = "0px";
      body.classList.remove("lock");
    }, timeout);

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }
};
export default Popup;
