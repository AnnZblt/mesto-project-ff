const deleteCard = (card) => {
  card.remove();
}

const likeCard = (button) => {
  button.classList.toggle('card__like-button_is-active');
}

const createCard = (item, removeCardCb, likeCb, openFullviewCb) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardElement.querySelector('.card__title').textContent = item.name;

  deleteButton.addEventListener('click', () => {
    removeCardCb(cardElement);
  });

  likeButton.addEventListener('click', () => {
    likeCb(likeButton);
  });

  cardImage.addEventListener('click', () => {
    openFullviewCb(item);
  });

  return cardElement;
}

export {
  deleteCard,
  likeCard,
  createCard,
}