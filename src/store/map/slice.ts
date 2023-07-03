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
        removeLocation: (state, { payload }: PayloadAction<string>)=>{
            state.locations = state.locations.filter(location => location.id !== payload);
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
        updateObject:(state, { payload }: PayloadAction<WorldObjectModel>)=>{
            state.worldObjects = state.worldObjects.map(item => {
                if(item.id === payload.id)
                    return payload;
                return item;
            });
        },
        removeObject: (state, { payload }: PayloadAction<string>)=>{
            state.worldObjects = state.worldObjects.filter(worldObject => worldObject.id !== payload);
        },
    }
}))