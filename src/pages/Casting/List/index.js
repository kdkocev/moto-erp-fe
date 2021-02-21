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

import { BASE_URL, CASTING_DETAIL_URL, CASTING_ADD_NEW_URL } from 'config/urls';
import { callUrl, get, reverse } from 'utils/sdk';

import styles from './styles.module.css';

const CastingList = ({ history }) => {
  const [castings, setCastings] = useState([]);

  useEffect(() => {
    callUrl(get, `${BASE_URL}/casting`).then(setCastings);
  }, []);

  const handleListItemOnClick = useCallback(
    (casting) => {
      history.push(reverse(CASTING_DETAIL_URL, { id: casting.id }));
    },
    [history]
  );

  const handleAddButtonClick = useCallback(() => {
    history.push(CASTING_ADD_NEW_URL);
  }, [history]);

  return (
    <Paper className={styles.paper}>
      <Typography variant="h3">Castings list</Typography>
      <div>
        <List component="nav">
          <Divider light />
          {castings.map((casting) => (
            <React.Fragment key={casting.id}>
              <ListItem button selected={false} disableRipple={true}>
                <ListItemText primary={casting.number} />
                <IconButton onClick={() => handleListItemOnClick(casting)}>
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
          Add new casting
        </Button>
      </div>
    </Paper>
  );
};

export default CastingList;
