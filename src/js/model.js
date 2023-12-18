export const state = {
  recipe: {},
  search: {},
  bookmarks: [],
};

export const loadRecipe = async (id) => {
  try {
    // Load recipe
    const res = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
      // `https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886`
    );
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
    console.log(state.recipe);
  } catch (error) {
    console.error(error);
  }
};
