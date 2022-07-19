const initForm = () => {
  const formEl = document.querySelector(".connect-form__inner");
  const emailInputEl = formEl.querySelector(".connect-form__input");
  const checkboxInputEl = formEl.querySelector(".css-checkbox");
  const recaptchaEl = formEl.querySelector(".g-recaptcha");
  const submitBtnEl = formEl.querySelector(".connect-form__submit");
  const nicknameBtnEl = formEl.querySelector(".button-connect");
  const checkboxTextEl = formEl.querySelector(".checkbox-text");
  const networkErrorEl = formEl.querySelector(".wallet-no-connect");
  const emailErrorEl = formEl.querySelector(".incorrect-email");

  const popupRootEl = document.querySelector(".popup-card-js");
  const popupOkBtnEl = popupRootEl.querySelector(".close-popup");
  const bodyEl = document.body;

  let nicknameValue = false;

  popupRootEl.removeAttribute("style");
  popupOkBtnEl.addEventListener("click", closeModal);

  function closeModal() {
    popupRootEl.classList.remove("active");
    bodyEl.classList.remove("no-scroll");
  }

  function openModal() {
    popupRootEl.classList.add("active");
    bodyEl.classList.add("no-scroll");
  }

  formEl.onsubmit = (event) => {
    event.preventDefault();

    grecaptcha.ready(() => {
      grecaptcha
        .execute("6LeLU4EgAAAAAFtX9fs9XpcfFPOk3cBzvE_hWQmG", {
          action: "submit",
        })
        .then((token) => {
          submitBtnEl.disabled = true;

          /* get state form */
          const emailValue = emailInputEl.value;
          const checkboxValue = checkboxInputEl.checked;
          const responseValue = token;

          const data = {
            recaptcha: responseValue,
            email: emailValue,
            nickname: nicknameValue,
          };

          const isValidate = validateForm(data, checkboxValue);

          if (isValidate) {
            const requestOptions = {
              method: "POST",
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json",
              },
            };

            fetch("https://zeeves.io/site-api/wishlist/submit", requestOptions)
              .then(() => {
                openModal();
                emailInputEl.value = "";
                checkboxInputEl.checked = false;
                //  TODO: Reset nicknameValue
              })
              .catch((err) => {
                console.log(err);
              })
              .finally(() => {
                submitBtnEl.disabled = false;
              });
          } else {
            submitBtnEl.disabled = false;
          }
        });
    });
  };

  function walletConnectError(remove = false) {
    networkErrorEl.classList.remove("wallet-no-connect");
    networkErrorEl.classList.add("wallet-no-connect_error");
  }

  function checkboxError(remove = false) {
    checkboxInputEl.classList.remove("css-checkbox");
    checkboxInputEl.classList.add("css-checkbox_error");
    checkboxTextEl.classList.remove("checkbox-text");
    checkboxTextEl.classList.add("checkbox-text_error");
  }

  function recaptchaError(remove = false) {
    recaptchaEl.classList.remove("g-recaptcha");
    recaptchaEl.classList.add("g-recaptcha_error");
  }

  function emailError(remove = false) {
    emailInputEl.classList.remove("connect-form__input");
    emailInputEl.classList.add("connect-form__input_error");
    emailErrorEl.classList.remove("incorrect-email");
    emailErrorEl.classList.add("incorrect-email_error");
  }

  function nicknameError(remove = false) {
    nicknameBtnEl.classList.remove("button-connect");
    nicknameBtnEl.classList.add("button-connect_error");
    walletConnectError();
  }

  function validateForm(data, checkboxValue) {
    let isValidate = true;
    if (!checkboxValue) {
      isValidate = false;
      checkboxError();
    } else {
    }
    if (!data.recaptcha) {
      isValidate = false;
      recaptchaError();
    }
    if (emailValid(data.email)) {
      isValidate = false;
      emailError();
    }
    if (!data.nickname) {
      isValidate = false;
      nicknameError();
      walletConnectError();
    }

    return isValidate;
  }

  function emailValid(value) {
    const EMAIL_REGEXP =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    function isEmailValid(value) {
      return EMAIL_REGEXP.test(value);
    }

    if (isEmailValid(value)) {
      return false;
    } else {
      return true;
    }
  }

  //stub
  const button = document.querySelector(".button-connect");
  button.addEventListener("click", () => connectButton(button));

  function connectButton(button) {
    button.classList.add("button-connect_active");
    button.innerText = "Connected";

    nicknameValue = "some nickname value";
  }
};
export default initForm;
