import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CreateUserConfigaration } from '../components/createUserModal';
import { DeleteUserConfigaration } from '../components/deleteUserModal';
import { RootState } from './reducer';

export enum ModalType {
  DeleteUser = 'deleteUser',
  CreateUser = 'createUser',
}

interface DeleteUserModalConfigaration extends DeleteUserConfigaration {
  type: ModalType.DeleteUser;
}

interface CreateUserModalConfigaration extends CreateUserConfigaration {
  type: ModalType.CreateUser;
}

export type ModalConfiguarion =
  | DeleteUserModalConfigaration
  | CreateUserModalConfigaration;

export interface ModalState {
  configuration?: ModalConfiguarion;
}

const initialState: ModalState = {};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<ModalConfiguarion>) => {
      state.configuration = action.payload;
    },

    hideModal: () => initialState,
  },
});

export const { showModal, hideModal } = modalSlice.actions;

export const selectModalConfiguration = ({ modal }: RootState) =>
  modal.configuration;

export default modalSlice.reducer;
