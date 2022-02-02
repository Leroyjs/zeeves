import "./index.hbs";
import "./index.scss";
/* import common js */
import "../../js/common";
import { chatAnimation } from "../../js/components/chat-animation";
/* import partials and lib */
import initHeader from "../../js/components/header";
import initBurgerMenu from "../../js/components/burgerMenu";

/* Your JS Code goes here */
window.addEventListener("DOMContentLoaded", () => {
  initHeader();
  chatAnimation();
  initBurgerMenu();
});

window.addEventListener("load", () => {
});
