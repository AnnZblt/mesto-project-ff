const showInputError = (formElement, inputElement, errorMessage, settingsObj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settingsObj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settingsObj.errorClass);
};

const hideInputError = (formElement, inputElement, settingsObj) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settingsObj.inputErrorClass);
  errorElement.classList.remove(settingsObj.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, settingsObj) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settingsObj);
  } else {
    hideInputError(formElement, inputElement, settingsObj);
  }
};

const setEventListeners = (formElement, settingsObj) => {
  const inputList = Array.from(formElement.querySelectorAll(settingsObj.inputSelector));
  const submitButton = formElement.querySelector(settingsObj.submitButtonSelector);

  toggleButtonState(inputList, submitButton, settingsObj);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      toggleButtonState(inputList, submitButton, settingsObj);
      checkInputValidity(formElement, inputElement, settingsObj);
    });
  });
};

const enableValidation = (settingsObj) => {
  const formList = Array.from(document.querySelectorAll(settingsObj.formSelector));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, settingsObj);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, settingsObj) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(settingsObj.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settingsObj.inactiveButtonClass);
  }
};

const clearValidation = (formElement, settingsObj) => {
  const inputList = Array.from(formElement.querySelectorAll(settingsObj.inputSelector));

  inputList.forEach((inputElement) => {
    inputElement.setCustomValidity('');
    inputElement.classList.remove(settingsObj.inputErrorClass);
    inputElement.nextElementSibling.classList.remove(settingsObj.errorClass);
    inputElement.blur();
  });
};

export { enableValidation, clearValidation };