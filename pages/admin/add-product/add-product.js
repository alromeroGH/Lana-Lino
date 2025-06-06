import { createHeader } from '../../../components/header/header.js';
import { createAdminNav } from '../../../components/nav/nav.js';
import { createFooter } from '../../../components/footer/footer.js';

const header = document.getElementById('header');
const nav = document.getElementById('nav');
const footer = document.getElementById('footer')

header.innerHTML = createHeader();
nav.innerHTML = createAdminNav();
footer.innerHTML = createFooter();