import React, { useState, useMemo, useCallback } from 'react';
import _ from 'lodash';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import AddButton from 'components/AddButton';
import InformationTable from 'components/InformationTable';
import { ORDER_DETAIL_URL, ORDER_ADD_NEW_URL } from 'config/urls';
import { useLink } from 'utils/links';
import { getIdObject, swapKeysAndValues } from 'utils/common';
import { useRefreshable } from 'utils/sdk';
import { t } from 'utils/translate';
import { useOrderList, deleteOrder } from 'sdk/order';
import { usePartList } from 'sdk/part';

import {
  prepareOrdersForTable,
  hiddenFields,
  replacePartIdsWithNumbers,
  labelMappings,
  mapSortKeyToLabelMappings
} from './utils';

import styles from './styles.module.css';

const OrdersTable = ({ orders, onEdit, onDelete, sortBy, onSortBy }) => {
  const items = useMemo(() => prepareOrdersForTable(orders), [orders]);

  const handleonSortBy = useCallback(
    (key) => {
      const obj = {
        ...labelMappings,
        ..._.mapValues(
          _.mapKeys(labelMappings, (v, k) => `-${k}`),
          (x) => `-${x}`
        )
      };
      const keys = swapKeysAndValues(obj);
      onSortBy(keys[key]);
    },
    [onSortBy]
  );

  const sortByKey = useMemo(() => mapSortKeyToLabelMappings(sortBy), [sortBy]);

  return (
    <InformationTable
      items={items}
      onEdit={onEdit}
      onDelete={onDelete}
      hiddenKeys={hiddenFields}
      sortBy={sortByKey}
      onSortBy={handleonSortBy}
    />
  );
};

const AddNewOrderButton = ({ onClick }) => (
  <AddButton onClick={onClick}>{t('Add New Order', 'Нова поръчка')}</AddButton>
);

const OrdersList = () => {
  const [sortBy, setSortBy] = useState('');
  const filters = useMemo(
    () => ({
      ordering: sortBy
    }),
    [sortBy]
  );
  const [orderList, refreshOrderList] = useRefreshable(useOrderList, filters);
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
  const onSortBy = setSortBy;

  const handleAddButtonClick = useLink(ORDER_ADD_NEW_URL);

  return (
    <>
      <Paper className={styles.paper}>
        <div className={styles.header}>
          <Typography variant="h4">{t('Orders list', 'Поръчки')}</Typography>
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
            sortBy={sortBy}
            onSortBy={onSortBy}
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
