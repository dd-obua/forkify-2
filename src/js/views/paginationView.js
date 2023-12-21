import View from './view';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', (event) => {
      const btn = event.target.closest('button');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
    const prevBtn = `
      <button 
        class="btn--inline pagination__btn--prev"
        data-goto=" ${currentPage - 1}"
      >
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>
    `;
    const nextBtn = `
      <button 
        class="btn--inline pagination__btn--next"
        data-goto="${currentPage + 1}"
      >
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;

    // Set page number boundary
    if (currentPage < 1 || currentPage > numPages) return;

    // On page 1 and there are other pages
    if (currentPage === 1 && numPages > 1) return nextBtn;

    // On the last page
    if (currentPage === numPages && numPages > 1) return prevBtn;

    // On any other page
    if (currentPage < numPages) return `${prevBtn} ${nextBtn}`;

    // On page 1 and there are no other pages
    return '';
  }
}

export default new PaginationView();
