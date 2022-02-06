import "./index.hbs";
import "./index.scss";
/* import common js */
import "../../js/common";
/* import partials and lib */
import { appearance } from "../../js/components/appearance";
import initAscentTitle from "../../js/components/ascentTitle";
import initBurgerMenu from "../../js/components/burgerMenu";
import { initParallax } from "../../js/components/parallax";

/* Your JS Code goes here */
window.addEventListener("DOMContentLoaded", () => {
  appearance();
  initAscentTitle();
  initBurgerMenu();
  initParallax()
});

window.addEventListener("load", () => {
});
