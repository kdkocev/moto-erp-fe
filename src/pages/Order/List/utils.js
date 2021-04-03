import _ from 'lodash';
import moment from 'moment';
import { curry, replaceKeys, swapKeysAndValues } from 'utils/common';

export const hiddenFields = ['id'];

const dateKeys = [
  'date_received',
  'date_of_expedition',
  'date_of_delivery',
  'completed_at',
  'created_at'
];
const labelMappings = {
  number: 'Order No',
  amount: 'Amount',
  priority: 'Priority',
  date_received: 'Received',
  date_of_expedition: 'Expedition',
  date_of_delivery: 'Delivery',
  completed_at: 'Completed',
  created_at: 'Created at',
  part: 'Part'
};

export const PRIORITY_OPTIONS = [
  {
    key: 0,
    value: 0,
    label: 'Low'
  },
  {
    key: 1,
    value: 1,
    label: 'High'
  }
];

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

const replaceKeysWithLabelsInOrder = (order) => ({
  ...replaceKeys(order, labelMappings),
  id: order.id
});

const replacePriorityNumberWithLabel = (order) => ({
  ...order,
  priority: _.get(
    PRIORITY_OPTIONS.find((option) => option.value === order.priority),
    'label',
    '-'
  )
});

export const prepareOrdersForTable = (orders) =>
  orders
    .map(formatDatesInObject(dateKeys))
    .map(replacePriorityNumberWithLabel)
    .map(replaceKeysWithLabelsInOrder);

export const replacePartIdsWithNumbers = (orderList, partList) => {
  const partListIds = partList.map((part) => part.id);
  const partListNumbers = partList.map((part) => part.number);
  const partIdToNumberObj = _.zipObject(partListIds, partListNumbers);

  return orderList.map((order) => ({
    ...order,
    part: partIdToNumberObj[order.part]
  }));
};

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
