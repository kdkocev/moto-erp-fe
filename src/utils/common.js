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

/**
 * Either Monad implemenation by using Left and Right
 *
 * Left is considered to be the Error path.
 * Right is considered to be the Correct path.
 */

export const Left = (x) => ({
  map: () => this,
  isEither: true,
  isLeft: true,
  isRight: false,
  fold: (f, g) => f(x),
  getOrElse: (y) => y
});

export const Right = (x) => ({
  map: (f) => new Right(f(x)),
  isEither: true,
  isLeft: false,
  isRight: true,
  fold: (f, g) => g(x),
  getOrElse: (y) => x
});

export const isPromise = (p) => {
  return Promise.resolve(p) === p;
};
