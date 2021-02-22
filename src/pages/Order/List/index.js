import React, { useState, useEffect, useCallback, useMemo } from 'react';
import _ from 'lodash';
import moment from 'moment';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';

import { BASE_URL, ORDER_DETAIL_URL, ORDER_ADD_NEW_URL } from 'config/urls';
import { callUrl, get, reverse } from 'utils/sdk';

import styles from './styles.module.css';

const dates = [
  'date_received',
  'date_of_expedition',
  'date_of_delivery',
  'completed_at',
  'created_at'
];
const hiddenFields = ['month'];
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

const OrdersTable = ({ orders, handleListItemOnClick }) => {
  return (
    <TableContainer component={Paper} className={styles.table}>
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(_.get(orders, '[0]', {}))
              .filter((key) => hiddenFields.indexOf(key) === -1)
              .map((key) => (
                <TableCell key={key}>
                  {_.get(labelMappings, key, key)}
                </TableCell>
              ))}
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              {Object.keys(order)
                .filter((key) => hiddenFields.indexOf(key) === -1)
                .map((key) => (
                  <TableCell key={key}>
                    {dates.indexOf(key) !== -1
                      ? formatDate(order[key])
                      : order[key]}
                  </TableCell>
                ))}
              <TableCell>
                <IconButton onClick={() => handleListItemOnClick(order)}>
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const AddNewOrderButton = ({ onClick }) => (
  <Button
    variant="contained"
    color="primary"
    onClick={onClick}
    startIcon={<AddIcon />}>
    Add new order
  </Button>
);

const OrdersList = ({ history }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    callUrl(get, `${BASE_URL}/order`).then(setOrders);
  }, []);

  const handleListItemOnClick = useCallback(
    (order) => {
      history.push(reverse(ORDER_DETAIL_URL, { id: order.id }));
    },
    [history]
  );

  const handleAddButtonClick = useCallback(() => {
    history.push(ORDER_ADD_NEW_URL);
  }, [history]);

  const sortedOrders = useMemo(() => {
    return _.reverse(_.sortBy(orders, 'created_at'));
  }, [orders]);

  const monthsOrders = useMemo(() => {
    return _.groupBy(
      _.map(sortedOrders, (order) => ({
        ...order,
        month: moment(order.created_at).format('MMMM')
      })),
      'month'
    );
  }, [sortedOrders]);

  return (
    <>
      <Paper className={styles.paper}>
        <div className={styles.header}>
          <Typography variant="h4">Orders list</Typography>
          <div>
            <AddNewOrderButton onClick={handleAddButtonClick} />
          </div>
        </div>
      </Paper>
      <Paper className={styles.paper}>
        <div>
          {Object.keys(monthsOrders).map((month) => (
            <React.Fragment key={month}>
              <div className={styles.monthSeparator}>
                <Typography variant="h5">{month}</Typography>
              </div>
              <OrdersTable
                orders={monthsOrders[month]}
                handleListItemOnClick={handleListItemOnClick}
              />
            </React.Fragment>
          ))}

          <div className={styles.addButton}>
            <AddNewOrderButton onClick={handleAddButtonClick} />
          </div>
        </div>
      </Paper>
    </>
  );
};

export default OrdersList;
