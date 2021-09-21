import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector('.popup__photo');
    this._captionElement = this._popup.querySelector('.popup__caption-photo');
  }

  open(data) {
    super.open();
    this._imageElement.src = data.link;
    this._imageElement.alt = data.mesto;
    this._captionElement.textContent = data.mesto;
  }
}