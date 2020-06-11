import Modal from '@material-ui/core/Modal';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ModalProps } from '../../model';
import {
  hideModal,
  ModalConfiguration,
  ModalType,
  selectModalConfiguration,
} from '../../store/modalSlice';
import CreateUserModal from '../CreateUserModal';
import DeleteUserModal from '../DeleteUserModal';
import CreateEngagementModal from '../CreateEngagementModal';
import rootModalStyles from './rootModal.module.scss';

/* eslint-disable react/jsx-props-no-spreading */
const getModal = (modalState: ModalConfiguration, defaultProps: ModalProps) => {
  const modalType = modalState.type;

  switch (modalState.type) {
    case ModalType.DeleteUser: {
      const { type, ...rest } = modalState;
      return <DeleteUserModal {...rest} {...defaultProps} />;
    }
    case ModalType.CreateUser: {
      const { type, ...rest } = modalState;
      return <CreateUserModal {...rest} {...defaultProps} />;
    }
    case ModalType.CreateEngagement: {
      const { type, ...rest } = modalState;
      return <CreateEngagementModal {...rest} {...defaultProps} />;
    }
    default:
      throw new Error(`Unrecognized modal state '${modalType}'`);
  }
};

const ModalRoot = () => {
  const dispatch = useDispatch();

  const modalState = useSelector(selectModalConfiguration);
  if (!modalState?.type) {
    return null;
  }
  const closeModalFunction = () => dispatch(hideModal());

  return (
    <Modal open onClose={closeModalFunction}>
      <div className={rootModalStyles.content}>
        {getModal(modalState, { onClose: closeModalFunction })}
      </div>
    </Modal>
  );
};

export default ModalRoot;
