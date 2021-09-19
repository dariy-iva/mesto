export default class Card {
  constructor({ data, handleCardClick }, postSelector) {
    this._name = data.mesto;
    this._link = data.link;
    this._postSelector = postSelector;
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._buttonLikeElement = this._element.querySelector('.post__like-button');
    this._buttonDelElement = this._element.querySelector('.post__del-button');
    this._photoElement = this._element.querySelector('.post__photo');
    this._captionElement = this._element.querySelector('.post__caption');
  }

  _getTemplate() {
    const postTemplate = document
      .querySelector(this._postSelector)
      .content
      .firstElementChild
      .cloneNode(true);

    return postTemplate;
  }

  _handleLikePost() {
    this._buttonLikeElement.classList.toggle('post__like-button_active');
  }

  _handleRemovePost() {
    this._buttonDelElement.closest('.post').remove();
  }

  _setEventListeners() {
    this._buttonLikeElement.addEventListener('click', this._handleLikePost.bind(this));
    this._buttonDelElement.addEventListener('click', this._handleRemovePost.bind(this));
    this._photoElement.addEventListener('click', this._handleCardClick.bind(this));
  }

  generatePost() {
    this._setEventListeners();

    this._photoElement.src = this._link;
    this._photoElement.alt = this._name;
    this._captionElement.textContent = this._name;

    return this._element;
  }
};