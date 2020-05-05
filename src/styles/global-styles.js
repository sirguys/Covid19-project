import { createGlobalStyle } from 'styled-components'

const globalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  body {
    background: #000 no-repeat center center fixed;
    font-family: sans-serif;
    background-size: cover;
    overflow: scroll;
    color: #fff;
    margin: 0 5rem;
  }
`

export default globalStyles
