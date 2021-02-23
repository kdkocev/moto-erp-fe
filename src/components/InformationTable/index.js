import React from 'react';
import _ from 'lodash';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

import styles from './styles.module.css';

// const items = [
//   {
//     key1: value1,
//     key2: value2,
//     key3: value3,
//   }
// ]

const InformationTable = ({ items, onEdit }) => {
  return (
    <TableContainer component={Paper} className={styles.table}>
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(_.get(items, '[0]', {})).map((key) => (
              <TableCell key={key}>{key}</TableCell>
            ))}
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={item.id || index}>
              {Object.keys(item).map((key) => (
                <TableCell key={key}>{item[key]}</TableCell>
              ))}
              <TableCell>
                <IconButton onClick={() => onEdit(item)}>
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

export default InformationTable;
