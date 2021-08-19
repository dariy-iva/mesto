'use strict';

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// показать текст ошибки
const showInputError = (formElement, inputElement, objConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(objConfig.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(objConfig.errorClass);
}

// скрыть текст ошибки
const hideInputError = (formElement, inputElement, objConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(objConfig.inputErrorClass);
  errorElement.classList.remove(objConfig.errorClass);
  errorElement.textContent = '';
}

// показать/скрыть текст ошибки в зависимости от корректности заполнения поля формы
const isValid = (formElement, inputElement, objConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, objConfig);
  } else {
    hideInputError(formElement, inputElement, objConfig);
  }
}

// проверка наличия некорректно заполненных полей формы
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// переключение состояния кнопки в зависимости от корректности заполнения формы
const toggleButtonState = (inputList, buttonElement, objConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(objConfig.inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(objConfig.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

// добавить слушателя заполнения полей форм всем полям форм
const setEventListeners = (formElement, objConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(objConfig.inputSelector));
  const buttonElement = formElement.querySelector(objConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, objConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, objConfig);
      toggleButtonState(inputList, buttonElement, objConfig);
    });
  });
};

// включение валидации для всех форм страницы
const enableValidation = (objConfig) => {
  const formList = Array.from(document.querySelectorAll(objConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, objConfig);
  });
};

enableValidation(validationConfig);