import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import toastr from 'toastr';
import {
  StaffData,
  CreateStaffData,
  STAFF_FETCH_URL,
  STAFF_DELETE_URL,
  STAFF_CREATE_URL,
} from '../constants/employees';
import { RootState, AppThunk } from '../app/store';
import { get, put, post } from '../service/apiService';

interface StaffState {
  value: StaffData[];
}

const initialState: StaffState = {
  value: [],
};

export const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    set: (state, action: PayloadAction<StaffData[]>) => {
      state.value = action.payload;
    },
  },
});

export const { set } = staffSlice.actions;

export const fetchStaff = (token: string | undefined): AppThunk => (dispatch) =>
  get(STAFF_FETCH_URL, token)
    .then((response) => response.json())
    .then((response) => dispatch(set(response)))
    .catch((err) => toastr.error(err));

export const createStaff = (staff: CreateStaffData, token: string | undefined): AppThunk => () =>
post(STAFF_CREATE_URL, token, staff)
.catch((err) => toastr.error(err));

export const deleteStaff = (
  id: string,
  token: string | undefined
): AppThunk => (dispatch) =>
  put(STAFF_DELETE_URL + id, token)
    .then((response) => response.json())
    .then((response) => dispatch(set(response)))
    .catch((err) => toastr.error(err));

export const selectStaff = (state: RootState) => state.staff.value;

export default staffSlice.reducer;
