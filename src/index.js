import './pages/index.css';
import initialCards from './scripts/cards.js';
import { openModal, closeModal } from './scripts/modal.js';
import avatar from './images/avatar.jpg';
import { deleteCard, likeCard, createCard } from './scripts/card.js';


const placesList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const popupsArr = Array.from(popups);
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

popupsArr.forEach((popup) => {
  popup.classList.add('popup_is-animated');
})

profileImage.style.backgroundImage = `url(${avatar})`;

const handleFormSubmit = (event) => {
  event.preventDefault();
  profileTitle.textContent = editNameInput.value;
  profileDescription.textContent = editDescription.value;
  closeModal(editProfilePopup);
}

const addImageForm = (event) => {
  event.preventDefault();
  const newImage = {
    name: newCardDescription.value,
    link: newCardSource.value
  };
  addCardForm.reset();
  closeModal(newCardPopup);
  placesList.prepend(createCard(newImage, deleteCard, likeCard, openFullviewImage));
}

const openFullviewImage = (item) => {
  openModal(fullviewPopup)
  fullviewImage.src = item.link;
  fullviewImage.alt = item.name;
  fullviewDescription.textContent = item.name;
}

const fillGallery = (arr, container) => {
  arr.forEach((item) => {
    const newCard = createCard(item, deleteCard, likeCard, openFullviewImage);
    container.append(newCard);
  });
}

editProfileButton.addEventListener('click', () => {
  openModal(editProfilePopup);
  editNameInput.value = profileTitle.textContent;
  editDescription.value = profileDescription.textContent;
});

addNewImageButton.addEventListener('click', () => {
  openModal(newCardPopup);
});

editProfileForm.addEventListener('submit', handleFormSubmit);
addCardForm.addEventListener('submit', addImageForm);


fillGallery(initialCards, placesList);
