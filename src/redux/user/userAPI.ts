import { AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../config/axios';
import { CONNECT_API_URL, EMAIL_VERIFY_API_URL, FORGOT_API_URL, GET_USER_URL, LOGIN_API_URL, RESET_PASSWORD_API_URL, SIGNUP_API_URL, TELEGRAM_FAV_URL, VERIFY_CODE_API_URL, VERIFY_OTP_API_URL } from '../../constants/apis';
import { API_ERROR_MSG } from '../../constants/constants';

interface ApiError {
  message: string
}

export const loginAPI = createAsyncThunk(
  'loginAPI',
  async (params: { email: string, password: string }, { rejectWithValue }) => {
    try {
      const response = await Axios.post(LOGIN_API_URL, {
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

export const signUpAPI = createAsyncThunk(
  'loginAPI',
  async (params: {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  }, { rejectWithValue }) => {
    try {
      const response = await Axios.post(SIGNUP_API_URL, {
        ...params
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

export const sendTelegramConnectCode = createAsyncThunk(
  'sendTelegramConnectCode',
  async (params: {phone_number: string}, { rejectWithValue }) => {
    try {
      const { data } = await Axios.post(CONNECT_API_URL, {
        ...params
      });
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

export const sendTelegramOtpSubmit = createAsyncThunk(
  'sendTelegramOtpSubmit',
  async (params: {phone_number: string, phone_code: string, phone_code_hash: string, twofa_password?: string }, { rejectWithValue }) => {
    try {
      const { data } = await Axios.post(VERIFY_CODE_API_URL, {
        ...params
      });
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

export const forgotPasswordAPI = createAsyncThunk(
  'forgotPasswordAPI',
  async (params: { email: string }, { rejectWithValue }) => {
    try {
      const { data } = await Axios.post(FORGOT_API_URL, {
        ...params,
      });
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

export const sendEmailVerificationCodeAPI = createAsyncThunk(
  'sendEmailVerificationCodeAPI',
  async (params: { email: string }, { rejectWithValue }) => {
    try {
      const { data } = await Axios.post(EMAIL_VERIFY_API_URL, {
        ...params,
      });
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

export const verifyEmailAPI = createAsyncThunk(
  'verifyEmailAPI',
  async (params: { email: string, otp: string, verifyEmail: boolean }, { rejectWithValue }) => {
    try {
      const { data } = await Axios.post(VERIFY_OTP_API_URL, {
        ...params,
      });
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

export const resetPasswordAPI = createAsyncThunk(
  'verifyEmailAPI',
  async (params: { email: string, otp: string, newPassword: string }, { rejectWithValue }) => {
    try {
      const { data } = await Axios.post(RESET_PASSWORD_API_URL, {
        ...params,
      });
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

export const getUserAPI = createAsyncThunk(
  'getUserAPI',
  async (_params, { rejectWithValue }) => {
    try {
      const { data } = await Axios.get(GET_USER_URL)
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

export const handleFavoriteChannel = createAsyncThunk(
  'handleFavoriteChannel',
  async (params: { selectedChannelId: string }, { rejectWithValue }) => {
    try {
      const { data } = await Axios.post(TELEGRAM_FAV_URL, {
        ...params,
      });
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