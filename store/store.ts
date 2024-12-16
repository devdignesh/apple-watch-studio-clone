import { configureStore } from "@reduxjs/toolkit";
import watchReducer from "./slices/watchSlice";
import buttonReducer from "./slices/buttonSlice";
import uiReducer from "./slices/uiSlice";

export const store = configureStore({
  reducer: {
    watch: watchReducer,
    button: buttonReducer,
    ui: uiReducer,
  },
});
