import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import toastr from 'toastr';

import { AppThunk, RootState } from '../app/store';
import { Staff } from '../model';
import { CreateStaffRequest } from '../model/api';
import { get, post, put } from '../services/apiService';

const { REACT_APP_BASE_URL } = process.env;

interface StaffState {
  value: Staff[];
}

const initialState: StaffState = {
  value: [],
};

const STAFF_FETCH_URL = `${REACT_APP_BASE_URL}/staff/get`;
const STAFF_DELETE_URL = `${REACT_APP_BASE_URL}/staff/remove?id=`;
const STAFF_CREATE_URL = `${REACT_APP_BASE_URL}/staff/create`;

export const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    set: (state, action: PayloadAction<Staff[]>) => {
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

export const createStaff = (
  staff: CreateStaffRequest,
  token: string | undefined
): AppThunk => () =>
  post(STAFF_CREATE_URL, token, staff).catch((err) => toastr.error(err));

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
