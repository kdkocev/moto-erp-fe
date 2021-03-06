import _ from 'lodash';

export const identity = (x) => x;

export const curry = (f) => {
  const innerCurry = (...args) => {
    if (args.length >= f.length) {
      return f.apply(this, args);
    }
    return (...args2) => innerCurry.apply(this, [...args, ...args2]);
  };
  return innerCurry;
};

export const getIdObject = (object) => ({ id: object.id });

/**
 * Example:
 *
 * newKeys = {
 *   id: 'ID',
 *   order_number: 'Order No'
 * };
 */

export const replaceKeys = (object, newKeys) =>
  _.mapKeys(object, (value, key) => _.get(newKeys, key, key));
