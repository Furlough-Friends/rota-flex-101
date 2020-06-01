import Role from "../../common/model/Role";

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
  startDate: Date;
  role: Role;
  preferredDates: string;
  pay: number;
  email: string;
}