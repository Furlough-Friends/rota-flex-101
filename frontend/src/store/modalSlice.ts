import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  CreateUserConfiguration,
  EditUserConfiguration,
} from '../components/CreateUserModal';
import { DeleteUserConfiguration } from '../components/DeleteUserModal';
import { RootState } from './reducer';
import {
  CreateEngagementConfiguration,
  EditEngagementConfiguration,
} from '../components/CreateEngagementModal';

export enum ModalType {
  DeleteUser = 'deleteUser',
  EditUser = 'editUser',
  CreateUser = 'createUser',
  CreateEngagement = 'createEngagement',
  EditEngagement = 'editEngagement',
}

interface DeleteUserModalConfiguration extends DeleteUserConfiguration {
  type: ModalType.DeleteUser;
}

interface CreateUserModalConfiguration extends CreateUserConfiguration {
  type: ModalType.CreateUser;
}

interface CreateEngagementModalConfiguration
  extends CreateEngagementConfiguration {
  type: ModalType.CreateEngagement;
}

interface EditEngagementModalConfiguration extends EditEngagementConfiguration {
  type: ModalType.EditEngagement;
}

interface EditUserModalConfiguration extends EditUserConfiguration {
  type: ModalType.EditUser;
}

export type ModalConfiguration =
  | DeleteUserModalConfiguration
  | CreateUserModalConfiguration
  | EditUserModalConfiguration
  | CreateEngagementModalConfiguration
  | EditEngagementModalConfiguration;

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
