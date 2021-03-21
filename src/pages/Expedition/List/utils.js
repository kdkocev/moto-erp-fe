import _ from 'lodash';
import moment from 'moment';
import { curry, swapKeysAndValues, replaceKeys } from 'utils/common';

export const hiddenFields = ['id'];

const dateKeys = ['date_of_expedition', 'created_at'];

const labelMappings = {
  amount: 'Amount',
  date_of_expedition: 'Expedition',
  created_at: 'Created at',
  order: 'Order'
};

export const replaceOrderIdsWithNumbers = (expeditionList, orderList) => {
  const orderListIds = orderList.map((order) => order.id);
  const orderListNumbers = orderList.map((order) => order.number);
  const orderIdToNumberObj = _.zipObject(orderListIds, orderListNumbers);

  return expeditionList.map((expedition) => ({
    ...expedition,
    order: orderIdToNumberObj[expedition.order]
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

export const prepareExpeditionsForTable = (expeditions) =>
  expeditions
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
