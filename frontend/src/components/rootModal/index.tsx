import Modal from '@material-ui/core/Modal';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  hideModal,
  ModalState,
  ModalType,
  selectModalDetails,
} from '../../features/modalSlice';
import CreateUserModal from '../createUserModal';
import DeleteUserModal from '../deleteUserModal';
import rootModalSyles from './rootModal.module.scss';

type ModalHash = {
  [key in ModalType]: (arg0: any) => JSX.Element;
};

const MODAL_COMPONENTS: ModalHash = {
  DELETE_USER: DeleteUserModal,
  CREATE_USER: CreateUserModal,
};

const ModalRoot = () => {
  const dispatch = useDispatch();

  const { modalType, modalProps }: ModalState = useSelector(selectModalDetails);
  if (modalType === null) {
    return null;
  }

  const closeModalFunction = () => dispatch(hideModal());
  const SpecificModal = MODAL_COMPONENTS[modalType];
  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <Modal open onClose={closeModalFunction}>
      <div className={rootModalSyles.content}>
        <SpecificModal
          {...modalProps}
          closeModalFunction={closeModalFunction}
        />
      </div>
    </Modal>
  );
};

export default ModalRoot;
