export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonResetPopupElement = this._popup.querySelector('.popup__reset-button');
    this._handleEscCloseCallback = this._handleEscClose.bind(this);
    this._handleOverlayCloseCallback = this._handleOverlayClose.bind(this);
    this._handleCloseCallback = this.close.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscCloseCallback);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscCloseCallback);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _handleOverlayClose(evt) {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
  }

  setEventListeners() {
    this._buttonResetPopupElement.addEventListener('click', this._handleCloseCallback);
    this._popup.addEventListener('click', this._handleOverlayCloseCallback);
  }
}