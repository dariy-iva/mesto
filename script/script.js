'use strict';

const profileEditButton = document.querySelector('.profile__edit-button');
function popupOpened() {
  popup.classList.add('popup_opened');
}

const popup = document.querySelector('.popup');
const popupResetButton = document.querySelector('.popup__reset-button');
function popupClosed() {
  popup.classList.remove('popup_opened');
}

const nameProfile = document.querySelector('.profile__name');
const aboutMeProfile = document.querySelector('.profile__about-me');
const formElement = popup.querySelector('.popup__container');
const nameInput = formElement.querySelector('.popup__text_content_name');
const aboutMeInput = formElement.querySelector('#about-me');

function setInfoInForm() {
  nameInput.value = nameProfile.textContent;
  aboutMeInput.value = aboutMeProfile.textContent;
}
function formSubmitHandler(evt) {
  evt.preventDefault(); 
  if (nameInput.value) {
    nameProfile.textContent = nameInput.value;
  }
  if (aboutMeInput.value) {
    aboutMeProfile.textContent = aboutMeInput.value;
  }
  popupClosed();
}

profileEditButton.addEventListener('click', function() {
  popupOpened();
  setInfoInForm();
});
popupResetButton.addEventListener('click', popupClosed);
formElement.addEventListener('submit', formSubmitHandler);