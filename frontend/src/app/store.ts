import {
  Action,
  configureStore,
  getDefaultMiddleware,
  Middleware,
  ReducersMapObject,
  ThunkAction,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';

import employeeReducer from '../features/employeeSlice';
import engagementReducer from '../features/engagementSlice';
import modalReducer from '../features/modalSlice';

const middleware: Middleware[] = [...getDefaultMiddleware(), logger];

const reducer: ReducersMapObject = {
  employee: employeeReducer,
  modal: modalReducer,
  engagement: engagementReducer,
};

export const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production', // disable devtools in production
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
