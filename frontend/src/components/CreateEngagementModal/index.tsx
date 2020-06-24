import 'toastr/build/toastr.min.css';

import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Clear from '@material-ui/icons/Clear';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Flatpickr from 'react-flatpickr';

import { ModalProps, Employee, Engagement } from '../../model';
import createUserModalStyle from './createEngagementModal.module.scss';
import { EngagementType } from '../../model/engagementType';
import {
  createEngagement,
  updateEngagement,
  deleteEngagement,
} from '../../store/engagementSlice';
import 'flatpickr/dist/themes/airbnb.css';
import { selectEmployees } from '../../store/employeeSlice';
import { hideModal } from '../../store/modalSlice';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CreateEngagementConfiguration {}
export interface EditEngagementConfiguration {
  engagement: Engagement;
}

export interface EngagementConfiguration {
  currentEngagement: Engagement;
  SubmitButton: ({ engagement }: { engagement: Engagement }) => JSX.Element;
}

type Props = ModalProps & EngagementConfiguration;
type CreateProps = ModalProps;
type EditProps = ModalProps & { engagement: Engagement };

const EngagementModal = ({
  onClose,
  currentEngagement: defaultEngagement,
  SubmitButton,
}: Props) => {
  const {
    id: defaultId,
    staffId: defaultEmployeeId,
    start: defaultStartTime,
    end: defaultEndTime,
    type: defaultEngagementType,
  } = defaultEngagement;
  const employeeList = useSelector(selectEmployees);
  const [employeeId, setEmployeeId] = useState<number>(defaultEmployeeId);
  const [startTime, setStartTime] = useState<Date>(defaultStartTime);
  const [endTime, setEndTime] = useState<Date>(defaultEndTime);
  const [engagementType, setEngagementType] = useState<EngagementType>(
    defaultEngagementType
  );
  const getEngagement = () => ({
    id: defaultId,
    staffId: employeeId,
    start: startTime,
    end: endTime,
    type: engagementType,
  });

  const handleEmployeeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setEmployeeId(event.target.value as number);
  };

  const handleEngagementTypeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setEngagementType(event.target.value as EngagementType);
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
            options={{
              inline: true,
              enableTime: true,
              time_24hr: true,
              defaultDate: defaultStartTime,
            }}
            onChange={(dates: Date[]) => setStartTime(dates[0])}
          />
        </div>
        <div>
          <Flatpickr
            options={{
              inline: true,
              enableTime: true,
              time_24hr: true,
              defaultDate: defaultEndTime,
              minDate: startTime,
            }}
            onChange={(dates: Date[]) => setEndTime(dates[0])}
          />
        </div>
      </div>
      <span className={createUserModalStyle.field}>
        <Select
          value={employeeId}
          defaultValue={employeeId}
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
        <SubmitButton engagement={getEngagement()} />
      </div>
    </>
  );
};

const CreateButton = ({ engagement }: { engagement: Engagement }) => {
  const dispatch = useDispatch();

  const handleCreateClick = async () => {
    dispatch(createEngagement(engagement));
    dispatch(hideModal());
  };
  return (
    <Button variant="contained" onClick={handleCreateClick} color="secondary">
      CREATE
    </Button>
  );
};

const EditButton = ({ engagement }: { engagement: Engagement }) => {
  const dispatch = useDispatch();

  const handleEditClick = async () => {
    dispatch(updateEngagement(engagement));
    dispatch(hideModal());
  };

  const handleDeleteClick = async () => {
    dispatch(deleteEngagement(engagement.id));
    dispatch(hideModal());
  };

  return (
    <>
      <Button variant="contained" onClick={handleEditClick} color="secondary">
        EDIT
      </Button>
      <Button variant="contained" onClick={handleDeleteClick} color="secondary">
        DELETE
      </Button>
    </>
  );
};

const defaultEngagement = {
  id: 0,
  staffId: 1,
  start: new Date(),
  end: new Date(),
  type: EngagementType.Shift,
};

const CreateEngagementModal = ({ onClose }: CreateProps) => (
  <EngagementModal
    onClose={onClose}
    SubmitButton={CreateButton}
    currentEngagement={defaultEngagement}
  />
);

export const EditEngagementModal = ({ onClose, engagement }: EditProps) => (
  <EngagementModal
    onClose={onClose}
    SubmitButton={EditButton}
    currentEngagement={engagement}
  />
);

export default CreateEngagementModal;
