import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Case {
  id: string;
  name: string;
  price: number;
  defaultImage: string;
  sideViewImage: string;
  bandVariations: Record<string, string>; // Maps brandKey to case images
}

interface Band {
  id: string;
  name: string;
  price: number;
  defaultImage: string;
  sideViewImage: string;
  brandKey: string;
}

interface WatchState {
  selectedCase: Case;
  selectedBand: Band;
  size: { id: string; name: string; price: number };
  totalPrice: number;
  currentCaseImage: string;  
  currentSideViewImage: string; 
}

const initialCase: Case = {
  id: "aluminum_black",
  name: "Jet Black Aluminum",
  price: 329,
  defaultImage: "/images/cases/aluminum_black.png",
  sideViewImage: "/images/cases/side/aluminum_black_side.png",
  bandVariations: {
    nike: "/images/cases/aluminum_black_nike.png",
  },
};

const initialBand: Band = {
  id: "solo_black",
  name: "Black Solo Loop",
  price: 49,
  defaultImage: "/images/bands/solo_black.jpg",
  sideViewImage: "/images/bands/side/solo_black_side.png",
  brandKey: "default",
};

const initialState: WatchState = {
  selectedCase: initialCase,
  selectedBand: initialBand,
  size: { id: "46mm", name: "46mm", price: 100 },
  totalPrice: initialCase.price + initialBand.price + 100,
  currentCaseImage: initialCase.defaultImage,
  currentSideViewImage: initialCase.sideViewImage,  
};

const watchSlice = createSlice({
  name: "watch",
  initialState,
  reducers: {
    setCase(state, action: PayloadAction<Case>) {
      state.selectedCase = action.payload;
      state.totalPrice = state.selectedCase.price + state.selectedBand.price + state.size.price;

      // Dynamically update images
      const brandKey = state.selectedBand.brandKey;
      state.currentCaseImage = state.selectedCase.bandVariations[brandKey] || state.selectedCase.defaultImage;
      state.currentSideViewImage = `/images/cases/side/${state.selectedCase.id}_${brandKey}_${state.selectedBand.id}_side.png`;
    },
    setBand(state, action: PayloadAction<Band>) {
      state.selectedBand = action.payload;
      state.totalPrice = state.selectedCase.price + state.selectedBand.price + state.size.price;

      // Dynamically update images
      const brandKey = state.selectedBand.brandKey;
      state.currentCaseImage = state.selectedCase.bandVariations[brandKey] || state.selectedCase.defaultImage;
      state.currentSideViewImage = `/images/cases/side/${state.selectedCase.id}_${brandKey}_${state.selectedBand.id}_side.png`;
    },
    setSize(state, action: PayloadAction<{ id: string; name: string; price: number }>) {
      state.size = action.payload;
      state.totalPrice = state.selectedCase.price + state.selectedBand.price + state.size.price;
    },
  },
});

export const { setCase, setBand, setSize } = watchSlice.actions;

export default watchSlice.reducer;
