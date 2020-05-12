import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import toastr from 'toastr';

import Button from '@material-ui/core/Button';

import Clear from '@material-ui/icons/Clear';

import 'toastr/build/toastr.min.css';
import createUserModalStyle from './createUserModal.module.scss';

interface Props {
  closeModalFunction: () => void;
}

interface TextField {
  id: string;
  name: string;
  type: string;
}

type dropdownEvent = React.ChangeEvent<{ name?: string | undefined; value: unknown; }>;
type textEvent = React.ChangeEvent<HTMLInputElement>;

const textFields: TextField[] = [
  { id: 'firstName', name: 'First Name', type: 'text' },
  { id: 'surname', name: 'Surname', type: 'text' },
  { id: 'jobTitle', name: 'Job title', type: 'text' },
  { id: 'contractedHours', name: 'Contracted hours', type: 'number' },
  { id: 'pay', name: 'Pay', type: 'number' },
];

const CreateUserModal = ({ closeModalFunction }: Props) => {
  const dispatch = useDispatch();
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

  const [userInfo, setUserInfo] = useState<{ [key: string]: string }>({
    firstName: '',
    surname: '',
    jobTitle: '',
    role: 'user',
    contractedHours: '',
    pay: '',
  });

  const handlePreferredDaysChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPreferredDays({
      ...preferredDays,
      [event.target.name]: event.target.checked,
    });
  };

  const handleUserInfoChange = (event: dropdownEvent | textEvent, child: React.ReactNode = null) => {
    const userField = event.target.name as string;
    const newValue = event.target.value as string;
    setUserInfo({
      ...userInfo,
      [userField]: newValue,
    });
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
                value={userInfo[field.id]}
                name={field.id}
                onChange={handleUserInfoChange}
              />
            </span>
          ))}
          <span className={createUserModalStyle.field}>
            <Select
              id="demo-simple-select-outlined"
              value={userInfo.role}
              name="user"
              onChange={handleUserInfoChange}
              label="Role"
              variant="outlined"
              >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="manager">Manager</MenuItem>
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
        <Button variant="contained" color="secondary">
          CREATE
        </Button>
      </div>
    </>
  );
};

export default CreateUserModal;
