import _ from 'lodash';
import moment from 'moment';
import { replaceKeysWithLabels } from 'utils/common';

export const sortAndGroupOrders = (orders) => {
  const sortedOrders = _.reverse(_.sortBy(orders, 'created_at'));

  const monthsOrders = _.groupBy(
    _.map(sortedOrders, (order) => ({
      ...order,
      month: moment(order.created_at).format('MMMM')
    })),
    'month'
  );

  return monthsOrders;
};

export const hiddenFields = ['id', 'month'];

const dateKeys = [
  'date_received',
  'date_of_expedition',
  'date_of_delivery',
  'completed_at',
  'created_at'
];
const labelMappings = {
  id: 'ID',
  order_number: 'Order No',
  amount: 'Amount',
  date_received: 'Received',
  date_of_expedition: 'Expedition',
  date_of_delivery: 'Delivery',
  completed_at: 'Completed',
  created_at: 'Created at',
  part: 'Part ID'
};

const formatDate = (str) => {
  return moment(str, 'YYYY-MM-DD').format('DD MMM YYYY');
};

const formatDateKeys = (dateKeys) => (value, key) => {
  if (dateKeys.indexOf(key) !== -1) {
    return formatDate(value);
  }
  return value;
};

const formatDatesInObject = (dateKeys) => (object) =>
  _.mapValues(object, formatDateKeys(dateKeys));

const replaceKeysWithLabelsInOrder = (order) => ({
  ...replaceKeysWithLabels(order, labelMappings),
  id: order.id
});

export const prepareOrdersForTable = (orders) =>
  orders.map(formatDatesInObject(dateKeys)).map(replaceKeysWithLabelsInOrder);
