import React, { useMemo, useCallback } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { EXPEDITION_ADD_NEW_URL, EXPEDITION_DETAIL_URL } from 'config/urls';
import AddButton from 'components/AddButton';
import InformationTable from 'components/InformationTable';
import { getIdObject } from 'utils/common';
import { useLink } from 'utils/links';
import { useRefreshable } from 'utils/sdk';
import { useSorting } from 'utils/sorting';
import { compose } from 'utils/common';
import { t } from 'utils/translate';

import { useOrderList } from 'sdk/order';
import { useExpeditionList, deleteExpedition } from 'sdk/expedition';

import {
  prepareExpeditionsForTable,
  mapSortKeyToLabelMappings,
  mapLabelMappingsToSortKey,
  hiddenFields,
  replaceOrderIdsWithNumbers
} from './utils';

import styles from './styles.module.css';

const ExpeditionsTable = ({
  expeditions,
  onEdit,
  onDelete,
  sortBy,
  onSortBy
}) => {
  const items = useMemo(() => prepareExpeditionsForTable(expeditions), [
    expeditions
  ]);

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

const AddNewExpeditionButton = () => {
  const onClick = useLink(EXPEDITION_ADD_NEW_URL);
  return (
    <AddButton onClick={onClick}>
      {t('Add New Expedition', 'Експедирай поръчка')}
    </AddButton>
  );
};

const ExpeditionList = () => {
  const [filters, sortBy, setSortBy] = useSorting();
  const [expeditionList, refreshExpeditionList] = useRefreshable(
    useExpeditionList,
    filters
  );
  const orderList = useOrderList();

  const expeditions = useMemo(
    () => replaceOrderIdsWithNumbers(expeditionList, orderList),
    [expeditionList, orderList]
  );

  const onItemEdit = useLink(EXPEDITION_DETAIL_URL, getIdObject);
  const onItemDelete = useCallback(
    (object) => deleteExpedition(object.id).then(refreshExpeditionList),
    [refreshExpeditionList]
  );

  return (
    <>
      <Paper className={styles.paper}>
        <div className={styles.header}>
          <Typography variant="h4">
            {t('Expedition list', 'Експедиции')}
          </Typography>
          <div>
            <AddNewExpeditionButton />
          </div>
        </div>
      </Paper>
      <Paper className={styles.paper}>
        <div>
          <ExpeditionsTable
            expeditions={expeditions}
            sortBy={sortBy}
            onSortBy={setSortBy}
            onEdit={onItemEdit}
            onDelete={onItemDelete}
          />
          <div className={styles.addButton}>
            <AddNewExpeditionButton />
          </div>
        </div>
      </Paper>
    </>
  );
};

export default ExpeditionList;
