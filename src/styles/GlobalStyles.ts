import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :focus {
    box-shadow: 0 0 0 3px ${props => props.theme['blue-btn']};
  }

  body {
    background-color: #212127;
  }

  img {
    max-width: 100%;
    display: block;
  }

  ul {
    list-style: none;
  }

  a{
    text-decoration: none;
  }

  bottom {
    border: 0;
  }

  #root {
    display: grid;
    grid-template-columns: 243px 1fr;
  }
` 