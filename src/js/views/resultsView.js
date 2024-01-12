import View from './views';
import icons from '../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');

  _generateMarkup() {
    const recipes = this._data;
    console.log(recipes);
    return recipes.map(this._generatePreviewMarkup).join('');
  }

  _generatePreviewMarkup(recipe) {
    return `
      <li class="preview">
        <a class="preview__link" href="#${recipe.id}">
          <figure class="preview__fig">
            <img src="${recipe.image}" alt="Test" />
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

export default new ResultsView();
