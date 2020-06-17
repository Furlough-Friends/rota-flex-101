import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
  ActionCreatorWithPayload,
} from '@reduxjs/toolkit';
import toastr from 'toastr';

import { Employee } from '../model';
import { get, post, remove, put } from '../services/apiService';
import { environment } from '../utils/environment';
import { AppThunk, RootState } from './reducer';
import { getRole } from '../services/authService';
import { isManagerRole } from '../utils/role';

const { baseUrl } = environment;

const employeesAdapter = createEntityAdapter<Employee>({
  selectId: ({ id }) => id,
});

const EMPLOYEE_URL = `${baseUrl}/staff`;

export const employeeSlice = createSlice({
  name: 'employee',
  initialState: employeesAdapter.getInitialState(),
  reducers: {
    set: (state, { payload }: PayloadAction<Employee[]>) => {
      employeesAdapter.setAll(state, payload);
    },
    add: (state, { payload }: PayloadAction<Employee>) => {
      employeesAdapter.addOne(state, payload);
    },
  },
});

const { set, add } = employeeSlice.actions;

const updateFromPromise = <T>(
  requestPromise: Promise<Response>,
  dispatch: (payload: { payload: T; type: string }) => void,
  dispatchedFunction: ActionCreatorWithPayload<T, string>
) =>
  requestPromise
    .then(response => response.json())
    .then(response => dispatch(dispatchedFunction(response)))
    .catch(toastr.error);

export const fetchEmployee = (token?: string): AppThunk => async dispatch => {
  if (isManagerRole(await getRole(token))) {
    updateFromPromise(get(EMPLOYEE_URL, token), dispatch, set);
  }
};

export const createEmployee = (
  request: Employee,
  token?: string
): AppThunk => dispatch =>
  updateFromPromise(post(EMPLOYEE_URL, token, request), dispatch, add);

export const updateEmployee = (
  request: Employee,
  token?: string
): AppThunk => dispatch =>
  updateFromPromise(put(EMPLOYEE_URL, token, request), dispatch, set);

export const deleteEmployee = (
  id: string,
  token: string | undefined
): AppThunk => dispatch =>
  updateFromPromise(remove(`${EMPLOYEE_URL}/${id}`, token), dispatch, set);

const { selectAll } = employeesAdapter.getSelectors<RootState>(
  ({ employee }) => employee
);

export const selectEmployees = selectAll;

export default employeeSlice.reducer;
