import React, { useMemo } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import AddButton from 'components/AddButton';
import InformationTable from 'components/InformationTable';
import { ORDER_DETAIL_URL, ORDER_ADD_NEW_URL } from 'config/urls';
import { useLink } from 'utils/links';
import { getIdObject } from 'utils/common';
import { useOrderList } from 'sdk/order';

import {
  sortAndGroupOrders,
  prepareOrdersForTable,
  hiddenFields
} from './utils';

import styles from './styles.module.css';

const OrdersTable = ({ orders, onEdit }) => {
  const items = useMemo(() => prepareOrdersForTable(orders), [orders]);

  return (
    <InformationTable items={items} onEdit={onEdit} hiddenKeys={hiddenFields} />
  );
};

const AddNewOrderButton = ({ onClick }) => (
  <AddButton onClick={onClick}>Add New Order</AddButton>
);

const OrdersList = () => {
  const orders = useOrderList();
  const handleListItemOnClick = useLink(ORDER_DETAIL_URL, getIdObject);
  const handleAddButtonClick = useLink(ORDER_ADD_NEW_URL);

  const monthsOrders = useMemo(() => sortAndGroupOrders(orders), [orders]);

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
                onEdit={handleListItemOnClick}
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
