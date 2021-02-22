import React, { useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AssignmentIcon from '@material-ui/icons/Assignment';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';

import { ORDER_LIST_URL, CASTING_LIST_URL, PART_LIST_URL } from 'config/urls';

const useStyles = makeStyles((theme) => ({
  drawerPaper: {
    width: 200,
    height: 'calc(100% - 64px)',
    top: 64,
    backgroundColor: '#1d3475',
    color: '#ffffff'
  },
  toolbar: {
    justifyContent: 'space-between'
  },
  content: {
    paddingTop: 64,
    paddingLeft: 200
  }
}));
const menuItems = [
  {
    key: 'orders',
    label: 'Orders',
    Icon: AssignmentIcon,
    url: ORDER_LIST_URL
  },
  {
    key: 'parts',
    label: 'Parts',
    Icon: GroupWorkIcon,
    url: PART_LIST_URL
  },
  {
    key: 'castings',
    label: 'Castings',
    Icon: SettingsApplicationsIcon,
    url: CASTING_LIST_URL
  }
];

const PageLayout = ({ children }) => {
  const classes = useStyles();
  const containerRef = useRef();
  const history = useHistory();

  const handleListItemOnClick = useCallback(
    (item) => {
      history.push(item.url);
    },
    [history]
  );

  return (
    <>
      <AppBar position="fixed" style={{ zIndex: 1201 }}>
        <Toolbar classes={{ root: classes.toolbar }}>
          <Typography variant="h6" className={classes.title}>
            Moto ERP
          </Typography>
          <Button color="inherit" variant="text">
            Log out
          </Button>
        </Toolbar>
      </AppBar>
      <div ref={containerRef}>
        {containerRef && (
          <Drawer
            anchor="left"
            variant="persistent"
            container={containerRef.current}
            open={true}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}>
            <List component="nav">
              {menuItems.map(({ Icon, ...item }) => (
                <ListItem
                  key={item.key}
                  button
                  selected={false}
                  onClick={() => handleListItemOnClick(item)}>
                  <ListItemIcon>{<Icon htmlColor={'white'} />}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        )}
        <div className={classes.content}>{children}</div>
      </div>
    </>
  );
};

export default PageLayout;
