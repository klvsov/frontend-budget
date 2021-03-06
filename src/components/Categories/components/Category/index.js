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

import {TransitionsModal} from 'components/Modal';
import {
  deleteIncomeCategoryAsync,
  getIncomeCategoriesAsync,
  deleteChargeCategoryAsync,
  getChargeCategoriesAsync,
} from 'redux/CategoriesSlice';
import useStyle from '../../../style';
import SkeletonTable from "components/SkeletonTable";

export const Category = ({typeCategory}) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const incomeCategories = state?.categories?.incomeCategories;
  const chargeCategories = state?.categories?.chargeCategories;
  const isLoading = state?.categories?.isLoading;
  const error = state?.categories?.error;
  
  const [edit, setEdit] = useState(false);
  const [data, setData] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(incomeCategories);
  const {enqueueSnackbar} = useSnackbar();
  
  const classes = useStyle();
  
  useEffect(() => {
    if (error)
      enqueueSnackbar(`An error occurred: ${error}`, {variant: 'error'});
    // eslint-disable-next-line
  }, [error]);
  
  useEffect(() => {
    typeCategory === 'income' && dispatch(getIncomeCategoriesAsync());
    typeCategory === 'charge' && dispatch(getChargeCategoriesAsync());
  }, [dispatch, typeCategory]);
  
  useEffect(() => {
    typeCategory === 'income' && setCurrentCategory(incomeCategories);
    typeCategory === 'charge' && setCurrentCategory(chargeCategories);
  }, [typeCategory, incomeCategories, chargeCategories]);
  
  const deleteItem = (itemId) => {
    typeCategory === 'income' && dispatch(deleteIncomeCategoryAsync(itemId));
    typeCategory === 'charge' && dispatch(deleteChargeCategoryAsync(itemId));
  };
  const editItem = (item) => {
    setData({
      category: item.name,
      description: item.description,
      id: item._id,
    });
    setEdit(true);
  };
  
  return (
    <>
      <TransitionsModal
        isOpen={edit}
        onClose={() => {
          setEdit(false);
          data && setData(null);
        }}
        label={`${typeCategory} category item`}
        type={`${typeCategory}s`}
        isMoney={false}
        data={data}
        typeCategory={typeCategory}
      />
      <Box mt={3}>
        <Typography mt={2} variant="h4" gutterBottom>
          {typeCategory[0].toUpperCase() + typeCategory.slice(1)} categories
        </Typography>
      </Box>
      <Box m={2} display={'flex'} justifyContent={'flex-end'}>
        <Button
          variant="contained"
          color={'primary'}
          onClick={() => setEdit(true)}
        >
          + Add more
        </Button>
      </Box>
      <Box>
        {isLoading && (
          <SkeletonTable count={2}/>
        )}
        {!isLoading && !currentCategory?.length ? (
          <Typography align={'center'} color={'textSecondary'}>
            There are no categories yet
          </Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              {!isLoading && currentCategory && (
                <TableHead>
                  <TableRow>
                    <TableCell className={classes.head} align={'right'}>
                      #
                    </TableCell>
                    <TableCell className={classes.head} align="center">
                      Category name
                    </TableCell>
                    <TableCell className={classes.head} align="center">
                      Description
                    </TableCell>
                    <TableCell className={classes.head} align="center">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
              )}
              <TableBody>
                {!isLoading &&
                currentCategory?.map((item, i) => (
                  <TableRow className={classes.rows} key={item._id}>
                    <TableCell className={classes.body} align={'right'}>
                      {i + 1}
                    </TableCell>
                    <TableCell className={classes.body} align={'center'}>
                      {item.name}
                    </TableCell>
                    <TableCell className={classes.body} align={'center'}>
                      {item.description}
                    </TableCell>
                    <TableCell className={classes.body} align={'center'}>
                      <EditTwoToneIcon
                        onClick={() => editItem(item)}
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
