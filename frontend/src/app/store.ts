import { configureStore, ThunkAction, Action, getDefaultMiddleware, Middleware, ReducersMapObject } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import logger from 'redux-logger';

const middleware: Middleware[] = [
    ...getDefaultMiddleware(),
    logger,
  ]

const reducer: ReducersMapObject = {
  counter: counterReducer,
}

export const store = configureStore({
  reducer,
  middleware
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
