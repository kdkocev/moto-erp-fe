import _ from 'lodash';

export const identity = (x) => x;

export const getIdObject = (object) => ({ id: object.id });

export const replaceKeysWithLabels = (object, labels) =>
  _.mapKeys(object, (value, key) => _.get(labels, key, key));
