import { RxHamburgerMenu, RxPerson } from "react-icons/rx";
import styled from "styled-components";

const HeaderContainer = styled.div`
  position: fixed;
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 6rem;
  align-items: center;
  z-index: 3;
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
  color: ${(props) =>
    props.scrollIndex === 1
      ? "#333"
      : props.scrollIndex === 2
      ? "#bbb"
      : props.scrollIndex === 3
      ? "#bbb"
      : props.scrollIndex === 4
      ? "#bbb"
      : props.scrollIndex === 5
      ? "#333"
      : "white"};
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
  color: ${(props) =>
    props.scrollIndex === 1
      ? "#333"
      : props.scrollIndex === 2
      ? "#bbb"
      : props.scrollIndex === 3
      ? "#bbb"
      : props.scrollIndex === 4
      ? "#bbb"
      : props.scrollIndex === 5
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
  color: ${(props) =>
    props.scrollIndex === 1
      ? "#333"
      : props.scrollIndex === 2
      ? "#bbb"
      : props.scrollIndex === 3
      ? "#bbb"
      : props.scrollIndex === 4
      ? "#bbb"
      : props.scrollIndex === 5
      ? "#333"
      : "white"};
  transition: color 0.5s ease;
  &:hover {
    opacity: 0.6;
    transition: 0.5s;
  }
`;

function Header({ scrollIndex }) {
  return (
    <HeaderContainer>
      <HeaderDiv>
        <MenuButtonDiv>
          <IconButton scrollIndex={scrollIndex}>
            <RxHamburgerMenu />
          </IconButton>
        </MenuButtonDiv>

        <MainTitle scrollIndex={scrollIndex}>Life Saver</MainTitle>

        <MypageContainer>
          <TransButton scrollIndex={scrollIndex}>EN</TransButton>
          <IconButton scrollIndex={scrollIndex}>
            <RxPerson />
          </IconButton>
        </MypageContainer>
      </HeaderDiv>
    </HeaderContainer>
  );
}

export default Header;
