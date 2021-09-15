import Card from '../components/Card.js';
import { FormValidator, validationConfig } from '../components/FormValidator.js';
import { initialCardsItems } from '../utils/initialCard.js';
import Section from '../components/Section.js';
import {
  nameProfile,
  aboutMeProfile,
  formElementEditProfile,
  formElementAddPost,
  popupEditProfile,
  popupAddPost,
  nameInput,
  aboutMeInput,
  placeInput,
  linkInput,
  buttonOpenPopupEditProfile,
  buttonOpenPopupAddPost,
  buttonSubmitFormEditProfile,
  buttonSubmitPopupAddProfile,
  buttonResetPopupEditProfile,
  buttonResetPopupAddPost,
  postsSectionSelector
} from '../utils/constants.js';
import PopupWithImage from '../components/PopupWithImage.js';

const editProfileFormValidate = new FormValidator(validationConfig, formElementEditProfile);
const addPostFormValidate = new FormValidator(validationConfig, formElementAddPost);

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

const cardList = new Section({
  data: initialCardsItems,
  renderer: (cardItem) => {
    const post = new Card({
      data: cardItem,

      handleCardClick: () => {
        const popup = new PopupWithImage({
          data: cardItem
        }, '.popup_content_photo');
        popup.open();
      }

    }, '.post-template');

    const postElement = post.generatePost();
    cardList.addItem(postElement);
  }

}, postsSectionSelector);

// вызов отрисовки постов на странице 
cardList.renderItems();

buttonOpenPopupEditProfile.addEventListener('click', handleOpenPopupEditProfile);
buttonOpenPopupAddPost.addEventListener('click', handleOpenPopupAddPost);

buttonResetPopupEditProfile.addEventListener('click', handleClosePopupEditProfile);
buttonResetPopupAddPost.addEventListener('click', handleClosePopupAddPost);

formElementEditProfile.addEventListener('submit', handleSubmitFormEditProfile);
formElementAddPost.addEventListener('submit', handleSubmitFormAddProfile);

// вызов валидации форм
editProfileFormValidate.enableValidation();
addPostFormValidate.enableValidation();