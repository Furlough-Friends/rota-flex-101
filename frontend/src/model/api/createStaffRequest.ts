import { RoleType } from '../roleType';

export interface BaseStaff {
  firstName: string;
  surname: string;
  jobTitle: string;
  contractedHours: number;
}

export interface CreateStaffRequest extends BaseStaff {
  startDate: string;
  role: RoleType;
  preferredDates: string;
  pay: number;
  email: string;
}
