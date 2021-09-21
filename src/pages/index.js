import './index.css'

import {
  userNameProfileSelector,
  userAboutMeSelector,
  postsSectionSelector,
  postTemplateSelector,
  popupContentPhotoSelector,
  popupContentFormAddPostSelector,
  popupContentFormEditProfileSelector
} from '../script/utils/constants.js';
import { initialCardsItems } from '../script/utils/initialCard.js';

import Card from '../script/components/Card.js';
import { validationConfig, FormValidator } from '../script/components/FormValidator.js';
import Section from '../script/components/Section.js';
import PopupWithImage from '../script/components/PopupWithImage.js';
import PopupWithForm from '../script/components/PopupWithForm.js';
import UserInfo from '../script/components/UserInfo.js';

const buttonOpenPopupEditProfileElement = document.querySelector('.profile__edit-button');
const buttonOpenPopupAddPostElement = document.querySelector('.profile__add-button');

const formEditProfileElement = document.querySelector('.popup__form_contain_edit-profile');
const formAddPostElement = document.querySelector('.popup__form_contain_add-post');

const editProfileFormValidate = new FormValidator(validationConfig, formEditProfileElement);
const addPostFormValidate = new FormValidator(validationConfig, formAddPostElement);

const popupWithImage = new PopupWithImage(popupContentPhotoSelector);

const popupEditProfile = new PopupWithForm({
  handleSubmitForm: (item) => {
    userInfo.setUserInfo(item);
    popupEditProfile.close();
  }
}, popupContentFormEditProfileSelector);

const popupAddPost = new PopupWithForm({
  handleSubmitForm: (item) => {
    createPost(item);
    popupAddPost.close();
  }
}, popupContentFormAddPostSelector);

const cardList = new Section({
  data: initialCardsItems,
  renderer: (cardItem) => createPost(cardItem)
}, postsSectionSelector);

const userInfo = new UserInfo({ userNameProfileSelector, userAboutMeSelector });

// создать пост
function createPost(dateItem) {
  const post = new Card({
    data: dateItem,
    handleCardClick: () => handleCardClick(dateItem)
  }, postTemplateSelector);

  const postElement = post.generatePost();
  cardList.addItem(postElement);
}

// скрыть ошибки в форме и переключить кнопку (используется внутри обработчиков открытия попапов с формами)
function hideErrorAndToggleButtonForm(formValidate) {
  formValidate.inputList.forEach(input => {
    formValidate.hideInputError(input);
  });
  formValidate.toggleButtonState(formValidate.inputList);
}

// обработчик клика по карточке
function handleCardClick(dataImage) {
  popupWithImage.open(dataImage);
}

// обработчик открытия попапа добавления поста
function handleOpenPopupAddPost() {
  hideErrorAndToggleButtonForm(addPostFormValidate);
  popupAddPost.open();
}

// обработчик открытия попапа редактирования профиля
function handleOpenPopupEditProfile() {
  popupEditProfile.setInputValues(userInfo.getUserInfo());
  hideErrorAndToggleButtonForm(editProfileFormValidate);
  popupEditProfile.open();
}

// вызвать валидацию форм
editProfileFormValidate.enableValidation();
addPostFormValidate.enableValidation();

// вызвать отрисовку постов на странице 
cardList.renderItems();

// добавить слушатели попапам
popupWithImage.setEventListeners();
popupEditProfile.setEventListeners();
popupAddPost.setEventListeners();

// добавить слушатели кнопкам открытия попапов
buttonOpenPopupAddPostElement.addEventListener('click', handleOpenPopupAddPost);
buttonOpenPopupEditProfileElement.addEventListener('click', handleOpenPopupEditProfile);