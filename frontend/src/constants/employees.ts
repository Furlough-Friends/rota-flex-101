import { URL } from './global';
import { DateStr, toDateStr } from './global'

export const STAFF_FETCH_URL = `${URL}/staff/get`;
export const STAFF_DELETE_URL = `${URL}/staff/remove?id=`;

interface BaseStaffData {
  firstName: string;
  surname: string;
  jobTitle: string;
  contractedHours: number;
}

export interface StaffData extends BaseStaffData {
  id: number;
}

export interface CreateStaffData extends BaseStaffData {
  startDate: DateStr;
  role: "USER" | "MANAGER";
  preferredDates: string;
}

export interface TableColumn {
  id: string;
  name: string;
  content: (o: StaffData) => JSX.Element | string;
}