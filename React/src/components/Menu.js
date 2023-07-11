import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import styled from "styled-components";
import { setProps } from "../Store"; // Redux 액션 생성자 함수를 가져옵니다.

function Menu() {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lang, setLang] = useState("ko");
  const close = () => {
    setVisible(!visible);
  };
  const navigate = (value) => {
    console.log("ASDSA");
    setLang(value);
  };

  const navigator = useNavigate();
  const dispatch = useDispatch(); // useDispatch 훅을 사용하여 액션을 디스패치합니다.

  const handleClick = (classification) => {
    dispatch(setProps({ classification })); // Redux store의 classification 값을 변경합니다.
    navigator("/animals"); // "/animals"로 이동합니다.
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
              "padding-top": "10%",
            }}
          >
            <Menuhead>
              <li>
                <StyleLink>
                  {lang === "ko" ? "생명지킴이" : "LIFE SAVER"}
                </StyleLink>
              </li>
            </Menuhead>
            <Menulist>
              <Main>
                <StyleLink to={"/"}>
                  {lang === "ko" ? "메인" : "MAIN"}
                </StyleLink>
              </Main>
              <br></br>
              <Mammalia>
                <StyleLink onClick={() => handleClick("포유류")}>
                  {lang === "ko" ? "포유류" : "MAMMALIA"}
                </StyleLink>
              </Mammalia>
              <br></br>
              <Birds>
                <StyleLink onClick={() => handleClick("조류")}>
                  {lang === "ko" ? "조류" : "BIRDS"}
                </StyleLink>
              </Birds>
              <br></br>
              <Fish>
                <StyleLink onClick={() => handleClick("어류")}>
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
  height: 100%;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
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
  height: 60%;
  margin-top: 4%;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
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
  color: white;
  &:hover {
    color: gray;
    font-size: 14pt;
    transition: all 0.3s ease-in-out;
  }
`;

const Language = styled.div`
  text-align: center;
  position: fixed;
  width: 100%;
  bottom: 10%;
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
