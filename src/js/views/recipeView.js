import icons from '../../img/icons.svg';
import { Fraction } from 'fractional';
import View from './views';

class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'We could not find that recipe. Please try another one.';
  _message = '';

  addHandlerRender(handler) {
    ['load', 'hashchange'].forEach((event) => window.addEventListener(event, handler));
  }

  addHandlerUpdateServings(handler) {
    this._parentElement.addEventListener('click', (event) => {
      const btn = event.target.closest('.btn--update-servings');
      if (!btn) return;
      const { updateTo } = btn.dataset;
      if (!updateTo) return;
      +updateTo > 0 && handler(+updateTo);
    });
  }

  _generateMarkup() {
    const recipe = this._data;

    return `
      <figure class="recipe__fig">
        <img 
          src="${recipe.image}" 
          alt="${recipe.title}" 
          class="recipe__img" 
        />
        <h1 class="recipe__title">
          <span>${recipe.title}</span>
        </h1>
      </figure>

      <div class="recipe__details">
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-clock"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--minutes">
            ${recipe.cookingTime}
          </span>
          <span class="recipe__info-text">minutes</span>
        </div>
        <div class="recipe__info">
          <svg class="recipe__info-icon">
            <use href="${icons}#icon-users"></use>
          </svg>
          <span class="recipe__info-data recipe__info-data--people">
            ${recipe.servings}
          </span>
          <span class="recipe__info-text">servings</span>

          <div class="recipe__info-buttons">
            <button 
              class="btn--tiny btn--update-servings"
              data-update-to="${recipe.servings - 1}"
            >
              <svg>
                <use href="${icons}#icon-minus-circle"></use>
              </svg>
            </button>
            <button 
              class="btn--tiny btn--update-servings"
              data-update-to="${recipe.servings + 1}"
            >
              <svg>
                <use href="${icons}#icon-plus-circle"></use>
              </svg>
            </button>
          </div>
        </div>

        <button class="btn--round">
          <svg class="">
            <use href="${icons}#icon-bookmark-fill"></use>
          </svg>
        </button>
      </div>

      <div class="recipe__ingredients">
        <h2 class="heading--2">Recipe ingredients</h2>
        <ul class="recipe__ingredient-list">
          ${recipe.ingredients.map(this._generateIngredientMarkup).join('')}
        </ul>
      </div>

      <div class="recipe__directions">
        <h2 class="heading--2">How to cook it</h2>
        <p class="recipe__directions-text">
          This recipe was carefully designed and tested by
          <span class="recipe__publisher">
            ${recipe.publisher}
          </span>. 
          Please check out directions at their website.
        </p>
        <a
          class="btn--small recipe__btn"
          href="${recipe.sourceUrl}"
          target="_blank"
        >
          <span>Directions</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </a>
      </div>
    `;
  }

  _generateIngredientMarkup(ing) {
    return `
      <li class="recipe__ingredient">
        <svg class="recipe__icon">
          <use href="${icons}#icon-check"></use>
        </svg>
        <div class="recipe__quantity">
          ${ing.quantity ? new Fraction(ing.quantity).toString() : ''}
        </div>
        <div class="recipe__description">
          <span class="recipe__unit">${ing.unit}</span>
          ${ing.description}
        </div>
      </li>
    `;
  }
}

export default new RecipeView();
