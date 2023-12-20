import View from './view.js';

class SearchView extends View {
  _parentElement = document.querySelector('.search');

  getQuery() {
    return this._parentElement.querySelector('.search__field').value;
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', (event) => {
      event.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
