import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor({ data }, popupSelector) {
    super(popupSelector);
    this._imageElement = this._popup.querySelector('.popup__photo');
    this._captionElement = this._popup.querySelector('.popup__caption-photo');
    this._nameImage = data.mesto;
    this._linkImage = data.link;
  }

  open() {
    super.open();
    this._imageElement.src = this._linkImage;
    this._imageElement.alt = this._nameImage;
    this._captionElement.textContent = this._nameImage;
  }
}