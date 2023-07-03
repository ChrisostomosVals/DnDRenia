import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CharactersState } from "./types";
import CharacterModel from "../../dist/models/CharacterModel";
import RaceModel from "../../dist/models/RaceModel";
import ClassModel from "../../dist/models/ClassModel";

const initialState: CharactersState ={
    characters: [],
    classes: [],
    races: [],
    initialized: false,
    loading: true
}

export const charactersSlice = createSlice({
    name: 'characters',
    initialState,
    reducers:{
        initializeStates: (state, {payload}: PayloadAction<{characters: CharacterModel[], classes: ClassModel[], races: RaceModel[]}>) => {
            state.characters = payload.characters;
            state.classes = payload.classes;
            state.races = payload.races;
            state.initialized = true;
            state.loading = false;
        }
    }
})