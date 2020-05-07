import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import DeleteUserModal from '../deleteUserModal';
import {
  ModalState,
  selectModalDetails,
  hideModal,
} from '../../features/modalSlice';

interface ModalHash {
  [key: string]: (arg0: any) => JSX.Element;
}

const MODAL_COMPONENTS: ModalHash = {
  DELETE_USER: DeleteUserModal,
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
    <SpecificModal {...modalProps} closeModalFunction={closeModalFunction} />
  );
};

export default ModalRoot;
