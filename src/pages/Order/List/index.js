import React, { useMemo, useCallback } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import AddButton from 'components/AddButton';
import InformationTable from 'components/InformationTable';
import { ORDER_DETAIL_URL, ORDER_ADD_NEW_URL } from 'config/urls';
import { useLink } from 'utils/links';
import { getIdObject, compose } from 'utils/common';
import { useRefreshable } from 'utils/sdk';
import { t } from 'utils/translate';
import { useSorting } from 'utils/sorting';
import { useOrderList, deleteOrder } from 'sdk/order';
import { usePartList } from 'sdk/part';

import {
  prepareOrdersForTable,
  hiddenFields,
  replacePartIdsWithNumbers,
  mapSortKeyToLabelMappings,
  mapLabelMappingsToSortKey
} from './utils';

import styles from './styles.module.css';

const OrdersTable = ({ orders, onEdit, onDelete, sortBy, onSortBy }) => {
  const items = useMemo(() => prepareOrdersForTable(orders), [orders]);

  const handleonSortBy = useCallback(
    (key) => {
      compose(mapLabelMappingsToSortKey, onSortBy)(key);
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

const AddNewOrderButton = () => {
  const onClick = useLink(ORDER_ADD_NEW_URL);
  return (
    <AddButton onClick={onClick}>
      {t('Add New Order', 'Нова поръчка')}
    </AddButton>
  );
};

const OrdersList = () => {
  const [filters, sortBy, setSortBy] = useSorting();
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

  return (
    <>
      <Paper className={styles.paper}>
        <div className={styles.header}>
          <Typography variant="h4">{t('Orders list', 'Поръчки')}</Typography>
          <div>
            <AddNewOrderButton />
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
            onSortBy={setSortBy}
          />
          <div className={styles.addButton}>
            <AddNewOrderButton />
          </div>
        </div>
      </Paper>
    </>
  );
};

export default OrdersList;
