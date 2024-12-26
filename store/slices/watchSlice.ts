import bands from "@/data/bands";
import cases from "@/data/cases";
import defaultValues from "@/data/default";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Case {
  id: string;
  name: string;
  price: number;
}

interface Band {
  id: string;
  name: string;
  price: number;
}

interface WatchState {
  collection: string;
  selectedCase: Case;
  selectedBand: Band;
  selectedMainCase: { id: string; name: string };
  selectedMainBand: { id: string; name: string };
  size: { id: number; name: string; price: number };
  totalPrice: number;
}

const initialCase: Case = {
  id: "jetblack",
  name: "Jet Black Aluminum Case",
  price: 359,
 
};

const initialBand: Band = {
  id: "black",
  name: "Black Solo Loop",
  price: 49,
};

const initialSize = { id: 46, name: "46mm", price: 50 };

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

      state.totalPrice =
        state.selectedCase.price + firstBand.price + state.size.price;
    },

    setSize(
      state,
      action: PayloadAction<{ id: number; name: string; price: number }>
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

        // Recalculate total price
        state.totalPrice =
          defaults.selectedCase.price +
          defaults.selectedBand.price +
          state.size.price;
      }
    },

    saveSideViewImage: (state) => {
      const sideViewImage =  `/images/sideview/side-${state.size.id}-${state.selectedMainCase.id}-${state.selectedCase.id}-${state.selectedMainBand.id}-${state.selectedBand.id}.jpg`;
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
