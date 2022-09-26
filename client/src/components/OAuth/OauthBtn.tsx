import styled from 'styled-components';

const LoginSubmitBtn = styled.button`
  color: white;
  background-color: ${(props) => props.theme.accent};
  margin: 1rem 0;
  padding: 0.7rem 1rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
`;
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: string;
}

export default function OauthBtn({ children, onClick }: ButtonProps) {
  return <LoginSubmitBtn onClick={onClick}>{children}</LoginSubmitBtn>;
}
