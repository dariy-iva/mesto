export const nameProfile = document.querySelector('.profile__name');
export const aboutMeProfile = document.querySelector('.profile__about-me');

export const postsSectionSelector = '.posts';

export const formElementEditProfile = document.querySelector('.popup__form_contain_edit-profile');
export const formElementAddPost = document.querySelector('.popup__form_contain_add-post');

export const popupEditProfile = document.querySelector('#popup-edit-profile');
export const popupAddPost = document.querySelector('#popup-add-profile');
export const popupShowPhoto = document.querySelector('#popup-open-photo');

export const nameInput = formElementEditProfile.querySelector('.popup__input_content_name');
export const aboutMeInput = formElementEditProfile.querySelector('#about-me-input');
export const placeInput = formElementAddPost.querySelector('#place-input');
export const linkInput = formElementAddPost.querySelector('#link-input');

export const buttonOpenPopupEditProfile = document.querySelector('.profile__edit-button');
export const buttonOpenPopupAddPost = document.querySelector('.profile__add-button');

export const buttonSubmitFormEditProfile = popupEditProfile.querySelector('.popup__submit-button');
export const buttonSubmitPopupAddProfile = document.querySelector('#popup-add-profile .popup__submit-button');

export const buttonResetPopupEditProfile = document.querySelector('#popup-edit-profile .popup__reset-button');
export const buttonResetPopupAddPost = document.querySelector('#popup-add-profile .popup__reset-button');
export const buttonResetPopupShowPhoto = popupShowPhoto.querySelector('.popup__reset-button');