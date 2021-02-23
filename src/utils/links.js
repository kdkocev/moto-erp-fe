import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { identity } from 'utils/common';
import { reverse } from 'utils/sdk';

export const useLink = (url, mapParams = identity) => {
  const history = useHistory();

  return useCallback(
    (params) => {
      history.push(reverse(url, mapParams(params)));
    },
    [history, url, mapParams]
  );
};
