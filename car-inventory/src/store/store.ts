import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import carSlice from './slices/carSlice'

export const store = configureStore({
  reducer: {
    carSlice
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
