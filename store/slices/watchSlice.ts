import cases from "@/data/cases";
import { watchCollections } from "@/data/watchCollections";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Case {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface Band {
  id: string;
  name: string;
  price: number;
  defaultImage: string;
  brandKey: string;
}

interface WatchState {
  collection: string;
  selectedCase: Case;
  selectedBand: Band;
  selectedMainCase: { id: string; name: string };
  selectedMainBand: { id: string; name: string };
  size: { id: string; name: string; price: number };
  totalPrice: number;
  currentCaseImage: string;
  currentBandImage: string;
  currentSideViewImage: string;
  options: {
    name: string;
    sizes: { id: string; name: string; price: number }[];
  }[];
}

const initialCase: Case = {
  id: "aluminum_black",
  name: "Jet Black Aluminum Case",
  price: 359,
  image: "/images/cases/aluminum_black.png",
};

const initialBand: Band = {
  id: "solo_black",
  name: "Black Solo Loop",
  price: 49,
  defaultImage: "/images/bands/solo_black.jpg",
  brandKey: "default",
};

const initialSize = { id: "46mm", name: "46mm", price: 50 };

const initialState: WatchState = {
  collection: "APPLE WATCH SERIES 10",
  selectedCase: initialCase,
  selectedBand: initialBand,
  selectedMainCase: {
    id: "aluminum",
    name: "Aluminum",
  },
  selectedMainBand: { id: "solo_loop", name: "Solo Loop" },
  size: initialSize,
  totalPrice: initialCase.price + initialBand.price + initialSize.price,
  currentCaseImage: initialCase.image,
  currentBandImage: initialBand.defaultImage,
  currentSideViewImage: `/images/side/${initialCase.id}_${initialBand.id}_side.jpg`,
  options: watchCollections,
};

const watchSlice = createSlice({
  name: "watch",
  initialState,
  reducers: {
    setCase(
      state,
      action: PayloadAction<{
        subCase: Case;
        mainCase: { id: string; name: string };
      }>
    ) {
      state.selectedCase = action.payload.subCase;
      state.selectedMainCase = action.payload.mainCase;
      state.currentCaseImage = action.payload.subCase.image;

      // Dynamically update side view image
      state.currentSideViewImage = `/images/cases/side/${state.selectedCase.id}_${state.selectedBand.id}_side.png`;

      // Recalculate total price
      state.totalPrice =
        state.selectedCase.price + state.selectedBand.price + state.size.price;
    },

    setSelectedMainCase(
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) {
      // Find the main case
      const mainCase = cases.find((c) => c.id === action.payload.id);
      if (!mainCase) return;

      // Select the first variation of the main case
      const firstCase = mainCase.variations[0];
      if (!firstCase) return;

      state.selectedMainCase = action.payload;
      state.selectedCase = firstCase;
      state.currentCaseImage = firstCase.image;

      // Dynamically update side view image
      state.currentSideViewImage = `/images/cases/side/${firstCase.id}_${state.selectedBand.id}_side.png`;

      // Recalculate total price
      state.totalPrice =
        firstCase.price + state.selectedBand.price + state.size.price;
    },

    setBand(
      state,
      action: PayloadAction<{
        subBand: Band;
        mainBand: { id: string; name: string };
      }>
    ) {
      state.selectedBand = action.payload.subBand;
      state.selectedMainBand = action.payload.mainBand;

      // Dynamically update side view image
      state.currentSideViewImage = `/images/cases/side/${state.selectedCase.id}_${state.selectedBand.id}_side.png`;

      // Recalculate total price
      state.totalPrice =
        state.selectedCase.price + state.selectedBand.price + state.size.price;
    },

    setSelectedMainBand(
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) {
      state.selectedMainBand = action.payload;
    },

    setSize(
      state,
      action: PayloadAction<{ id: string; name: string; price: number }>
    ) {
      state.size = action.payload;
      state.totalPrice =
        state.selectedCase.price + state.selectedBand.price + state.size.price;
    },

    setCollection: (state, action) => {
      state.collection = action.payload;
    },
  },
});

export const {
  setCase,
  setBand,
  setSize,
  setSelectedMainCase,
  setSelectedMainBand,
} = watchSlice.actions;

export default watchSlice.reducer;
