import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ChaptersState } from "./types";
import ChapterModel from "../../dist/models/ChapterModel";

const initialState: ChaptersState = {
    chapters: [],
    initialised: false,
    loading: false
}

export const chaptersSlice = createSlice({
    name: 'chapters',
    initialState,
    reducers:{
        setChapters: ((state, { payload }: PayloadAction<ChapterModel[]>) =>{
            state.chapters = payload;
            state.initialised = true;
        })
    }
})