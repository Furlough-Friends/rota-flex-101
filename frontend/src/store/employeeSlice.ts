import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import toastr from 'toastr';

import { Employee } from '../model';
import { CreateEmployeeRequest } from '../model/api';
import { get, post, put } from '../services/apiService';
import { environment } from '../utils/environment';
import { AppThunk, RootState } from './reducer';

const { baseUrl } = environment;

const employeesAdapter = createEntityAdapter<Employee>({
  selectId: ({ id }) => id,
});

const EMPLOYEE_FETCH_URL = `${baseUrl}/staff/get`;
const EMPLOYEE_DELETE_URL = `${baseUrl}/staff/remove?id=`;
const EMPLOYEE_CREATE_URL = `${baseUrl}/staff/create`;

export const employeeSlice = createSlice({
  name: 'employee',
  initialState: employeesAdapter.getInitialState(),
  reducers: {
    set: (state, { payload }: PayloadAction<Employee[]>) => {
      employeesAdapter.setAll(state, payload);
    },
  },
});

const { set } = employeeSlice.actions;

export const fetchEmployee = (
  token: string | undefined
): AppThunk => dispatch =>
  get(EMPLOYEE_FETCH_URL, token)
    .then(response => response.json())
    .then(response => dispatch(set(response)))
    .catch(toastr.error);

export const createEmployee = (
  request: CreateEmployeeRequest,
  token: string | undefined
): AppThunk => () =>
  post(EMPLOYEE_CREATE_URL, token, request).catch(toastr.error);

export const deleteEmployee = (
  id: string,
  token: string | undefined
): AppThunk => dispatch =>
  put(EMPLOYEE_DELETE_URL + id, token)
    .then(response => response.json())
    .then(response => dispatch(set(response)))
    .catch(toastr.error);

const { selectAll } = employeesAdapter.getSelectors<RootState>(
  ({ employee }) => employee
);

export const selectEmployees = selectAll;

export default employeeSlice.reducer;
