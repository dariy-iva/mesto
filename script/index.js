import { Card, initialPostsItems } from './Card.js';
import { FormValidator, validationConfig } from './FormValidator.js';

// отрисовка постов на странице 
function renderPosts(item) {
  const posts = document.querySelector('.posts');
  const Post = new Card(item, '.post-template');

  const postElement = Post.generatePost();
  posts.prepend(postElement);
}
initialPostsItems.forEach(renderPosts);

// валидация форм
const formEditPrifileElement = document.querySelector('.popup__form_contain_edit-profile');
const formAddPostElement = document.querySelector('.popup__form_contain_add-post');
const EditProfileFormValidate = new FormValidator(validationConfig, formEditPrifileElement);
const AddPostFormValidate = new FormValidator(validationConfig, formAddPostElement);

EditProfileFormValidate.enableValidation();
AddPostFormValidate.enableValidation();

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

// скрыть ошибки в форме
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

const nameProfile = document.querySelector('.profile__name');
const aboutMeProfile = document.querySelector('.profile__about-me');
const formElementEditProfile = document.querySelector('#popup-edit-profile .popup__container');
const nameInput = formElementEditProfile.querySelector('.popup__input_content_name');
const aboutMeInput = formElementEditProfile.querySelector('#about-me-input');
const popupProfile = document.querySelector('#popup-edit-profile');
const buttonSubmitPopupEditProfile = popupProfile.querySelector('.popup__submit-button');
const buttonOpenEditProfile = document.querySelector('.profile__edit-button');

// заполнение полей в форме редактирования профиля данными со страницы
function setInfoInPopupProfile() {
  nameInput.value = nameProfile.textContent;
  aboutMeInput.value = aboutMeProfile.textContent;
}
setInfoInPopupProfile();

// переключение кнопки в активное состояние
function toggleButtonOnActive(buttonElement) {
  buttonElement.classList.remove('popup__submit-button_inactive');
  buttonElement.disabled = false;
}

// открытие окна редактирования профиля
function openPopupProfile() {
  setInfoInPopupProfile();
  toggleButtonOnActive(buttonSubmitPopupEditProfile);
  hideError(popupProfile);
  openPopup(popupProfile);
}

buttonOpenEditProfile.addEventListener('click', openPopupProfile);

// закрытие окна редактирования профиля
const popupEditReset = document.querySelector('#popup-edit-profile .popup__reset-button');
popupEditReset.addEventListener('click', function () {
  closePopup(popupProfile);
});

// обработчик отправки формы редактирования профиля
function handleSubmitFormEditProfile(evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  aboutMeProfile.textContent = aboutMeInput.value;
  closePopup(popupProfile);
}

formElementEditProfile.addEventListener('submit', handleSubmitFormEditProfile);

const popupPhoto = document.querySelector('#popup-open-photo');
const popupPhotoReset = popupPhoto.querySelector('.popup__reset-button');

// закрытие окна просмотра фотографий
popupPhotoReset.addEventListener('click', function () {
  closePopup(popupPhoto);
});

const popupPost = document.querySelector('#popup-add-profile');
// открытие окна добавления поста
const profileAddButton = document.querySelector('.profile__add-button');
profileAddButton.addEventListener('click', function () {
  hideError(popupPost);
  openPopup(popupPost);
})

// закрытие окна добавления поста
const popupAddReset = document.querySelector('#popup-add-profile .popup__reset-button');
popupAddReset.addEventListener('click', function () {
  closePopup(popupPost);
});

const formElementAddProfile = document.querySelector('#popup-add-profile .popup__container');
const placeInput = formElementAddProfile.querySelector('#place-input');
const linkInput = formElementAddProfile.querySelector('#link-input');


// переключение кнопки в неактивное состояние
function toggleButtonOnDisabled(buttonElement) {
  buttonElement.classList.add('popup__submit-button_inactive');
  buttonElement.disabled = true;
}

const buttonSubmitPopupAddProfile = document.querySelector('#popup-add-profile .popup__submit-button');
// обработчик отправки формы добавления поста
function handleSubmitFormAddProfile(evt) {
  evt.preventDefault();
  const newPost = {
    name: placeInput.value,
    link: linkInput.value
  }
  renderPosts(newPost);
  closePopup(popupPost);
  popupPost.querySelector('.popup__form').reset();
  toggleButtonOnDisabled(buttonSubmitPopupAddProfile);
}

formElementAddProfile.addEventListener('submit', handleSubmitFormAddProfile);

export { openPopup, popupPhoto }