import { useState, useEffect, useCallback, useMemo } from 'react';
import _ from 'lodash';
import axios from 'axios';
import { notifyError } from 'utils/notifications';

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

export const useFetch = (sdk, initial, requestData) => {
  const [data, setData] = useState(initial);

  useEffect(() => {
    let didCancel = false;
    sdk(requestData).then((response) => {
      if (!didCancel) {
        setData(response);
      }
    });
    return () => {
      didCancel = true;
    };
  }, [requestData, sdk]);

  return data;
};

export const callUrl = (method, url, params) => {
  return new Promise((resolve, reject) => {
    method(url, params)
      .then((response) => resolve(response.data))
      .catch((error) => {
        if (_.get(error, 'response.status') === 400) {
          reject(error.response);
        } else {
          console.error(error);
          notifyError(_.get(error, 'message', 'An error occurred.'));
          reject(); // If it's not 400 - it can't be handled from caller
        }
      });
  });
};

export const useRefreshKey = () => {
  const [refreshCounter, setRefreshCounter] = useState(0);
  const refresh = useCallback(() => setRefreshCounter((x) => x + 1), []);
  return [refreshCounter, refresh];
};

export const useRefreshable = (hook, ...params) => {
  const [refreshKey, refresh] = useRefreshKey();

  const parameters = useMemo(() => [...params, refreshKey], [
    refreshKey,
    params
  ]);

  return [hook.apply(this, parameters), refresh];
};
