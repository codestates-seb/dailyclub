import axios, { AxiosRequestConfig } from 'axios';
import { getLocalStorage } from './localStorage';

/** 기본 api 인스턴스 */
const BaseInstance = axios.create({
  // baseURL: process.env.REACT_APP_DEV_TWO_URL,
  baseURL: process.env.REACT_APP_DEV_URL,
});

/** 인증 필요한 api = 인스턴스 생성 후, interceptor에서 사용자인증(헤더담는) 작업 */
const authInstance = axios.create({
  baseURL: process.env.REACT_APP_DEV_URL,
});
authInstance.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    if (!config.headers!.Authorization === undefined || null) {
      const token = getLocalStorage('access_token');
      if (token) config.headers!.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const API = {
  // User
  login: <T>(data: T) => {
    return authInstance({ method: 'POST', url: `/login`, data });
  },
  getUserInfo: (userId: number) => {
    return authInstance({ method: 'GET', url: `/api/users/${userId}` });
  },
  editUserInfo: <D>(userId: number, data: D) => {
    return authInstance({
      method: 'PUT',
      url: `/api/users/${userId}`,
      data,
    });
  },

  // Program 임시
  getProgram: (URL: string) => {
    return BaseInstance({ method: 'GET', url: URL });
  },
  getAProgram: (programId: number) => {
    return BaseInstance({ method: 'GET', url: `/api/programs/${programId}` });
  },
  createProgram: <T>(data: T) => {
    return authInstance({
      method: 'POST',
      url: `/api/programs`,
      data,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  updateProgram: <D>(programId: number, data: D) => {
    return authInstance({
      method: 'PUT',
      url: `/api/programs/${programId}`,
      data,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  deleteProgram: <I>(programId: I) => {
    return authInstance({ method: 'DELETE', url: `programs/${programId}` });
  },
};
