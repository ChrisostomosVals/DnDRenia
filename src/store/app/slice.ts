import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppState } from "./type";

const initialState: AppState ={
    refreshing: false
}


export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers:{
        toggle: (state, { payload }: PayloadAction<boolean>) => {
            state.refreshing = payload;
        }
    }
})