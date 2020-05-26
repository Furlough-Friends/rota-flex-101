import { URL } from './global';

export const STAFF_FETCH_URL = `${URL}/staff/get`;
export const STAFF_DELETE_URL = `${URL}/staff/remove?id=`;

export enum Role {
  USER = 'USER',
  MANAGER = 'MANAGER',
  NONE = 'NONE',
}

export interface StaffData {
  id: number;
  firstName: string;
  surname: string;
  jobTitle: string;
  contractedHours: number;
}
export interface TableColumn {
  id: string;
  name: string;
  content: (o: StaffData) => JSX.Element | string;
}
