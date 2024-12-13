import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ButtonState {
  openButton: string | null;
}

const initialState: ButtonState = {
  openButton: null,
};

const buttonSlice = createSlice({
  name: "button",
  initialState,
  reducers: {
    toggleButton(state, action: PayloadAction<string>) {
      state.openButton = state.openButton === action.payload ? null : action.payload;
    },
    resetButton(state) {
      state.openButton = null;
    },
  },
});

export const { toggleButton, resetButton } = buttonSlice.actions;
export default buttonSlice.reducer;
