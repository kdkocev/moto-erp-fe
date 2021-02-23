export const identity = (x) => x;

export const getIdObject = (object) => ({ id: object.id });

// Returns the object without the keysToRemove keys
// TODO: write unit tests for this
export const removeKeys = (object, keysToRemove) => {
  let newObj = {};
  Object.keys(object).forEach((key) => {
    if (keysToRemove.indexOf(key) === -1) {
      newObj[key] = object[key];
    }
  });
  return newObj;
};
