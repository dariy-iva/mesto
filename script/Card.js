import { openPopup, popupPhoto } from './index.js'

const initialPostsItems = [
  {
    name: 'Канада',
    link: './images/canada.jpg'
  },
  {
    name: 'Норвегия',
    link: './images/norway.jpg'
  },
  {
    name: 'Россия',
    link: './images/russia.jpg'
  },
  {
    name: 'Боливия',
    link: './images/bolivia.jpg'
  },
  {
    name: 'Исландия',
    link: './images/island.jpg'
  },
  {
    name: 'Румыния',
    link: './images/romania.jpg'
  },
];

class Card {
  constructor(data, postSelector) {
    this._name = data.name;
    this._link = data.link;
    this._postSelector = postSelector;
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
    if (!this._element.querySelector('.post__like-button').classList.contains('post__like-button_active')) {
      return this._element.querySelector('.post__like-button').classList.add('post__like-button_active');
    }
    this._element.querySelector('.post__like-button').classList.remove('post__like-button_active');
  }

  _handleRemovePost() {
    this._element.querySelector('.post__del-button').closest('.post').remove();
  }

  _handleShowPopupPhoto() {
    const popupPhotoElementPhoto = popupPhoto.querySelector('.popup__photo');
    const popupPhotoElementCaption = popupPhoto.querySelector('.popup__caption-photo');

    openPopup(popupPhoto);

    popupPhotoElementPhoto.src = this._element.querySelector('.post__photo').src;
    popupPhotoElementPhoto.alt = this._element.querySelector('.post__photo').alt;
    popupPhotoElementCaption.textContent = this._element
      .querySelector('.post__photo')
      .nextElementSibling
      .textContent;
  }

  _setEventListeners() {

    this._element.querySelector('.post__like-button').addEventListener('click', () => {
      this._handleLikePost();
    });
    this._element.querySelector('.post__del-button').addEventListener('click', () => {
      this._handleRemovePost();
    });
    this._element.querySelector('.post__photo').addEventListener('click', () => {
      this._handleShowPopupPhoto();
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

export { Card, initialPostsItems };