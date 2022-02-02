import "./index.hbs";
import "./index.scss";
/* import common js */
import "../../js/common";
/* import partials and lib */
import initBurgerMenu from "../../js/components/burgerMenu";
import { appearance } from "../../js/components/appearance";
import initHeader from "../../js/components/header";
import { preloader } from "../../js/components/preloader";
import initAscentTitle from "../../js/components/ascentTitle";

preloader();
/* Your JS Code goes here */
window.addEventListener("DOMContentLoaded", () => {
  initHeader();
  appearance();
  initAscentTitle();
  initBurgerMenu();
});

window.addEventListener("load", () => {
});
