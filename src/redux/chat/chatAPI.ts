// messages/sentiments/ChainGPT

import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';
import { GET_ALL_CHATS, GET_CHANNEL_WITH_MESSAGE, GET_CHAT_HISTORY } from '../../constants/apis';
import { API_ERROR_MSG } from '../../constants/constants';

interface ApiError {
  message: string
}

export const getChatChannelWithMessages = createAsyncThunk(
  "getChatChannelWithMessages",
  async (_params, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get(GET_CHANNEL_WITH_MESSAGE);

      return data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data as ApiError);
      }
      return rejectWithValue({ message: API_ERROR_MSG } as ApiError);
    }
  }
);

export const getChatHistory = createAsyncThunk(
  "getChatHistory",
  async (param: {sessionId: string}, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get(`${GET_CHAT_HISTORY}/${param.sessionId}`);

      return data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data as ApiError);
      }
      return rejectWithValue({ message: API_ERROR_MSG } as ApiError);
    }
  }
);

export const initiateChat = createAsyncThunk(
  "initiateChat",
  async (params: { chatId?: string, query: string, chatType?: string}, { rejectWithValue }) => {
    try {
      const { data } = await Axios.post(GET_ALL_CHATS, {
        ...params
      });

      return data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data as ApiError);
      }
      return rejectWithValue({ message: API_ERROR_MSG } as ApiError);
    }
  }
);

export const getAllChats = createAsyncThunk(
  "getAllChats",
  async (_params, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get(GET_ALL_CHATS);

      return data;
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data as ApiError);
      }
      return rejectWithValue({ message: API_ERROR_MSG } as ApiError);
    }
  }
);