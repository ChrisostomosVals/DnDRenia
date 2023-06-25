import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BannerMessages, BannerState, BannerType } from './types';
const initialState: BannerState = {
  banner: {
    title: "",
    paragraph: "",
    visible: false
  },
  loading: false,
  initialised: false,
};

export const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    initializeMainStats: (state, { payload }: PayloadAction<BannerType>) => {
      state.banner = payload;
      state.initialised = true;
    },
    changeText: (state, { payload }: PayloadAction<BannerMessages>) => {
      state.banner.title = payload.title;
      state.banner.paragraph = payload.paragraph;
    },
    toggle: (state, { payload }: PayloadAction<boolean>) => {
        state.banner.visible = payload;
    },
  },
});