import styled from 'styled-components';
import GoogleBtn from '../../images/GoogleBtn.svg';

const GoogleContainer = styled.button``;

export default function OauthGoogleBtn() {
  return (
    <GoogleContainer>
      <img src={GoogleBtn} alt="google login" />
    </GoogleContainer>
  );
}
