import _ from 'lodash';

export const identity = (x) => x;

/**
 * Curries the given function and executes it when all of the arguments are passed
 */
export const curry = (f) => {
  const innerCurry = (...args) => {
    if (args.length >= f.length) {
      return f.apply(this, args);
    }
    return (...args2) => innerCurry.apply(this, [...args, ...args2]);
  };
  return innerCurry;
};

/**
 * Returns an object with a key id and value - the id of the argument.
 * Used mainly to prettify the code.
 */
export const getIdObject = (object) => ({ id: object.id });

/**
 * Example arguments:
 *
 * object = {
 *   id: 1,
 *   order_number: 2,
 *   key: 3
 * }
 *
 * newKeys = {
 *   id: 'ID',
 *   order_number: 'Order No'
 * }
 *
 * Example response:
 *
 * object = {
 *   ID: 1,
 *   'Order No': 2,
 *   key: 3
 * }
 *
 */
export const replaceKeys = (object, newKeys) =>
  _.mapKeys(object, (value, key) => _.get(newKeys, key, key));

/**
 * Checks if the value is a promise or not.
 */
export const isPromise = (p) => {
  return Promise.resolve(p) === p;
};

/**
 * Doesn't change the value if it's already a promise.
 * Wraps the value in a promise if it's not.
 */
export const toPromise = (p) => {
  return Promise.resolve(p);
};

/**
 * Swaps the keys and the values of an object.
 */
export const swapKeysAndValues = (object) => {
  let result = {};
  Object.keys(object).forEach((key) => {
    result[object[key]] = key;
  });
  return result;
};

/**
 * Composes functions with airity = 1 to be called one after the other.
 * The function that is passed first - will be called first.
 * returns a cunftion that expects 1 argument to be passed to the first function to start the chain.
 */
export const compose = (...args) => (arg) =>
  [arg, ...args].reduce((res, current) => current(res));
