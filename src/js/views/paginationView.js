import View from './view';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);
    const prevBtn = `
      <button class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
      </button>
    `;
    const nextBtn = `
      <button class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;

    if (currentPage < 1 || currentPage > numPages) return;

    // On page 1 and there are other pages
    if (currentPage === 1 && numPages > 1) return nextBtn;

    // On the last page
    if (currentPage === numPages) return prevBtn;

    // On any other page
    if (currentPage > 1 && numPages > 1) return `${prevBtn} ${nextBtn}`;

    // On page 1 and there are no other pages
    return '';
  }
}

export default new PaginationView();

// _generateMarkup() {
// const currentPage = this._data.page;
// const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

// if (currentPage < 1) return;

// On page 1 and there are other pages
// if (currentPage === 1 && numPages > 1) this._next(currentPage);

// On page 1 and there are no other pages
// if (currentPage === 1 && numPages === 1) return 'Only one page.';

// On the last page
// if (currentPage === numPages && numPages > 1) this._prev(currentPage);

// On any other page
// if (currentPage > 1 && currentPage < numPages) {
// this._prev(currentPage);
// this._next(currentPage);
//   }
// }

// _prev(currentPage) {
//   `
//     <button class="btn--inline pagination__btn--prev">
//       <svg class="search__icon">
//         <use href="${icons}#icon-arrow-left"></use>
//       </svg>
//       <span>Page ${currentPage - 1}</span>
//     </button>
//   `;
// }

// _next(currentPage) {
//   `
//     <button class="btn--inline pagination__btn--next">
//       <span>Page ${currentPage + 1}</span>
//       <svg class="search__icon">
//         <use href="${icons}#icon-arrow-right"></use>
//       </svg>
//     </button>
//   `;
// }
