import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filter';
import phones from './slices/phones';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: { filter, phones },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
