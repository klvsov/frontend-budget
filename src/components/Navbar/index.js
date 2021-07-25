import React from 'react';
import {NavLink} from 'react-router-dom';
import {AppBar, Button, IconButton, Toolbar} from '@material-ui/core';
import AccountBalanceWalletTwoToneIcon from '@material-ui/icons/AccountBalanceWalletTwoTone';

import useStyles from './style';

export const Navbar = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <NavLink to={"/homepage"}>
            <IconButton aria-label="menu">
              <AccountBalanceWalletTwoToneIcon />
            </IconButton>
          </NavLink>
          <NavLink activeClassName={classes.activeRoute} to={"/homepage"}>
            <Button className={classes.linkButton}>Home</Button>
          </NavLink>
          <NavLink activeClassName={classes.activeRoute} to={"/charts"}>
            <Button className={classes.linkButton}>Charts</Button>
          </NavLink>
          <NavLink activeClassName={classes.activeRoute} to={"/categories"}>
            <Button className={classes.linkButton}>Categories</Button>
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
}
