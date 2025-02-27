import { getUserInfo, deleteCardRequest, putLikeRequest, removeLikeRequest } from './api.js';

const cardInteraction = (item, deleteButton, likeButton) => {
  getUserInfo()
    .then((data) => {
      if (item.owner._id !== data._id) {
        deleteButton.style.display = 'none';
      }
      item.likes.forEach((likeOwner) => {
        if (likeOwner._id === data._id) {
          likeButton.classList.add('card__like-button_is-active');
        }
      });
    })
};

const deleteCard = (deletedCard, id) => {
  deleteCardRequest(id)
    .then(() => {
      deletedCard.remove();
    })
    .catch((err) => {
      console.log('Не получилось удалить карточку. ', err);
    });
};

const likeCard = (button, counter, cardData, likeCounterCb) => {
  if (button.classList.contains('card__like-button_is-active')) {
    removeLikeRequest(cardData)
      .then((data) => {
        likeCounterCb(data.likes, counter);
        button.classList.remove('card__like-button_is-active');
      })
      .catch((err) => {
        console.log('Не получилось убрать лайк. ', err)
      });
  } else {
    putLikeRequest(cardData)
      .then((data) => {
        likeCounterCb(data.likes, counter);
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

  counterCb(item.likes, likeCount);
  cardInteraction(item, deleteButton, likeButton);

  deleteButton.addEventListener('click', () => {
    removeCardCb(cardElement, item._id);
  });

  likeButton.addEventListener('click', () => {
    likeCb(likeButton, likeCount, item, counterCb);
  });

  cardImage.addEventListener('click', () => {
    openFullviewCb(item);
  });

  return cardElement;
}

export {
  deleteCard,
  likeCard,
  likeCounter,
  createCard,
}