import React, {useEffect, useState} from 'react';
import {NavLink, useHistory, useLocation} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {AppBar, Button, IconButton, Toolbar} from '@material-ui/core';
import AccountBalanceWalletTwoToneIcon from '@material-ui/icons/AccountBalanceWalletTwoTone';
import AssessmentIcon from '@mui/icons-material/Assessment';
import CategoryIcon from '@mui/icons-material/Category';
import LogoutIcon from '@mui/icons-material/Logout';

import {logoutAsync} from "redux/AuthSlice"
import {getSessionData} from "utils/helpers";
import {useWindowSize} from "utils/useWindowSize"
import useStyles from './style';

export const Navbar = () => {
  const [isToken, setIsToken] = useState(null)
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  
  const {isMobileMd} = useWindowSize()
  
  useEffect(() => {
    if (location.pathname !== '/register') {
      const {token} = getSessionData()
      setIsToken(token)
    }
  }, [location.pathname])
  
  
  const handleLogout = () => {
    dispatch(logoutAsync())
    sessionStorage.clear();
    setIsToken(null);
    history.push('/register')
  }
  
  const classes = useStyles();
  
  if (!isToken) return null;
  
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar>
          <div>
            <NavLink activeClassName={classes.activeRoute} to={"/homepage"}>
              {isMobileMd ? (
                <IconButton>
                  <AccountBalanceWalletTwoToneIcon/>
                </IconButton>
              ) : (
                <Button className={classes.linkButton}>Home</Button>
              )}
            </NavLink>
            <NavLink activeClassName={classes.activeRoute} to={"/charts"}>
              {isMobileMd ? (
                <IconButton>
                  <AssessmentIcon/>
                </IconButton>
              ) : (
                <Button className={classes.linkButton}>Charts</Button>
              )}
            </NavLink>
            <NavLink activeClassName={classes.activeRoute} to={"/categories"}>
              {isMobileMd ? (
                <IconButton>
                  <CategoryIcon/>
                </IconButton>
              ) : (
                <Button className={classes.linkButton}>Categories</Button>
              )}
            </NavLink>
          </div>
        </Toolbar>
        {isToken &&
        <Button className={classes.logout} onClick={handleLogout}><LogoutIcon/></Button>}
      </AppBar>
    </div>
  );
}
