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
import { UserInfo } from '../../model/api';

import { useAuth0 } from '../../auth0Spa';
import { ModalProps, RoleType, Employee } from '../../model';
import { createEmployee, updateEmployee } from '../../store/employeeSlice';
import createUserModalStyle from './createUserModal.module.scss';
import { hideModal } from '../../store/modalSlice';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CreateUserConfiguration {}
export interface EditUserConfiguration {
  employee: Employee;
}
export interface UserConfiguration {
  currentEmployee: Employee;
  SubmitButton: (employee: Employee) => JSX.Element;
}

type Props = UserConfiguration & ModalProps;
type CreateProps = ModalProps;
type EditProps = ModalProps & { employee: Employee };

interface TextField {
  id: keyof UserInfo;
  name: string;
  type: string;
}

const textFields: TextField[] = [
  { id: 'firstName', name: 'First Name', type: 'text' },
  { id: 'surname', name: 'Surname', type: 'text' },
  { id: 'jobTitle', name: 'Job title', type: 'text' },
  { id: 'email', name: 'Email', type: 'text' },
  { id: 'contractedHours', name: 'Contracted hours', type: 'number' },
  { id: 'hourlyRate', name: 'Pay (£/hour)', type: 'number' },
];

const weekdayArray = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const defaultUserInfo: Employee = {
  id: 0,
  firstName: '',
  surname: '',
  jobTitle: '',
  email: '',
  role: RoleType.User,
  contractedHours: 0,
  hourlyRate: 0,
  startDate: new Date(),
  preferredDates: '0000000',
};

const UserModal = ({ onClose, currentEmployee, SubmitButton }: Props) => {
  const [userInfo, setUserInfo] = useState<Employee>(currentEmployee);

  const handlePreferredDaysChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const dayIndex = +event.target.name;
    const isChecked = +!event.target.value;
    const preferredDates =
      userInfo.preferredDates.slice(0, dayIndex) +
      isChecked +
      userInfo.preferredDates.slice(dayIndex + 1);
    setUserInfo({
      ...userInfo,
      preferredDates,
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
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const userField = event.target.name as string;
    const newValue = event.target.value as string | number;
    updateUserInfo(userField, newValue);
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
          {textFields.map(field => (
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
            {userInfo.preferredDates.split('').map((selected, idx) => (
              <FormControlLabel
                key={weekdayArray[idx]}
                control={
                  <Checkbox
                    checked={selected === '1'}
                    onChange={handlePreferredDaysChange}
                    name={idx.toString()}
                  />
                }
                label={weekdayArray[idx]}
              />
            ))}
          </FormGroup>
        </div>
      </div>
      <div className={createUserModalStyle.buttons}>
        <Button variant="contained" onClick={onClose}>
          Cancel
        </Button>
        {SubmitButton(userInfo)}
      </div>
    </>
  );
};

const CreateButton = (userInfo: Employee) => {
  const dispatch = useDispatch();
  const { getTokenSilently } = useAuth0();
  const handleCreateClick = async () => {
    const token = await getTokenSilently();
    dispatch(
      createEmployee(
        {
          ...userInfo,
          startDate: new Date(),
        },
        token
      )
    );
    dispatch(hideModal());
  };

  return (
    <Button variant="contained" onClick={handleCreateClick} color="secondary">
      CREATE
    </Button>
  );
};

const UpdateButton = (userInfo: Employee) => {
  const dispatch = useDispatch();
  const { getTokenSilently } = useAuth0();
  const handleCreateClick = async () => {
    const token = await getTokenSilently();
    dispatch(updateEmployee(userInfo, token));
    dispatch(hideModal());
  };

  return (
    <Button variant="contained" onClick={handleCreateClick} color="secondary">
      EDIT
    </Button>
  );
};
export const CreateUserModal = ({ onClose }: CreateProps) => (
  <UserModal
    onClose={onClose}
    currentEmployee={defaultUserInfo}
    SubmitButton={CreateButton}
  />
);

export const UpdateUserModal = ({ onClose, employee }: EditProps) => (
  <UserModal
    onClose={onClose}
    currentEmployee={{
      ...employee,
      preferredDates: employee.preferredDates || '0000000',
    }}
    SubmitButton={UpdateButton}
  />
);

export default CreateUserModal;
