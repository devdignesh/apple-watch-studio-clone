import { configureStore } from '@reduxjs/toolkit'; 
import watchReducer from './slices/watchSlice';
import buttonReducer from './slices/buttonSlice'
export const store = configureStore({
  reducer: {
    watch : watchReducer,
    button: buttonReducer

  },
});
