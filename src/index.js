import './pages/index.css';
import { openModal, closeModal } from './scripts/modal.js';
import { deleteCard, likeCard, likeCounter, createCard } from './scripts/card.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import fetchRequest from './scripts/api.js';

const placesList = document.querySelector('.places__list');
const popups = Array.from(document.querySelectorAll('.popup'));
const editProfileButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_edit');
const fullviewPopup = document.querySelector('.popup_type_image');
const fullviewImage = fullviewPopup.querySelector('.popup__image');
const fullviewDescription = fullviewPopup.querySelector('.popup__caption');
const addNewImageButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const editProfileForm = document.forms['edit-profile'];
const editNameInput = editProfileForm.elements.name;
const editDescription = editProfileForm.elements.description;
const addCardForm = document.forms['new-place'];
const newCardDescription = addCardForm.elements['place-name'];
const newCardSource = addCardForm.elements.link;
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const editAvatarPopup = document.querySelector('.popup_type_edit-avatar');
const editAvatarForm = document.forms['edit-profile-photo'];

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-32',
  headers: {
    authorization: '9dcbf8a7-6a94-41e7-be96-cdacbf5bc1b5',
    'Content-Type': 'application/json'
  }
};

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
});

const renderLoading = (button, isLoading) => {
  if (isLoading) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
};

const openFullviewImage = (item) => {
  openModal(fullviewPopup)
  fullviewImage.src = item.link;
  fullviewImage.alt = item.name;
  fullviewDescription.textContent = item.name;
};

// Запросы к АПИ и ручки сабмитов

const handleFormSubmit = (event) => {
  event.preventDefault();
  renderLoading(event.target.lastElementChild, true);
  const { name, description } = event.currentTarget.elements;

  fetchRequest(config, 'users/me', 'PATCH', { name: name.value, about: description.value })
    .then(res => res.json())
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
    })
    .catch((err) => {
      console.log('Не получилось обновить информацию профиля. ', err);
    })
    .finally(() => {
      renderLoading(event.target.lastElementChild, false);
      closeModal(editProfilePopup);
    });
};

const addImageForm = (event) => {
  event.preventDefault();
  renderLoading(event.target.lastElementChild, true);
  const newImage = {
    place: newCardDescription.value,
    source: newCardSource.value
  };

  fetchRequest(config, 'cards', 'POST', { name: newImage.place, link: newImage.source })
    .then(res => res.json())
    .then((data) => {
      placesList.prepend(createCard(data, deleteCard, likeCard, openFullviewImage, likeCounter));
    })
    .catch((err) => {
      console.log('Не получилось обновить информацию профиля. ', err);
    })
    .finally(() => {
      renderLoading(event.target.lastElementChild, false);
      closeModal(newCardPopup);
      addCardForm.reset();
    });
};

const handleAvatarForm = (event) => {
  event.preventDefault();
  renderLoading(event.target.lastElementChild, true);
  const avatarImage = event.currentTarget.elements['avatar-link'].value;

  fetchRequest(config, 'users/me/avatar', 'PATCH', { avatar: avatarImage })
    .then(res => res.json())
    .then((data) => {
      profileImage.style.backgroundImage = `url(${data.avatar})`;
    })
    .catch((err) => {
      console.log('Не получилось обновить фото профиля. ', err);
    })
    .finally(() => {
      renderLoading(event.target.lastElementChild, false);
      closeModal(editAvatarPopup);
      editAvatarForm.reset();
    });
};

const initProfileInfo = () => {
  fetchRequest(config, 'users/me')
    .then(res => res.json())
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      profileImage.style.backgroundImage = `url(${data.avatar})`;
    })
    .catch((err) => {
      console.log('Не получается загрузить информацию о профиле. ', err);
    });
};

const initCards = () => {
  fetchRequest(config, 'cards')
    .then(res => res.json())
    .then((data) => {
      data.forEach((item) => {
        const newCard = createCard(item, deleteCard, likeCard, openFullviewImage, likeCounter);
        placesList.append(newCard);
      });
    })
    .catch((err) => {
      console.log('Не получается загрузить карточки. ', err);
    });
};

// Обработчики кликов и сабмитов

editProfileButton.addEventListener('click', () => {
  openModal(editProfilePopup);
  editNameInput.value = profileTitle.textContent;
  editDescription.value = profileDescription.textContent;
  clearValidation(editProfileForm, validationSettings);
  enableValidation(validationSettings);
});

addNewImageButton.addEventListener('click', () => {
  addCardForm.reset();
  openModal(newCardPopup);
  clearValidation(addCardForm, validationSettings);
  enableValidation(validationSettings);
});

profileImage.addEventListener('click', () => {
  editAvatarForm.reset();
  openModal(editAvatarPopup);
  clearValidation(editAvatarForm, validationSettings);
  enableValidation(validationSettings);
});

editProfileForm.addEventListener('submit', handleFormSubmit);

addCardForm.addEventListener('submit', addImageForm);

editAvatarForm.addEventListener('submit', handleAvatarForm);

// Сборка содержимого страницы

initProfileInfo();
initCards();

export {
  config
};
//"14700000ed08b793808b68e4" my id