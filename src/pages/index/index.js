import "./index.hbs";
import "./index.scss";
/* import common js */
import "../../js/common";
/* import partials and lib */
import initBurgerMenu from "../../js/components/burgerMenu";
import { chatAnimation } from "../../js/components/chat-animation";
import { appearance } from "../../js/components/appearance";
import initHeader from "../../js/components/header";
import { preloader } from "../../js/components/preloader";

/* Your JS Code goes here */
window.addEventListener("DOMContentLoaded", () => {
  preloader();
  initHeader();
  chatAnimation();
  initBurgerMenu();
  appearance();
});

window.addEventListener("load", () => {
});
