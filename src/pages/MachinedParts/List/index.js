import React, { useMemo, useCallback } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import {
  MACHINED_PARTS_ADD_NEW_URL,
  MACHINED_PARTS_DETAIL_URL
} from 'config/urls';
import AddButton from 'components/AddButton';
import InformationTable from 'components/InformationTable';
import { getIdObject } from 'utils/common';
import { useLink } from 'utils/links';
import { useRefreshable } from 'utils/sdk';
import { useSorting } from 'utils/sorting';
import { compose } from 'utils/common';
import { t } from 'utils/translate';

import { usePartList } from 'sdk/part';
import { useMachinedPartsList, deleteMachinedParts } from 'sdk/machinedParts';

import {
  prepareMachinedPartsForTable,
  mapSortKeyToLabelMappings,
  mapLabelMappingsToSortKey,
  hiddenFields,
  replacePartIdsWithNumbers
} from './utils';

import styles from './styles.module.css';

const MachinedPartsTable = ({
  machinedParts,
  onEdit,
  onDelete,
  sortBy,
  onSortBy
}) => {
  const items = useMemo(() => prepareMachinedPartsForTable(machinedParts), [
    machinedParts
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

const AddNewMachinedPartsButton = () => {
  const onClick = useLink(MACHINED_PARTS_ADD_NEW_URL);
  return (
    <AddButton onClick={onClick}>
      {t('Add Machined Parts', 'Добави готова продукция')}
    </AddButton>
  );
};

const MachinedPartsList = () => {
  const [filters, sortBy, setSortBy] = useSorting();
  const [machinedPartsList, refreshMachinedPartsList] = useRefreshable(
    useMachinedPartsList,
    filters
  );
  const partList = usePartList();

  const machinedParts = useMemo(
    () => replacePartIdsWithNumbers(machinedPartsList, partList),
    [machinedPartsList, partList]
  );

  const onItemEdit = useLink(MACHINED_PARTS_DETAIL_URL, getIdObject);
  const onItemDelete = useCallback(
    (object) => deleteMachinedParts(object.id).then(refreshMachinedPartsList),
    [refreshMachinedPartsList]
  );

  return (
    <>
      <Paper className={styles.paper}>
        <div className={styles.header}>
          <Typography variant="h4">
            {t('Machined parts', 'Склад готова продукция')}
          </Typography>
          <div>
            <AddNewMachinedPartsButton />
          </div>
        </div>
      </Paper>
      <Paper className={styles.paper}>
        <div>
          <MachinedPartsTable
            machinedParts={machinedParts}
            sortBy={sortBy}
            onSortBy={setSortBy}
            onEdit={onItemEdit}
            onDelete={onItemDelete}
          />
          <div className={styles.addButton}>
            <AddNewMachinedPartsButton />
          </div>
        </div>
      </Paper>
    </>
  );
};

export default MachinedPartsList;
