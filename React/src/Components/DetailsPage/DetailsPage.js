import { useEffect, useState } from "react";
import axios from "axios";
import { SERVER } from "../../lib/config";
import DetailsContent from "./DetailsContent";
import DetailsButton from "./DetailsButton";
import DetailsSearch from "./DetailsSearch";
import { styled } from "styled-components";

function DetailsPage(props) {
  const { classification } = props;

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
        params: { name, classification, endangered },
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
        params: { classification },
      })
      .then((result) => {
        SetAPI(result.data);
      });
  }, []);

  const DetailsDiv = styled.div`
    z-index: 1 !important;
    background-color: rgba(0, 0, 0, 0.2);
  `;

  const ExamDiv = styled.div`
    background-color: rgba(0, 0, 0, 0.1);
    width: 100%;
    height: 100vh;
  `;

  return (
    <DetailsDiv>
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
      <DetailsButton
        onReturn={ReturnEvent}
        onNext={NextEvent}
        onMain={SearchButtonEvent}
      />
    </DetailsDiv>
  );
}

export default DetailsPage;
