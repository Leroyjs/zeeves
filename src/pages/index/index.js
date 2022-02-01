import './index.hbs';
import './index.scss';
/* import common js */
import '../../js/common';
/* import partials and lib */
import '../../js/components/demo';
import initHeader from '../../js/components/header';

/* Your JS Code goes here */
window.addEventListener('DOMContentLoaded', () => {
  initHeader();
});

window.addEventListener('load', () => {});
