import { createSlice } from '@reduxjs/toolkit';
import { getAllChats, getChatChannelWithMessages, initiateChat } from './chatAPI';
import { ChatState } from '../../types/chatTypes';
import { ChannelsList } from '../../types/dashboardTypes';

const initialState: ChatState = {
  chatList: [],
  chatHistory: []
};

const chatSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getChatChannelWithMessages.fulfilled, (state, action) => {
      if (action.payload.data) {
        const filteredList = action.payload.data.filter((channel: ChannelsList) => { return channel?.type === "community" })

        state.chatList = filteredList
      }
    })
    builder.addCase(getAllChats.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.chatHistory = action.payload.data
      }
    })
    builder.addCase(initiateChat.fulfilled, (state, action) => {
      if (action.payload.success && action.payload?.data.newChannel ) {
        const newChat = action.payload?.data
        state.chatHistory = [
          {...newChat, _id: newChat.chatId},
          ...state.chatHistory,
        ]
      }
    })
  },
});

export const chatReducer = chatSlice.reducer;