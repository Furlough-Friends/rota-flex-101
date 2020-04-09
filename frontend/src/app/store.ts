import { configureStore, ThunkAction, Action, getDefaultMiddleware, Middleware, ReducersMapObject } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import logger from 'redux-logger';

const middleware: Middleware[] = [
    ...getDefaultMiddleware(), // default middleware for redux toolkit contains redux-thunk
    logger,
  ]

const reducer: ReducersMapObject = {
  counter: counterReducer,
}

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
