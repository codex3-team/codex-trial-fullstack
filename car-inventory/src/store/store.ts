import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import carSlice from './slices/carSlice'
import createCarModalSlice from './slices/createCarModalSlice'

export const store = configureStore({
  reducer: {
    carSlice,
    createCarModalSlice
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
