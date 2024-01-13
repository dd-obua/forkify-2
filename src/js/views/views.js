import { createContext } from 'vm-browserify';
import icons from '../../img/icons.svg';

export default class View {
  _data;

  _clear() {
    this._parentElement.innerHTML = '';
  }

  _insertMarkup(markup, position) {
    return this._parentElement.insertAdjacentHTML(position, markup);
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clear();
    this._insertMarkup(markup, 'afterbegin');
  }

  render(data) {
    if (!data || (Array.isArray(data) && data.length < 1)) return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._insertMarkup(markup, 'afterbegin');
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElemements = Array.from(newDOM.querySelectorAll('*'));
    const currentElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElemements.forEach((newEl, i) => {
      const curEl = currentElements[i];

      // Update changed text
      if (!newEl.isEqualNode(curEl) && newEl?.firstChild?.nodeValue.trim() !== '')
        curEl.textContent = newEl.textContent;

      // Update changed attributes
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach((attr) =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }

  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._insertMarkup(markup, 'afterbegin');
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
        <p>${message}</p>
      </div>
    `;
    this._clear();
    this._insertMarkup(markup, 'afterbegin');
  }
}
