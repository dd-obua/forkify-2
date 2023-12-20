import * as model from './model.js';
import recipeView from './views/recipeView.js';

import '../styles/main.scss';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './views/searchView.js';

const recipeContainer = document.querySelector('.recipe');

const controlRecipes = async () => {
  try {
    // Render spinner
    recipeView.renderSpinner();

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

const controlSearch = async () => {
  try {
    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);
  } catch (error) {
    console.error(error);
  }
};

const init = () => {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearch);
};

init();
