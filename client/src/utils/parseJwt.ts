import { getLocalStorage } from 'apis/localStorage';

const accessToken = getLocalStorage('access_token');
const refreshToken = getLocalStorage('refresh_token');

/** JWT 디코딩하여 exp, id, loginId, seb 확인 */
export const parseJwt = (token: string | null) => {
  if (token) return JSON.parse(window.atob(token.split('.')[1]));
};

/** 토큰 유효기간 */
export const AuthVerify = () => {
  const decodedAccess = parseJwt(accessToken);
  const decodedRefresh = parseJwt(refreshToken);
  //   console.log(decodedAccess, decodedRefresh); // 해부된 토큰내부 확인

  if (decodedAccess.exp * 1000 < Date.now()) {
    return 'Access Token Expired';
  }
  if (decodedRefresh.exp * 1000 < Date.now()) {
    return 'Refresh Token Expired';
  }
  return true;
};
