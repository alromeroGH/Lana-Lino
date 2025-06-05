import { createHeader } from '../../components/header/header.js';
import { createNav } from '../../components/nav/nav.js';

const header = document.getElementById('header');
const nav = document.getElementById('nav');

header.innerHTML = createHeader();
nav.innerHTML = createNav();