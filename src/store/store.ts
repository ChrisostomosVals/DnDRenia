import { configureStore } from '@reduxjs/toolkit';
import { mainStatSlice } from './mainStats/slice';
import { skillSlice } from './skills/slice';
import { accountSlice } from './account/slice';
import { bannerSlice } from './banner/slice';
import { modalSlice } from './modal/slice';

export const store = configureStore({
  reducer: {
    mainStats: mainStatSlice.reducer,
    skills: skillSlice.reducer,
    account: accountSlice.reducer,
    banner: bannerSlice.reducer,
    modal: modalSlice.reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
