import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';
import { ADD_BOT_API_URL, GET_BOTS_LIST_API } from '../../constants/apis';
import { API_ERROR_MSG } from '../../constants/constants';

interface ApiError {
  message: string
}

export const addBotAPI = createAsyncThunk(
  'addBotAPI',
  async (params: { botToken: string}, { rejectWithValue }) => {
    try {
      const response = await Axios.post(ADD_BOT_API_URL, {
        ...params,
      })
      return response?.data
    }
    catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data as ApiError);
      }
      return rejectWithValue({ message: API_ERROR_MSG } as ApiError);
    }
  }
)

export const getBotListAPI = createAsyncThunk(
  'getBotListAPI',
  async (_params, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get(GET_BOTS_LIST_API)
      return data;
    }
    catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data as ApiError);
      }
      return rejectWithValue({ message: API_ERROR_MSG } as ApiError);
    }
  }
);

export const getBotDetailAPI = createAsyncThunk(
  'getBotDetailAPI',
  async (params: { bot_id: string}, { rejectWithValue }) => {
    try {      
      const { data } = await Axios.get(`${GET_BOTS_LIST_API}/${params.bot_id}`)
      return data;
    }
    catch (error) {
      if (error instanceof AxiosError && error.response) {
        return rejectWithValue(error.response.data as ApiError);
      }
      return rejectWithValue({ message: API_ERROR_MSG } as ApiError);
    }
  }
);

