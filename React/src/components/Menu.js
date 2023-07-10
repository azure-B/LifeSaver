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
  display: inline-block;
  &:hover {
    color: gray;
    font-size: 14pt;
    transition: all 0.3s ease-in-out;
  }
`;

const Language = styled.div`
  text-align: center;
`;

const StyleLink = styled(Link)`
  text-decoration: none;
  color: #333;
  &:hover {
    color: gray;
  }
`;

export default Menu;
