import { useState, useEffect } from 'react';
import _ from 'lodash';
import axios from 'axios';

export const getConfig = () => {
  let config = {
    'Content-Type': 'application/json'
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

export const patch = (url, data, params) => {
  return axios.patch(url, data, { ...getConfig(), ...params });
};

export const reverse = (url, params = {}) => {
  let result = url;

  _.forEach(params, (value, key) => {
    result = result.replace(`:${key}`, value);
  });

  return result;
};

export const useFetch = (id, url, initial) => {
  const [object, setObject] = useState(initial);

  useEffect(() => {
    let didCancel = false;
    callUrl(get, url).then((response) => {
      if (!didCancel) {
        setObject(response);
      }
    });
    return () => {
      didCancel = true;
    };
  }, [id, url]);

  return object;
};

export const callUrl = (method, url, params) => {
  return new Promise((resolve, reject) => {
    method(url, params)
      .then((response) => resolve(response.data))
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};
