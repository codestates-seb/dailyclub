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
  // baseURL: process.env.REACT_APP_DEV_URL,
});

/** 1. 요청 전 access토큰있는데 만료되면 refresh토큰도 헤더담아서 요청보내기 */
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const accessToken = getLocalStorage('access_token');
    const refreshToken = getLocalStorage('refresh_token');
    if (accessToken) {
      /** 2. access토큰 있으면 만료됐는지 체크 */
      if (CheckJWTExp() === ACCESS_EXP_MESSAGE) {
        // console.log('만료됨! refresh 토큰 담기');    ////

        // config.headers = {
        //   authorization: `${accessToken}`,
        //   refresh: `${refreshToken}`,
        // };
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

/** 응답으로 access토큰받으면 갈아끼기 */
axios.interceptors.response.use(
  async (response: AxiosResponse) => {
    // 응답 200이면 성공 직전 호출 .then()으로 이어짐
    // console.log('서버응답헤더! :', response.headers);    ////
    // if (response.headers.access) {
    //   const newAccessToken = response.data.access
    //   removeLocalStorage('access_token'); // 만료된 access토큰 삭제
    //   setLocalStorage('access_token', newAccessToken); // 새걸로 교체
    //   config.headers!.Authorization = `${newAccessToken}`; // 택1
    // response.config.headers = {
    //   authorization: `${newAccessToken}`, //택2
    // };
    // }
    // return response; // 택1
    // return await axios(response.config); //택2
  },
  (error) => {
    //응답 200 아닌 경우 - 디버깅
    console.log(error);
    return Promise.reject(error);
  }
);

export default AuthInstance;
