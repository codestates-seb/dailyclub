/** JWT 디코딩하여 exp, id, loginId, seb 확인 */
export const parseJwt = (token: string | null) => {
  if (token) return JSON.parse(window.atob(token.split('.')[1]));
};
