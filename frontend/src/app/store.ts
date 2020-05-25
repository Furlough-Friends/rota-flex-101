import {
  configureStore,
  ThunkAction,
  Action,
  getDefaultMiddleware,
  Middleware,
  ReducersMapObject,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import staffReducer from '../features/staffSlice';
import modalReducer from '../features/modalSlice';
import engagementReducer from '../features/engagementSlice';

const middleware: Middleware[] = [...getDefaultMiddleware(), logger];

const reducer: ReducersMapObject = {
  staff: staffReducer,
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
