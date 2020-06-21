import { RoleType } from '../roleType';

export interface UserInfo {
  readonly firstName: string;
  readonly surname: string;
  readonly jobTitle: string;
  readonly email: string;
  readonly role: RoleType.User;
  readonly contractedHours: number;
  readonly hourlyRate: number;
}
