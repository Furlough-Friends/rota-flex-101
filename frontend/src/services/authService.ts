import { BASE_URL } from '../constants/global';
import { RoleType } from '../model';
import { get } from './apiService';

export const getRole = async (token?: string) => {
  const response = await get(`${BASE_URL}/role`, token);
  return (await response.json()) as RoleType;
};
