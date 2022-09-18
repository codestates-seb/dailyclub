import styled from 'styled-components';

const LoginTitle = styled.div`
  margin-bottom: 3rem;
  text-align: center;
  font-size: 2rem;
  font-weight: 300;
`;
interface TitleProp {
  children: React.ReactNode;
}
export default function OauthTitle({ children }: TitleProp) {
  return <LoginTitle>{children}</LoginTitle>;
}
