import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isGreeting: true,
  isCollectionModel: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setIsGreeting: (state, action) => {
      state.isGreeting = action.payload;
    },
    setIsCollectionModel: (state, action) => {
      state.isCollectionModel = action.payload;
    },
  },
});

export const { setIsGreeting, setIsCollectionModel } = uiSlice.actions;
export default uiSlice.reducer;
