import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CalloutTexts, ModalState, ModalTexts } from './types';
const initialState: ModalState = {
    logoutModal: {
        title: '',
        subTitle: null,
        visible: false,
        animationType: 'fade'
    },
    calloutModal: {
        title: '',
        subTitle: null,
        visible: false,
        animationType: 'fade',
        events: []
    },
    locationModal: {
        title: 'Save Location',
        subTitle: null,
        visible: false,
        animationType: 'fade',
        date: 0,
        year: 0
    },
    worldObjectModal:{
        title: 'Save Location',
        subTitle: null,
        visible: false,
        animationType: 'fade',
    },
    chapterModal:{
        title: 'Save Chapter',
        subTitle: null,
        visible: false,
        animationType: 'fade',
        new: true,
        date: new Date()
    },
    loading: false,
    initialised: false,
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        initializeState: (state, { payload }: PayloadAction<ModalState>) => {
            state.logoutModal = payload.logoutModal;
            state.calloutModal = payload.calloutModal;
            state.locationModal = payload.locationModal;
            state.worldObjectModal = payload.worldObjectModal;
            state.initialised = true;
        },
        setLogoutText: (state, { payload }: PayloadAction<ModalTexts>) => {
            state.logoutModal.title = payload.title;
            state.logoutModal.subTitle = payload.subTitle;
        },
        setLogoutVisibility: (state, {payload}: PayloadAction<boolean>) => {
            state.logoutModal.visible = payload;
        },
        setCalloutContent: (state, { payload }: PayloadAction<CalloutTexts>) => {
            state.calloutModal.title = payload.title;
            state.calloutModal.subTitle = payload.subTitle;
            state.calloutModal.events = payload.events;
        },
        setCalloutVisibility: (state, {payload}: PayloadAction<boolean>) => {
            state.calloutModal.visible = payload;
        },
        setLocationVisibility: (state, {payload}: PayloadAction<boolean>) => {
            state.locationModal.visible = payload;
        },
        setWorldObjectVisibility: (state, {payload}: PayloadAction<boolean>) => {
            state.worldObjectModal.visible = payload;
        },
        setChapterVisibility: (state, {payload}: PayloadAction<boolean>) => {
            state.chapterModal.visible = payload;
        },
        setChapterContext: (state, {payload}: PayloadAction<{id: string, name: string, date: Date, story: string }>) => {
            state.chapterModal.id = payload.id;
            state.chapterModal.new = !!payload.id;
            state.chapterModal.name = payload.name;
            state.chapterModal.date = payload.date;
            state.chapterModal.story = payload.story;
        },
        setChapterTitle: (state, {payload}: PayloadAction<string>) => {
            state.chapterModal.title = payload;
        },
        resetChapterModal:(state) => {
            state.chapterModal.title = 'Save Chapter';
            state.chapterModal.id = undefined;
            state.chapterModal.new = false;
            state.chapterModal.name = undefined;
            state.chapterModal.date = new Date();
            state.chapterModal.story = undefined;
        }
    },
});
