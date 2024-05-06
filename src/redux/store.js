import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
import todoReducer from './todoSlice';
import authReducer from './authSlice';

const store = configureStore({
  reducer: {
    todo: todoReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;