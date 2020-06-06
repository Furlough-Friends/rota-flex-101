import { RoleType } from '../roleType';

export interface BaseEmployee {
  readonly firstName: string;
  readonly surname: string;
  readonly jobTitle: string;
  readonly contractedHours: number;
}

export interface CreateEmployeeRequest extends BaseEmployee {
  readonly startDate: Date;
  readonly role: RoleType;
  readonly preferredDates: string;
  readonly pay: number;
  readonly email: string;
}
