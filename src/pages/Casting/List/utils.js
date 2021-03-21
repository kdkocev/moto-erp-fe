import _ from 'lodash';
import { replaceKeys, swapKeysAndValues } from 'utils/common';

export const hiddenFields = ['id'];

const labelMappings = {
  number: 'Number'
};

export const prepareCastingsForTable = (castings) =>
  castings.map((casting) => ({
    ...replaceKeys(casting, labelMappings),
    id: casting.id
  }));

export const mapSortKeyToLabelMappings = (key) => {
  return (
    (key.startsWith('-') ? '-' : '') +
    _.get(labelMappings, _.dropWhile(key, (x) => x === '-').join(''), key)
  );
};

export const mapLabelMappingsToSortKey = (key) => {
  const obj = {
    ...labelMappings,
    ..._.mapValues(
      _.mapKeys(labelMappings, (v, k) => `-${k}`),
      (x) => `-${x}`
    )
  };
  const keys = swapKeysAndValues(obj);
  return keys[key];
};
