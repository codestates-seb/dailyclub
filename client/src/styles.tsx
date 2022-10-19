import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

export const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  body {
    font-size:14px;
    font-family:'Open Sans', sans-serif;
    height: 100%;
  }
  input {
    border:none;
    outline: none;
    background-color: transparent;
  }
  textarea {
    all:unset;
  }
  a {
    text-decoration:none;
    color:inherit;
  }
  button{
    background-color: white;
    cursor: pointer;
  }
  .wrap {
  position: relative;
  min-height: 100%;
  padding-bottom: 114px;
}
`;
