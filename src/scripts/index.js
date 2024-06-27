import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
// import App from './views/app';
import swRegister from './utils/sw-register';
import routes from './routes/routes'; // Added .js extension to routes import

// const app = new App({
//   button: document.querySelector('#hamburgerButton'),
//   drawer: document.querySelector('#navigationMenu'),
//   content: document.querySelector('#mainContent'),
// });

const renderPage = () => {
  const url = window.location.hash.slice(1).toLowerCase();
  const route = routes[url];
  if (route) {
    route.render();
  } else {
    // Handle 404 page not found
    console.log('404 Page Not Found');
  }
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
