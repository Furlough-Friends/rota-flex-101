import { URL } from '../../common/constants/global';

export interface EngagementData {
  staffId: number;
  start: Date;
  end: Date;
  type: string;
}

export const engagementsFetchUrl = (start: Date, end: Date) =>
  `${URL}/staff/shifts?start=${start.toISOString()}&end=${end.toISOString()}`;
