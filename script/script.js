'use strict';

function popupOpened(idPopup) {
  document.querySelector(idPopup).classList.add('popup_opened');
}
function popupClosed(idPopup) {
  document.querySelector(idPopup).classList.remove('popup_opened');
}

const nameProfile = document.querySelector('.profile__name');
const aboutMeProfile = document.querySelector('.profile__about-me');
const formElementEditProfile = document.querySelector('#popup-edit-profile .popup__container');
const nameInput = formElementEditProfile.querySelector('.popup__text_content_name');
const aboutMeInput = formElementEditProfile.querySelector('#about-me');

// получение данных со страницы для окна редактирования профиля
function setInfoInFormEditProfile() {
  nameInput.value = nameProfile.textContent;
  aboutMeInput.value = aboutMeProfile.textContent;
}

// открытие окна редактирования профиля
const profileEditButton = document.querySelector('.profile__edit-button');
profileEditButton.addEventListener('click', function () {
  popupOpened('#popup-edit-profile');
  setInfoInFormEditProfile();
});

// закрытие окна редактирования профиля
const popupEditReset = document.querySelector('#popup-edit-profile .popup__reset-button');
popupEditReset.addEventListener('click', function () {
  popupClosed('#popup-edit-profile');
});

// обработчик отправки формы редактирования профиля
function formSubmitHandlerEditProfile(evt) {
  evt.preventDefault();
  if (nameInput.value) {
    nameProfile.textContent = nameInput.value;
  }
  if (aboutMeInput.value) {
    aboutMeProfile.textContent = aboutMeInput.value;
  }
  popupClosed('#popup-edit-profile');
}

formElementEditProfile.addEventListener('submit', formSubmitHandlerEditProfile);

const initialPosts = [
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

const posts = document.querySelector('.posts');

// добавление/удаление лайков к постам
function addLikePost(event) {
  if (!event.target.classList.contains('post__like-button_active')) {
    return event.target.classList.add('post__like-button_active');
  }
  event.target.classList.remove('post__like-button_active');
}

// удаление поста
function removePost(event) {
  event.target.closest('.post').remove();
}

const popupOpenPhoto = document.querySelector('#popup-open-photo');
const popupOpenPhotoReset = popupOpenPhoto.querySelector('.popup__reset-button');
const popupOpenPhotoElementPhoto = popupOpenPhoto.querySelector('.popup__photo');
const popupOpenPhotoElementCaption = popupOpenPhoto.querySelector('.popup__caption-photo');

// открытие/закрытие окна просмотра фотографий
function showPopupOpenPhoto(event) {
  popupOpened('#popup-open-photo');

  popupOpenPhotoElementPhoto.src = event.target.src;
  popupOpenPhotoElementCaption.textContent = event.currentTarget.nextElementSibling.textContent;

  popupOpenPhotoReset.addEventListener('click', function () {
    popupClosed('#popup-open-photo');
  });
}

// отрисовка постов на странице с функционалом элементов
function renderPosts(item) {
  const postTemplate = document.querySelector('.post-template').content.firstElementChild.cloneNode(true);

  postTemplate.querySelector('.post__photo').src = item.link;
  postTemplate.querySelector('.post__caption').textContent = item.name;
  postTemplate.querySelector('.post__like-button').addEventListener('click', addLikePost);
  postTemplate.querySelector('.post__del-button').addEventListener('click', removePost);
  postTemplate.querySelector('.post__photo').addEventListener('click', showPopupOpenPhoto);

  posts.prepend(postTemplate);
}

initialPosts.forEach(renderPosts);

// открытие окна добавления поста
const profileAddButton = document.querySelector('.profile__add-button');
profileAddButton.addEventListener('click', function () {
  popupOpened('#popup-add-profile');
})

// закрытие окна добавления поста
const popupAddReset = document.querySelector('#popup-add-profile .popup__reset-button');
popupAddReset.addEventListener('click', function () {
  popupClosed('#popup-add-profile');
});

const formElementAddProfile = document.querySelector('#popup-add-profile .popup__container');
const placeInput = formElementAddProfile.querySelector('#place');
const linkInput = formElementAddProfile.querySelector('#link');

// обработчик отправки формы добавления поста
function formSubmitHandlerAddProfile(evt) {
  evt.preventDefault();
  const newPost = {
    name: placeInput.value,
    link: linkInput.value
  }
  if (placeInput.value && linkInput.value) {
    initialPosts.push(newPost);
    renderPosts(newPost);
  }
  popupClosed('#popup-add-profile');
  placeInput.value = '';
  linkInput.value = '';
}

formElementAddProfile.addEventListener('submit', formSubmitHandlerAddProfile);