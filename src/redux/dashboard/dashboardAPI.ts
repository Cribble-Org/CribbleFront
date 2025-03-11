// messages/sentiments/ChainGPT

import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';
import { AxiosError } from 'axios';
import { SentimentsAPIFilters, ChannelsList } from '../../types/dashboardTypes';
import { getDefaultDates, getQueryParams } from '../../lib/utils';
import { ACTIVENESS_URL, GET_CHANNELS_URL, GET_DB_CHANNELS_URL, GET_SAVE_CHANNELS_URL, SAVE_CHANNELS_URL, SENTIMENTS_URL } from '../../constants/apis';
import { API_ERROR_MSG } from '../../constants/constants';

interface ApiError {
  message: string
}

export const getDashboardTableData = createAsyncThunk(
  "getDashboardTableData",
  async (params: SentimentsAPIFilters | undefined, { rejectWithValue }) => {
    try {
      if (!params) {
        const { sevenDaysEarlier, previousDate } = getDefaultDates();

        params = {
          startDate: sevenDaysEarlier,
          endDate: previousDate,
        };
      }
      const { data } = await Axios.get(SENTIMENTS_URL, {
        params: getQueryParams(params),
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

export const getActivenessAPI = createAsyncThunk(
  "getActivenessAPI",
  async (params: SentimentsAPIFilters | undefined, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get(ACTIVENESS_URL, {
        params: getQueryParams(params),
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

export const getChannels = createAsyncThunk<
  { data: ChannelsList[] },
  void,
  { rejectValue: ApiError }
>(
  'getChannels',
  async (_params, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get(GET_CHANNELS_URL);
      return data;
    }
    catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          // Return the error response as the payload
          return rejectWithValue(error.response.data as ApiError);
        }
      }
      // Handle unexpected errors
      return rejectWithValue({ message: API_ERROR_MSG });
    }
  }
);

export const getDBChannels = createAsyncThunk<
  { data: ChannelsList[] },
  void,
  { rejectValue: ApiError }
>(
  'getDBChannels',
  async (_params, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get(GET_DB_CHANNELS_URL);
      return data;
    }
    catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          // Return the error response as the payload
          return rejectWithValue(error.response.data as ApiError);
        }
      }
      // Handle unexpected errors
      return rejectWithValue({ message: API_ERROR_MSG });
    }
  }
);

export const saveChannelsAPI = createAsyncThunk(
  'saveChannelsAPI',
  async (params: string[], { rejectWithValue }) => {
    try {
      const { data } = await Axios.post(SAVE_CHANNELS_URL, { selectedChannelIds: params });
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

export const getSelectedChannelsAPI = createAsyncThunk(
  'getSelectedChannelsAPI',
  async (_params, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get(GET_SAVE_CHANNELS_URL);
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

