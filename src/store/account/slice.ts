import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccountState, Profile, Tokens } from './types';
import CharacterModel from '../../dist/models/CharacterModel';
const initialState: AccountState = {
    profile: null,
    tokens: {
        accessToken: null,
        expiresIn: 0,
        refreshToken: null,
        scope: null
    },
    character: {
        arsenal:[],
        classId: '',
        feats: [],
        gear: [],
        id: '',
        name: '',
        properties: [],
        raceId: '',
        skills: [],
        specialAbilities: [],
        stats: [],
        type: '',
        visible: false
    },
    loading: false,
    initialised: false,
};

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        initializeAccount: (state, { payload }: PayloadAction<AccountState>) => {
            state.profile = payload.profile;
            state.tokens = payload.tokens;
            state.character = payload.character;
            state.initialised = true;
        },
        storeTokens: (state, { payload }: PayloadAction<Tokens>) => {
            state.tokens = payload;
        },
        storeProfile: (state, { payload }: PayloadAction<Profile>) => {
            state.profile = payload;
        },
        storeAccessToken: (state, { payload }: PayloadAction<string>) => {
            state.tokens!.accessToken = payload;
        },
        removeTokens: (state) => {
            state.tokens = {
                accessToken: null,
                expiresIn: 0,
                refreshToken: null,
                scope: null
            }
        },
        setCharacter: (state, { payload }: PayloadAction<CharacterModel>) =>{
            state.character = payload;
        }
    },
});