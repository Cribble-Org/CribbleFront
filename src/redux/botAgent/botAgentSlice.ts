/* eslint-disable no-param-reassign */
import { createAction, createSlice } from '@reduxjs/toolkit';
import { BotAgentState } from '../../types/userTypes';
import { getBotDetailAPI, getBotListAPI } from './botAgentAPI';

const initialState: BotAgentState = {
  botAgentListData: [],
  botDetailData: null
};

export const revertAll = createAction('RESET_ALL');

const botAgentSlice = createSlice({
  name: 'botAgent',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
     builder.addCase(revertAll, () => initialState);
     builder.addCase(getBotListAPI.fulfilled, (state, action) => {
       if (action?.payload?.data) {
         state.botAgentListData = action.payload.data
       }
     });
     builder.addCase(getBotDetailAPI.fulfilled, (state, action) => {
      if (action?.payload?.data) {
        state.botDetailData = action.payload.data
      }
    })
   },
});

export const botAgentReducer = botAgentSlice.reducer;