import { RoleType } from '../roleType';

export interface BaseEmployee {
  readonly id: number;
  readonly firstName: string;
  readonly surname: string;
  readonly role: RoleType;
  readonly startDate: Date;
  readonly contractedHours: number;
  readonly hourlyRate: number;
  readonly jobTitle: string;
  readonly preferredDates: string;
  readonly email: string;
}
