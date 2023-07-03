import { configureStore } from '@reduxjs/toolkit';
import { accountSlice } from './account/slice';
import { bannerSlice } from './banner/slice';
import { modalSlice } from './modal/slice';
import { settingsSlice } from './settings/slice';
import { chaptersSlice } from './chapters/slice';
import { mapSlice } from './map/slice';

export const store = configureStore({
  reducer: {
    account: accountSlice.reducer,
    banner: bannerSlice.reducer,
    modal: modalSlice.reducer,
    settings: settingsSlice.reducer,
    chapters: chaptersSlice.reducer,
    map: mapSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
});

export type RootState = ReturnType<typeof store.getState>;
