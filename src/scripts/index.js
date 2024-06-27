import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
// import App from './views/app';
import swRegister from './utils/sw-register';
import routes from './routes/routes'; // Added .js extension to routes import
import UrlParser from './routes/url-parser';

// const app = new App({
//   button: document.querySelector('#hamburgerButton'),
//   drawer: document.querySelector('#navigationMenu'),
//   content: document.querySelector('#mainContent'),
// });

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
