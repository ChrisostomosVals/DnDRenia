import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ImageState } from "./types";
import { ImagesUriModel } from "../../dist/models/ImagesUriModel";
import { ImageInfoModel } from "../../dist/models/ImageInfoModel";

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
        updateImages: (state, { payload }: PayloadAction<ImagesUriModel>) => {
            const { id, images } = payload;
            const imagesUriModel = state.images.find(img => img.id === id);
            if (imagesUriModel)
                imagesUriModel.images = images;
        },
        removeImage: (state, { payload }: PayloadAction<{id: string, path: string}>) => {
            const { id, path } = payload;
            const imagesUriModel = state.images.find(img => img.id === id);
            if (imagesUriModel)
                imagesUriModel.images = imagesUriModel.images.filter(img => img.path !== path);
        },
    }
})