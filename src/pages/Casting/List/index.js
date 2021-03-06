import React, { useCallback, useMemo } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import InformationTable from 'components/InformationTable';
import AddButton from 'components/AddButton';
import { CASTING_DETAIL_URL, CASTING_ADD_NEW_URL } from 'config/urls';
import { useLink } from 'utils/links';
import { getIdObject } from 'utils/common';
import { useRefreshable } from 'utils/sdk';
import { useCastingList, deleteCasting } from 'sdk/casting';

import { prepareCastingsForTable, hiddenFields } from './utils';

import styles from './styles.module.css';

const CastingTable = ({ castings, onEdit, onDelete }) => {
  const items = useMemo(() => prepareCastingsForTable(castings), [castings]);

  return (
    <InformationTable
      items={items}
      onEdit={onEdit}
      onDelete={onDelete}
      hiddenKeys={hiddenFields}
    />
  );
};

const AddNewCastingButton = ({ onClick }) => (
  <AddButton onClick={onClick}>Add new casting</AddButton>
);

const CastingList = ({ history }) => {
  const [castings, refreshCastingList] = useRefreshable(useCastingList);

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
          <Typography variant="h4">Castings list</Typography>
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
