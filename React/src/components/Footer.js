import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Footer = () => {
  const [lang, setLang] = useState("en");

  return (
    <>
      <Footerpage>
        <ul style={{ listStyle: "none", width: "100%" }}>
          <Footerhead>
            <StyleLink to={"/"}>
              {lang === "en" ? "LIFE SAVER" : "생명지킴이"}
            </StyleLink>
          </Footerhead>
          <Content>
            <Main>
              <StyleLink to={"/"}>{lang === "en" ? "MAIN" : "메인"}</StyleLink>
            </Main>
            <Mam>
              <StyleLink to={"/animals"}>
                {lang === "en" ? "MAMMALIA" : "포유류"}
              </StyleLink>
            </Mam>
            <Birds>
              <StyleLink to={"/animals"}>
                {lang === "en" ? "BIRDS" : "조류"}
              </StyleLink>
            </Birds>
            <Fish>
              <StyleLink to={"/animals"}>
                {lang === "en" ? "FISH" : "어류"}
              </StyleLink>
            </Fish>
            <Notice>
              <StyleLink to={"/NoticeBoard"}>
                {lang === "en" ? "NOTICE BORAD" : "게시판"}
              </StyleLink>
            </Notice>
          </Content>
          <Text>
            {lang === "en"
              ? "Address: 6 Sungmun 4-gil, Mapo-gu, Seoul Phone: 070-7353-2750 Email: service@spreatics.co"
              : "주소: 서울특별시 마포구 숭문 4길 6 전화: 070-7353-2750 이메일: service@spreatics.co"}
          </Text>
          <br></br>
          <Text>
            {lang === "en"
              ? "Business Registration Number: 644-87-01663 Representative: Won Tae-kyung"
              : "사업자등록번호: 644-87-01663 대표자: 원태경"}
            <Klink>{lang === "en" ? "" : "개인정보처리방침"}</Klink>
          </Text>
        </ul>
      </Footerpage>
    </>
  );
};

export default Footer;

const Footerpage = styled.ul`
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 30vh;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #bbb;
`;

const Footerhead = styled.li`
  font-size: 50px;
  padding-bottom: 0px;
  text-align: center;
`;

const Content = styled.li`
  font-size: 15px;
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  padding-top: 50px;
`;

const Main = styled.li`
  margin-left: 30px;
  &:hover {
    color: gray;
  }
`;

const Mam = styled.li`
  margin-left: 30px;
  &:hover {
    color: gray;
  }
`;

const Birds = styled.li`
  margin-left: 30px;
  &:hover {
    color: gray;
  }
`;

const Fish = styled.li`
  margin-left: 30px;
  &:hover {
    color: gray;
  }
`;

const Notice = styled.li`
  margin-left: 30px;
  &:hover {
    color: gray;
  }
`;

const Text = styled.span`
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #333;
`;

const StyleLink = styled(Link)`
  text-decoration: none;
  color: #333;
  &:hover {
    color: gray;
  }
`;

const Klink = styled(Link)`
  font-weight: 900;
  text-decoration: none;
  color: #333;
  margin-left: 10px;
  &:hover {
    color: gray;
  }
`;
