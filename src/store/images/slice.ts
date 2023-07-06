import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ImageState } from "./types";
import { ImagesUriModel } from "../../dist/models/ImagesUriModel";

const initialState: ImageState = {
    images: [],
    loading: true,
    initialised: false
}

export const imagesSlice = createSlice({
    name: 'images',
    initialState,
    reducers:{
        setImages: (state, { payload }: PayloadAction<ImagesUriModel[]>) => {
            state.images = payload;
            state.loading = false;
            state.initialised = true;
        },
    }
})