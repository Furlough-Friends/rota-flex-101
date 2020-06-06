import {
  Action,
  configureStore,
  getDefaultMiddleware,
  Middleware,
  ThunkAction,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';

import { isProduction } from '../utils/environment';
import employeeReducer from './employeeSlice';
import engagementReducer from './engagementSlice';
import modalReducer from './modalSlice';

const middleware: Middleware[] = [...getDefaultMiddleware(), logger];

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
    engagement: engagementReducer,
    modal: modalReducer,
  },
  middleware,
  devTools: !isProduction(),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
