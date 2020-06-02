import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { parseISO } from 'date-fns';
import toastr from 'toastr';

import { AppThunk, RootState } from '../app/store';
import { Engagement } from '../model';
import { get } from '../services/apiService';

const { REACT_APP_BASE_URL } = process.env;

interface EngagementState {
  value: Engagement[];
}

const initialState: EngagementState = {
  value: [],
};

const engagementsFetchUrl = (start: Date, end: Date) =>
  `${REACT_APP_BASE_URL}/staff/shifts?start=${start.toISOString()}&end=${end.toISOString()}`;

export const engagementSlice = createSlice({
  name: 'engagement',
  initialState,
  reducers: {
    setEngagements: (state, action: PayloadAction<Engagement[]>) => {
      state.value = action.payload;
    },
  },
});

export const { setEngagements } = engagementSlice.actions;

const parseEngagement = (engagement: { start: string; end: string }) => ({
  ...engagement,
  start: parseISO(engagement.start),
  end: parseISO(engagement.end),
});

export const fetchEngagements = (
  start: Date,
  end: Date,
  token?: string
): AppThunk => (dispatch) =>
  get(engagementsFetchUrl(start, end), token)
    .then((response) => response.json())
    .then((response) => response.map(parseEngagement))
    .then((response) => dispatch(setEngagements(response)))
    .catch((err) => toastr.error(err));

export const selectEngagement = (state: RootState) => state.engagement.value;

export default engagementSlice.reducer;
