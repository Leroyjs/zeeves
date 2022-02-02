const initBurgerMenu = () => {
  const burgerBtn = document.querySelector(".header__menu-btn");
  const burgerMenu = document.querySelector(".burger-menu");

  burgerBtn.addEventListener("click", handleBurgerBtn);

  function handleBurgerBtn(e) {
    e.preventDefault();
    burgerMenu.classList.toggle("active");
    burgerBtn.classList.toggle("active");
  }
};

export default initBurgerMenu;
