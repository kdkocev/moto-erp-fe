import React, { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

import { BASE_URL, PART_DETAIL_URL, PART_ADD_NEW_URL } from 'config/urls';
import { callUrl, get, reverse } from 'utils/sdk';

import styles from './styles.module.css';

const labelMappings = {
  id: 'ID',
  number: 'Number',
  price_total: 'Price Total',
  price_machining: 'Price Machining',
  casting: 'Casting ID'
};

const PartTable = ({ parts, handleListItemOnClick }) => {
  return (
    <TableContainer component={Paper} className={styles.table}>
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(_.get(parts, '[0]', {})).map((key) => (
              <TableCell key={key}>{_.get(labelMappings, key, key)}</TableCell>
            ))}
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {parts.map((part) => (
            <TableRow key={part.id}>
              {Object.keys(part).map((key) => (
                <TableCell key={key}>{part[key]}</TableCell>
              ))}
              <TableCell>
                <IconButton onClick={() => handleListItemOnClick(part)}>
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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

const PartList = ({ history }) => {
  const [parts, setParts] = useState([]);

  useEffect(() => {
    callUrl(get, `${BASE_URL}/part`).then(setParts);
  }, []);

  const handleListItemOnClick = useCallback(
    (part) => {
      history.push(reverse(PART_DETAIL_URL, { id: part.id }));
    },
    [history]
  );

  const handleAddButtonClick = useCallback(() => {
    history.push(PART_ADD_NEW_URL);
  }, [history]);

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
            handleListItemOnClick={handleListItemOnClick}
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
