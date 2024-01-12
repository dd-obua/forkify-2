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
