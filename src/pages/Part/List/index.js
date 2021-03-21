import React, { useMemo, useCallback } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import InformationTable from 'components/InformationTable';
import AddButton from 'components/AddButton';
import { PART_DETAIL_URL, PART_ADD_NEW_URL } from 'config/urls';
import { useLink } from 'utils/links';
import { getIdObject, compose } from 'utils/common';
import { useRefreshable } from 'utils/sdk';
import { t } from 'utils/translate';
import { useSorting } from 'utils/sorting';
import { usePartList, deletePart } from 'sdk/part';
import { useCastingList } from 'sdk/casting';

import {
  setPartsLabels,
  hiddenFields,
  replaceCastingIdsWithNumbers,
  mapSortKeyToLabelMappings,
  mapLabelMappingsToSortKey
} from './utils';

import styles from './styles.module.css';

const PartTable = ({ parts, onEdit, onDelete, sortBy, onSortBy }) => {
  const items = useMemo(() => setPartsLabels(parts), [parts]);

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

const AddNewPartButton = ({ onClick }) => (
  <AddButton onClick={onClick}>{t('Add new part', 'Нов детайл')}</AddButton>
);

const PartList = () => {
  const [filters, sortBy, setSortBy] = useSorting();
  const [partList, refreshPartList] = useRefreshable(usePartList, filters);
  const castingList = useCastingList();

  const parts = useMemo(
    () => replaceCastingIdsWithNumbers(partList, castingList),
    [partList, castingList]
  );

  const onItemEdit = useLink(PART_DETAIL_URL, getIdObject);
  const onItemDelete = useCallback(
    (object) => deletePart(object.id).then(refreshPartList),
    [refreshPartList]
  );
  const handleAddButtonClick = useLink(PART_ADD_NEW_URL);

  return (
    <>
      <Paper className={styles.paper}>
        <div className={styles.header}>
          <Typography variant="h4">{t('Parts list', 'Детайли')}</Typography>
          <div>
            <AddNewPartButton onClick={handleAddButtonClick} />
          </div>
        </div>
      </Paper>
      <Paper className={styles.paper}>
        <div>
          <PartTable
            parts={parts}
            onEdit={onItemEdit}
            onDelete={onItemDelete}
            sortBy={sortBy}
            onSortBy={setSortBy}
          />
          <div className={styles.addButton}>
            <AddNewPartButton onClick={handleAddButtonClick} />
          </div>
        </div>
      </Paper>
    </>
  );
};

export default PartList;
