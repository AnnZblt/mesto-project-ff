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

export default fetchRequest;