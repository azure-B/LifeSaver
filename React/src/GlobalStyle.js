import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
:root {
  /* normal mode color */
  /* dark mode color */
}

body {
  background-color: var(--nor-bg-color);
  width: calc(100% - 16rem);
  margin-left: auto;
  margin-right: auto;
}

* {
  box-sizing: border-box;
}
`;

export default GlobalStyle;
