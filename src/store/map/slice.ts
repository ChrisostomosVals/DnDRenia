import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { MapState } from "./types";
import LocationModel from "../../dist/models/LocationModel";
import WorldObjectModel from "../../dist/models/WorldObjectModel";
import { LatLng } from "react-native-maps";

const initialState: MapState = {
    locations: [],
    worldObjects: [],
    type: false,
    marker: undefined,
    initialised: false,
    loading: false
}

export const mapSlice = createSlice(({
    name: 'map',
    initialState,
    reducers:{
        initializeMap: ((state, { payload }: PayloadAction<{locations: LocationModel[], worldObjects: WorldObjectModel[]}>) =>{
            state.locations = payload.locations;
            state.worldObjects = payload.worldObjects;
            state.initialised = true;
        }),
        toggleMarker: ((state, { payload}: PayloadAction<boolean>) => {
            state.type = payload;
        }),
        setMarker: ((state, { payload }: PayloadAction<LatLng | undefined>) =>{
            state.marker = payload;
        }),
        setLocations: (state, { payload }: PayloadAction<LocationModel[]>)=>{
            state.locations = payload;
        },
        addEvent: (state, { payload }: PayloadAction<{id: string, event: string}>) =>{
            const findLocation = state.locations.find(item => item.id === payload.id);
            if(findLocation)
                findLocation.events?.push(payload.event);
        },
        removeEvent: (state, { payload }: PayloadAction<{id: string, event: string}>) =>{
            const findLocation = state.locations.find(item => item.id === payload.id);
            if(findLocation)
                findLocation.events = findLocation.events?.filter(ev => ev !==  payload.event)!;
        },
        setWorldObjects: (state, { payload }: PayloadAction<WorldObjectModel[]>)=>{
            state.worldObjects = payload;
        },
    }
}))