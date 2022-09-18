import axios from 'axios';
import Layout from 'components/Layout';
import OauthBtn from 'components/OAuth/OauthBtn';
import OauthTitle from 'components/OAuth/OauthTitle';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SignUpContainer = styled.div`
  padding: 0 220px;
`;
const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
`;
const SignUpInput = styled.input`
  margin: 1rem 0;
  border: 1px solid ${(props) => props.theme.accent};
  border-radius: 10px;
  padding: 0.7rem 1rem;
`;
const FormError = styled.div`
  color: #eb0000;
  padding-left: 1rem;
`;
const LoginLink = styled.div`
  display: flex;
  justify-content: center;
`;
const LoginText = styled.div`
  color: #1ebd8e;
`;

interface SignUpVal {
  username: string;
  email: string;
  password: string;
  nickname: string;
}

export default function SignUp() {
  // const URL = process.env.REACT_APP_URL;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpVal>();

  const handleLoginSubmit: SubmitHandler<SignUpVal> = (data) => {
    console.log(data); // {username: '입력값', email: '입력값', password: '입력값', nickname: '입력값'}

    /** 테스트 서버, api주소 나오면 밑에 주석해제후 url들 수정해서 사용*/
    /* axios
      .post(`${URL}/users`, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: data,
      })
      .then((res) => {
        navigate('/login');
        console.log('회원등록 응답 :', res.data);
      })
      .catch((error) => console.log(error));
       */
  };

  return (
    <Layout>
      <SignUpContainer>
        <OauthTitle>J O I N</OauthTitle>
        <SignUpForm onSubmit={handleSubmit(handleLoginSubmit)}>
          <SignUpInput
            {...register('username', { required: true })}
            placeholder="아이디"
          />
          {errors.username && errors.username.type === 'required' && (
            <FormError>아이디를 입력해주세요.</FormError>
          )}
          <SignUpInput
            {...register('email', {
              required: true,
              pattern: /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/,
            })}
            type="email"
            placeholder="이메일"
          />
          {errors.email && errors.email.type === 'required' && (
            <FormError>이메일을 입력해주세요.</FormError>
          )}
          {errors.email && errors.email.type === 'pattern' && (
            <FormError>{`잘못된 이메일 형식입니다. 예) @email.com`}</FormError>
          )}
          <SignUpInput
            {...register('password', { required: true })}
            placeholder="비밀번호"
          />
          {errors.password && errors.password.type === 'required' && (
            <FormError>비밀번호를 입력해주세요.</FormError>
          )}
          <SignUpInput
            {...register('nickname', { required: true })}
            placeholder="닉네임"
          />
          {errors.nickname && errors.nickname.type === 'required' && (
            <FormError>닉네임을 입력해주세요.</FormError>
          )}
          <OauthBtn type="submit">회원가입</OauthBtn>
        </SignUpForm>
        <LoginLink>
          이미 아이디가 있다면&nbsp;
          <LoginText>
            <Link to="/login">로그인</Link>
          </LoginText>
          하세요
        </LoginLink>
      </SignUpContainer>
    </Layout>
  );
}
