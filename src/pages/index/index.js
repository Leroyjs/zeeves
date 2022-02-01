import "./index.hbs";
import "./index.scss";
/* import common js */
import "../../js/common";
import { chatAnimation } from "../../js/components/chat-animation";
/* import partials and lib */

/* Your JS Code goes here */
window.addEventListener("DOMContentLoaded", () => {
  chatAnimation();
});

window.addEventListener("load", () => {});
