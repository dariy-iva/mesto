export default class Card {
  constructor({data, handleCardClick}, postSelector) {
    this._name = data.name;
    this._link = data.link;
    this._postSelector = postSelector;
    this._handleCardClick = handleCardClick;
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
    this._element.querySelector('.post__like-button').classList.toggle('post__like-button_active');
  }

  _handleRemovePost() {
    this._element.querySelector('.post__del-button').closest('.post').remove();
  }

  _setEventListeners() {

    this._element.querySelector('.post__like-button').addEventListener('click', () => {
      this._handleLikePost();
    });
    this._element.querySelector('.post__del-button').addEventListener('click', () => {
      this._handleRemovePost();
    });
    this._element.querySelector('.post__photo').addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  generatePost() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.post__photo').src = this._link;
    this._element.querySelector('.post__photo').alt = this._name;
    this._element.querySelector('.post__caption').textContent = this._name;

    return this._element;
  }
};