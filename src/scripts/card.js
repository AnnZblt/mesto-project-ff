import { deleteCardRequest, putLikeRequest, removeLikeRequest } from './api.js';

const deleteCard = (deletedCard, id) => {
  deleteCardRequest(id)
    .then(() => {
      deletedCard.remove();
    })
    .catch((err) => {
      console.log('Не получилось удалить карточку. ', err);
    });
};

const likeCard = (button, counter, cardData) => {
  if (button.classList.contains('card__like-button_is-active')) {
    removeLikeRequest(cardData)
      .then((data) => {
        counter.textContent = data.likes.length;
        button.classList.remove('card__like-button_is-active');
      })
      .catch((err) => {
        console.log('Не получилось убрать лайк. ', err)
      });
  } else {
    putLikeRequest(cardData)
      .then((data) => {
        counter.textContent = data.likes.length;
        button.classList.add('card__like-button_is-active');
      })
      .catch((err) => {
        console.log('Не получилось поставить лайк. ', err)
      });
  }
};

const createCard = (item, removeCardCb, likeCb, openFullviewCb, userId) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-value');

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardElement.querySelector('.card__title').textContent = item.name;
  likeCount.textContent = item.likes.length;

  if (item.owner._id !== userId) {
    deleteButton.style.display = 'none';
  }

  item.likes.forEach((likeOwner) => {
    if (likeOwner._id === userId) {
      likeButton.classList.add('card__like-button_is-active');
    }
  });

  deleteButton.addEventListener('click', () => {
    removeCardCb(cardElement, item._id);
  });

  likeButton.addEventListener('click', () => {
    likeCb(likeButton, likeCount, item);
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