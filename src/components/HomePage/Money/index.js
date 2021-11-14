import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@material-ui/core';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import {useSnackbar} from 'notistack';
import {
  deleteIncomeAsync,
  getIncomeAsync,
  deleteChargeAsync,
  getChargeAsync,
} from 'redux/MoneySlice';
import {
  getIncomeCategoriesAsync,
  getChargeCategoriesAsync,
} from 'redux/CategoriesSlice';
import {TransitionsModal} from 'components/Modal';
import {byField} from 'utils/helpers';
import useStyle from '../../style';
import SkeletonTable from "components/SkeletonTable";

export const Money = ({moneyType}) => {
  const dispatch = useDispatch();
  const {income, charge, isLoading, error} = useSelector(
    (state) => state?.money
  );
  const incomeCategories = useSelector(
    (state) => state?.categories?.incomeCategories
  );
  const chargeCategories = useSelector(
    (state) => state?.categories?.chargeCategories
  );
  
  const [data, setData] = useState(null);
  const [currentMoney, setCurrentMoney] = useState(income);
  const [fields, setFields] = useState({
    edit: false,
    sortField: 'date',
    sortingType: true,
  });
  const {enqueueSnackbar} = useSnackbar();
  
  const classes = useStyle();
  
  useEffect(() => {
    if (error)
      enqueueSnackbar(`An error occurred: ${error}`, {variant: 'error'});
    // eslint-disable-next-line
  }, [error]);
  
  useEffect(() => {
    moneyType === 'income' &&
    dispatch(getIncomeAsync()) &&
    dispatch(getIncomeCategoriesAsync());
    moneyType === 'charge' &&
    dispatch(getChargeAsync()) &&
    dispatch(getChargeCategoriesAsync());
  }, [dispatch, moneyType]);
  
  useEffect(() => {
    moneyType === 'income' && setCurrentMoney(income);
    moneyType === 'charge' && setCurrentMoney(charge);
    setFields((old) => ({...old, sortField: 'date'}));
  }, [moneyType, income, charge]);
  
  useEffect(() => {
    const currentMoney = moneyType === 'income' ? income : charge;
    setCurrentMoney(
      currentMoney?.slice().sort(byField(fields.sortField, fields.sortingType))
    );
  }, [fields.sortField, fields.sortingType, moneyType, charge, income]);
  
  const deleteItem = (itemId) => {
    moneyType === 'income' && dispatch(deleteIncomeAsync(itemId));
    moneyType === 'charge' && dispatch(deleteChargeAsync(itemId));
  };
  const editItem = (item) => {
    setData({
      category: item.category,
      name: item.name,
      description: item.description,
      id: item._id,
      money: item.money,
      date: item.date,
    });
    setFields((old) => ({...old, edit: true}));
  };
  
  const sortByField = (field) => {
    field === fields.sortField &&
    setFields((old) => ({...old, sortField: true}));
    setFields((old) => ({...old, sortField: field}));
    setFields((old) => ({...old, sortingType: !fields.sortingType}));
  };
  
  return (
    <>
      <TransitionsModal
        isOpen={fields.edit}
        onClose={() => {
          setFields((old) => ({...old, edit: false}));
          data && setData(null);
        }}
        label={`${moneyType} item`}
        type={moneyType}
        data={data}
        list={moneyType === 'income' ? incomeCategories : chargeCategories}
      />
      <Box mt={3}>
        <Typography mt={2} variant="h4" gutterBottom>
          {moneyType[0].toUpperCase() + moneyType.slice(1)}
        </Typography>
      </Box>
      <Box m={2} display={'flex'} justifyContent={'flex-end'}>
        <Button
          variant="contained"
          color={'primary'}
          onClick={() => setFields((old) => ({...old, edit: true}))}
        >
          + Add more
        </Button>
      </Box>
      <Box> {isLoading && (
        <SkeletonTable count={5}/>
      )}
        {!isLoading && !currentMoney?.length ? (
          <Typography align={'center'} color={'textSecondary'}>
            There are no money yet
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              {!isLoading && currentMoney && (
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.head} align={'right'}>
                      #
                    </TableCell>
                    <TableCell
                      className={classes.head}
                      align="center"
                      onClick={() => sortByField('category')}
                    >
                      Category{' '}
                      {fields.sortField === 'category' && <span>&#8645;</span>}
                    </TableCell>
                    <TableCell
                      className={classes.head}
                      align="center"
                      onClick={() => sortByField('name')}
                    >
                      Name {fields.sortField === 'name' && <span>&#8645;</span>}
                    </TableCell>
                    <TableCell
                      className={classes.head}
                      align="center"
                      onClick={() => sortByField('description')}
                    >
                      Description{' '}
                      {fields.sortField === 'description' && (
                        <span>&#8645;</span>
                      )}
                    </TableCell>
                    <TableCell
                      className={classes.head}
                      align="center"
                      onClick={() => sortByField('date')}
                    >
                      Date {fields.sortField === 'date' && <span>&#8645;</span>}
                    </TableCell>
                    <TableCell
                      className={classes.head}
                      align="center"
                      onClick={() => sortByField('money')}
                    >
                      Money{' '}
                      {fields.sortField === 'money' && <span>&#8645;</span>}
                    </TableCell>
                    <TableCell className={classes.head} align="center">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
              )}
              <TableBody>
                {!isLoading &&
                currentMoney?.map((item, i) => (
                  <TableRow className={classes.rows} key={item._id}>
                    <TableCell className={classes.body} align={'right'}>
                      {i + 1}
                    </TableCell>
                    <TableCell className={classes.body} align={'center'}>
                      {item.category}
                    </TableCell>
                    <TableCell className={classes.body} align={'center'}>
                      {item.name}
                    </TableCell>
                    <TableCell className={classes.body} align={'center'}>
                      {item.description}
                    </TableCell>
                    <TableCell className={classes.body} align={'center'}>
                      {new Date(item.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell className={classes.body} align={'center'}>
                      {item.money}
                    </TableCell>
                    <TableCell className={classes.body} align={'center'}>
                      <EditTwoToneIcon
                        onClick={() => {
                          editItem(item);
                        }}
                        className={classes.actionIcon}
                      />
                      <DeleteForeverTwoToneIcon
                        onClick={() => deleteItem(item._id)}
                        className={classes.actionIcon}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </>
  );
};
