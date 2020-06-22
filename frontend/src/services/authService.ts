import { RoleType } from '../model';
import { get } from './apiService';

export const getRole = async (token?: string) => {
  const response = await get(`/role`, token);
  return (await response) as RoleType;
};
