import { Paper, Tab, Tabs, Typography } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Money } from './Money/index';
import useStyle from './style';

export const HomePage = () => {
  const [value, setValue] = useState(0);
  const classes = useStyle();

  const history = useHistory();

  const isToken = useMemo(() => sessionStorage.getItem('token'), []);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (!isToken) return history.push('/register');
  }, [isToken, history]);

  return (
    <div className={classes.homeWrapper}>
      <Typography variant="h3" gutterBottom>
        Home page
      </Typography>
      <Paper>
        <Tabs value={value} onChange={handleChangeTab}>
          <Tab label="Incomes" />
          <Tab label="Charges" />
        </Tabs>
      </Paper>
      <Money moneyType={value === 0 ? 'income' : 'charge'} />
    </div>
  );
};
