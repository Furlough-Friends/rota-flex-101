import { RoleType } from '../model';

export const isValidRole = (role: RoleType) =>
  role === RoleType.User || role === RoleType.Manager;

export const isManagerRole = (role: RoleType) => role === RoleType.Manager;
