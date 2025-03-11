import axios from 'axios';
import config from '../utility/config';
import { getAccessToken } from '../utility/session';
import handleAppEvents from '../utility/toast';
import { LOGIN_URL } from '../constants/urls';

const Axios = axios.create({
  baseURL: config.BASE_URL,
});

Axios.interceptors.request.use((axiosConfig) => {
  const token = getAccessToken();
  if (!axiosConfig.headers['Content-Type']) {
    axiosConfig.headers['Content-Type'] = 'application/json';
  }
  axiosConfig.headers.Authorization = token ? `Bearer ${token}` : undefined;
  return axiosConfig;
});

Axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response && error?.response?.status === 401) {
      handleAppEvents(error?.response?.data?.error, "error")
      localStorage.clear();
      window.location.href = LOGIN_URL
    }
    return Promise.reject(error);
  }
);

export default Axios;