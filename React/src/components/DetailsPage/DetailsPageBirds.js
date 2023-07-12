import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { SERVER } from "../../lib/config";
import DetailsContent from "./DetailsContent";
import DetailsButton from "./DetailsButton";
import DetailsSearch from "./DetailsSearch";
import { keyframes, styled } from "styled-components";
import Header from "../Header";

const DetailsPageBird = () => {
  const [APINum, SetNum] = useState(0);
  const [API, SetAPI] = useState([]);
  const [Visible, SetVisible] = useState(false);
  const [ani, setAni] = useState(true);
  const [fade, setFade] = useState(false);
  const [errorMsg, setErrMsg] = useState(false);

  const ReturnEvent = () => {
    if (APINum > 0) {
      setAni(false);
      setFade(true);
      setTimeout(() => {
        setFade(false);
        setAni(true);
        SetNum((prevNum) => prevNum - 1);
      }, 1000);
    } else {
      alert("처음입니다");
    }
  };

  const SearchButtonEvent = () => {
    setAni(false);
    setFade(false);
    SetVisible((prevVisible) => !prevVisible);
  };

  const NextEvent = () => {
    if (APINum + 1 === API.length) {
      alert("마지막입니다");
    } else {
      setAni(false);
      setFade(true);
      setTimeout(() => {
        setFade(false);
        setAni(true);
        SetNum((prevNum) => prevNum + 1);
      }, 1000);
    }
  };

  const SearchEvent = async (name, endangered) => {
    setErrMsg(false);
    SetAPI([]);
    try {
      const response = await axios.get(
        `${SERVER}/api/speciesSearch/condition`,
        {
          params: {
            name,
            classification: "조류",
            endangered,
          },
        }
      );
      const data = response.data;
      SetAPI(data);
      SetVisible((prevVisible) => !prevVisible);
      setAni(true);
      SetNum(0);
      if (!data[0]) setErrMsg(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    SetNum(0);
    axios
      .get(`${SERVER}/api/speciesSearch/condition`, {
        params: { classification: "조류" },
      })
      .then((result) => {
        SetAPI(result.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const DetailsDiv = styled.div`
    z-index: 1 !important;
    background-color: rgba(0, 0, 0, 1);
  `;

  const BackgroundImage = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("/animals/Background_birds.jpeg");
    opacity: 0.3;
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
            <DetailsSearch Exit={SearchButtonEvent} Search={SearchEvent} />
          </>
        )}

        {API.length !== 0 ? (
          <DetailsContent animal={API[APINum]} animation={ani} fade={fade} />
        ) : (
          <ExamDiv>{errorMsg && "검색결과가 없습니다"}</ExamDiv>
        )}
      </DetailsDiv>
    </>
  );
};

export default DetailsPageBird;
