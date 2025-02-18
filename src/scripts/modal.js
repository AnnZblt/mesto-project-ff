const openModal = (popup) => {
  popup.classList.add('popup_is-opened');
  popup.addEventListener('click', closeByClick);
  document.addEventListener('keydown', closeByEscape);
};

const closeModal = (popup) => {
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('click', closeByClick);
  document.removeEventListener('keydown', closeByEscape);
};

const closeByEscape = (event) => {
  if (event.key === 'Escape') {
    const activeModal = document.querySelector('.popup_is-opened');
    closeModal(activeModal);
  }
};

const closeByClick = (event) => {
  if (event.target.classList.contains('popup__close') || event.target === event.currentTarget) {
    closeModal(event.currentTarget);
  }
};

export { openModal, closeModal };