import { RoleType } from '../roleType';

export interface BaseEmployee {
  firstName: string;
  surname: string;
  jobTitle: string;
  contractedHours: number;
}

export interface CreateEmployeeRequest extends BaseEmployee {
  startDate: string;
  role: RoleType;
  preferredDates: string;
  pay: number;
  email: string;
}
