import React, { useMemo, useCallback } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import InformationTable from 'components/InformationTable';
import AddButton from 'components/AddButton';
import { PART_DETAIL_URL, PART_ADD_NEW_URL } from 'config/urls';
import { useLink } from 'utils/links';
import { getIdObject } from 'utils/common';
import { useRefreshable } from 'utils/sdk';
import { usePartList, deletePart } from 'sdk/part';
import { useCastingList } from 'sdk/casting';

import {
  setPartsLabels,
  hiddenFields,
  replaceCastingIdsWithNumbers
} from './utils';

import styles from './styles.module.css';

const PartTable = ({ parts, onEdit, onDelete }) => {
  const items = useMemo(() => setPartsLabels(parts), [parts]);

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
  <AddButton onClick={onClick}>Add new part</AddButton>
);

const PartList = () => {
  const [partList, refreshPartList] = useRefreshable(usePartList);
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
