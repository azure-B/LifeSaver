import React, { useEffect, useState } from "react";
import axios from "axios";
import { SERVER } from "../../lib/config";
import DetailsContent from "./DetailsContent";
import DetailsButton from "./DetailsButton";
import DetailsSearch from "./DetailsSearch";
import { keyframes, styled } from "styled-components";
import Header from "../Header";
import { useLocation } from "react-router-dom";

function DetailsPage() {
  const { state } = useLocation();
  const storedProps = JSON.parse(localStorage.getItem("props"));
  const initialProps = state || storedProps || {};
  const [props, setProps] = useState(initialProps);
  const [bgAnimeSet, SetBgAnime] = useState(true);
  const [APINum, SetNum] = useState(0);
  const [API, SetAPI] = useState([]);
  const [Visible, SetVisible] = useState(false);
  const [ani, setAni] = useState(true);
  const [fade, setFade] = useState(false);
  const [errorMsg, setErrMsg] = useState(false);

  // props 변경 시 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("props", JSON.stringify(props));
  }, [props]);

  // 페이지 진입 시 localStorage에서 props 복원
  useEffect(() => {
    const storedProps = localStorage.getItem("props");
    if (storedProps) {
      setProps(JSON.parse(storedProps));
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      SetBgAnime(false);
    }, 300);
  });

  const ReturnEvent = () => {
    if (APINum > 0) {
      setAni(false);
      setFade(true);

      setTimeout(() => {
        setFade(false);
        setAni(true);
        SetNum(APINum - 1);
      }, 1000);
    } else {
      return alert("처음입니다");
    }
  };

  const SearchButtonEvent = () => {
    setAni(false);
    SetVisible(!Visible);
  };

  const NextEvent = async () => {
    if (APINum + 1 === API.length) {
      return alert("마지막입니다");
    } else {
      setAni(false);
      setFade(true);
      setTimeout(() => {
        setFade(false);
        setAni(true);
        SetNum(APINum + 1);
      }, 1000);
    }
  };

  const ExitButtonEvent = () => {
    SetVisible(!Visible);
  };

  const SearchEvent = async (name, endangered) => {
    setErrMsg(false);
    SetAPI([]);
    await axios
      .get(`${SERVER}/api/speciesSearch/condition`, {
        params: { name, classification: props.classification, endangered },
      })
      .then((result) => {
        SetAPI(result.data);
        SetVisible(!Visible);
        setAni(true);
        SetNum(0);

        if (!result.data[0]) setErrMsg(true);
      });
  };

  useEffect(() => {
    SetNum(0);
    axios
      .get(`${SERVER}/api/speciesSearch/condition`, {
        params: { classification: props.classification },
      })
      .then((result) => {
        SetAPI(result.data);
      });
  }, [props.classification]);

  const bgAnime = keyframes`
    0%{
      background-color: rgba(0,0,0,0.5);
    }
    100%{
      background-color: rgba(0, 0, 0, 1);
    }
    `;

  const DetailsDiv = styled.div`
    z-index: 1 !important;
    background-color: rgba(0, 0, 0, 1);

    animation: ${bgAnimeSet && bgAnime} 0.3s ease-in-out;
  `;

  const BackgroundImage = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("/animals/Background_mammal.jpeg");
    opacity: 0.3; /* 투명도 조절 */
    background-size: cover;
    filter: grayscale(90%);
  `;

  const ExamDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    width: 100%;
    height: 100vh;
    color: #bbb;
    animation: ${bgAnimeSet && bgAnime} 0.3s ease-in-out;
  `;

  const TableOfContents = styled.h3`
    position: absolute;
    font-size: 1.5rem;
    bottom: 10%;
    width: 100%;
    text-align: center;
    color: #bbb;
  `;

  return (
    <>
      <Header scrollIndex={6} />
      <DetailsDiv>
        <DetailsButton
          onReturn={ReturnEvent}
          onNext={NextEvent}
          onMain={SearchButtonEvent}
        />
        <TableOfContents>
          {API.length !== 0 && `${APINum + 1}/${API.length}`}
        </TableOfContents>
        <BackgroundImage />

        {Visible && (
          <>
            <DetailsSearch Exit={ExitButtonEvent} Search={SearchEvent} />
          </>
        )}
        {API[0] ? (
          <>
            <DetailsContent animal={API[APINum]} animation={ani} fade={fade} />
          </>
        ) : (
          <ExamDiv> {errorMsg ? "검색결과가없습니다" : "로딩중"}</ExamDiv>
        )}
      </DetailsDiv>
    </>
  );
}

export default DetailsPage;
