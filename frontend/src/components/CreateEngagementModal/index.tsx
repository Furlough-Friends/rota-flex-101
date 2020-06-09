import 'toastr/build/toastr.min.css';

import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Clear from '@material-ui/icons/Clear';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Flatpickr from 'react-flatpickr';

import { useAuth0 } from '../../auth0Spa';
import { ModalProps, Employee } from '../../model';
import createUserModalStyle from './createEngagementModal.module.scss';
import { EngagementType } from '../../model/engagementType';
import { createEngagement } from '../../store/engagementSlice';
import 'flatpickr/dist/themes/airbnb.css';
import { selectEmployees } from '../../store/employeeSlice';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CreateUserConfiguration {}

const CreateEngagementModal = ({ onClose }: ModalProps) => {
  const dispatch = useDispatch();
  const { getTokenSilently } = useAuth0();
  const employeeList = useSelector(selectEmployees);
  const [employeeId, setEmployeeId] = useState<number>(0);
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [endTime, setEndTime] = useState<Date>(new Date());
  const [engagementType, setEngagementType] = useState<EngagementType>(
    EngagementType.Shift
  );

  const handleEmployeeChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    setEmployeeId(event.target.value as number);
  };

  const handleEngagementTypeChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>
  ) => {
    setEngagementType(event.target.value as EngagementType);
  };

  const handleCreateClick = async () => {
    const token = await getTokenSilently();
    dispatch(
      createEngagement(
        {
          staffId: employeeId,
          start: startTime,
          end: endTime,
          type: engagementType,
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
      <div className={createUserModalStyle.datepickers}>
        <div>
          <Flatpickr
            options={{ inline: true, enableTime: true, time_24hr: true }}
            onChange={(dates: Date[]) => setStartTime(dates[0])}
          />
        </div>
        <div>
          <Flatpickr
            options={{
              inline: true,
              enableTime: true,
              time_24hr: true,
              minDate: startTime,
            }}
            onChange={(dates: Date[]) => setEndTime(dates[0])}
          />
        </div>
      </div>
      <span className={createUserModalStyle.field}>
        <Select
          value={employeeId}
          name="employee-id"
          onChange={handleEmployeeChange}
          label="Employee"
          variant="outlined">
          {employeeList.map(({ id, firstName, surname }: Employee) => (
            <MenuItem value={id}>
              {firstName} {surname}
            </MenuItem>
          ))}
        </Select>
        <Select
          value={engagementType}
          name="engagement-type"
          onChange={handleEngagementTypeChange}
          label="Type"
          variant="outlined">
          {Object.entries(EngagementType).map(([key, value]) => (
            <MenuItem value={value}>{key}</MenuItem>
          ))}
        </Select>
      </span>
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

export default CreateEngagementModal;
