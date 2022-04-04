import { configureStore } from '@reduxjs/toolkit';
import penggunaReducer from '../features/PenggunaSlice';
import userLoginSlice from '../features/userLoginSlice';
import FilterSlice from '../features/FilterSlice';

export const store = configureStore({
  reducer: { filter: FilterSlice, userLogin: userLoginSlice }
});
