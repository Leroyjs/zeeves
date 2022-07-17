const initForm = () => {
	const form = document.querySelector(".connect-form__inner");
	 document.querySelector(".css-checkbox").checked;
//   debugger;
  form.onsubmit = (event) => {
    event.preventDefault();
    console.log(form);
    const emailValue = form.email.value;
    // раскомментировать  для привязки аккаунта ↓
    // const nicknameValue = form.nickname.value
    //закомменитровать для привязки аккаунта ↓
    const nicknameValue = true;

	  let response = grecaptcha.getResponse();
	  console.log(response.lenght);
	  if (response.lenght == 0) {
		  response = false
	  }
	  const checkboxValue = document.querySelector(".css-checkbox").checked;
	  console.log(checkboxValue);
    const postForm = {
      recaptcha: response,
      email: emailValue,
      nickname: nicknameValue,
    };
    const validateErrorArray = getErrorsForm(postForm);

    debugger;
    const hasValidateError = validateErrorArray.some((item) => Boolean(item));
    !hasValidateError
      ? //в феч должен отправляться JSON
		  fetchData(JSON.stringify(postForm), onDone, onError)
		 : console.log(response);
      // : setErrorsForm(validateErrorArray);
	};
//Отправка формы
function fetchData(formdata, onDone, onError) {
  const requestOptions = {
    method: "POST",
    body: formdata,
  };

  fetch("https://zeeves.io/site-api/wishlist/submit", requestOptions)
    .then((response) => response.text())
    // .then((result) => (console.log(result), Popup))
    .then(onDone)
    .catch(onError);
}



// сформировали объект для отправки, осталась валидация для разрешения отправки
	function getErrorsForm(form) {
	// МОЖНО ПРОБЕЖАТЬСЯ ЦИКЛОМ ПО ЗНАЧЕНИЯМ ОБЪЕКТА И ЕСЛИ ВСЕ BOOLEAN(TRUE) то разрешить фечить, либо узнть вариант удобнее
    const errors = [
      console.log(form),
      emailValid(emailValid),
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
