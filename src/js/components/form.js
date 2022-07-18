import Popup from "./popup";

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

  window.handleConnectForm = (token) => {
    submitBtnEl.disabled = true;

    /* get state form */
    const emailValue = emailInputEl.value;
    const checkboxValue = checkboxInputEl.checked;
    const responseValue = token;
    const nicknameValue = 'true';

    const data = {
      recaptcha: responseValue,
      email: emailValue,
      nickname: nicknameValue,
    };

    const isValidate = validateForm(data, checkboxValue);

    if (isValidate) {
      console.log('popup');
      Popup();
      const requestOptions = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };

      fetch("https://zeeves.io/site-api/wishlist/submit", requestOptions)
        .then(() => {})
        .catch((err) => {
          
          console.log(err);
        })
        .finally(() => {
          submitBtnEl.disabled = false;
        });
    } else {
      submitBtnEl.disabled = false;
    }
  };
  function walletConnectError() {
    networkErrorEl.classList.remove("wallet-no-connect");
    networkErrorEl.classList.add("wallet-no-connect_error");
  }

  function checkboxError() {
    checkboxInputEl.classList.remove("css-checkbox");
    checkboxInputEl.classList.add("css-checkbox_error");
    checkboxTextEl.classList.remove("checkbox-text");
    checkboxTextEl.classList.add("checkbox-text_error");
  }

  function recaptchaError() {
    recaptchaEl.classList.remove("g-recaptcha");
    recaptchaEl.classList.add("g-recaptcha_error");
  }

  function emailError() {
    emailInputEl.classList.remove("connect-form__input");
    emailInputEl.classList.add("connect-form__input_error");
    emailErrorEl.classList.remove("incorrect-email");
    emailErrorEl.classList.add("incorrect-email_error");
  }

  function nicknameError() {
    nicknameBtnEl.classList.remove("button-connect");
    nicknameBtnEl.classList.add("button-connect_error");
    walletConnectError();
  }

  function validateForm(data, checkboxValue) {
    let isValidate = true;
    if (!checkboxValue) {
      isValidate = false;
      checkboxError();
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

}
export default initForm;
