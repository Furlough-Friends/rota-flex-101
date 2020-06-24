import { RoleType } from '../model';
import { get } from './apiService';

export const getRole = async () => {
  return (await get('/role')) as RoleType;
};
