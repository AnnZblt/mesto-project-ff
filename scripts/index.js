// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesList = document.querySelector('.places__list');

const createCard = (item, removeCardCb) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = item.link;
  cardImage.alt = `Красивый песзаж с видом, в котором Жак-Ив Кусто побывал на этот раз – ${item.name}`;
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
