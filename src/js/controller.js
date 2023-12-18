import * as model from './model.js';
import recipeView from './views/recipeView.js';

import '../styles/main.scss';
import icons from '../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const renderSpinner = (parentElement) => {
  const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
  `;
  parentElement.innerHTML = '';
  parentElement.insertAdjacentHTML('afterbegin', markup);
};

const controlRecipes = async () => {
  try {
    // Render spinner
    renderSpinner(recipeContainer);

    // Get recipe id
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Load recipe
    await model.loadRecipe(id);

    // Render recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.error(error);
  }
};

['load', 'hashchange'].forEach((event) => window.addEventListener(event, controlRecipes));
