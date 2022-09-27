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
  const URL = process.env.REACT_APP_DEV_TWO_URL; //민정님주소
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginVal>();

  const handleLoginSubmit: SubmitHandler<LoginVal> = (data) => {
    // console.log(data); // {loginId: '입력값', password: '입력값'}
    // API.login(data); // test해봐야 함
    axios.defaults.withCredentials = true; // withCredentials 전역 설정
    axios
      .post(`${URL}/login`, data)
      .then((res) => {
        if (res.status === 200) {
          // 모든 헤더 이름은 소문자
          let accessToken = res.headers.authorization; // 응답헤더에서 토큰 받기
          let refreshToken = res.headers.refresh; // 응답헤더에서 토큰 받기
          console.log('access 토큰 :', accessToken);
          console.log('refresh 토큰 :', refreshToken);
          setLocalStorage('access_token', accessToken); // 토큰 localStorage에 저장
          // API 요청마다 헤더에 access토큰 담아서 요청보내는 설정
          axios.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${accessToken}`;
          navigate('/');
        }
      })
      // .then(() => {
      //   axios.get(`${URL}/api/users/`);
      // })
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
