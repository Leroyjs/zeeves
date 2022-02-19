import "./index.hbs";
import "./index.scss";
/* import common js */
import "../../js/common";
/* import partials and lib */
import { appearance } from "../../js/components/appearance";
import initHeader from "../../js/components/header";
import initAscentTitle from "../../js/components/ascentTitle";
import initBurgerMenu from "../../js/components/burgerMenu";
import initGoto from "../../js/components/goto";

/* Your JS Code goes here */
window.addEventListener("DOMContentLoaded", () => {
  initHeader();
  appearance();
  initAscentTitle();
  initBurgerMenu();
  initGoto();
});

window.addEventListener("load", () => {
});
