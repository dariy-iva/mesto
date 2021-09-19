import {
  userNameProfileSelector,
  userAboutMeSelector,
  postsSectionSelector,
  postTemplateSelector,
  popupContentPhotoSelector,
  popupContentFormAddPostSelector,
  popupContentFormEditProfileSelector,
  formEditProfileElement,
  formAddPostElement,
  buttonOpenPopupEditProfileElement,
  buttonOpenPopupAddPostElement,
  buttonSubmitFormEditProfileElement,
  buttonSubmitPopupAddProfileElement
} from '../utils/constants.js';
import { initialCardsItems } from '../utils/initialCard.js';
import { toggleButtonOnActive, toggleButtonOnDisabled } from '../utils/utils.js';

import Card from '../components/Card.js';
import { validationConfig, FormValidator } from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const editProfileFormValidate = new FormValidator(validationConfig, formEditProfileElement);
const addPostFormValidate = new FormValidator(validationConfig, formAddPostElement);

// вызов валидации форм
editProfileFormValidate.enableValidation();
addPostFormValidate.enableValidation();

// скрыть ошибки в форме (используется внутри обработчиков открытия попапов с формами)
function hideErrorForm(formValidate) {
  formValidate.inputList.forEach(input => {
    formValidate.hideInputError(input);
  });
}

// обработчик клика по карточке
function handleCardClick(dataParam) {
    const popup = new PopupWithImage({
      data: dataParam
    }, popupContentPhotoSelector);
    popup.open();
}

const cardList = new Section({
  data: initialCardsItems,
  renderer: (cardItem) => {
    const post = new Card({
      data: cardItem,
      handleCardClick: () => handleCardClick(cardItem)
    }, postTemplateSelector);

    const postElement = post.generatePost();
    cardList.addItem(postElement);
  }
}, postsSectionSelector);

// вызов отрисовки постов на странице 
cardList.renderItems();

// обработчик открытия попапа добавления поста
function handleOpenPopupAddPost() {
  const popup = new PopupWithForm({
    handleSubmitForm: (item) => {
      const post = new Card({
        data: item,
        handleCardClick: () => handleCardClick(item)
      }, postTemplateSelector);

      const postElement = post.generatePost();
      cardList.addItem(postElement);
      popup.close();
    }
  }, popupContentFormAddPostSelector);

  hideErrorForm(addPostFormValidate);
  toggleButtonOnDisabled(buttonSubmitPopupAddProfileElement);
  popup.open();
}

const userInfo = new UserInfo({ userNameProfileSelector, userAboutMeSelector });

// обработчик открытия попапа редактирования профиля
function handleOpenPopupEditProfile() {
  const popup = new PopupWithForm({
    handleSubmitForm: (item) => {
      userInfo.setUserInfo(item);
      popup.close();
    }
  }, popupContentFormEditProfileSelector);

  popup.setInputValues(userInfo.getUserInfo());
  hideErrorForm(editProfileFormValidate);
  toggleButtonOnActive(buttonSubmitFormEditProfileElement);
  popup.open();
}

buttonOpenPopupAddPostElement.addEventListener('click', handleOpenPopupAddPost);
buttonOpenPopupEditProfileElement.addEventListener('click', handleOpenPopupEditProfile);