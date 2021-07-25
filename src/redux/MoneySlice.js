import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  income: [],
  charge: [],
  error: null
}

export const getIncomeAsync = createAsyncThunk(
  'income/getIncomeAsync',
  async (_, {rejectWithValue}) => {
    try {
      const resp = await fetch('https://serene-ravine-72178.herokuapp.com/api/incomes');
      if(!resp.ok) {
        throw new Error('Server error!')
      }
      return await resp.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addIncomeAsync = createAsyncThunk(
  'income/addIncomeAsync',
  async (payload, {dispatch, rejectWithValue}) => {
    try {
      const resp = await fetch('https://serene-ravine-72178.herokuapp.com/api/incomes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  name: payload.name, category: payload.category, description: payload.description, money: payload.money, date: payload.date }),
      });
      if(!resp.ok) {
        throw new Error('Can\'t add money. Server error!')
      }
      return await dispatch(getIncomeAsync()).payload
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editIncomeAsync = createAsyncThunk(
  'income/editIncomeAsync',
  async (payload, {dispatch, rejectWithValue}) => {
    try{
      const resp = await fetch(`https://serene-ravine-72178.herokuapp.com/api/incomes/${payload.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  name: payload.name, category: payload.category, description: payload.description, money: payload.money, date: payload.date }),
      });
      if(!resp.ok) {
        throw new Error('Can\'t edit money. Server error!')
      }
      return await dispatch(getIncomeAsync()).payload
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteIncomeAsync = createAsyncThunk(
  'income/deleteIncomeAsync',
  async (payload, {dispatch, rejectWithValue}) => {
    try {
      const resp = await fetch(`https://serene-ravine-72178.herokuapp.com/api/incomes/${payload}`, {
        method: 'DELETE',
      });
      if(!resp.ok) {
        throw new Error('Can\'t delete money. Server error!')
      }
      return await dispatch(getIncomeAsync()).payload
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getChargeAsync = createAsyncThunk(
  'charge/getChargeAsync',
  async (_, {rejectWithValue}) => {
    try {
      const resp = await fetch('https://serene-ravine-72178.herokuapp.com/api/charges');
      if(!resp.ok) {
        throw new Error('Server error!')
      }
      return await resp.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addChargeAsync = createAsyncThunk(
  'charge/addChargeAsync',
  async (payload, {dispatch, rejectWithValue}) => {
    try {
      const resp = await fetch('https://serene-ravine-72178.herokuapp.com/api/charges', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  name: payload.name, category: payload.category, description: payload.description, money: payload.money, date: payload.date }),
      });
      if(!resp.ok) {
        throw new Error('Can\'t add money. Server error!')
      }
      return await dispatch(getChargeAsync()).payload
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editChargeAsync = createAsyncThunk(
  'charge/editChargeAsync',
  async (payload, {dispatch, rejectWithValue}) => {
    try {
      const resp = await fetch(`https://serene-ravine-72178.herokuapp.com/api/charges/${payload.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({  name: payload.name, category: payload.category, description: payload.description, money: payload.money, date: payload.date }),
      });
      if(!resp.ok) {
        throw new Error('Can\'t edit money. Server error!')
      }
      return await dispatch(getChargeAsync()).payload
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteChargeAsync = createAsyncThunk(
  'charge/deleteChargeAsync',
  async (payload, {dispatch, rejectWithValue}) => {
    try {
      const resp = await fetch(`https://serene-ravine-72178.herokuapp.com/api/charges/${payload}`, {
        method: 'DELETE',
      });
      if(!resp.ok) {
        throw new Error('Can\'t delete money. Server error!')
      }
      return await dispatch(getChargeAsync()).payload
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.isLoading = false;
  state.error = action.payload
};

const setLoading = (state) => {
  state.isLoading = true;
  state.error = null
};

const setFulfilled = (state) => {
  state.isLoading = false;
  state.error = null;
}

const moneySlice = createSlice({
  name: 'money',
  initialState,
  extraReducers: {
  
    [getIncomeAsync.pending]: setLoading,
    [addIncomeAsync.pending]: setLoading,
    [editIncomeAsync.pending]: setLoading,
    [deleteIncomeAsync.pending]: setLoading,
    [getChargeAsync.pending]: setLoading,
    [addChargeAsync.pending]: setLoading,
    [editChargeAsync.pending]: setLoading,
    [deleteChargeAsync.pending]: setLoading,
  
    [getIncomeAsync.rejected]: setError,
    [addIncomeAsync.rejected]: setError,
    [editIncomeAsync.rejected]: setError,
    [deleteIncomeAsync.rejected]: setError,
    [getChargeAsync.rejected]: setError,
    [addChargeAsync.rejected]: setError,
    [editChargeAsync.rejected]: setError,
    [deleteChargeAsync.rejected]: setError,
  
    [addIncomeAsync.fulfilled]: setFulfilled,
    [editIncomeAsync.fulfilled]: setFulfilled,
    [deleteIncomeAsync.fulfilled]: setFulfilled,
    [addChargeAsync.fulfilled]: setFulfilled,
    [editChargeAsync.fulfilled]: setFulfilled,
    [deleteChargeAsync.fulfilled]: setFulfilled,
    
    [getIncomeAsync.fulfilled]: (state, {payload}) => {
      state.isLoading = false;
      state.error = null;
      state.income = payload;
    },
  
    [getChargeAsync.fulfilled]: (state, {payload}) => {
      state.isLoading = false;
      state.error = null;
      state.charge = payload;
    },
  },
});

export default moneySlice.reducer;