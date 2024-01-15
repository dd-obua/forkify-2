import { API_URL, RESULTS_PER_PAGE } from './config.js';
import { getData } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
  bookmarks: [],
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

    state.recipe.bookmarked = state.bookmarks.some((bookmark) => bookmark.id === id)
      ? true
      : false;
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
    state.search.page = 1;
  } catch (error) {
    throw error;
  }
};

export const getSearchResultsPage = (page = state.search.page) => {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = (newServings) => {
  // Update ingredient quantities in the state
  state.recipe.ingredients.forEach((ing) => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  // Update servings in the state
  state.recipe.servings = newServings;
};

export const addBookmark = (recipe) => {
  // Add bookmark
  state.bookmarks.push(recipe);

  // Mark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};

export const deleteBookmark = (id) => {
  // Delete bookmark
  const index = state.bookmarks.findIndex((elem) => elem.id === id);
  state.bookmarks.splice(index, 1);

  // Mark current recipe as NOT bookmarked
  if (state.recipe.id === id) state.recipe.bookmarked = false;
};
