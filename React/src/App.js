import GlobalStyle from "./GlobalStyle";
import ScrollBackground from "./components/ScrollBackground";

import { useState } from "react";

// import Menu from "./Components/Menu";
import "./App.css";

function App() {
  return (
    <div>
      {/* <Menu /> */}
      <GlobalStyle></GlobalStyle>
      <ScrollBackground></ScrollBackground>
    </div>
  );
}

export default App;
