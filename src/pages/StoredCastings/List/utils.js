import _ from 'lodash';
import moment from 'moment';
import { curry, swapKeysAndValues, replaceKeys } from 'utils/common';

export const hiddenFields = ['id'];

const dateKeys = ['created_at'];

const labelMappings = {
  amount: 'Amount',
  created_at: 'Created at',
  casting: 'Casting'
};

export const replaceCastingIdsWithNumbers = (expeditionList, castingList) => {
  const castingListIds = castingList.map((casting) => casting.id);
  const castingListNumbers = castingList.map((casting) => casting.number);
  const castingIdToNumberObj = _.zipObject(castingListIds, castingListNumbers);

  return expeditionList.map((expedition) => ({
    ...expedition,
    casting: castingIdToNumberObj[expedition.casting]
  }));
};

const formatDate = (str) => {
  return moment(str, 'YYYY-MM-DD').format('DD MMM YYYY');
};

const formatDateKeys = (dateKeys, value, key) => {
  if (dateKeys.indexOf(key) !== -1) {
    return formatDate(value);
  }
  return value;
};

const formatDatesInObject = (dateKeys) => (object) =>
  _.mapValues(object, curry(formatDateKeys)(dateKeys));

const replaceKeysWithLabelsInOrder = (expedition) => ({
  ...replaceKeys(expedition, labelMappings),
  id: expedition.id
});

export const prepareStoredCastingsForTable = (storedCastings) =>
  storedCastings
    .map(formatDatesInObject(dateKeys))
    .map(replaceKeysWithLabelsInOrder);

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
