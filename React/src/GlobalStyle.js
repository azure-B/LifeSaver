import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`



:root {
  /* normal mode color */
  /* dark mode color */
}

body {
  background-color: var(--nor-bg-color);
  padding: 0;
  margin: 0;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  ::-webkit-scrollbar {
    display: none;
  }
}

* {
  box-sizing: border-box;
}

input {
  display: flex;
  outline: none;
  padding-left: 10px;
}

button {
  cursor: pointer;
  display: flex;
  border: none;
  background-color: transparent;
}

`;

export default GlobalStyle;
