import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ACCESS_EXP_MESSAGE, CheckJWTExp } from 'utils/CheckJwtExp';
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from './localStorage';

axios.defaults.withCredentials = true;

/** 기본 api 인스턴스 */
export const BaseInstance = axios.create({
  baseURL: process.env.REACT_APP_DEV_URL,
});

/** 인증 필요한 api = 인스턴스 생성 후, interceptor에서 사용자인증(헤더담는) 작업 */
const AuthInstance = axios.create({
  baseURL: process.env.REACT_APP_DEV_URL,
});

/** 1. 요청 전 - access토큰있는데 만료되면 refresh토큰도 헤더담아서 요청보내기 */
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const accessToken = getLocalStorage('access_token');
    const refreshToken = getLocalStorage('refresh_token');
    if (accessToken) {
      /** 2. access토큰 있으면 만료됐는지 체크 */
      if (CheckJWTExp() === ACCESS_EXP_MESSAGE) {
        /** 3. 만료되면 만료된 access, refresh 같이 헤더 담아서 요청 */
        // console.log('만료됨! refresh 토큰 담기'); ////
        config.headers!.Authorization = `${accessToken}`;
        config.headers!.Refresh = `${refreshToken}`;
      } else {
        config.headers!.Authorization = `${accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/** 4. 응답 전 - 새 access토큰받으면 갈아끼기 */
axios.interceptors.response.use(
  async (response: AxiosResponse) => {
    if (response.headers.authorization) {
      // console.log('헤더 :', response.headers);
      const newAccessToken = response?.headers?.authorization;
      removeLocalStorage('access_token'); // 만료된 access토큰 삭제
      setLocalStorage('access_token', newAccessToken); // 새걸로 교체
      response.config.headers = {
        authorization: `${newAccessToken}`,
      };
    }
    return response;
  },
  (error) => {
    //응답 200 아닌 경우 - 디버깅
    // console.log(error);
    return Promise.reject(error);
  }
);

export default AuthInstance;
