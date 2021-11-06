import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Backdrop, Box, Button, Fade, MenuItem, Modal, TextField} from '@material-ui/core';

import {
  addIncomeCategoriesAsync,
  editIncomeCategoryAsync,
  addChargeCategoriesAsync,
  editChargeCategoryAsync
} from "redux/CategoriesSlice";
import {addChargeAsync, addIncomeAsync, editChargeAsync, editIncomeAsync} from "redux/MoneySlice";
import useStyle from './style'

const initialState = {
  name: '',
  category: '',
  description: '',
  money: 0,
  date: new Date()
}

export const TransitionsModal = ({ data, typeCategory, isOpen, label, type = 'category', isMoney = true, onClose, list = null }) => {
  const [fields, setFields] = useState(initialState);
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  
  const classes = useStyle();
  
  useEffect(() => {
    if (data) {
      setFields({...data});
    } else {
      setFields(initialState);
    }
  }, [data, isOpen]);
  
  const onChange = ({target}) => {
    const {name, value} = target;
    setFields(prev => ({
      ...prev, [name]: value
    }));
    const errorList = {...errors};
    delete errorList[name];
    setErrors(errorList);
  }
  
  const onSubmit = (event) => {
    event.preventDefault();
    const errorList = {};
    if (!fields.category) {
      errorList['category'] = "Category is required";
    }
    if (!fields.name) {
      errorList['name'] = "Name of money is required";
    }
    if (!fields.money) {
      errorList['money'] = "Money is required";
    }
    setErrors(errorList);
    
    if ((!isMoney && Object.keys(errorList).includes('category')) || (isMoney && Object.keys(errorList).length)) {
      return;
    }
    
    if (data) {
      if (isMoney) {
        type === 'income' && dispatch(editIncomeAsync({...fields, id: data.id}))
        type === 'charge' && dispatch(editChargeAsync({...fields, id: data.id}))
      } else {
        typeCategory === 'income' && dispatch(editIncomeCategoryAsync({
          category: fields.category,
          description: fields.description,
          id: data.id
        }))
        typeCategory === 'charge' && dispatch(editChargeCategoryAsync({
          category: fields.category,
          description: fields.description,
          id: data.id
        }))
      }
    } else {
      if (isMoney) {
        type === 'income' && dispatch(addIncomeAsync({...fields}))
        type === 'charge' && dispatch(addChargeAsync({...fields}))
      } else {
        typeCategory === 'income' && dispatch(addIncomeCategoriesAsync({
          category: fields.category,
          description: fields.description
        }));
        typeCategory === 'charge' && dispatch(addChargeCategoriesAsync({
          category: fields.category,
          description: fields.description
        }));
      }
    }
    onClose();
  }
  
  return (
    <div>
      <Modal
        className={classes.modal}
        open={isOpen}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <div className={classes.paper}>
            <h2>Add {label}</h2>
            <Box>
              <form onSubmit={onSubmit}>
                <Box m={1}>
                  {isMoney && (<TextField
                    className={classes.fullWidth}
                    select
                    value={fields.category}
                    onChange={onChange}
                    label="Category"
                    name="category"
                    required
                    error={!!errors['category']}
                    helperText={errors['category']}
                  >
                    {!!list?.length && list?.map((option) => (
                      <MenuItem key={option._id} value={option.name}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>)}
                </Box>
                <Box m={1}>
                  {!isMoney && (<TextField
                    className={classes.fullWidth}
                    value={fields.category}
                    onChange={onChange}
                    label="New Category"
                    name="category"
                    required
                    error={!!errors['category']}
                    helperText={errors['category']}
                  />)}
                </Box>
                <Box m={1}>
                  {isMoney && (<TextField
                    className={classes.fullWidth}
                    value={fields.name}
                    onChange={onChange}
                    label={`New ${type} money`}
                    name='name'
                    required
                    error={!!errors['name']}
                    helperText={errors['name']}
                  />)}
                </Box>
                <Box m={1}>
                  <TextField
                    className={classes.fullWidth}
                    label='Description'
                    name='description'
                    value={fields.description}
                    onChange={onChange}
                  />
                </Box>
                <Box m={1}>
                  {isMoney && (
                    <TextField
                      label="Date"
                      name="date"
                      type="date"
                      value={new Date(fields.date).toISOString().slice(0, 10)}
                      onChange={onChange}
                      className={classes.fullWidth}
                      required
                    />)}
                </Box>
                <Box m={1}>
                  {isMoney && (
                    <TextField
                      className={classes.fullWidth}
                      label={'Money'}
                      name='money'
                      type={'number'}
                      min={1}
                      value={fields.money}
                      onChange={onChange}
                      required
                      error={!!errors['money']}
                      helperText={errors['money']}
                    />
                  )}
                </Box>
              </form>
            </Box>
            <Box className={classes.btnWrap}>
              <Button
                variant={"contained"}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                variant={"contained"}
                color={'primary'}
                onClick={onSubmit}
              >
                Save
              </Button>
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}