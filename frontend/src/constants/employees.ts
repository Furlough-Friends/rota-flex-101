import { URL, DateStr } from './global';

export const STAFF_FETCH_URL = `${URL}/staff/get`;
export const STAFF_DELETE_URL = `${URL}/staff/remove?id=`;
export const STAFF_CREATE_URL = `${URL}/staff/create`;

export enum Role {
  USER = 'USER',
  MANAGER = 'MANAGER',
}

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
  role: Role;
  preferredDates: string;
  pay: number;
}

export interface TableColumn {
  id: string;
  name: string;
  content: (o: StaffData) => JSX.Element | string;
}
