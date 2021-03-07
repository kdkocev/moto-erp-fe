import React, { useMemo, useCallback } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import AddButton from 'components/AddButton';
import InformationTable from 'components/InformationTable';
import { ORDER_DETAIL_URL, ORDER_ADD_NEW_URL } from 'config/urls';
import { useLink } from 'utils/links';
import { getIdObject } from 'utils/common';
import { useRefreshable } from 'utils/sdk';
import { useOrderList, deleteOrder } from 'sdk/order';
import { usePartList } from 'sdk/part';

import {
  prepareOrdersForTable,
  hiddenFields,
  replacePartIdsWithNumbers
} from './utils';

import styles from './styles.module.css';

const OrdersTable = ({ orders, onEdit, onDelete }) => {
  const items = useMemo(() => prepareOrdersForTable(orders), [orders]);

  return (
    <InformationTable
      items={items}
      onEdit={onEdit}
      onDelete={onDelete}
      hiddenKeys={hiddenFields}
    />
  );
};

const AddNewOrderButton = ({ onClick }) => (
  <AddButton onClick={onClick}>Add New Order</AddButton>
);

const OrdersList = () => {
  const [orderList, refreshOrderList] = useRefreshable(useOrderList);
  const partList = usePartList();

  const orders = useMemo(() => replacePartIdsWithNumbers(orderList, partList), [
    orderList,
    partList
  ]);

  const onItemEdit = useLink(ORDER_DETAIL_URL, getIdObject);
  const onItemDelete = useCallback(
    (object) => deleteOrder(object.id).then(refreshOrderList),
    [refreshOrderList]
  );

  const handleAddButtonClick = useLink(ORDER_ADD_NEW_URL);

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
          <OrdersTable
            orders={orders}
            onEdit={onItemEdit}
            onDelete={onItemDelete}
          />
          <div className={styles.addButton}>
            <AddNewOrderButton onClick={handleAddButtonClick} />
          </div>
        </div>
      </Paper>
    </>
  );
};

export default OrdersList;
