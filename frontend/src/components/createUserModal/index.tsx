import 'toastr/build/toastr.min.css';

import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Clear from '@material-ui/icons/Clear';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useAuth0 } from '../../auth0Spa';
import { RoleType } from '../../model';
import { createEmployee } from '../../store/employeeSlice';
import { ModalProps } from '../rootModal/modalProps';
import createUserModalStyle from './createUserModal.module.scss';

export interface CreateUserConfigaration {}

type Props = CreateUserConfigaration & ModalProps;

interface TextField {
  id: string;
  name: string;
  type: string;
}

interface UserInfo {
  firstName: string;
  surname: string;
  jobTitle: string;
  email: string;
  role: RoleType.User;
  contractedHours: number;
  pay: number;
  [key: string]: any;
}

const textFields: TextField[] = [
  { id: 'firstName', name: 'First Name', type: 'text' },
  { id: 'surname', name: 'Surname', type: 'text' },
  { id: 'jobTitle', name: 'Job title', type: 'text' },
  { id: 'email', name: 'Email', type: 'text' },
  { id: 'contractedHours', name: 'Contracted hours', type: 'number' },
  { id: 'pay', name: 'Pay', type: 'number' },
];

const CreateUserModal = ({ onClose }: Props) => {
  const dispatch = useDispatch();
  const { getTokenSilently } = useAuth0();
  const [preferredDays, setPreferredDays] = useState<{
    [key: string]: boolean;
  }>({
    Mon: false,
    Tue: false,
    Wed: false,
    Thu: false,
    Fri: false,
    Sat: false,
    Sun: false,
  });

  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: '',
    surname: '',
    jobTitle: '',
    email: '',
    role: RoleType.User,
    contractedHours: 0,
    pay: 0,
  });

  const handlePreferredDaysChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPreferredDays({
      ...preferredDays,
      [event.target.name]: event.target.checked,
    });
  };

  const updateUserInfo = (userField: string, newValue: string | number) => {
    setUserInfo({
      ...userInfo,
      [userField]: newValue,
    });
  };

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const userField = event.target.name as string;
    const newValueString = event.target.value as string;
    const newValue =
      event.target.type === 'number'
        ? parseFloat(newValueString)
        : newValueString;

    updateUserInfo(userField, newValue);
  };

  const handleDropdownChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    const userField = event.target.name as string;
    const newValue = event.target.value as string | number;
    updateUserInfo(userField, newValue);
  };

  const handleCreateClick = async () => {
    const token = await getTokenSilently();
    const prefDaysString = Object.values(preferredDays)
      .map((preferred) => +preferred)
      .join('');
    dispatch(
      createEmployee(
        {
          ...userInfo,
          preferredDates: prefDaysString,
          startDate: new Date(),
        },
        token
      )
    );
    onClose();
  };

  return (
    <>
      <div className={createUserModalStyle.header}>
        <h4>Create</h4>
        <button
          type="button"
          aria-label="closeButton"
          className={createUserModalStyle.xButton}
          onClick={onClose}>
          <Clear />
        </button>
      </div>
      <hr />
      <div className={createUserModalStyle.form}>
        <div className={createUserModalStyle.formLeft}>
          {textFields.map((field) => (
            <span key={field.id} className={createUserModalStyle.field}>
              <TextField
                id="outlined-basic"
                label={field.name}
                variant="outlined"
                type={field.type}
                value={userInfo[field.id]}
                name={field.id}
                onChange={handleTextFieldChange}
              />
            </span>
          ))}
          <span className={createUserModalStyle.field}>
            <Select
              id="demo-simple-select-outlined"
              value={userInfo.role}
              name="user"
              onChange={handleDropdownChange}
              label="Role"
              variant="outlined">
              <MenuItem value={RoleType.User}>User</MenuItem>
              <MenuItem value={RoleType.Manager}>Manager</MenuItem>
            </Select>
          </span>
        </div>
        <div className={createUserModalStyle.formRight}>
          <FormGroup>
            <FormLabel component="legend">Preferred days</FormLabel>
            {Object.entries(preferredDays).map(([day, selected]) => (
              <FormControlLabel
                key={day}
                control={
                  <Checkbox
                    checked={selected}
                    onChange={handlePreferredDaysChange}
                    name={day}
                  />
                }
                label={day}
              />
            ))}
          </FormGroup>
        </div>
      </div>
      <div className={createUserModalStyle.buttons}>
        <Button variant="contained" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleCreateClick}
          color="secondary">
          CREATE
        </Button>
      </div>
    </>
  );
};

export default CreateUserModal;
