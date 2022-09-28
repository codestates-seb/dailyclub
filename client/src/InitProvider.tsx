import { getLocalStorage } from 'apis/localStorage';
import axios from 'axios';

const accessToken = getLocalStorage('access_token');
const refreshToken = getLocalStorage('refresh_token');

/** JWT 디코딩하여 만료시간 확인 - 미완료 */
const parseJwt = (token: string | null) => {
  if (token) return JSON.parse(window.atob(token.split('.')[1]));
};

export const AuthVerify = () => {
  const decodedAccess = parseJwt(accessToken);
  const decodedRefresh = parseJwt(refreshToken);
  console.log(decodedAccess, decodedRefresh); // 해부된 토큰내부 확인

  if (decodedAccess.exp * 1000 < Date.now()) {
    return 'Access Token Expired';
  }
  if (decodedRefresh.exp * 1000 < Date.now()) {
    return 'Refresh Token Expired';
  }
  return true;
};

/** refresh토큰으로 access토큰 발급받기 - 백엔드와 상의해봐야함 */
export const requestAccessToken = async (refreshToken: any) => {
  return await axios
    .post(`/refresh`, {
      refresh: refreshToken,
    })
    .then((res) => {
      console.log('access토큰 다시 발급받기', res.data);
    })
    .catch((err) => console.log(err));
};

/** 새로고침해도 로그인 유지 - 미완료  */
export const isAccessToken = async (refreshToken: any) => {
  // accessToken만료돼서 없으면 refresh토큰로 access토큰 다시 발급
  if (axios.defaults.headers.common['Authorization'] === undefined) {
    return await requestAccessToken(refreshToken).then((res) => {
      // console.log(res.headers.authorization); // 헤더로 access토큰오는지 확인
      return res;
    });
  } else {
    // return axios.defaults.headers.common['Authorization'].split(' ')[1];
    // return axios.defaults.headers.common['Authorization'].split(' ')[1];
  }
  //   if (!accessToken) {
  //     console.log('로그인한 유저가 없습니다');
  //   }
};
