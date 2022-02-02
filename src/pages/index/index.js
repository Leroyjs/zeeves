import './index.hbs';
import './index.scss';
/* import common js */
import "../../js/common";
import { appearance } from "../../js/components/appearance";
/* import partials and lib */
import initHeader from '../../js/components/header';

/* Your JS Code goes here */
window.addEventListener('DOMContentLoaded', () => {
  initHeader();
  appearance();
});

window.addEventListener('load', () => {
});
