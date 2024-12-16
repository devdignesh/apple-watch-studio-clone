import bands from "@/data/bands";
import cases from "@/data/cases";
import defaultValues from "@/data/default";
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
  image: string;
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
}

const initialCase: Case = {
  id: "aluminum_black",
  name: "Jet Black Aluminum Case",
  price: 359,
  image: "/images/cases/aluminum_black_10.png",
};

const initialBand: Band = {
  id: "black_solo",
  name: "Black Solo Loop",
  price: 49,
  image: "/images/bands/solo_black_10.jpg",
};

const initialSize = { id: "46mm", name: "46mm", price: 50 };

const initialState: WatchState = {
  collection: "APPLE_WATCH_SERIES_10",
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
  currentBandImage: initialBand.image,
  currentSideViewImage: `/images/side/${initialCase.id}_${initialBand.id}_side.jpg`,
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
      state.currentSideViewImage = `/images/side/${state.selectedCase.id}_${state.selectedBand.id}_side.jpg`;

      // Recalculate total price
      state.totalPrice =
        state.selectedCase.price + state.selectedBand.price + state.size.price;
    },

    // When user change main case category from footer(Tab) so handle this event using setSelectedMainCase
    setSelectedMainCase(
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) {
      const collectionCases = cases.find(
        (col) => col.collectionId === state.collection
      );
      if (!collectionCases) return;

      const mainCase = collectionCases.case.find(
        (c) => c.id === action.payload.id
      );
      if (!mainCase) return;

      // Select the first variation of the main case
      const firstCase = mainCase.variations[0];
      if (!firstCase) return;

      state.selectedMainCase = action.payload;
      state.selectedCase = firstCase;
      state.currentCaseImage = firstCase.image;

      // Dynamically update side view image
      state.currentSideViewImage = `/images/side/${firstCase.id}_${state.selectedBand.id}_side.jpg`;

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
      state.currentBandImage = action.payload.subBand.image;

      // Dynamically update side view image
      state.currentSideViewImage = `/images/side/${state.selectedCase.id}_${state.selectedBand.id}_side.jpg`;

      // Recalculate total price
      state.totalPrice =
        state.selectedCase.price + state.selectedBand.price + state.size.price;
    },

    // When user change main band category from footer(Tab) so handle this event using setSelectedMainBand
    setSelectedMainBand(
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) {
      const collectionBands = bands.find(
        (col) => col.collectionId === state.collection
      );
      if (!collectionBands) return;

      const mainBand = collectionBands.band.find(
        (c) => c.id === action.payload.id
      );
      if (!mainBand) return;

      const firstBand = mainBand.variations[0];
      if (!firstBand) return;

      state.selectedMainBand = action.payload;
      state.selectedBand = firstBand;
      state.currentBandImage = firstBand.image;

      state.totalPrice =
        state.selectedCase.price + firstBand.price + state.size.price;
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

      const defaults =
        defaultValues[action.payload as keyof typeof defaultValues];
      if (defaults) {
        state.selectedCase = defaults.selectedCase;
        state.selectedMainCase = defaults.selectedMainCase;
        state.selectedBand = defaults.selectedBand;
        state.selectedMainBand = defaults.selectedMainBand;
        state.size = defaults.size;

        // Update dependent fields
        state.currentCaseImage = defaults.selectedCase.image;
        state.currentBandImage = defaults.selectedBand.image;
        state.currentSideViewImage = `/images/side/${defaults.selectedCase.id}_${defaults.selectedBand.id}_side.jpg`;

        // Recalculate total price
        state.totalPrice =
          defaults.selectedCase.price +
          defaults.selectedBand.price +
          state.size.price;
      }
    },

    saveSideViewImage: (state) => {
      const sideViewImage = state.currentSideViewImage;
      console.log("sideViewImage:",sideViewImage)
      const link = document.createElement("a");

      // Set the link's href to the image URL
      link.href = sideViewImage;

      link.download = `${state.selectedCase.id}_${state.selectedBand.id}_side.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
});

export const {
  setCase,
  setBand,
  setSize,
  setSelectedMainCase,
  setSelectedMainBand,
  setCollection,
  saveSideViewImage,
} = watchSlice.actions;

export default watchSlice.reducer;
