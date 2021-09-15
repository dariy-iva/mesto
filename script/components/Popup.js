export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._buttonResetPopup = this._popup.querySelector('.popup__reset-button');
    this._handleEscCloseCallback = this._handleEscClose.bind(this);
    this._handleOverlayCloseCallback = this._handleOverlayClose.bind(this);
    this._handleCloseCallback = this.close.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');
    this.removeEventListeners();
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
    this._buttonResetPopup.addEventListener('click', this._handleCloseCallback);
    document.addEventListener('keydown', this._handleEscCloseCallback);
    this._popup.addEventListener('click', this._handleOverlayCloseCallback);
  }

  removeEventListeners() {
    this._buttonResetPopup.removeEventListener('click', this._handleCloseCallback);
    document.removeEventListener('keydown', this._handleEscCloseCallback);
    this._popup.removeEventListener('click', this._handleOverlayCloseCallback);
  }
}