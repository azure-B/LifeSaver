import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

function Menu() {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const closeAndNavigate = (path) => {
    close();
    if (location.pathname === path) {
      window.location.reload();
    } else {
      setTimeout(() => {
        navigate(path);
      }, 100);
    }
  };

  const close = () => {
    setVisible(!visible);
  };

  return (
    <>
      {visible && (
        <Menusection>
          <ul
            style={{
              listStyle: "none",
              width: "100%",
              height: "100%",
            }}
          >
            <Menuhead>
              <li>
                <StyleLink to="/" onClick={() => closeAndNavigate("/")}>
                  LIFE SAVER
                </StyleLink>
              </li>
            </Menuhead>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <Menulist>
              <Main>
                <StyleLink to="/" onClick={() => closeAndNavigate("/")}>
                  메인
                </StyleLink>
              </Main>

              <Mammalia>
                <StyleLink to="/animals/mammal">포유류</StyleLink>
              </Mammalia>

              <Birds>
                <StyleLink to="/animals/birds">조류</StyleLink>
              </Birds>

              <Fish>
                <StyleLink to="/animals/fish">어류</StyleLink>
              </Fish>

              <NoticeBoard>
                <StyleLink
                  to="/NoticeBoard"
                  onClick={() => closeAndNavigate("/NoticeBoard")}
                >
                  게시판
                </StyleLink>
              </NoticeBoard>
            </Menulist>
          </ul>
        </Menusection>
      )}
    </>
  );
}

const Menusection = styled.ul`
  position: absolute;
  width: 30%;
  height: 100%;
  top: 20%;
  left: 35%;
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 10;
`;

const Menuhead = styled.li`
  font-size: 3.5rem;
  text-align: center;
  font-weight: bold;
  &:hover {
    transition: 0.5s;
    opacity: 0.6;
  }
`;

const Menulist = styled.li`
  font-size: 1.8rem;
  text-align: center;
  width: 100%;
  height: 100%;
  color: #333;
`;

const Main = styled.li`
  padding: 1rem;
  &:hover {
    transition: 0.5s;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 5px;
  }
`;

const Mammalia = styled.li`
  padding: 1rem;
  &:hover {
    transition: 0.5s;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 5px;
  }
`;

const Birds = styled.li`
  padding: 1rem;
  &:hover {
    transition: 0.5s;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 5px;
  }
`;

const Fish = styled.li`
  padding: 1rem;
  &:hover {
    transition: 0.5s;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 5px;
  }
`;

const NoticeBoard = styled.li`
  padding: 1rem;
  &:hover {
    transition: 0.5s;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 5px;
  }
`;

const StyleLink = styled(Link)`
  text-decoration: none;
  color: white;

  &:hover {
    opacity: 0.9;
  }
`;

const StyleLink2 = styled(Link)`
  text-decoration: none;
  color: white;

  &:hover {
    opacity: 0.9;
  }
`;

export default Menu;
