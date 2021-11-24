import { createSlice } from "@reduxjs/toolkit";

export const exampleSlice = createSlice({
  name: "example",
  initialState: {
    count1: 0,
    count2: 0,
  },
  reducers: {
    incrementCount1: (state) => {
      state.count1 += 1;
    },
    incrementCount2: (state) => {
      state.count2 += 1;
    },
  },
});

export const { incrementCount1, incrementCount2 } = exampleSlice.actions;
export const { reducer: exampleReducer } = exampleSlice;
