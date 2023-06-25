import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ModalState, ModalTexts } from './types';
const initialState: ModalState = {
    modal: {
        title: '',
        subTitle: null,
        visible: false
    },
    loading: false,
    initialised: false,
};

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        initializeAccount: (state, { payload }: PayloadAction<ModalState>) => {
            state.modal = payload.modal;
            state.initialised = true;
        },
        setText: (state, { payload }: PayloadAction<ModalTexts>) => {
            state.modal.title = payload.title;
            state.modal.subTitle = payload.subTitle;
        },
        setVisibility: (state, {payload}: PayloadAction<boolean>) => {
            state.modal.visible = payload;
        }
    },
});
