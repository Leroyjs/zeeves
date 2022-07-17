const initForm = () => {
  const formEl = document.querySelector(".connect-form__inner");
  const emailInputEl = formEl.querySelector(".connect-form__input");
  const checkboxInputEl = formEl.querySelector(".css-checkbox");
  const connectBtnEl = formEl.querySelector(".form-step__button");
  const submitBtnEl = formEl.querySelector(".connect-form__submit");

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
      nickname: nicknameValue
    };

    const isValidate = validateForm(data, checkboxValue);

    if (isValidate) {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify(data)
      };

      fetch("https://zeeves.io/site-api/wishlist/submit", requestOptions)
        .then(() => {

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
  };

  function validateForm(data, checkboxValue) {
    let isValidate = true;
    if (!checkboxValue) {
      isValidate = false;
    } else if (!data.recaptcha) {
      isValidate = false;
    } else if (data.email) {
      isValidate = false;
    } else if (data.nickname) {
      isValidate = false;
    }

    return isValidate;
  }

// сформировали объект для отправки, осталась валидация для разрешения отправки
  function getErrorsForm(form) {
    // МОЖНО ПРОБЕЖАТЬСЯ ЦИКЛОМ ПО ЗНАЧЕНИЯМ ОБЪЕКТА И ЕСЛИ ВСЕ BOOLEAN(TRUE) то разрешить фечить, либо узнть вариант удобнее
    const errors = [
      console.log(form),
      emailValid(emailValid)
      // recaptchaValid(formData.get("recaptcha")),
      //  walletValid
    ];

    return errors;
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
