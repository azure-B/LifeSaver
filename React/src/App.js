import GlobalStyle from "./GlobalStyle";
import ScrollBackground from "./components/ScrollBackground";
import Modal from "./components/Modal";
import { useState } from "react";
// import Menu from "./Components/Menu";
import "./App.css";

function App() {
  // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      {/* <Menu /> */}
      <GlobalStyle></GlobalStyle>
      <ScrollBackground></ScrollBackground>
    </div>
  );
}

export default App;
