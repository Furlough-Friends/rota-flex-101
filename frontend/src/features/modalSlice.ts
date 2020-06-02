import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../app/store';

export type ModalType = 'DELETE_USER' | 'CREATE_USER';

export interface ModalState {
  modalType: ModalType | null;
  modalProps?: Object;
}

const initialState: ModalState = {
  modalType: null,
  modalProps: {},
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    showModal: (state, action: PayloadAction<ModalState>) => {
      state.modalType = action.payload.modalType;
      state.modalProps = action.payload.modalProps
        ? action.payload.modalProps
        : {};
    },

    hideModal: (state) => {
      state.modalType = initialState.modalType;
      state.modalProps = initialState.modalProps;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;

export const selectModalDetails = (state: RootState) => state.modal;

export default modalSlice.reducer;
