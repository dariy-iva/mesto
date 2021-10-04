export default class Card {
  constructor({ handleCardClick, handleButtonDelClick, handleButtonLikeClick }, postSelector) {
    this._postSelector = postSelector;
    this._handleCardClick = handleCardClick;
    this._handleButtonDelClick = handleButtonDelClick;
    this._handleButtonLikeClick = handleButtonLikeClick;
    this._element = this._getTemplate();
    this.buttonLikeElement = this._element.querySelector('.post__like-button');
    this._buttonDelElement = this._element.querySelector('.post__del-button');
    this._photoElement = this._element.querySelector('.post__photo');
    this._captionElement = this._element.querySelector('.post__caption');
    this._likesNumberElement = this._element.querySelector('.post__likes-number');
  }

  _getTemplate() {
    const postTemplate = document
      .querySelector(this._postSelector)
      .content
      .firstElementChild
      .cloneNode(true);

    return postTemplate;
  }

  addLikePost(likesNumber) {
    this._likesNumberElement.textContent = likesNumber;
  }

  deleteLikePost(likesNumber) {
    this._likesNumberElement.textContent = likesNumber;
  }

  toggleButtonLike() {
    this.buttonLikeElement.classList.toggle('post__like-button_active');
  }

  toggleButtonDelOnVisible() {
    this._buttonDelElement.classList.add('post__del-button_visible');
  }

  _setEventListeners() {
    this.buttonLikeElement.addEventListener('click', this._handleButtonLikeClick.bind(this));
    this._buttonDelElement.addEventListener('click', this._handleButtonDelClick.bind(this));
    this._photoElement.addEventListener('click', this._handleCardClick.bind(this));
  }

  generatePost(data) {
    this._setEventListeners();

    this._photoElement.src = data.link;
    this._photoElement.alt = data.name;
    this._captionElement.textContent = data.name;
    this._likesNumberElement.textContent = data.likes.length;
    this._element.cardId = data._id;
    this._element.ownerId = data.owner._id;
    this._element.likesNumber = data.likes.length;
    this._element.likes = data.likes;

    return this._element;
  }
};