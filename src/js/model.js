import { API_URL } from './config.js';

export const state = {
  recipe: {},
  search: {},
  bookmarks: [],
};

export const loadRecipe = async (id) => {
  try {
    // Load recipe
    const res = await fetch(`${API_URL}${id}`);
    const data = await res.json();
    if (!res.ok) throw new Error(`${res.status} - ${data.message}`);

    const { recipe } = data.data;
    state.recipe = {
      cookingTime: recipe.cooking_time,
      id: recipe.id,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title,
    };
  } catch (error) {
    console.error(error);
  }
};
