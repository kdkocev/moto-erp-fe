import React, { useCallback, useMemo } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import InformationTable from 'components/InformationTable';
import { CASTING_DETAIL_URL, CASTING_ADD_NEW_URL } from 'config/urls';
import { useLink } from 'utils/links';
import { getIdObject } from 'utils/common';
import { useCastingList } from 'sdk/casting';

import { prepareCastingsForTable, hiddenFields } from './utils';

import styles from './styles.module.css';

const CastingTable = ({ castings, onEdit }) => {
  const items = useMemo(() => prepareCastingsForTable(castings), [castings]);

  return (
    <InformationTable items={items} onEdit={onEdit} hiddenKeys={hiddenFields} />
  );
};

const AddNewCastingButton = ({ onClick }) => (
  <Button variant="contained" color="primary" onClick={onClick}>
    Add new casting
  </Button>
);

const CastingList = ({ history }) => {
  const castings = useCastingList();

  const handleListItemOnClick = useLink(CASTING_DETAIL_URL, getIdObject);

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
          <CastingTable castings={castings} onEdit={handleListItemOnClick} />
          <div className={styles.addButton}>
            <AddNewCastingButton onClick={handleAddButtonClick} />
          </div>
        </div>
      </Paper>
    </>
  );
};

export default CastingList;
