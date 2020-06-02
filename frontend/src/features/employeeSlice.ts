import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import toastr from 'toastr';

import { AppThunk, RootState } from '../app/store';
import { Employee } from '../model';
import { CreateEmployeeRequest } from '../model/api';
import { get, post, put } from '../services/apiService';

const { REACT_APP_BASE_URL } = process.env;

const employeesAdapter = createEntityAdapter<Employee>({
  sortComparer: (a, b) => a.id - b.id,
});

const EMPLOYEE_FETCH_URL = `${REACT_APP_BASE_URL}/staff/get`;
const EMPLOYEE_DELETE_URL = `${REACT_APP_BASE_URL}/staff/remove?id=`;
const EMPLOYEE_CREATE_URL = `${REACT_APP_BASE_URL}/staff/create`;

export const employeeSlice = createSlice({
  name: 'employee',
  initialState: employeesAdapter.getInitialState(),
  reducers: {
    set: (state, { payload }: PayloadAction<Employee[]>) => {
      employeesAdapter.setAll(state, payload);
    },
  },
});

export const { set } = employeeSlice.actions;

export const fetchEmployee = (token: string | undefined): AppThunk => (
  dispatch
) =>
  get(EMPLOYEE_FETCH_URL, token)
    .then((response) => response.json())
    .then((response) => dispatch(set(response)))
    .catch((err) => toastr.error(err));

export const createEmployee = (
  request: CreateEmployeeRequest,
  token: string | undefined
): AppThunk => () =>
  post(EMPLOYEE_CREATE_URL, token, request).catch((err) => toastr.error(err));

export const deleteEmployee = (
  id: string,
  token: string | undefined
): AppThunk => (dispatch) =>
  put(EMPLOYEE_DELETE_URL + id, token)
    .then((response) => response.json())
    .then((response) => dispatch(set(response)))
    .catch((err) => toastr.error(err));

const { selectAll } = employeesAdapter.getSelectors<RootState>(
  ({ employee }) => employee
);

export const selectEmployees = selectAll;

export default employeeSlice.reducer;
