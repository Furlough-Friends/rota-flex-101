import axios from 'axios';
import { environment } from '../utils/environment';

const headers = (token?: string) => ({
  Authorization: `Bearer ${token}`,
  'Content-Type': 'application/json',
});

const axiosInstance = axios.create({
  baseURL: environment.baseUrl,
  timeout: 1000,
});

const apiRequest = (method: 'GET' | 'PUT' | 'POST' | 'DELETE') => async (
  url: string,
  token?: string,
  data?: object
) =>
  axiosInstance
    .request({
      url,
      method,
      headers: headers(token),
      data,
    })
    .then(response => response.data);

export const get = apiRequest('GET');
export const put = apiRequest('PUT');
export const remove = apiRequest('DELETE');
export const post = apiRequest('POST');
