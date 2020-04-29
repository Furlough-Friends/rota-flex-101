export const URL = 'http://localhost:8080';
export const STAFF_FETCH_URL = `${URL}/staff/get`;
export const FULLTIME_HOURS = 37.5;

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
