import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

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
  value: []
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

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
/*
export const incrementAsync = (amount: number): AppThunk => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};
*/

export const selectStaff = (state: RootState) => state.staff.value;


export default staffSlice.reducer;
