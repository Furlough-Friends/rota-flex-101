import {
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import toastr from 'toastr';

import { Engagement } from '../model';
import { get, post, put, remove } from '../services/apiService';
import { toDate } from '../utils/date';
import { AppThunk, RootState } from './reducer';
import { getRole } from '../services/authService';
import { isManagerRole } from '../utils/role';

const engagementAdapter = createEntityAdapter<Engagement>({
  selectId: ({ staffId, start }) => `${staffId}::${start}`,
});

const engagementsFetchUrl = async (start: Date, end: Date) =>
  isManagerRole(await getRole())
    ? `/staff/shifts?start=${start.toISOString()}&end=${end.toISOString()}`
    : `/myShifts?start=${start.toISOString()}&end=${end.toISOString()}`;

const engagementsPostUrl = `/staff/addEngagement`;
const engagementPutUrl = `/staff/engagement`;
const engagementDeleteUrl = (id: number) => `/staff/engagement/${id}`;

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

const updateFromPromise = (
  requestPromise: Promise<Engagement[]>
): AppThunk => dispatch =>
  requestPromise
    .then(response => dispatch(setEngagements(response)))
    .catch(toastr.error);

export const createEngagement = (
  engagement: Engagement
): AppThunk => dispatch =>
  post(engagementsPostUrl, engagement)
    .then(response => dispatch(setEngagements(response)))
    .catch(toastr.error);

export const fetchEngagements = (
  start: Date,
  end: Date
): AppThunk => async dispatch =>
  get(await engagementsFetchUrl(start, end))
    .then(response => dispatch(setEngagements(response)))
    .catch(toastr.error);

export const updateEngagement = (engagement: Engagement): AppThunk =>
  updateFromPromise(put(engagementPutUrl, engagement));

export const deleteEngagement = (id: number): AppThunk =>
  updateFromPromise(remove(engagementDeleteUrl(id)));

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
