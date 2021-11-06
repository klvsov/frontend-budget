import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Typography,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@material-ui/core';
import { Doughnut, Line } from 'react-chartjs-2';

import { setDays, startDateOfPeriod, getColors } from 'utils/helpers';
import { COLORS_BG, COLORS_BORDER } from 'utils/constants';
import { getIncomeAsync, getChargeAsync } from 'redux/MoneySlice';
import { Loader } from 'components/Loader';
import { getKeys, getValues } from 'utils/helpers';
import useStyle from './style';

const noDataText = 'There is no data for this period';

export const Charts = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const income = state.money.income;
  const charge = state.money.charge;
  const isLoading = state.money.isLoading;

  const [period, setPeriod] = useState('week');
  const incomeOfPeriod = [];
  const chargeOfPeriod = [];
  let daysOfPeriod = [];
  const categoriesIn = {};
  const categoriesOut = {};

  const isData = useMemo(
    () => income.length || charge.length,
    [income, charge]
  );

  const classes = useStyle({ isData });

  const handleSetPeriod = (event) => {
    setPeriod(event.target.value);
  };

  useEffect(() => {
    dispatch(getIncomeAsync());
    dispatch(getChargeAsync());
  }, [dispatch]);

  daysOfPeriod = setDays(period);
  daysOfPeriod.forEach((day) => {
    const currentDatesIn = income.filter(
      (el) => new Date(el.date).toLocaleDateString() === day
    );
    const currentDatesOut = charge.filter(
      (el) => new Date(el.date).toLocaleDateString() === day
    );
    let sumIn = 0;
    let sumOut = 0;
    currentDatesIn.forEach((date, i) => {
      sumIn += date.money;
    });
    incomeOfPeriod.push(sumIn);
    currentDatesOut.forEach((date) => {
      sumOut += date.money;
    });
    chargeOfPeriod.push(sumOut);
  });

  income.forEach((item) => {
    if (Date.parse(item.date) > startDateOfPeriod(period)) {
      if (!getKeys(categoriesIn).includes(item.category)) {
        if (categoriesIn[item.category]) {
          categoriesIn[item.category] += item.money;
        } else {
          categoriesIn[item.category] = item.money;
        }
      }
    }
  });

  charge.forEach((item) => {
    if (Date.parse(item.date) > startDateOfPeriod(period)) {
      if (!getKeys(categoriesOut).includes(item.category)) {
        if (categoriesOut[item.category]) {
          categoriesOut[item.category] += item.money;
        } else {
          categoriesOut[item.category] = item.money;
        }
      }
    }
  });

  const data = {
    labels: daysOfPeriod,
    datasets: [
      {
        label: 'Income money',
        lineTension: 0.5,
        data: incomeOfPeriod,
        pointBorderWidth: 0,
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Charge money',
        lineTension: 0.5,
        data: chargeOfPeriod,
        pointBorderWidth: 0,
        borderColor: '#742774',
      },
    ],
  };

  const dataOut = {
    labels: getKeys(categoriesOut),
    datasets: [
      {
        label: '',
        data: getValues(categoriesOut),
        backgroundColor: getColors(getKeys(categoriesOut).length, [
          ...COLORS_BG,
        ]),
        borderColor: getColors(getKeys(categoriesIn).length, [
          ...COLORS_BORDER,
        ]),
      },
    ],
  };

  const dataIn = {
    labels: getKeys(categoriesIn),
    datasets: [
      {
        label: '',
        data: getValues(categoriesIn),
        backgroundColor: getColors(getKeys(categoriesIn).length, [
          ...COLORS_BG,
        ]),
        borderColor: getColors(getKeys(categoriesIn).length, [
          ...COLORS_BORDER,
        ]),
      },
    ],
  };

  return (
    <div className={classes.chartsWrapper}>
      <Typography variant="h3" gutterBottom>
        Charts
      </Typography>
      <RadioGroup
        className={classes.period}
        aria-label="period"
        name="period"
        value={period}
        onChange={handleSetPeriod}
      >
        <FormControlLabel value="week" control={<Radio />} label="Week" />
        <FormControlLabel value="month" control={<Radio />} label="Month" />
      </RadioGroup>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={classes.lineWrap}>
            <Paper className={classes.space}>
              {getKeys(categoriesIn).length || getKeys(categoriesOut).length ? (
                <Line data={data} options={{ maintainAspectRatio: false }} />
              ) : (
                <Typography>{noDataText}</Typography>
              )}
            </Paper>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.space}>
                {getKeys(categoriesIn).length ? (
                  <Doughnut data={dataIn} />
                ) : (
                  <Typography>{noDataText}</Typography>
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.space}>
                {getKeys(categoriesOut).length ? (
                  <Doughnut data={dataOut} />
                ) : (
                  <Typography>{noDataText}</Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
};
