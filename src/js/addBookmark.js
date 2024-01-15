import { state } from './model.js';

export const addBookmark = (recipe) => {
  // Add bookmark
  state.bookmarks.push(recipe);
};
