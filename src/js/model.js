import { API_URL } from './config.js';
import { getData } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
  },
};

// Loading recipes
export const loadRecipe = async (id) => {
  try {
    // Loading recipe
    const data = await getData(`${API_URL}${id}`);
    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (error) {
    throw error;
  }
};

// Load search results
export const loadSearchResults = async (query) => {
  try {
    state.search.query = query;
    const data = await getData(`${API_URL}?search=${query}`);
    const { recipes } = data.data;
    state.search.results = recipes.map((rec) => {
      return {
        id: rec.id,
        image: rec.image_url,
        publisher: rec.publisher,
        title: rec.title,
      };
    });
  } catch (error) {
    throw error;
  }
};
