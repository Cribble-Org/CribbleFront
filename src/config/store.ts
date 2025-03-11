import { configureStore } from '@reduxjs/toolkit';
import { dashboardReducer } from '../redux/dashboard/dashboardSlice';
import { userReducer } from '../redux/user/userSlice';
import { chatReducer } from '../redux/chat/chatSlice';

const store = configureStore({
  reducer: {
    dashboardData: dashboardReducer,
    userData: userReducer,
    chatData: chatReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
