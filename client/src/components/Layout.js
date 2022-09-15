import styled from "styled-components";

const Content = styled.main`
  position: relative;
  top: 60px;
  width: 60%;
  /* position때문에 justify, align center 적용 안됨*/
  left: 50%;
  transform: translate(-50%, 0);
`;

export default function Layout({ children }) {
  return (
    <>
      <Content>{children}</Content>
    </>
  );
}
