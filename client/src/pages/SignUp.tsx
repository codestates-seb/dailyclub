import axios from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { SignUpVal } from 'types/user';
import Layout from 'components/Layout';
import OauthBtn from 'components/OAuth/OauthBtn';
import OauthGoogleBtn from 'components/OAuth/OauthGoogleBtn';
import OauthNaverBtn from 'components/OAuth/OauthNaverBtn';
import OauthTitle from 'components/OAuth/OauthTitle';
import { useState } from 'react';

const SignUpContainer = styled.div`
  margin: 0 auto;
  width: 360px;
  height: 100vh;
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

export default function SignUp() {
  const URL = process.env.REACT_APP_DEV_URL;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpVal>();
  const [idErrMsg, setIdErrMsg] = useState('');
  const [nicknameErrMsg, setNicknameErrMsg] = useState('');
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [pwdErrMsg, setPwdErrMsg] = useState('');

  const handleLoginSubmit: SubmitHandler<SignUpVal> = (data) => {
    setEmailErrMsg('');
    setNicknameErrMsg('');
    setIdErrMsg('');
    setPwdErrMsg('');
    /** 회원가입 API */
    axios
      .post(`${URL}/join`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        navigate('/login');
        // console.log('회원등록 응답 :', res);
      })
      .catch((err) => {
        err?.response?.data?.fieldErrors?.map((el: any) => {
          if (el.field === 'email') setEmailErrMsg(el.reason);
          if (el.field === 'nickname') setNicknameErrMsg(el.reason);
          if (el.field === 'loginId') setIdErrMsg(el.reason);
          if (el.field === 'password') setPwdErrMsg(el.reason);
        });
      });
  };

  return (
    <Layout>
      <SignUpContainer>
        <OauthTitle>J O I N</OauthTitle>
        <SignUpForm onSubmit={handleSubmit(handleLoginSubmit)}>
          <SignUpInput
            {...register('loginId', {
              required: '아이디를 입력해주세요.',
              minLength: {
                value: 5,
                message: '5자 이상 15자 이하의 아이디를 입력해주세요.',
              },
              maxLength: {
                value: 15,
                message: '15자 이하의 아이디를 입력해주세요',
              },
            })}
            placeholder="아이디"
            onChange={() => setIdErrMsg('')}
          />
          {errors.loginId && <FormError>{errors.loginId.message}</FormError>}
          {idErrMsg && <FormError>{idErrMsg}</FormError>}
          <SignUpInput
            {...register('email', {
              required: true,
              pattern: /^[a-z0-9_+.-]+@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/,
            })}
            type="email"
            placeholder="이메일"
            onChange={() => setEmailErrMsg('')}
          />
          {errors.email && errors.email.type === 'required' && (
            <FormError>이메일을 입력해주세요.</FormError>
          )}
          {emailErrMsg && <FormError>{emailErrMsg}</FormError>}
          {errors.email && errors.email.type === 'pattern' && (
            <FormError>{`잘못된 이메일 형식입니다. 예) @email.com`}</FormError>
          )}
          <SignUpInput
            {...register('password', {
              required: '비밀번호를 입력해주세요.',
              minLength: {
                value: 6,
                message: '6자 이상 18자 이하의 비밀번호를 입력해주세요.',
              },
              maxLength: {
                value: 18,
                message: '18자 이하의 비밀번호를 입력해주세요',
              },
            })}
            placeholder="비밀번호"
          />
          {errors.password && <FormError>{errors.password.message}</FormError>}
          {pwdErrMsg && <FormError>{pwdErrMsg}</FormError>}
          <SignUpInput
            {...register('nickname', {
              required: '닉네임을 입력해주세요.',
              minLength: {
                value: 2,
                message: '2자 이상 10자 이하의 닉네임을 입력해주세요.',
              },
              maxLength: {
                value: 10,
                message: '10자 이하의 닉네임을 입력해주세요',
              },
            })}
            placeholder="닉네임"
            onChange={() => setNicknameErrMsg('')}
          />
          {errors.nickname && <FormError>{errors.nickname.message}</FormError>}
          {nicknameErrMsg && <FormError>{nicknameErrMsg}</FormError>}
          <OauthBtn type="submit">회원가입</OauthBtn>
        </SignUpForm>
        <LoginLink>
          이미 아이디가 있다면&nbsp;
          <LoginText>
            <Link to="/login">로그인</Link>
          </LoginText>
          하세요
        </LoginLink>
        <OauthGoogleBtn signupText="가입" />
        <OauthNaverBtn signupText="가입" />
      </SignUpContainer>
    </Layout>
  );
}
