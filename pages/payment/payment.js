import { createHeader } from '../../components/header/header.js';
import { createFooter } from '../../components/footer/footer.js';

const header = document.getElementById('header');
const footer = document.getElementById('footer');

header.innerHTML = createHeader();
footer.innerHTML = createFooter();