import { RoleType } from '../model';
import { environment } from '../utils/environment';
import { get } from './apiService';

const { baseUrl } = environment;

export const getRole = async (token?: string) => {
  const response = await get(`${baseUrl}/role`, token);
  return (await response.json()) as RoleType;
};
