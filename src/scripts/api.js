const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-32',
  headers: {
    authorization: '9dcbf8a7-6a94-41e7-be96-cdacbf5bc1b5',
    'Content-Type': 'application/json'
  }
};

const fetchRequest = (config, details, method = 'GET', body = null) => {
  const options = {
    method,
    headers: config.headers,
  };
  if (body !== null) {
    options.body = JSON.stringify(body);
  }
  return fetch(`${config.baseUrl}/${details}`, options);
};

const checkStatus = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`${res.status}`);
};

const getUserInfo = () => {
  return fetchRequest(config, 'users/me')
    .then(res => checkStatus(res));
};

const getInitialCards = () => {
  return fetchRequest(config, 'cards')
    .then(res => checkStatus(res));
}

const editProfileInfoRequest = (name, description) => {
  return fetchRequest(config, 'users/me', 'PATCH', { name: name, about: description })
    .then(res => checkStatus(res));
};

const addNewImageRequest = (place, url) => {
  return fetchRequest(config, 'cards', 'POST', { name: place, link: url })
    .then(res => checkStatus(res));
};

const updateProfilePhotoRequest = (imageUrl) => {
  return fetchRequest(config, 'users/me/avatar', 'PATCH', { avatar: imageUrl })
    .then(res => checkStatus(res));
};

const deleteCardRequest = (id) => {
  return fetchRequest(config, `cards/${id}`, 'DELETE')
    .then(res => checkStatus(res));
};

const putLikeRequest = (cardData) => {
  return fetchRequest(config, `cards/likes/${cardData._id}`, 'PUT')
    .then(res => checkStatus(res));
}

const removeLikeRequest = (cardData) => {
  return fetchRequest(config, `cards/likes/${cardData._id}`, 'DELETE')
    .then(res => checkStatus(res));
}

export {
  getUserInfo,
  getInitialCards,
  editProfileInfoRequest,
  addNewImageRequest,
  updateProfilePhotoRequest,
  deleteCardRequest,
  putLikeRequest,
  removeLikeRequest,
};