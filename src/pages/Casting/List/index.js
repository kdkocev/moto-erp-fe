import React, { useCallback, useMemo } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import InformationTable from 'components/InformationTable';
import AddButton from 'components/AddButton';
import { CASTING_DETAIL_URL, CASTING_ADD_NEW_URL } from 'config/urls';
import { useLink } from 'utils/links';
import { getIdObject, compose } from 'utils/common';
import { useRefreshable } from 'utils/sdk';
import { t } from 'utils/translate';
import { useSorting } from 'utils/sorting';
import { useCastingList, deleteCasting } from 'sdk/casting';

import {
  prepareCastingsForTable,
  hiddenFields,
  mapLabelMappingsToSortKey,
  mapSortKeyToLabelMappings
} from './utils';

import styles from './styles.module.css';

const CastingTable = ({ castings, onEdit, onDelete, sortBy, onSortBy }) => {
  const items = useMemo(() => prepareCastingsForTable(castings), [castings]);

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

const AddNewCastingButton = ({ onClick }) => (
  <AddButton onClick={onClick}>
    {t('Add new casting', 'Нова отливка')}
  </AddButton>
);

const CastingList = ({ history }) => {
  const [filters, sortBy, setSortBy] = useSorting();
  const [castings, refreshCastingList] = useRefreshable(
    useCastingList,
    filters
  );

  const onItemEdit = useLink(CASTING_DETAIL_URL, getIdObject);
  const onItemDelete = (object) =>
    deleteCasting(object.id).then(refreshCastingList);

  const handleAddButtonClick = useCallback(() => {
    history.push(CASTING_ADD_NEW_URL);
  }, [history]);

  return (
    <>
      <Paper className={styles.paper}>
        <div className={styles.header}>
          <Typography variant="h4">{t('Castings list', 'Отливки')}</Typography>
          <div>
            <AddNewCastingButton onClick={handleAddButtonClick} />
          </div>
        </div>
      </Paper>
      <Paper className={styles.paper}>
        <div>
          <CastingTable
            castings={castings}
            onEdit={onItemEdit}
            onDelete={onItemDelete}
            sortBy={sortBy}
            onSortBy={setSortBy}
          />
          <div className={styles.addButton}>
            <AddNewCastingButton onClick={handleAddButtonClick} />
          </div>
        </div>
      </Paper>
    </>
  );
};

export default CastingList;
