import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isGreeting: true,
  isCollectionModel: false,
  isSideview:false
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
    setIsSideView: (state, action) => {
      state.isSideview = action.payload
    }
  },
});

export const { setIsGreeting, setIsCollectionModel,setIsSideView } = uiSlice.actions;
export default uiSlice.reducer;
