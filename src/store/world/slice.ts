import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ViewType, WorldState } from "./types";
const initialState: WorldState = {
    view: 'Locations',
    initialised: false,
    loading: false
}
export const worldSlice = createSlice({
    name: 'world',
    initialState,
    reducers: {
        initializeState: (state) => {
            state.initialised = true;
            state.loading = true;
            state.view = 'Locations';
        },
        changeView: (state, { payload }: PayloadAction<ViewType>) => {
            state.view = payload;
        }
    }
})