import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';

export interface StaffData {
  id: number;
  firstName: string;
  surname: string;
  jobTitle: string;
  contractedHours: number;
}

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

export const fetchStaff = (token: string, url: string): AppThunk => (
  dispatch
) =>
  fetch(url, { headers: { Authorization: token } })
    .then((response) => response.json())
    .then((response) => dispatch(set(response)));

export const selectStaff = (state: RootState) => state.staff.value;

export default staffSlice.reducer;
