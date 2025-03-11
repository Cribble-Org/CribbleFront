/* eslint-disable no-param-reassign */
import { createAction, createSlice } from '@reduxjs/toolkit';
import { getUserAPI } from './userAPI';
import { UserState } from '../../types/userTypes';

const initialState: UserState = {
  userData: null
};

export const revertAll = createAction('RESET_ALL');

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(revertAll, () => initialState);
    builder.addCase(getUserAPI.fulfilled, (state, action) => {
      if (action?.payload?.user) {
        state.userData = action.payload.user
      }
    })
  },
});

export const userReducer = userSlice.reducer;