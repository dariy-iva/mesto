import './index.css'

import {
  userInfoConfig,
  postsSectionSelector,
  postTemplateSelector,
  popupContentPhotoSelector,
  popupContentFormAddPostSelector,
  popupContentFormEditProfileSelector,
  popupContentFormDeletePostSelector,
  popupContentFormEditAvatarSelector,
  apiConfig
} from '../script/utils/constants.js';

import Card from '../script/components/Card.js';
import { validationConfig, FormValidator } from '../script/components/FormValidator.js';
import Section from '../script/components/Section.js';
import PopupWithImage from '../script/components/PopupWithImage.js';
import PopupWithForm from '../script/components/PopupWithForm.js';
import PopupDeletePost from '../script/components/PopupDeletePost';
import UserInfo from '../script/components/UserInfo.js';
import Api from '../script/components/Api.js'

const buttonOpenPopupEditProfileElement = document.querySelector('.profile__edit-button');
const buttonOpenPopupAddPostElement = document.querySelector('.profile__add-button');
const buttonOpenPopupEditAvatarElement = document.querySelector('.profile__edit-avatar');

const formEditProfileElement = document.querySelector('.popup__form_contain_edit-profile');
const formAddPostElement = document.querySelector('.popup__form_contain_add-post');
const formEditAvatarElement = document.querySelector('.popup__form_contain_edit-avatar');

const editProfileFormValidate = new FormValidator(validationConfig, formEditProfileElement);
const addPostFormValidate = new FormValidator(validationConfig, formAddPostElement);
const editAvatarFormValidate = new FormValidator(validationConfig, formEditAvatarElement);

const popupWithImage = new PopupWithImage(popupContentPhotoSelector);

const popupEditProfile = new PopupWithForm({
  handleSubmitForm: (item) => {
    popupEditProfile.renderLoading(true);
    const postUserInfoInServer = api.postUserInfo(item);
    postUserInfoInServer
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .catch(err => console.log(err))
      .finally(() => {
        popupEditProfile.renderLoading(false);
        popupEditProfile.close();
      })
  }
}, popupContentFormEditProfileSelector);

const popupAddPost = new PopupWithForm({
  handleSubmitForm: (item) => {
    popupAddPost.renderLoading(true);
    const postPostInServer = api.postPost(item);
    postPostInServer
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((res) => {
        createPost(res);
      })
      .catch(err => console.log(err))
      .finally(() => {
        popupAddPost.renderLoading(false);
        popupAddPost.close();
      })
  }
}, popupContentFormAddPostSelector);

const popupEditAvatar = new PopupWithForm({
  handleSubmitForm: (item) => {
    popupEditAvatar.renderLoading(true);
    const postAvatarInServer = api.postUserAvatar(item);
    postAvatarInServer
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((res) => {
        userInfo.setUserAvatar(res);
      })
      .catch(err => console.log(err))
      .finally(() => {
        popupEditAvatar.renderLoading(false);
        popupEditAvatar.close();
      })
  }
}, popupContentFormEditAvatarSelector);


const popupDeletePost = new PopupDeletePost(popupContentFormDeletePostSelector);

const cardList = new Section({
  renderer: (postItem) => createPost(postItem)
}, postsSectionSelector);

const userInfo = new UserInfo(userInfoConfig);

const api = new Api(apiConfig);
const searchUserInfoServer = api.searchUserInfo();
const searchPostsServer = api.searchPosts();

function getUserInfo() {
  searchUserInfoServer
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .then((data) => {
      userInfo.setUserInfo(data);
      userInfo.setUserAvatar(data);
    })
    .catch(err => console.log(err))
}

function getPosts() {
  searchPostsServer
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .then((res) => {
      cardList.renderItems(res);
    })
    .catch(err => console.log(err))
}

// создать пост
function createPost(dataItem) {
  const post = new Card({
    handleCardClick: () => handleCardClick(dataItem),
    handleButtonDelClick: () => handleButtonDelClick(postElement),
    handleButtonLikeClick: () => handleButtonLikeClick(post, postElement)
  }, postTemplateSelector);

  const postElement = post.generatePost(dataItem);

  if (postElement.ownerId === userInfo._userInfo.id) {
    post.toggleButtonDelOnVisible();
  }

  renderLikeUser(postElement, post);

  cardList.addItem(postElement);
}

// отрисовать лайк пользователя (используется при загрузке карточек с сервера)
function renderLikeUser(post, postPrototype) {
  const myLikes = post.likes.filter((item) => {
    return item._id === userInfo._userInfo.id
  });

  if (myLikes.length !== 0) {
    postPrototype.toggleButtonLike();
  }
}

// скрыть ошибки в форме и переключить кнопку (используется внутри обработчиков открытия попапов с формами)
function hideErrorAndToggleButtonForm(formValidate) {
  formValidate.inputList.forEach(input => {
    formValidate.hideInputError(input);
  });
  formValidate.toggleButtonState(formValidate.inputList);
}

// обработчик клика по кнопке лайка
function handleButtonLikeClick(post, postElement) {
  if (!post.buttonLikeElement.classList.contains('post__like-button_active')) {

    const postLikePost = api.postLikePost(postElement.cardId);
    postLikePost
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((res) => {
        post.addLikePost(res.likes.length);
      })
      .catch(err => console.log(err))

  } else {

    const postDelLikePost = api.postDelLikePost(postElement.cardId);
    postDelLikePost
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((res) => {
        post.deleteLikePost(res.likes.length);
      })
      .catch(err => console.log(err))
  }
  post.toggleButtonLike();
}

// обработчик клика по кнопке удаления поста
function handleButtonDelClick(postElement) {
  popupDeletePost.open({
    handleSubmitForm: () => {
      const postDeletePost = api.postDeletePost(postElement.cardId);
      postDeletePost
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(res.status);
        })
        .then(() => {
          postElement.remove();
        })
        .catch(err => console.log(err))
        .finally(() => {
          popupDeletePost.close();
        })
    }
  });
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

// обработчик открытия попапа редактирования аватара
function handleOpenPopupEditAvatar() {
  hideErrorAndToggleButtonForm(editAvatarFormValidate);
  popupEditAvatar.open();
}

// записать данные пользователя с сервера в поля страницы
getUserInfo();

// вызвать отрисовку постов, полученных с сервера 
getPosts();

// вызвать валидацию форм
editProfileFormValidate.enableValidation();
addPostFormValidate.enableValidation();
editAvatarFormValidate.enableValidation();

// добавить слушатели попапам
popupWithImage.setEventListeners();
popupEditProfile.setEventListeners();
popupEditAvatar.setEventListeners();
popupAddPost.setEventListeners();
popupDeletePost.setEventListeners();

// добавить слушатели кнопкам открытия попапов
buttonOpenPopupAddPostElement.addEventListener('click', handleOpenPopupAddPost);
buttonOpenPopupEditProfileElement.addEventListener('click', handleOpenPopupEditProfile);
buttonOpenPopupEditAvatarElement.addEventListener('click', handleOpenPopupEditAvatar);