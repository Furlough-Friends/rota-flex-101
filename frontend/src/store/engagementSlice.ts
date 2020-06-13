import {
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import toastr from 'toastr';

import { Engagement } from '../model';
import { get, post } from '../services/apiService';
import { toDate } from '../utils/date';
import { environment } from '../utils/environment';
import { AppThunk, RootState } from './reducer';
import { getRole } from '../services/authService';
import { isManagerRole } from '../utils/role';

const { baseUrl } = environment;

const engagementAdapter = createEntityAdapter<Engagement>({
  selectId: ({ staffId, start }) => `${staffId}::${start}`,
});

const engagementsFetchUrl = async (start: Date, end: Date, token?: string) =>
  isManagerRole(await getRole(token))
    ? `${baseUrl}/staff/shifts?start=${start.toISOString()}&end=${end.toISOString()}`
    : `${baseUrl}/myShifts?start=${start.toISOString()}&end=${end.toISOString()}`;

const engagementsPostUrl = `${baseUrl}/staff/addEngagement`;

export const engagementSlice = createSlice({
  name: 'engagement',
  initialState: engagementAdapter.getInitialState(),
  reducers: {
    setEngagements: (state, { payload }: PayloadAction<Engagement[]>) => {
      engagementAdapter.setAll(state, payload);
    },
    addEngagement: (state, { payload }: PayloadAction<Engagement>) => {
      engagementAdapter.addOne(state, payload);
    },
  },
});

export const { setEngagements, addEngagement } = engagementSlice.actions;

export const createEngagement = (
  engagement: Engagement,
  token?: string
): AppThunk => dispatch =>
  post(engagementsPostUrl, token, engagement)
    .then(() => dispatch(addEngagement(engagement)))
    .catch(toastr.error);

export const fetchEngagements = (
  start: Date,
  end: Date,
  token?: string
): AppThunk => async dispatch =>
  get(await engagementsFetchUrl(start, end, token), token)
    .then(response => response.json())
    .then(response => dispatch(setEngagements(response)))
    .catch(toastr.error);

const { selectAll } = engagementAdapter.getSelectors<RootState>(
  ({ engagement }) => engagement
);

export const selectEngagement = createSelector([selectAll], engagements =>
  engagements.map(engagement => ({
    ...engagement,
    start: toDate(engagement.start),
    end: toDate(engagement.end),
  }))
);

export default engagementSlice.reducer;