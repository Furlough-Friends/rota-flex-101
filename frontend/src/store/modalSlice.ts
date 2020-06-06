import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CreateUserConfiguration } from '../components/CreateUserModal';
import { DeleteUserConfiguration } from '../components/DeleteUserModal';
import { RootState } from './reducer';

export enum ModalType {
  DeleteUser = 'deleteUser',
  CreateUser = 'createUser',
}

interface DeleteUserModalConfiguration extends DeleteUserConfiguration {
  type: ModalType.DeleteUser;
}

interface CreateUserModalConfiguration extends CreateUserConfiguration {
  type: ModalType.CreateUser;
}

export type ModalConfiguration =
  | DeleteUserModalConfiguration
  | CreateUserModalConfiguration;

export interface ModalState {
  configuration?: ModalConfiguration;
}

const initialState: ModalState = {};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<ModalConfiguration>) => {
      state.configuration = action.payload;
    },

    hideModal: () => initialState,
  },
});

export const { showModal, hideModal } = modalSlice.actions;

export const selectModalConfiguration = ({ modal }: RootState) =>
  modal.configuration;

export default modalSlice.reducer;
