import Popup from './Popup.js';

export default class PopupDeletePost extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._formElement = this._popup.querySelector('.popup__form');
    this._submitFormCallback = this._submitForm.bind(this);
  }
  _submitForm(evt) {
    evt.preventDefault();
    this._handleSubmitForm();
  }
  setEventListeners() {
    super.setEventListeners();
    this._formElement.addEventListener('submit', this._submitFormCallback);
  }
  open({ handleSubmitForm }) {
    super.open();
    this._handleSubmitForm = handleSubmitForm;
  }
}