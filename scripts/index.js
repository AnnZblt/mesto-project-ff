// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesList = document.querySelector('.places__list');

const createCard = (item, removeCardCb) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardElement.querySelector('.card__image').src = item.link;
  cardElement.querySelector('.card__title').textContent = item.name;

  deleteButton.addEventListener('click', () => {
    removeCardCb(cardElement);
  });

  placesList.append(cardElement);
}

const deleteCard = (card) => {
  card.remove();
}

initialCards.forEach((item) => {
  createCard(item, deleteCard);
});
