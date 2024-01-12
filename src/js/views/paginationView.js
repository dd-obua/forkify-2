import View from './views';
import icons from '../../img/icons.svg';

class PageinationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const search = this._data;
    const pages = Math.ceil(search.results.length / search.resultsPerPage);
    const currentPage = search.page;

    // On page 1 and there are other pages
    if (currentPage === 1 && pages > 1) return 'Page 1 and others.';

    // On the last page
    if (currentPage === pages && pages > 1) return 'Last page.';

    // On some other page
    if (currentPage < pages) return 'Any other page';

    // On page 1 and there are no other pages
    return 'Page 1 and no other pages.';
  }
}

export default new PageinationView();
