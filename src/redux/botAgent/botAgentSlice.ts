/* eslint-disable no-param-reassign */
import { createAction, createSlice } from '@reduxjs/toolkit';
import { BotAgentState } from '../../types/userTypes';
import { getBotListAPI } from './botAgentAPI';

const initialState: BotAgentState = {
  botAgentListData: []
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
     })
   },
});

export const botAgentReducer = botAgentSlice.reducer;