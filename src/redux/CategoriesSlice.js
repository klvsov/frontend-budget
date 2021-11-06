import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { BASE_URL } from '../utils/constants';
import { api, getSessionData } from '../utils/helpers';

const initialState = {
  isLoading: false,
  incomeCategories: [],
  chargeCategories: [],
  error: null,
};

export const getIncomeCategoriesAsync = createAsyncThunk(
  'incomeCategories/getIncomeCategoryAsync',
  async (payload, { rejectWithValue }) => {
    const { userId } = getSessionData();
    try {
      const resp = await api(
        `${BASE_URL}/api/income-categories?user=${userId}`
      );
      if (resp.statusText !== 'OK') {
        throw new Error('Server error!');
      }
      return resp;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addIncomeCategoriesAsync = createAsyncThunk(
  'incomeCategories/addIncomeCategoriesAsync',
  async (payload, { dispatch, rejectWithValue }) => {
    const { category, description } = payload;
    const { userId } = getSessionData();
    try {
      const resp = await api(`${BASE_URL}/api/income-categories`, {
        method: 'POST',
        data: { name: category, description, user: userId },
      });
      if (resp.statusText !== 'Created') {
        throw new Error("Can't add category. Server error!");
      }
      return await dispatch(getIncomeCategoriesAsync()).payload;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editIncomeCategoryAsync = createAsyncThunk(
  'incomeCategories/editIncomeCategoriesAsync',
  async (payload, { dispatch, rejectWithValue }) => {
    const { category, description, id } = payload;
    try {
      const resp = await api(`${BASE_URL}/api/income-categories/${id}`, {
        method: 'PUT',
        data: { name: category, description },
      });
      if (resp.statusText !== 'OK') {
        throw new Error("Can't edit category. Server error!");
      }
      return await dispatch(getIncomeCategoriesAsync()).payload;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteIncomeCategoryAsync = createAsyncThunk(
  'incomeCategories/deleteIncomeCategoriesAsync',
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const resp = await api(`${BASE_URL}/api/income-categories/${payload}`, {
        method: 'DELETE',
      });
      if (resp.statusText !== 'OK') {
        throw new Error("Can't delete category. Server error!");
      }
      return await dispatch(getIncomeCategoriesAsync()).payload;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getChargeCategoriesAsync = createAsyncThunk(
  'chargeCategories/getChargeCategoryAsync',
  async (payload, { rejectWithValue }) => {
    const { userId } = getSessionData();
    try {
      const resp = await api(
        `${BASE_URL}/api/charge-categories?user=${userId}`
      );
      if (resp.statusText !== 'OK') {
        throw new Error('Server error!');
      }
      return resp;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addChargeCategoriesAsync = createAsyncThunk(
  'chargeCategories/addChargeCategoriesAsync',
  async (payload, { dispatch, rejectWithValue }) => {
    const { category, description } = payload;
    const { userId } = getSessionData();
    try {
      const resp = await api(`${BASE_URL}/api/charge-categories`, {
        method: 'POST',
        data: { name: category, description, user: userId },
      });
      if (resp.statusText !== 'Created') {
        throw new Error("Can't add category. Server error!");
      }
      return await dispatch(getChargeCategoriesAsync()).payload;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const editChargeCategoryAsync = createAsyncThunk(
  'chargeCategories/editChargeCategoriesAsync',
  async (payload, { dispatch, rejectWithValue }) => {
    const { category, description, id } = payload;
    try {
      const resp = await api(`${BASE_URL}/api/charge-categories/${id}`, {
        method: 'PUT',
        data: { name: category, description },
      });
      if (resp.statusText !== 'OK') {
        throw new Error("Can't edit category. Server error!");
      }
      return await dispatch(getChargeCategoriesAsync()).payload;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteChargeCategoryAsync = createAsyncThunk(
  'chargeCategories/deleteChargeCategoriesAsync',
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const resp = await api(`${BASE_URL}/api/charge-categories/${payload}`, {
        method: 'DELETE',
      });
      if (resp.statusText !== 'OK') {
        throw new Error("Can't delete category. Server error!");
      }
      return await dispatch(getChargeCategoriesAsync()).payload;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const setError = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const setLoading = (state) => {
  state.isLoading = true;
  state.error = null;
};

const setFulfilled = (state) => {
  state.isLoading = false;
  state.error = null;
};

const CategoriesSlice = createSlice({
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

    [getIncomeCategoriesAsync.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.incomeCategories = payload.data;
    },

    [getChargeCategoriesAsync.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.chargeCategories = payload.data;
    },
  },
});

export default CategoriesSlice.reducer;
