import { UserInfo } from './api';

export interface Employee extends UserInfo {
  readonly id: number;
  readonly startDate: Date;
  readonly preferredDates: string;
}
