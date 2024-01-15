import View from './views';
import icons from '../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';
  _message = '';

  _generateMarkup() {
    const recipes = this._data;
    return recipes.map(this._generatePreviewMarkup).join('');
  }

  _generatePreviewMarkup(recipe) {
    const id = window.location.hash.slice(1);

    return `
      <li class="preview">
        <a 
          class="preview__link ${recipe.id === id ? 'preview__link--active' : ''}" 
          href="#${recipe.id}"
        >
          <figure class="preview__fig">
            <img src="${recipe.image}" alt="${recipe.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__title">${recipe.title}</h4>
            <p class="preview__publisher">${recipe.publisher}</p>
          </div>
        </a>
      </li>
    `;
  }
}

export default new BookmarksView();
