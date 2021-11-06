import React, { useState } from 'react';
import { Paper, Tab, Tabs, Typography } from '@material-ui/core';

import { Category } from './components/Category';

import useStyle from './style';

export const Categories = () => {
  const [value, setValue] = useState(0);
  const classes = useStyle();

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className={classes.categoriesWrapper}>
      <Typography variant="h3" gutterBottom>
        Categories
      </Typography>
      <Paper>
        <Tabs value={value} onChange={handleChangeTab}>
          <Tab label="Incomes" />
          <Tab label="Charges" />
        </Tabs>
      </Paper>
      <Category typeCategory={value === 0 ? 'income' : 'charge'} />
    </div>
  );
};
