import { useState, useEffect, useCallback } from 'react';
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

export const remove = (url, data, params) => {
  return axios.delete(url, data, { ...getConfig(), ...params });
};

export const reverse = (url, params = {}) => {
  let result = url;

  _.forEach(params, (value, key) => {
    result = result.replace(`:${key}`, value);
  });

  return result;
};

// `key` is used for force refetching
// Whenever key changes - the request will run again
export const useFetch = (id, url, initial, key) => {
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
  }, [id, url, key]);

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

export const useRefreshKey = () => {
  const [refreshCounter, setRefreshCounter] = useState(0);
  const refresh = useCallback(() => setRefreshCounter((x) => x + 1), []);
  return [refreshCounter, refresh];
};
