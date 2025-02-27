import fetchRequest from './api.js';
import { config } from '../index.js'
const myId = '14700000ed08b793808b68e4';

const deleteCard = (card) => {
  fetchRequest(config, `cards/${card.dataset.cardId}`, 'DELETE')
    .then(() => {
      card.remove();
    })
    .catch((err) => {
      console.log('Не получилось удалить карточку', err);
    });
};

const likeCard = (button, cardData, likeCounterCb) => {
  if (button.classList.contains('card__like-button_is-active')) {
    fetchRequest(config, `cards/likes/${cardData._id}`, 'DELETE')
      .then(res => res.json())
      .then((data) => {
        likeCounterCb(data.likes, button.nextElementSibling);
        button.classList.remove('card__like-button_is-active');
      })
      .catch((err) => {
        console.log('Не получилось убрать лайк. ', err)
      });
  } else {
    fetchRequest(config, `cards/likes/${cardData._id}`, 'PUT')
      .then(res => res.json())
      .then((data) => {
        likeCounterCb(data.likes, button.nextElementSibling);
        button.classList.add('card__like-button_is-active');
      })
      .catch((err) => {
        console.log('Не получилось поставить лайк. ', err)
      });
  }
};

const likeCounter = (arr, counter) => {
  counter.textContent = arr.length;
}

const createCard = (item, removeCardCb, likeCb, openFullviewCb, counterCb) => {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likeCount = cardElement.querySelector('.card__like-value');

  cardImage.src = item.link;
  cardImage.alt = item.name;
  cardElement.querySelector('.card__title').textContent = item.name;
  cardElement.dataset.cardId = item._id;

  counterCb(item.likes, likeCount);

  deleteButton.addEventListener('click', () => {
    removeCardCb(cardElement, item);
  });

  likeButton.addEventListener('click', () => {
    likeCb(likeButton, item, counterCb);
  });

  cardImage.addEventListener('click', () => {
    openFullviewCb(item);
  });

  item.likes.forEach((likeOwner) => {
    if (likeOwner._id === myId) {
      likeButton.classList.add('card__like-button_is-active');
    }
  });

  if (item.owner._id !== myId) {
    deleteButton.style.display = 'none';
  }

  return cardElement;
}

export {
  deleteCard,
  likeCard,
  likeCounter,
  createCard,
}