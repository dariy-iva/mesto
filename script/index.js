import { Card } from './Card.js';
import { FormValidator, validationConfig } from './FormValidator.js';

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

const nameProfile = document.querySelector('.profile__name');
const aboutMeProfile = document.querySelector('.profile__about-me');

const formElementEditProfile = document.querySelector('.popup__form_contain_edit-profile');
const formElementAddPost = document.querySelector('.popup__form_contain_add-post');

const popupEditProfile = document.querySelector('#popup-edit-profile');
const popupAddPost = document.querySelector('#popup-add-profile');
const popupShowPhoto = document.querySelector('#popup-open-photo');

const nameInput = formElementEditProfile.querySelector('.popup__input_content_name');
const aboutMeInput = formElementEditProfile.querySelector('#about-me-input');
const placeInput = formElementAddPost.querySelector('#place-input');
const linkInput = formElementAddPost.querySelector('#link-input');

const buttonOpenPopupEditProfile = document.querySelector('.profile__edit-button');
const buttonOpenPopupAddPost = document.querySelector('.profile__add-button');

const buttonSubmitFormEditProfile = popupEditProfile.querySelector('.popup__submit-button');
const buttonSubmitPopupAddProfile = document.querySelector('#popup-add-profile .popup__submit-button');

const buttonResetPopupEditProfile = document.querySelector('#popup-edit-profile .popup__reset-button');
const buttonResetPopupAddPost = document.querySelector('#popup-add-profile .popup__reset-button');
const buttonResetPopupShowPhoto = popupShowPhoto.querySelector('.popup__reset-button');

const editProfileFormValidate = new FormValidator(validationConfig, formElementEditProfile);
const addPostFormValidate = new FormValidator(validationConfig, formElementAddPost);

// закрытие попап кликом на оверлей
function closePopupOnOverlay(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.target.classList.contains('popup_opened')) {
    closePopup(popupOpened);
  }
}

// закрытие попап нажатием на esc
function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    const popupOpened = document.querySelector('.popup_opened');
    closePopup(popupOpened);
  }
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
  popup.addEventListener('click', closePopupOnOverlay);
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEsc);
  popup.removeEventListener('click', closePopupOnOverlay);
}

// заполнение полей в форме редактирования профиля данными со страницы
function setInfoInPopupProfile() {
  nameInput.value = nameProfile.textContent;
  aboutMeInput.value = aboutMeProfile.textContent;
}

// переключение кнопки в активное состояние
function toggleButtonOnActive(buttonElement) {
  buttonElement.classList.remove('popup__submit-button_inactive');
  buttonElement.disabled = false;
}

// переключение кнопки в неактивное состояние
function toggleButtonOnDisabled(buttonElement) {
  buttonElement.classList.add('popup__submit-button_inactive');
  buttonElement.disabled = true;
}

// скрыть ошибки в форме при повторном открытии
function hideError(popup) {
  const inputElements = Array.from(popup.querySelectorAll('.popup__input'));
  inputElements.forEach((inputElement) => {
    inputElement.classList.remove('popup__input_type_error');
  });
  const errorElements = Array.from(popup.querySelectorAll('.popup__error'));
  errorElements.forEach((errorElement) => {
    errorElement.classList.remove('popup__error_visible');
    errorElement.textContent = '';
  })
}

// отрисовка постов на странице 
function renderPosts(item) {
  const posts = document.querySelector('.posts');
  const post = new Card(item, '.post-template');

  const postElement = post.generatePost();
  posts.prepend(postElement);
}

// обработчик открытия окна добавления поста
function handleOpenPopupAddPost() {
  hideError(popupAddPost);
  openPopup(popupAddPost);
}

// обработчик закрытия окна добавления поста
function handleClosePopupAddPost() {
  closePopup(popupAddPost);
}

// обработчик открытия окна редактирования профиля
function handleOpenPopupEditProfile() {
  setInfoInPopupProfile();
  toggleButtonOnActive(buttonSubmitFormEditProfile);
  hideError(popupEditProfile);
  openPopup(popupEditProfile);
}

// обработчик закрытия окна редактирования профиля
function handleClosePopupEditProfile() {
  closePopup(popupEditProfile);
}

// обработчик закрытия окна просмотра фотографий
function handleClosePopupShowPhoto() {
  closePopup(popupShowPhoto);
}

// обработчик отправки формы редактирования профиля
function handleSubmitFormEditProfile(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  aboutMeProfile.textContent = aboutMeInput.value;
  closePopup(popupEditProfile);
}

// обработчик отправки формы добавления поста
function handleSubmitFormAddProfile(evt) {
  evt.preventDefault();
  const newPost = {
    name: placeInput.value,
    link: linkInput.value
  }
  renderPosts(newPost);
  closePopup(popupAddPost);
  popupAddPost.querySelector('.popup__form').reset();
  toggleButtonOnDisabled(buttonSubmitPopupAddProfile);
}

buttonOpenPopupEditProfile.addEventListener('click', handleOpenPopupEditProfile);
buttonOpenPopupAddPost.addEventListener('click', handleOpenPopupAddPost);

buttonResetPopupEditProfile.addEventListener('click', handleClosePopupEditProfile);
buttonResetPopupAddPost.addEventListener('click', handleClosePopupAddPost);
buttonResetPopupShowPhoto.addEventListener('click', handleClosePopupShowPhoto);

formElementEditProfile.addEventListener('submit', handleSubmitFormEditProfile);
formElementAddPost.addEventListener('submit', handleSubmitFormAddProfile);

// вызов валидации форм
editProfileFormValidate.enableValidation();
addPostFormValidate.enableValidation();

// вызов отрисовки постов на странице 
initialPostsItems.forEach(renderPosts);

export { openPopup, popupShowPhoto }