import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import swRegister from './utils/sw-register';
import routes from './routes/routes'; // Added .js extension to routes import
import UrlParser from './routes/url-parser';

const toggleNavMenu = () => {
  const navMenu = document.querySelector('#navigationMenu');
  navMenu.classList.toggle('open'); // Toggle the 'open' class
};

const renderPage = async () => {
  const url = UrlParser.parseActiveUrlWithCombiner();
  const page = routes[url];
  document.querySelector('.restaurant-list').innerHTML = await page.render();
  await page.afterRender();
};

window.addEventListener('hashchange', renderPage);
window.addEventListener('load', renderPage);

swRegister(); // Register service worker

document.addEventListener('DOMContentLoaded', () => {
  const buttonSkipToContent = document.querySelector('.skip-link');
  const mainElement = document.querySelector('#mainContent');

  buttonSkipToContent.addEventListener('click', (event) => {
    event.preventDefault();
    mainElement.scrollIntoView();
  });

  buttonSkipToContent.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      mainElement.scrollIntoView();
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const hamburgerButton = document.querySelector('#hamburgerButton');
  const navigationMenu = document.querySelector('#navigationMenu');

  const toggleNavMenu = () => {
    navigationMenu.classList.toggle('open');
  };

  hamburgerButton.addEventListener('click', toggleNavMenu);
});

