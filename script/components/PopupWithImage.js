import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor({ data }, popupSelector) {
    super(popupSelector);
    this._elementImage = this._popup.querySelector('.popup__photo');
    this._elementCaption = this._popup.querySelector('.popup__caption-photo');
    this._nameImage = data.name;
    this._linkImage = data.link;
  }

  open() {
    super.open();
    this._elementImage.src = this._linkImage;
    this._elementImage.alt = this._nameImage;
    this._elementCaption.textContent = this._nameImage;
  }
}