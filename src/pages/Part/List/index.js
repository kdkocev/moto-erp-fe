import React, { useMemo, useCallback } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import InformationTable from 'components/InformationTable';
import { PART_DETAIL_URL, PART_ADD_NEW_URL } from 'config/urls';
import { useLink } from 'utils/links';
import { getIdObject } from 'utils/common';
import { useRefreshKey } from 'utils/sdk';
import { usePartList, deletePart } from 'sdk/part';

import { preparePartsForTable, hiddenFields } from './utils';

import styles from './styles.module.css';

const PartTable = ({ parts, onEdit, onDelete }) => {
  const items = useMemo(() => preparePartsForTable(parts), [parts]);

  return (
    <InformationTable
      items={items}
      onEdit={onEdit}
      onDelete={onDelete}
      hiddenKeys={hiddenFields}
    />
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
  const [refreshKey, refreshPartList] = useRefreshKey();
  const parts = usePartList(refreshKey);

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
          <Typography variant="h4">Parts list</Typography>
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
