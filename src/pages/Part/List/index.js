import React, { useMemo } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import InformationTable from 'components/InformationTable';
import { PART_DETAIL_URL, PART_ADD_NEW_URL } from 'config/urls';
import { useLink } from 'utils/links';
import { getIdObject } from 'utils/common';
import { usePartList } from 'sdk/part';

import { preparePartsForTable, hiddenFields } from './utils';

import styles from './styles.module.css';

const PartTable = ({ parts, onEdit }) => {
  const items = useMemo(() => preparePartsForTable(parts), [parts]);

  return (
    <InformationTable items={items} onEdit={onEdit} hiddenKeys={hiddenFields} />
  );
};

const AddNewPartButton = ({ onClick }) => (
  <Button
    variant="contained"
    color="primary"
    onClick={onClick}
    startIcon={<AddIcon />}>
    Add new part
  </Button>
);

const PartList = () => {
  const parts = usePartList();

  const handleListItemOnClick = useLink(PART_DETAIL_URL, getIdObject);
  const handleAddButtonClick = useLink(PART_ADD_NEW_URL);

  return (
    <>
      <Paper className={styles.paper}>
        <div className={styles.header}>
          <Typography variant="h4">Parts list</Typography>
          <div>
            <AddNewPartButton onClick={handleAddButtonClick} />
          </div>
        </div>
      </Paper>
      <Paper className={styles.paper}>
        <div>
          <PartTable parts={parts} onEdit={handleListItemOnClick} />
          <div className={styles.addButton}>
            <AddNewPartButton onClick={handleAddButtonClick} />
          </div>
        </div>
      </Paper>
    </>
  );
};

export default PartList;
