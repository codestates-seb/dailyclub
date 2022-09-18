import React from 'react';
import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const Content = styled.main`
  position: relative;
  top: 60px;
  width: 60%;
  height: 100vh;
  /* position때문에 justify, align center 적용 안됨*/
  left: 50%;
  transform: translate(-50%, 0);
  padding: 4rem 0;
`;
function Layout({ children }: PropsWithChildren) {
  return <Content>{children}</Content>;
}

export default Layout;
