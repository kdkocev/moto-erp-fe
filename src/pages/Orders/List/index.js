import React, { useEffect } from 'react';
import axios from 'axios';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import { BASE_URL } from 'config/routes';

import styles from './styles.module.css';

const OrdersList = () => {
  useEffect(() => {
    axios.get(`${BASE_URL}/api/offers`);
  }, []);

  return (
    <Paper className={styles.paper}>
      <Typography variant="h3">Orders list</Typography>
      <div>
        <List component="nav">
          <ListItem button selected={false} onClick={() => {}}>
            <ListItemText primary="Offer 1" />
          </ListItem>
        </List>
      </div>
    </Paper>
  );
};

export default OrdersList;
