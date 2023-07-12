import { RxHamburgerMenu, RxPerson } from "react-icons/rx";
import styled from "styled-components";
import { useState } from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import Menumodal from "./Menumodal";
import Login from "./Login";
import Loginmodal from "./LoginModal";

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
      ? "#ddd"
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
  cursor: default;
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
      ? "#bbb"
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
  justify-content: space-around;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

function Header({ scrollIndex }) {
  const [showLogin, setShowLogin] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleLoginOpen = () => {
    setShowLogin(true);
  };

  const handleLoginClose = () => {
    setShowLogin(false);
  };

  const handleMenuOpen = () => {
    setShowMenu(true);
  };

  const handleMenuClose = () => {
    setShowMenu(false);
  };

  return (
    <HeaderContainer scrollIndex={scrollIndex}>
      <HeaderDiv>
        <MenuButtonDiv>
          <IconButton scrollIndex={scrollIndex} onClick={handleMenuOpen}>
            <RxHamburgerMenu />
          </IconButton>
        </MenuButtonDiv>

        <MainTitle scrollIndex={scrollIndex}>
          <StyledLink to="/">LIFE SAVER</StyledLink>
        </MainTitle>

        <MypageContainer>
          <IconButton scrollIndex={scrollIndex} onClick={handleLoginOpen}>
            <RxPerson />
          </IconButton>
        </MypageContainer>
      </HeaderDiv>
      <Loginmodal open={showLogin} close={handleLoginClose}>
        <Login />
      </Loginmodal>
      <Menumodal open={showMenu} close={handleMenuClose}>
        <Menu />
      </Menumodal>
    </HeaderContainer>
  );
}

export default Header;
