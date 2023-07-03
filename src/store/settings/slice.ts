import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SettingsState } from "./types";
const initialState: SettingsState = {
    url: '',
    loading: true,
    initialised: false,
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers:{
        setUrl: (state, { payload }: PayloadAction<string>) =>{
            state.url = payload;
            state.initialised = true;
            state.loading = false;
        }
    }
})