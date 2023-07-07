import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Menu() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lang, setLang] = useState("ko");
  const close = () => {
    setVisible(!visible);
  };
  const navigate = (value) => {
    setLang(value);
  };

  return (
    <>
      {" "}
      {visible && (
        <Menusection>
          <ul style={{ listStyle: "none", width: "100%" }}>
            <Menuhead>
              <li>
                <StyleLink to={"/"}>
                  {lang === "ko" ? "생명지킴이" : "LIFE SAVER"}
                </StyleLink>
              </li>
            </Menuhead>
            <br></br>
            <br></br>
            <br></br>
            <Menulist>
              <Main>
                <StyleLink to={"/Main"}>
                  {lang === "ko" ? "메인" : "MAIN"}
                </StyleLink>
              </Main>
              <br></br>
              <Mammalia>
                <StyleLink to={"/Mammalia"}>
                  {lang === "ko" ? "포유류" : "MAMMALIA"}
                </StyleLink>
              </Mammalia>
              <br></br>
              <Birds>
                <StyleLink to={"/Birds"}>
                  {lang === "ko" ? "조류" : "BIRDS"}
                </StyleLink>
              </Birds>
              <br></br>
              <Fish>
                <StyleLink to={"/Fish"}>
                  {lang === "ko" ? "어류" : "FISH"}
                </StyleLink>
              </Fish>
              <br></br>
              <NoticeBoard>
                <StyleLink to={"/NoticeBoard"}>
                  {lang === "ko" ? "게시판" : "NOTICE BOARD"}
                </StyleLink>
              </NoticeBoard>
            </Menulist>
            <br></br>
            <Language>
              <Button onClick={() => navigate("ko")}>KO</Button>
              <Button onClick={() => navigate("en")}>EN</Button>
            </Language>
          </ul>
        </Menusection>
      )}
      <CloseButton onClick={close}>
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z"
            fill="currentColor"
            fill-rule="evenodd"
            clip-rule="evenodd"
          ></path>
        </svg>
      </CloseButton>
    </>
  );
}

const Menusection = styled.ul`
  position: absolute;
  margin: 0 auto;
  width: 100%;
  height: 120%;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #bbb;
  z-index: 10;
`;

const Menuhead = styled.li`
  font-size: 30pt;
  text-align: center;
`;

const Menulist = styled.li`
  font-size: 15pt;
  text-align: center;
  width: 100%;
  height: 100%;
`;

const Main = styled.li`
  &:hover {
    opacity: 0.6;
    letter-spacing: 0.2em;
    padding-left: 0.2em;
    transition: all 0.3s ease-in-out;
  }
`;

const Mammalia = styled.li`
  &:hover {
    opacity: 0.6;
    letter-spacing: 0.2em;
    padding-left: 0.2em;
    transition: all 0.3s ease-in-out;
  }
`;

const Birds = styled.li`
  &:hover {
    opacity: 0.6;
    letter-spacing: 0.2em;
    padding-left: 0.2em;
    transition: all 0.3s ease-in-out;
  }
`;

const Fish = styled.li`
  &:hover {
    opacity: 0.6;
    letter-spacing: 0.2em;
    padding-left: 0.2em;
    transition: all 0.3s ease-in-out;
  }
`;

const NoticeBoard = styled.li`
  &:hover {
    opacity: 0.6;
    letter-spacing: 0.2em;
    padding-left: 0.2em;
    transition: all 0.3s ease-in-out;
  }
`;

const Button = styled.button`
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 15pt;
  text-align: center;
  color: #333;
  &:hover {
    color: gray;
    font-size: 14pt;
    transition: all 0.3s ease-in-out;
  }
`;

const Language = styled.div`
  text-align: center;
`;

const CloseButton = styled.button`
  position: absolute;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 15pt;
  width: 8rem;
  height: 6rem;
  z-index: 20;
  &:hover {
    color: gray;
    font-size: 14pt;
    transition: all 0.3s ease-in-out;
  }
`;

const StyleLink = styled(Link)`
  text-decoration: none;
  color: #333;
  &:hover {
    color: gray;
  }
`;

export default Menu;
