import { RxHamburgerMenu, RxPerson } from "react-icons/rx";
import styled from "styled-components";
import Login from "./Login";
import { useState } from "react";
import Modal from "./Modal";

const HeaderContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 6rem;
  align-items: center;
  z-index: 3;
  background-color: ${({ scrollIndex }) =>
    scrollIndex === 6 ? "rgba(0, 0, 0, .6)" : "transparent"};
  transition: background-color 0.5s ease;
`;

const HeaderDiv = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const MainTitle = styled.div`
  font-size: 3.5rem;
  color: ${({ scrollIndex }) =>
    scrollIndex === 1
      ? "#333"
      : scrollIndex === 2
      ? "#bbb"
      : scrollIndex === 3
      ? "#bbb"
      : scrollIndex === 4
      ? "#bbb"
      : scrollIndex === 5
      ? "#333"
      : "#bbb"};
  transition: color 0.5s ease;
  font-weight: bold;
  &:hover {
    opacity: 0.6;
    transition: 0.5s;
  }
`;

const MenuButtonDiv = styled.div`
  display: flex;
  width: 8rem;
  height: 100%;
  align-items: center;
  justify-content: space-around;
`;

const IconButton = styled.div`
  font-size: 2rem;
  cursor: pointer;
  color: ${({ scrollIndex }) =>
    scrollIndex === 1
      ? "#333"
      : scrollIndex === 2
      ? "#bbb"
      : scrollIndex === 3
      ? "#bbb"
      : scrollIndex === 4
      ? "#bbb"
      : scrollIndex === 5
      ? "#333"
      : "white"};
  transition: color 0.5s ease;
  &:hover {
    opacity: 0.6;
    transition: 0.5s;
  }
`;

const MypageContainer = styled.div`
  display: flex;
  width: 8rem;
  height: 100%;
  align-items: center;
  justify-content: flex-start;
`;

const TransButton = styled.div`
  font-size: 1.2rem;
  margin-right: 20px;
  cursor: pointer;
  color: ${({ scrollIndex }) =>
    scrollIndex === 1
      ? "#333"
      : scrollIndex === 2
      ? "#bbb"
      : scrollIndex === 3
      ? "#bbb"
      : scrollIndex === 4
      ? "#bbb"
      : scrollIndex === 5
      ? "#333"
      : "white"};
  transition: color 0.5s ease;
  &:hover {
    opacity: 0.6;
    transition: 0.5s;
  }
`;

function Header({ scrollIndex }) {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginOpen = () => {
    setShowLogin(true);
  };

  const handleLoginClose = () => {
    setShowLogin(false);
  };

  return (
    <HeaderContainer scrollIndex={scrollIndex}>
      <HeaderDiv>
        <MenuButtonDiv>
          <IconButton scrollIndex={scrollIndex}>
            <RxHamburgerMenu />
          </IconButton>
        </MenuButtonDiv>

        <MainTitle scrollIndex={scrollIndex}>LIFE SAVER</MainTitle>

        <MypageContainer>
          <TransButton scrollIndex={scrollIndex}>EN</TransButton>
          <IconButton scrollIndex={scrollIndex} onClick={handleLoginOpen}>
            <RxPerson />
          </IconButton>
        </MypageContainer>
      </HeaderDiv>

      <Modal open={showLogin} close={handleLoginClose} header="Login">
        <Login />
      </Modal>
    </HeaderContainer>
  );
}

export default Header;
