import "./index.hbs";
import "./index.scss";
/* import common js */
import "../../js/common";
/* import partials and lib */
import { appearance } from "../../js/components/appearance";
import initHeader from "../../js/components/header";
import initAscentTitle from "../../js/components/ascentTitle";
import initBurgerMenu from "../../js/components/burgerMenu";
import initPie from "../../js/components/diagram-pie";
import initForm from "../../js/components/form";
import { gearRotation } from "../../js/components/gearRotation";

/* Your JS Code goes here */
window.addEventListener("DOMContentLoaded", () => {
  initHeader();
  appearance();
  initAscentTitle();
  initBurgerMenu();
  initPie();
  initForm();
  gearRotation();
});

window.addEventListener("load", () => {
  setTimeout(() => {
    document.body.classList.add("start");
  }, 100);
});
