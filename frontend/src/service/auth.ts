import { get } from './apiService';
import { URL } from '../constants/global';
import { Role } from '../constants/employees';

export const getRole = async (token?: string) => {
  const response = await get(`${URL}/role`, token);
  const json = await response.json();

  switch (json) {
    case 'USER':
      return Role.USER;
    case 'MANAGER':
      return Role.MANAGER;
    default:
      return Role.NONE;
  }
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
