import React, { useState, useEffect, useCallback } from 'react';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import EditIcon from '@material-ui/icons/Edit';

import { BASE_URL, PART_DETAIL_URL, PART_ADD_NEW_URL } from 'config/urls';
import { callUrl, get, reverse } from 'utils/sdk';

import styles from './styles.module.css';

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
    <Paper className={styles.paper}>
      <Typography variant="h3">Parts list</Typography>
      <div>
        <List component="nav">
          <Divider light />
          {parts.map((part) => (
            <React.Fragment key={part.id}>
              <ListItem button selected={false} disableRipple={true}>
                <ListItemText primary={part.number} />
                <IconButton onClick={() => handleListItemOnClick(part)}>
                  <EditIcon />
                </IconButton>
              </ListItem>
              <Divider light />
            </React.Fragment>
          ))}
        </List>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddButtonClick}>
          Add new part
        </Button>
      </div>
    </Paper>
  );
};

export default PartList;
