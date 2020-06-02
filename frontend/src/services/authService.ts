import { RoleType } from '../model';
import { get } from './apiService';

const { REACT_APP_BASE_URL } = process.env;

export const getRole = async (token?: string) => {
  const response = await get(`${REACT_APP_BASE_URL}/role`, token);
  return (await response.json()) as RoleType;
};
