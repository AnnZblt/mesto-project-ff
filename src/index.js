import './pages/index.css';
import initialCards from './scripts/cards.js';
import { openModal, closeModal } from './scripts/modalController.js';
import avatar from './images/avatar.jpg';
import { deleteCard, likeCard, createCard } from './scripts/cardsController.js';


const placesList = document.querySelector('.places__list');
const popups = document.querySelectorAll('.popup');
const editProfileButton = document.querySelector('.profile__edit-button');
const editProfilePopup = document.querySelector('.popup_type_edit');
const fullviewPopup = document.querySelector('.popup_type_image');
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


for (let i = 0; i < popups.length; i++) {
  popups[i].classList.add('popup_is-animated');
}

profileImage.style.backgroundImage = `url(${avatar})`;

const editProfileController = (event) => {
  event.preventDefault();
  profileTitle.textContent = editNameInput.value;
  profileDescription.textContent = editDescription.value;
  editProfileForm.reset();
  closeModal(event.target.closest('.popup'));
}

const addImageController = (event) => {
  event.preventDefault();
  const newImage = {};
  newImage.name = newCardDescription.value;
  newImage.link = newCardSource.value;
  initialCards.push(newImage);
  addCardForm.reset();
  closeModal(event.target.closest('.popup'));
  createCard(newImage, placesList, deleteCard, likeCard, openFullviewImage);
}

const openFullviewImage = (item) => {
  openModal(fullviewPopup)

  const fullviewImage = fullviewPopup.querySelector('.popup__image');
  fullviewImage.src = item.link;
  fullviewImage.alt = item.name;
  fullviewPopup.querySelector('.popup__caption').textContent = item.name;
}

editProfileButton.addEventListener('click', () => {
  openModal(editProfilePopup);
  editNameInput.value = profileTitle.textContent;
  editDescription.value = profileDescription.textContent;
});

addNewImageButton.addEventListener('click', () => {
  openModal(newCardPopup);
});

editProfileForm.addEventListener('submit', editProfileController);
addCardForm.addEventListener('submit', addImageController);


initialCards.forEach((item) => {
  createCard(item, placesList, deleteCard, likeCard, openFullviewImage);
});
