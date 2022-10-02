import AuthInstance, { BaseInstance } from './axiosConfig';

export const API = {
  // User
  login: <T>(data: T) => {
    return BaseInstance({ method: 'POST', url: `/login`, data });
  },
  getUserInfo: (userId: number) => {
    return AuthInstance({ method: 'GET', url: `/api/users/${userId}` });
  },
  editUserInfo: <D>(userId: number, data: D) => {
    return AuthInstance({
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
    return AuthInstance({
      method: 'POST',
      url: `/api/programs`,
      data,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  updateProgram: <D>(programId: number, data: D) => {
    return AuthInstance({
      method: 'PUT',
      url: `/api/programs/${programId}`,
      data,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  deleteProgram: <I>(programId: I) => {
    return AuthInstance({ method: 'DELETE', url: `programs/${programId}` });
  },
};
