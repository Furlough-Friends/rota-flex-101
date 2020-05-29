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

import { Role } from '../../constants/employees';
import { toDateStr } from '../../constants/global';
import { createStaff } from '../../features/staffSlice';
import { useAuth0 } from '../../react-auth0-spa';
import createUserModalStyle from './createUserModal.module.scss';

interface Props {
  closeModalFunction: () => void;
}

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
  role: Role.USER;
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

const CreateUserModal = ({ closeModalFunction }: Props) => {
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
    role: Role.USER,
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
      createStaff(
        {
          ...userInfo,
          preferredDates: prefDaysString,
          startDate: toDateStr(new Date()),
        },
        token
      )
    );
    closeModalFunction();
  };

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
      <div className={createUserModalStyle.form}>
        <div className={createUserModalStyle.formLeft}>
          {textFields.map((field) => (
            <span key={field.id} className={createUserModalStyle.field}>
              <TextField
                id="outlined-basic"
                label={field.name}
                variant="outlined"
                type={field.type}
                value={userInfo[field.id as string]}
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
              <MenuItem value={Role.USER}>User</MenuItem>
              <MenuItem value={Role.MANAGER}>Manager</MenuItem>
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
        <Button variant="contained" onClick={closeModalFunction}>
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
