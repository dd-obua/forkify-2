import View from './views';
import icons from '../../img/icons.svg';

class PageinationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const search = this._data;
    const pages = Math.ceil(search.results.length / search.resultsPerPage);
    const currentPage = search.page;

    // On page 1 and there are other pages
    if (currentPage === 1 && pages > 1) return this._next(search.page);

    // On the last page
    if (currentPage === pages && pages > 1) return this._prev(search.page);

    // On some other page
    if (currentPage < pages)
      return `${this._prev(search.page)}${this._next(search.page)}`;

    // On page 1 and there are no other pages
    return '';
  }

  _prev(page) {
    return `
      <button class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${page - 1}</span>
      </button>
    `;
  }

  _next(page) {
    return `
      <button class="btn--inline pagination__btn--next">
        <span>Page ${page + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>;
    `;
  }
}

export default new PageinationView();
