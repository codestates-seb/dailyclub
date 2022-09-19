import styled from 'styled-components';
import GoogleBtn from '../../images/GoogleBtn.svg';

const GoogleContainer = styled.button`
  width: 100%;
  padding: 0.2rem 1rem;
  border: none;
  display: flex;
  align-items: center;
  border: 0.7px solid gray;
  border-radius: 7px;
  margin: 3rem 0 1rem 0;
`;

const GoogleImg = styled.img`
  height: 40px;
`;
const GoogleText = styled.div`
  margin: 0 8px;
  font-size: 0.9rem;
`;

interface GoogleBtnProps {
  signupText?: string;
  loginText?: string;
  onClick?: () => void;
}

export default function OauthGoogleBtn({
  signupText,
  loginText,
  onClick,
}: GoogleBtnProps) {
  return (
    <GoogleContainer>
      <GoogleImg src={GoogleBtn} alt="google login" />
      <GoogleText>
        Google 계정으로 {signupText ? signupText : loginText}
      </GoogleText>
    </GoogleContainer>
  );
}
