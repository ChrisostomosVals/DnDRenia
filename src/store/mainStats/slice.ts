import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MainStatState, MainStatType } from './types';
const initialState: MainStatState = {
  mainStats: [],
  loading: false,
  initialised: false,
};

export const mainStatSlice = createSlice({
  name: 'mainStats',
  initialState,
  reducers: {
    initializeMainStats: (state, { payload }: PayloadAction<MainStatType[]>) => {
      state.mainStats = payload;
      state.initialised = true;
    },
    changeScore: (state, { payload }: PayloadAction<MainStatType>) => {
      const item = state.mainStats.find((item) => item.name === payload.name);
      if (item) {
        item.value = payload.value;
      }
    },
    setStats: (state, { payload }: PayloadAction<MainStatType[]>) => {
      state.mainStats = payload;
    }
  },
});
