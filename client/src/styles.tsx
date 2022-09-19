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
  }
  input {
    all:unset;
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
  
`;
