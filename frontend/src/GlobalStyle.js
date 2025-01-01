import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${props => props.theme.mode === 'dark' ? '#121212' : '#ffffff'};
    color: ${props => props.theme.mode === 'dark' ? '#ffffff' : '#000000'};
    transition: all 0.3s ease;
  }

  /* Add styles for links, buttons, and other components that you want to style globally */
  a {
    color: ${props => props.theme.mode === 'dark' ? '#bb86fc' : '#6200ea'};
  }

  button {
    background-color: ${props => props.theme.mode === 'dark' ? '#03dac6' : '#6200ea'};
    color: #fff;
    border: none;
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
  }

  button:hover {
    background-color: ${props => props.theme.mode === 'dark' ? '#018786' : '#3700b3'};
  }
`;

export default GlobalStyle;
