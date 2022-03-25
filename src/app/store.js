import { configureStore } from '@reduxjs/toolkit';
import penggunaReducer from '../features/PenggunaSlice';
import FilterSlice from '../features/FilterSlice';

export const store = configureStore({
  reducer: { filter: FilterSlice }
});
