import { configureStore } from '@reduxjs/toolkit'; 
import watchReducer from './slices/watchSlice';


export const store = configureStore({
  reducer: {
    watch : watchReducer
  },
});
