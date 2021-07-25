import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  incomeCategories: [],
  chargeCategories: [],
  error: null
}

export const getIncomeCategoriesAsync = createAsyncThunk(
  'incomeCategories/getIncomeCategoryAsync',
  async (_, {rejectWithValue}) => {
    try {
      const resp = await fetch('https://serene-ravine-72178.herokuapp.com/api/income-categories');
      if(!resp.ok) {
        throw new Error('Server error!')
      }
      return await resp.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addIncomeCategoriesAsync = createAsyncThunk(
  'incomeCategories/addIncomeCategoriesAsync',
  async (payload, {dispatch, rejectWithValue}) => {
    try {
      const resp = await fetch('https://serene-ravine-72178.herokuapp.com/api/income-categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: payload.category, description: payload.description }),
      });
      if(!resp.ok) {
        throw new Error('Can\'t add category. Server error!')
      }
      return await dispatch(getIncomeCategoriesAsync()).payload
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editIncomeCategoryAsync = createAsyncThunk(
  'incomeCategories/editIncomeCategoriesAsync',
  async (payload, {dispatch, rejectWithValue}) => {
    try {
      const resp = await fetch(`https://serene-ravine-72178.herokuapp.com/api/income-categories/${payload.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: payload.category, description: payload.description }),
      });
      if(!resp.ok) {
        throw new Error('Can\'t edit category. Server error!')
      }
      return await dispatch(getIncomeCategoriesAsync()).payload;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteIncomeCategoryAsync = createAsyncThunk(
  'incomeCategories/deleteIncomeCategoriesAsync',
  async (payload, {dispatch, rejectWithValue}) => {
    try {
      const resp = await fetch(`https://serene-ravine-72178.herokuapp.com/api/income-categories/${payload}`, {
        method: 'DELETE',
      });
      if(!resp.ok) {
        throw new Error('Can\'t delete category. Server error!')
      }
      return await dispatch(getIncomeCategoriesAsync()).payload;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getChargeCategoriesAsync = createAsyncThunk(
  'chargeCategories/getChargeCategoryAsync',
  async (_, {rejectWithValue}) => {
    try {
      const resp = await fetch('https://serene-ravine-72178.herokuapp.com/api/charge-categories');
      if(!resp.ok) {
        throw new Error('Server error!')
      }
      return await resp.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addChargeCategoriesAsync = createAsyncThunk(
  'chargeCategories/addChargeCategoriesAsync',
  async (payload, {dispatch, rejectWithValue}) => {
    try {
      const resp = await fetch('https://serene-ravine-72178.herokuapp.com/api/charge-categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: payload.category, description: payload.description }),
      });
      if(!resp.ok) {
        throw new Error('Can\'t add category. Server error!')
      }
      return await dispatch(getChargeCategoriesAsync()).payload;
    } catch(error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editChargeCategoryAsync = createAsyncThunk(
  'chargeCategories/editChargeCategoriesAsync',
  async (payload, {dispatch, rejectWithValue}) => {
    try {
      const resp = await fetch(`https://serene-ravine-72178.herokuapp.com/api/charge-categories/${payload.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: payload.category, description: payload.description }),
      });
      if(!resp.ok) {
        throw new Error('Can\'t edit category. Server error!')
      }
      return await dispatch(getChargeCategoriesAsync()).payload;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteChargeCategoryAsync = createAsyncThunk(
  'chargeCategories/deleteChargeCategoriesAsync',
  async (payload, {dispatch, rejectWithValue}) => {
    try {
      const resp = await fetch(`https://serene-ravine-72178.herokuapp.com/api/charge-categories/${payload}`, {
        method: 'DELETE',
      });
      if(!resp.ok) {
        throw new Error('Can\'t delete category. Server error!')
      }
      return await dispatch(getChargeCategoriesAsync()).payload;
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

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  extraReducers: {
    [getIncomeCategoriesAsync.pending]: setLoading,
    [addIncomeCategoriesAsync.pending]: setLoading,
    [editIncomeCategoryAsync.pending]: setLoading,
    [deleteIncomeCategoryAsync.pending]: setLoading,
    [getChargeCategoriesAsync.pending]: setLoading,
    [addChargeCategoriesAsync.pending]: setLoading,
    [editChargeCategoryAsync.pending]: setLoading,
    [deleteChargeCategoryAsync.pending]: setLoading,
    
    [getIncomeCategoriesAsync.rejected]: setError,
    [addIncomeCategoriesAsync.rejected]: setError,
    [editIncomeCategoryAsync.rejected]: setError,
    [deleteIncomeCategoryAsync.rejected]: setError,
    [getChargeCategoriesAsync.rejected]: setError,
    [addChargeCategoriesAsync.rejected]: setError,
    [editChargeCategoryAsync.rejected]: setError,
    [deleteChargeCategoryAsync.rejected]: setError,
  
    [addIncomeCategoriesAsync.fulfilled]: setFulfilled,
    [editIncomeCategoryAsync.fulfilled]: setFulfilled,
    [deleteIncomeCategoryAsync.fulfilled]: setFulfilled,
    [addChargeCategoriesAsync.fulfilled]: setFulfilled,
    [editChargeCategoryAsync.fulfilled]: setFulfilled,
    [deleteChargeCategoryAsync.fulfilled]: setFulfilled,
    
    [getIncomeCategoriesAsync.fulfilled]: (state, {payload}) => {
      state.isLoading = false;
      state.error = null;
      state.incomeCategories = payload
    },
  
    [getChargeCategoriesAsync.fulfilled]: (state, {payload}) => {
      state.isLoading = false;
      state.error = null;
      state.chargeCategories = payload;
    },
  },
});

export default categoriesSlice.reducer;