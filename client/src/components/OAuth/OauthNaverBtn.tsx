import styled from 'styled-components';
import NaverLogo from '../../images/NaverLogo.png';

const NaverContainer = styled.button`
  width: 100%;
  padding: 0.2rem 1rem;
  border: none;
  display: flex;
  align-items: center;
  background-color: rgba(3, 199, 90);
  border-radius: 7px;
`;

const NaverImg = styled.img`
  height: 40px;
`;
const NaverText = styled.div`
  margin: 0 8px;
  color: white;
  font-size: 0.9rem;
  @media screen and (max-width: 767px) {
    font-size: 12px;
  }
`;

interface NaverBtnProps {
  signupText?: string;
  loginText?: string;
  onClick?: () => void;
}

export default function OauthNaverBtn({
  signupText,
  loginText,
  onClick,
}: NaverBtnProps) {
  return (
    <NaverContainer>
      <NaverImg src={NaverLogo} alt="Naver login" />
      <NaverText>
        Naver 계정으로 {signupText ? signupText : loginText}
      </NaverText>
    </NaverContainer>
  );
}
