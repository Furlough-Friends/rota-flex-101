import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  StaffData,
  STAFF_FETCH_URL,
  STAFF_DELETE_URL,
} from '../constants/employees';
import { getAuthenticationToken } from '../constants/global';
import { RootState, AppThunk } from '../app/store';

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

const fetchWithAuth = (
  url: string,
  method: string,
  getToken: () => string
): AppThunk => (dispatch) =>
  fetch(url, { method, headers: { Authorization: getToken() } })
    .then((response) => response.json())
    .then((response) => dispatch(set(response)));

export const fetchStaff = fetchWithAuth(
  STAFF_FETCH_URL,
  'GET',
  getAuthenticationToken
);
export const deleteStaff = (id: string) =>
  fetchWithAuth(STAFF_DELETE_URL + id, 'PUT', getAuthenticationToken);

export const selectStaff = (state: RootState) => state.staff.value;

export default staffSlice.reducer;

// const myUrlWithParams = new URL(STAFF_CREATE_URL);

// console.log(
//   JSON.stringify({
//     firstName: 'a',
//     surname: 'a',
//     ROLE: 'USER',
//   })
// );

// myUrlWithParams.searchParams.append(
//   'staffDto',
//   JSON.stringify({
//     firstName: 'a',
//     surname: 'a',
//     ROLE: 'USER',
//   })
// );

// console.log(myUrlWithParams.href);
