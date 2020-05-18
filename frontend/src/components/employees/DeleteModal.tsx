import React from 'react';
import { useDispatch } from 'react-redux';
import toastr from 'toastr';

import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

import Clear from '@material-ui/icons/Clear';
import { StaffData } from '../../constants/employees';

import { deleteStaff } from '../../features/staffSlice';
import 'toastr/build/toastr.min.css';
import employeesStyle from './employees.module.scss';
import { useAuth0 } from '../../react-auth0-spa';

interface Props {
  isOpen: boolean;
  staff: StaffData;
  closeModalFunction: () => void;
}

const DeleteModal = ({ isOpen, staff, closeModalFunction }: Props) => {
  const dispatch = useDispatch();
  const { getTokenSilently } = useAuth0();
  const deleteUser = ({ id, firstName, surname }: StaffData) => async () => {
    const accessToken = await getTokenSilently();
    dispatch(deleteStaff(id.toString(), accessToken));
    closeModalFunction();
    new Audio('http://nooooooooooooooo.com/nooo.mp4').play();
    toastr.info(`User ${firstName} ${surname} deleted`);
  };

  return (
    <Modal open={isOpen} onClose={closeModalFunction}>
      <div className={employeesStyle.modalDeleteContent}>
        <div className={employeesStyle.modalDeleteHeader}>
          <h4>Delete</h4>
          <button
            type="button"
            aria-label="closeButton"
            className={employeesStyle.xButton}
            onClick={closeModalFunction}>
            <Clear />
          </button>
        </div>
        <hr />
        <span>
          Are you sure you want to delete {staff.firstName} {staff.surname}?
        </span>
        <div className={employeesStyle.modalDeleteButtons}>
          <Button variant="contained" onClick={closeModalFunction}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={deleteUser(staff)}>
            DELETE
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
