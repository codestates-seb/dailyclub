import axios from 'axios';

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
