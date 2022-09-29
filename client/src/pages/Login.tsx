import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { LoginVal } from 'types/user';
// import { API } from 'apis/api';
import { setLocalStorage } from 'apis/localStorage';
import Layout from 'components/Layout';
import OauthBtn from 'components/OAuth/OauthBtn';
import OauthGoogleBtn from 'components/OAuth/OauthGoogleBtn';
import OauthNaverBtn from 'components/OAuth/OauthNaverBtn';
import OauthTitle from 'components/OAuth/OauthTitle';
import { useAppDispatch } from 'stores/hooks';
import { fetchUserInfo, getUserId } from 'stores/userInfoSlice';
import { parseJwt } from 'utils/parseJwt';

const LoginContainer = styled.div`
  margin: 0 auto;
  width: 360px;
  height: 100vh;
`;
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const SignUpText = styled.div`
  color: #1ebd8e;
`;
const WrapperColumn = styled.div`
  display: flex;
  justify-content: space-between;
`;
const LoginInput = styled.input`
  margin: 1rem 0;
  border: 1px solid ${(props) => props.theme.accent};
  border-radius: 10px;
  padding: 0.7rem 1rem;
`;
const FormError = styled.div`
  color: #eb0000;
  padding-left: 1rem;
`;

export default function Login() {
  const URL = process.env.REACT_APP_DEV_URL;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginVal>();

  const handleLoginSubmit: SubmitHandler<LoginVal> = (data) => {
    // API.login(data); // test해봐야 함
    axios.defaults.withCredentials = true; // withCredentials 전역 설정
    axios
      .post(`${URL}/login`, data)
      .then((res) => {
        if (res.status === 200) {
          let accessToken = res.headers.authorization;
          let refreshToken = res.headers.refresh;
          console.log('access 토큰 :', accessToken);
          console.log('refresh 토큰 :', refreshToken);
          setLocalStorage('access_token', accessToken);
          setLocalStorage('refresh_token', refreshToken);
          // API 요청마다 헤더에 access토큰 담아서 요청보내는 설정
          axios.defaults.headers.common['Authorization'] = `${accessToken}`;
          // axios.defaults.headers.common['Refresh'] = `${refreshToken}`;
          navigate('/');

          //JWT디코딩해서 userId, loginId 등 전역상태
          const decodedAccess = parseJwt(accessToken);
          dispatch(getUserId(decodedAccess)); //JWT 내용 전역상태
          // console.log('토큰해부', decodedAccess);
        }
      })
      .then(() => {
        dispatch(fetchUserInfo()); // 로그인 후, 로그인한 유저정보조회
        // dispatch(fetchUserInfo(decodedAccess.id));//유저조회 thunk 전역상태에 저장
      })
      .catch((error) => console.log(error));

    // localStorage.setItem('Authorization', jwtToken);
    // const accessToken = JSON.parse(localStorage.getItem('accessToken') as string);
    // if (accessToken) {
    //   axios.defaults.headers.common[
    //     'Authorization'
    //   ] = `Bearer ${accessToken}`;
    // }
  };

  return (
    <Layout>
      <LoginContainer>
        <OauthTitle>L O G I N</OauthTitle>
        <LoginForm onSubmit={handleSubmit(handleLoginSubmit)}>
          <LoginInput
            {...register('loginId', { required: true })}
            placeholder="아이디"
          />
          {errors.loginId && errors.loginId.type === 'required' && (
            <FormError>아이디를 입력해주세요.</FormError>
          )}
          <LoginInput
            {...register('password', { required: true })}
            placeholder="비밀번호"
          />
          {errors.password && errors.password.type === 'required' && (
            <FormError>비밀번호를 입력해주세요.</FormError>
          )}
          <OauthBtn type="submit">로그인</OauthBtn>
        </LoginForm>
        <WrapperColumn>
          <div>
            <Link to="/">아이디 / 비밀번호 찾기</Link>
          </div>
          <SignUpText>
            <Link to="/signup">회원가입</Link>
          </SignUpText>
        </WrapperColumn>
        <OauthGoogleBtn loginText="로그인" />
        <OauthNaverBtn loginText="로그인" />
      </LoginContainer>
    </Layout>
  );
}
