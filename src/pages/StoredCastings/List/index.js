import React, { useMemo, useCallback } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import {
  STORED_CASTINGS_ADD_NEW_URL,
  STORED_CASTINGS_DETAIL_URL
} from 'config/urls';
import AddButton from 'components/AddButton';
import InformationTable from 'components/InformationTable';
import { getIdObject } from 'utils/common';
import { useLink } from 'utils/links';
import { useRefreshable } from 'utils/sdk';
import { useSorting } from 'utils/sorting';
import { compose } from 'utils/common';
import { t } from 'utils/translate';

import { useCastingList } from 'sdk/casting';
import {
  useStoredCastingsList,
  deleteStoredCastings
} from 'sdk/storedCastings';

import {
  prepareStoredCastingsForTable,
  mapSortKeyToLabelMappings,
  mapLabelMappingsToSortKey,
  hiddenFields,
  replaceCastingIdsWithNumbers
} from './utils';

import styles from './styles.module.css';

const StoredCastingsTable = ({
  storedCastings,
  onEdit,
  onDelete,
  sortBy,
  onSortBy
}) => {
  const items = useMemo(() => prepareStoredCastingsForTable(storedCastings), [
    storedCastings
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

const AddNewStoredCastingsButton = () => {
  const onClick = useLink(STORED_CASTINGS_ADD_NEW_URL);
  return (
    <AddButton onClick={onClick}>
      {t('Add New Stored Castings', 'Добави отливки в склад')}
    </AddButton>
  );
};

const StoredCastingsList = () => {
  const [filters, sortBy, setSortBy] = useSorting();
  const [storedCastingsList, refreshStoredCastingsList] = useRefreshable(
    useStoredCastingsList,
    filters
  );
  const castingList = useCastingList();

  const storedCastings = useMemo(
    () => replaceCastingIdsWithNumbers(storedCastingsList, castingList),
    [storedCastingsList, castingList]
  );

  const onItemEdit = useLink(STORED_CASTINGS_DETAIL_URL, getIdObject);
  const onItemDelete = useCallback(
    (object) => deleteStoredCastings(object.id).then(refreshStoredCastingsList),
    [refreshStoredCastingsList]
  );

  return (
    <>
      <Paper className={styles.paper}>
        <div className={styles.header}>
          <Typography variant="h4">
            {t('Stored Castings list', 'Склад Отливки')}
          </Typography>
          <div>
            <AddNewStoredCastingsButton />
          </div>
        </div>
      </Paper>
      <Paper className={styles.paper}>
        <div>
          <StoredCastingsTable
            storedCastings={storedCastings}
            sortBy={sortBy}
            onSortBy={setSortBy}
            onEdit={onItemEdit}
            onDelete={onItemDelete}
          />
          <div className={styles.addButton}>
            <AddNewStoredCastingsButton />
          </div>
        </div>
      </Paper>
    </>
  );
};

export default StoredCastingsList;
