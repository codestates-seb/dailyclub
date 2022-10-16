import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterBox = styled.div`
  position: absolute;
  bottom: 0;
  height: 150px;
  width: 100%;
  background-color: rgb(38, 39, 41);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 767px) {
    font-size: 11px;
    height: 150px;
  }
`;
const FooterText = styled.div`
  &:first-child {
    padding-bottom: 30px;
  }
  @media screen and (max-width: 767px) {
    font-size: 11px;
  }
`;
const InfoContainer = styled.div`
  flex: 2;
`;
const FooterContent = styled.div`
  width: 60%;
  display: flex;
  @media screen and (max-width: 767px) {
    width: 100%;
    padding: 0 10px;
  }
`;

export default function Footer() {
  return (
    <FooterBox>
      <FooterContent>
        <InfoContainer>
          <FooterText>Copyright ⓒ Daily Club</FooterText>
          <FooterText>김준형 고민정 문태경 최정석 황인준 김유현</FooterText>
        </InfoContainer>
        <Link to="/notice">공지사항</Link>
      </FooterContent>
    </FooterBox>
  );
}
