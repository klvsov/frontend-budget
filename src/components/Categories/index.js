import React, {useState} from 'react';
import {Route, Link, Redirect, Switch, BrowserRouter} from 'react-router-dom';
import {Paper, Tab, Tabs, Typography} from "@material-ui/core";

import {Category} from "./components/Category";

import useStyle from "./style";

export const Categories = () => {
  const [value, setValue] = useState(0);
  const routes = ['/categories/incomes', '/categories/charges'];
  const classes = useStyle();
  
  const handleChangeTab = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <div className={classes.categoriesWrapper}>
      <Typography variant="h3" gutterBottom>
        Categories
      </Typography>
      <BrowserRouter>
        <Route path={'/categories'} render={() =>(
          <Paper>
            <Tabs value={value} onChange={handleChangeTab}>
              <Tab label={'Incomes'} component={Link} to={routes[0]}/>
              <Tab label={'Charges'} component={Link} to={routes[1]}/>
            </Tabs>
          </Paper>
        )}
        />
        <Switch>
          <Route path={'/categories/incomes'}>
            <Category typeCategory={'income'} />
          </Route>
          <Route path={'/categories/charges'}>
            <Category typeCategory={'charge'} />
          </Route>
          <Route exact path={'/categories/'}>
            <Redirect to={'/categories/incomes'} />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}