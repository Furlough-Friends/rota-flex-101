import React from 'react';
import { useDispatch } from 'react-redux';
import toastr from 'toastr';

import Button from '@material-ui/core/Button';

import Clear from '@material-ui/icons/Clear';

import 'toastr/build/toastr.min.css';
import createUserModalStyle from './createUserModal.module.scss';

interface Props {
  closeModalFunction: () => void;
}

const CreateUserModal = ({ closeModalFunction }: Props) => {
  const dispatch = useDispatch();

  return (
    <>
      <div className={createUserModalStyle.header}>
        <h4>Create</h4>
        <button
          type="button"
          aria-label="closeButton"
          className={createUserModalStyle.xButton}
          onClick={closeModalFunction}>
          <Clear />
        </button>
      </div>
      <hr />
      <span>
      </span>
      <div className={createUserModalStyle.buttons}>
        <Button variant="contained" onClick={closeModalFunction}>
          Cancel
        </Button>
        <Button variant="contained" color="secondary">
          CREATE
        </Button>
      </div>
    </>
  );
};

export default CreateUserModal;
