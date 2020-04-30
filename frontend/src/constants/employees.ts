import { URL } from './global';

export const STAFF_FETCH_URL = `${URL}/staff/get`;

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
  content: (o: StaffData) => any;
}
