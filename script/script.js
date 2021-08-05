'use strict';

function openPopup(popup) {
  popup.classList.add('popup_opened');
}
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

const nameProfile = document.querySelector('.profile__name');
const aboutMeProfile = document.querySelector('.profile__about-me');
const formElementEditProfile = document.querySelector('#popup-edit-profile .popup__container');
const nameInput = formElementEditProfile.querySelector('.popup__text_content_name');
const aboutMeInput = formElementEditProfile.querySelector('#about-me');
const popupProfile = document.querySelector('#popup-edit-profile');

// открытие окна редактирования профиля с получением данных со страницы
const buttonEditProfile = document.querySelector('.profile__edit-button');

function openPopupProfile() {
  nameInput.value = nameProfile.textContent;
  aboutMeInput.value = aboutMeProfile.textContent;
  openPopup(popupProfile);
}

buttonEditProfile.addEventListener('click', openPopupProfile);

// закрытие окна редактирования профиля
const popupEditReset = document.querySelector('#popup-edit-profile .popup__reset-button');
popupEditReset.addEventListener('click', function () {
  closePopup(popupProfile);
});

// обработчик отправки формы редактирования профиля
function handleSubmitFormEditProfile(evt) {
  evt.preventDefault();
  if (nameInput.value) {
    nameProfile.textContent = nameInput.value;
  }
  if (aboutMeInput.value) {
    aboutMeProfile.textContent = aboutMeInput.value;
  }
  closePopup(popupProfile);
}
formElementEditProfile.addEventListener('submit', handleSubmitFormEditProfile);

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

const popupPhoto = document.querySelector('#popup-open-photo');
const popupPhotoReset = popupPhoto.querySelector('.popup__reset-button');
const popupPhotoElementPhoto = popupPhoto.querySelector('.popup__photo');
const popupPhotoElementCaption = popupPhoto.querySelector('.popup__caption-photo');

// открытие окна просмотра фотографий
function showPopupPhoto(event) {
  openPopup(popupPhoto);

  popupPhotoElementPhoto.src = event.target.src;
  popupPhotoElementCaption.textContent = event.currentTarget.nextElementSibling.textContent;
}

// закрытие окна просмотра фотографий
popupPhotoReset.addEventListener('click', function () {
  closePopup(popupPhoto);
});

// создание поста с функционалом элементов
function createPost(item) {
  const postTemplate = document.querySelector('.post-template').content.firstElementChild.cloneNode(true);

  postTemplate.querySelector('.post__photo').src = item.link;
  postTemplate.querySelector('.post__photo').alt = item.name;
  postTemplate.querySelector('.post__caption').textContent = item.name;
  postTemplate.querySelector('.post__like-button').addEventListener('click', addLikePost);
  postTemplate.querySelector('.post__del-button').addEventListener('click', removePost);
  postTemplate.querySelector('.post__photo').addEventListener('click', showPopupPhoto);
  
  return postTemplate;
}

// отрисовка постов на странице 
function renderPosts(item) {
  posts.prepend(createPost(item));
}

initialPosts.forEach(renderPosts);

const popupPost = document.querySelector('#popup-add-profile');
// открытие окна добавления поста
const profileAddButton = document.querySelector('.profile__add-button');
profileAddButton.addEventListener('click', function () {
  openPopup(popupPost);
})

// закрытие окна добавления поста
const popupAddReset = document.querySelector('#popup-add-profile .popup__reset-button');
popupAddReset.addEventListener('click', function () {
  closePopup(popupPost);
});

const formElementAddProfile = document.querySelector('#popup-add-profile .popup__container');
const placeInput = formElementAddProfile.querySelector('#place');
const linkInput = formElementAddProfile.querySelector('#link');

// обработчик отправки формы добавления поста
function handleSubmitFormAddProfile(evt) {
  evt.preventDefault();
  const newPost = {
    name: placeInput.value,
    link: linkInput.value
  }
  if (placeInput.value && linkInput.value) {
    renderPosts(newPost);
  }
  closePopup(popupPost);
  document.querySelector('#form-add-profile').reset();
}

formElementAddProfile.addEventListener('submit', handleSubmitFormAddProfile);