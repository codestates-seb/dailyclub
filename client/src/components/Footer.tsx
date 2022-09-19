import styled from 'styled-components';

const FooterBox = styled.div`
  height: 150px;
  width: 100%;
  background-color: #262729;
  margin-top: 100vh;
`;
const FooterText1 = styled.h1`
  padding-top: 30px;
  color: white;
  text-align: center;
`;
const FooterText2 = styled.h2`
  color: white;
  padding-top: 10px;
  text-align: center;
`;
export default function Footer() {
  return (
    <FooterBox>
      <FooterText1>Copyright ⓒ Daily Club</FooterText1>
      <FooterText2>김준형 고민정 문태경 최정석 황인준</FooterText2>
    </FooterBox>
  );
}
