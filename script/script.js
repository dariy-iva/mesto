'use strict';
const profileEditButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const popupResetButton = document.querySelector('.popup__reset-button');
const formElement = popup.querySelector('.popup__container');
const nameInput = formElement.querySelector('.popup__text_name');
const aboutMeInput = formElement.querySelector('#about-me');
function popupOpened() {
  popup.classList.add('popup_opened');
}
profileEditButton.addEventListener('click', popupOpened);
function popupClosed() {
  popup.classList.remove('popup_opened');
}
popupResetButton.addEventListener('click', popupClosed);
function formSubmitHandler(evt) {
  evt.preventDefault();
  const nameProfile = document.querySelector('.profile__name');
  const aboutMeProfile = document.querySelector('.profile__about-me');
  if (nameInput.value) {
    nameProfile.textContent = nameInput.value;
  }
  if (aboutMeInput.value) {
    aboutMeProfile.textContent = aboutMeInput.value;
  }
  popupClosed();
}
formElement.addEventListener('submit', formSubmitHandler);