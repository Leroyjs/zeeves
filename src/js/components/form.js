const initForm = () => {
  const formEl = document.querySelector(".connect-form__inner");
  const emailInputEl = formEl.querySelector(".connect-form__input");
  const checkboxInputEl = formEl.querySelector(".css-checkbox");
  const recaptchaEl = formEl.querySelector(".g-recaptcha");
  const submitBtnEl = formEl.querySelector(".connect-form__submit");
  const nicknameBtnEl = formEl.querySelector(".button-connect");

  formEl.onsubmit = (event) => {
    event.preventDefault();
    submitBtnEl.disabled = true;

    /* get state form */
    const emailValue = emailInputEl.value;
    const checkboxValue = checkboxInputEl.checked;
    const responseValue = grecaptcha?.getResponse() || false;
    const nicknameValue = "true";

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

  function checkboxError() {
    checkboxInputEl.classList.remove("connect-form__input");
    checkboxInputEl.classList.add("connect-form__input_error");
  }
  function recaptchaError() {
    checkboxInputEl.classList.remove("g-recaptcha");
    recaptchaEl.classList.add("g-recaptcha_error");
  }
  function emailError() {
    checkboxInputEl.classList.remove("css-checkbox");
    emailInputEl.classList.add("css-checkbox_error");
  }
  function nicknameError() {
    checkboxInputEl.classList.remove("button-connect");
    nicknameBtnEl.classList.add("button-connect_error");
  }

  function validateForm(data, checkboxValue) {
    let isValidate = true;
    if (!checkboxValue) {
      isValidate = false;
      console.log("соглы?");
      checkboxError();
    }
    if (!data.recaptcha) {
      isValidate = false;
      console.log("пройди капчу");
      recaptchaError();
    }
    if (emailValid(data.email)) {
      isValidate = false;
      console.log("введи нормальный email");
      emailError();
    }
    if (!data.nickname) {
      isValidate = false;
      console.log("жду именни");
      nicknameError();
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
};

export default initForm;
