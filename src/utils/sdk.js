import axios from 'axios';

export const getConfig = () => {
  let config = {
    'Content-Type': 'application/json',
    // withCredentials: true
  };

  return config;
};

export const get = (url, params = {}) => {
  return axios.get(url, { ...getConfig(), params });
};

export const post = (url, data, params) => {
  return axios.post(url, data, { ...getConfig(), ...params });
};

export const callUrl = (method, url, params) => {
  return new Promise((resolve, reject) => {
    method(url, params)
      .then(response => resolve(response.data))
      .catch(console.error);
  });
};

