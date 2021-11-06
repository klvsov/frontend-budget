import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from "axios";

import {BASE_URL} from "../utils/constants";

const initialState = {
  user: null,
  isLoading: false,
  error: null
}

export const registerAsync = createAsyncThunk(
  'auth/registerAsync',
  async (payload, {rejectWithValue}) => {
    const {name, email, password} = payload
    try {
      const resp = await axios(`${BASE_URL}/api/register`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        data: {name, email, password},
      });
      if (resp.status !== 200) {
        throw new Error('Server error!')
      }
      return resp;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async (payload, {rejectWithValue}) => {
    const {email, password} = payload;
    try {
      const resp = await axios(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        data: {email, password},
      });
      if (resp.status !== 200) {
        throw new Error('Server error!')
      }
      const {token, id} = resp.data;
      if (token && id) {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("id", id);
      }
      return resp;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const googleLoginAsync = createAsyncThunk(
  'auth/googleLoginAsync',
  async (payload, {rejectWithValue}) => {
    const {email} = payload;
    try {
      const resp = await axios(`${BASE_URL}/api/google`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        data: {email},
      });
      if (resp.status !== 200) {
        throw new Error('Server error!')
      }
      const {token, id} = resp.data;
      if (token && id) {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("id", id);
      }
      return resp;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logoutAsync = createAsyncThunk(
  'auth/logoutAsync',
  () => {}
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

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [registerAsync.pending]: setLoading,
    [loginAsync.pending]: setLoading,
    [googleLoginAsync.pending]: setLoading,
    
    [registerAsync.rejected]: setError,
    [loginAsync.rejected]: setError,
    [googleLoginAsync.rejected]: setError,
    
    [registerAsync.fulfilled]: setFulfilled,
    [loginAsync.fulfilled]: setFulfilled,
    [googleLoginAsync.fulfilled]: setFulfilled,
    [logoutAsync.fulfilled]: setFulfilled,
    
    [registerAsync.fulfilled]: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    
    [loginAsync.fulfilled]: (state, {payload}) => {
      state.isLoading = false;
      state.error = null;
      state.user = payload?.data;
    },
  
    [googleLoginAsync.fulfilled]: (state, {payload}) => {
      state.isLoading = false;
      state.error = null;
      state.user = payload?.data;
    },
  
    [logoutAsync.fulfilled]: (state) => {
      state.isLoading = false;
      state.error = null;
      state.user = null;
    },
  },
});

export default AuthSlice.reducer;