import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterBox = styled.div`
  position: absolute;
  bottom: 0;
  height: 150px;
  width: 100%;
  background-color: rgb(38, 39, 41);
  color: white;
  padding: 0 20rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const FooterText1 = styled.div`
  padding-bottom: 30px;
`;
const FooterText2 = styled.div`
  padding-bottom: 30px;
`;
const InfoContainer = styled.div`
  flex: 2;
`;

export default function Footer() {
  return (
    <FooterBox>
      <InfoContainer>
        <FooterText1>Copyright ⓒ Daily Club</FooterText1>
        <FooterText2>김준형 고민정 문태경 최정석 황인준</FooterText2>
      </InfoContainer>
      <Link to="/notice">공지사항</Link>
    </FooterBox>
  );
}
