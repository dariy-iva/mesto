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

export { toggleButtonOnActive, toggleButtonOnDisabled }