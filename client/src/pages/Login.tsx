import axios from 'axios';
import Layout from 'components/Layout';
import OauthBtn from 'components/OAuth/OauthBtn';
import OauthGoogleBtn from 'components/OAuth/OauthGoogleBtn';
import OauthNaverBtn from 'components/OAuth/OauthNaverBtn';
import OauthTitle from 'components/OAuth/OauthTitle';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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

interface LoginVal {
  loginId: string;
  password: string;
}

export default function Login() {
  const URL = process.env.REACT_APP_DEV_URL;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginVal>();

  const handleLoginSubmit: SubmitHandler<LoginVal> = (data) => {
    console.log(data); // {loginId: '입력값', password: '입력값'}
    /** 테스트 서버, api주소 나오면 밑과 URL 주석해제후 사용*/
    axios.defaults.withCredentials = true; // withCredentials 전역 설정
    axios
      .post(`http://14.34.31.34:8080/login`, JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res) => {
        console.log(res);
        navigate('/');
      });
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
