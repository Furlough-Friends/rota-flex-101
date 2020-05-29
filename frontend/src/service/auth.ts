import { Role } from '../constants/employees';
import { URL } from '../constants/global';
import { get } from './apiService';

export const getRole = async (token?: string) => {
  const response = await get(`${URL}/role`, token);
  const json = await response.json();

  return Role[json as keyof typeof Role];
};

export const hasViewPermissions = (role?: Role) => {
  switch (role) {
    case 'USER':
    case 'MANAGER':
      return true;
    default:
      return false;
  }
};

export const hasManagerPermissions = (role?: Role) => role === Role.MANAGER;
