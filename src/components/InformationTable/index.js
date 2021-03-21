import React, { useCallback } from 'react';
import _ from 'lodash';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import Box from '@material-ui/core/Box';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';

import { t } from 'utils/translate';

import styles from './styles.module.css';

const HeaderCell = ({ value, sortBy, onSortBy }) => {
  const handleSortBy = useCallback(
    (value) => {
      if (sortBy === value && !sortBy.startsWith('-')) {
        onSortBy(`-${value}`);
      } else {
        onSortBy(value);
      }
    },
    [sortBy, onSortBy]
  );
  if (onSortBy) {
    return (
      <div className={styles.sortableHeader}>
        <span>{value}</span>
        <IconButton onClick={() => handleSortBy(value)} size="small">
          {sortBy === value && <ArrowDropUpIcon />}
          {sortBy !== value && sortBy !== `-${value}` && <SortByAlphaIcon />}
          {sortBy === `-${value}` && <ArrowDropDownIcon />}
        </IconButton>
      </div>
    );
  }
  return <>{value}</>;
};

// const items = [
//   {
//     key1: value1,
//     key2: value2,
//     key3: value3,
//   }
// ]
const InformationTable = ({
  items,
  onEdit,
  onDelete,
  hiddenKeys,
  sortBy,
  onSortBy
}) => {
  const handleDelete = useCallback(
    (item) => {
      if (
        window.confirm(
          t(
            'Are you sure you want to delete this item?',
            'Сигурни ли сте, че искате да изтриете този запис?'
          )
        )
      ) {
        onDelete(item);
      }
    },
    [onDelete]
  );

  return (
    <TableContainer component={Paper} className={styles.table}>
      <Table>
        <TableHead>
          <TableRow>
            {Object.keys(_.get(items, '[0]', {})).map((key) => {
              if (_.indexOf(hiddenKeys, key) === -1) {
                return (
                  <TableCell key={key}>
                    <HeaderCell
                      value={key}
                      sortBy={sortBy}
                      onSortBy={onSortBy}
                    />
                  </TableCell>
                );
              }
              return undefined;
            })}
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={item.id || index}>
              {Object.keys(item).map((key) => {
                if (_.indexOf(hiddenKeys, key) === -1) {
                  return <TableCell key={key}>{item[key]}</TableCell>;
                }
                return undefined;
              })}
              <TableCell>
                <Box textAlign="right">
                  {onEdit && (
                    <IconButton onClick={() => onEdit(item)}>
                      <EditIcon />
                    </IconButton>
                  )}
                  {onDelete && (
                    <IconButton onClick={() => handleDelete(item)}>
                      <DeleteForeverIcon />
                    </IconButton>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InformationTable;
