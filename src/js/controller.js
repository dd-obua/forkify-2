import '../styles/main.scss';
import icons from '../img/icons.svg';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from './model.js';
import recipeView from './views/recipeView.js';

const recipeContainer = document.querySelector('.recipe');

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

const showRecipe = async () => {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    renderSpinner(recipeContainer);

    // Load recipe
    await model.loadRecipe(id);

    // Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    console.error(error);
  }
};
// showRecipe();

['load', 'hashchange'].forEach((event) => window.addEventListener(event, showRecipe));
