import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Dots from "./Dots";
import VideoItem from "./VideoItem";
import Divider from "./Divider";
import ScrollController from "./ScrollController";
import ScrollToTop from "./ScrollToTop";

const Outer = styled.div`
  height: 100vh;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  background-color: #bbb;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const InnerHalf = styled.div`
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 100px;
`;

const ScrollBackground = () => {
  const outerDivRef = useRef();
  const [scrollIndex, setScrollIndex] = useState(1);

  const DIVIDER_HEIGHT = 0.5;

  useEffect(() => {
    let timeoutId = null;

    const handleScroll = () => {
      clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        const { scrollTop, clientHeight } = outerDivRef.current;
        const currentScrollIndex = Math.round(scrollTop / clientHeight) + 1;

        if (scrollIndex !== currentScrollIndex) {
          setScrollIndex(currentScrollIndex);
        }
      }, 100);
    };

    const outerDiv = outerDivRef.current;
    outerDiv.addEventListener("scroll", handleScroll);

    return () => {
      outerDiv.removeEventListener("scroll", handleScroll);
    };
  }, [scrollIndex]);

  const handleScrollDown = () => {
    const { scrollTop } = outerDivRef.current;
    const pageHeight = window.innerHeight;

    if (scrollTop >= 0 && scrollTop < pageHeight) {
      console.log(pageHeight);
      console.log(scrollTop);
      setScrollIndex(2);
      outerDivRef.current.scrollTo({
        top: pageHeight + DIVIDER_HEIGHT,
        left: 0,
        behavior: "smooth",
      });
    } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
      console.log(pageHeight);
      console.log(scrollTop);
      setScrollIndex(3);
      outerDivRef.current.scrollTo({
        top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
        left: 0,
        behavior: "smooth",
      });
    } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
      console.log(pageHeight);
      console.log(scrollTop);
      setScrollIndex(4);
      outerDivRef.current.scrollTo({
        top: pageHeight * 3 + DIVIDER_HEIGHT * 3,
        left: 0,
        behavior: "smooth",
      });
    } else {
      console.log(pageHeight);
      console.log(scrollTop);
      setScrollIndex(5);
      outerDivRef.current.scrollTo({
        top: pageHeight * 3.5 + DIVIDER_HEIGHT * 4,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const handleScrollUp = () => {
    const { scrollTop } = outerDivRef.current;
    const pageHeight = window.innerHeight;

    if (scrollTop >= 0 && scrollTop < pageHeight) {
      setScrollIndex(1);
      outerDivRef.current.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } else if (scrollTop >= pageHeight && scrollTop < pageHeight * 2) {
      setScrollIndex(1);
      outerDivRef.current.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } else if (scrollTop >= pageHeight * 2 && scrollTop < pageHeight * 3) {
      setScrollIndex(2);
      outerDivRef.current.scrollTo({
        top: pageHeight + DIVIDER_HEIGHT,
        left: 0,
        behavior: "smooth",
      });
    } else if (scrollTop >= pageHeight * 3 && scrollTop < pageHeight * 3.5) {
      setScrollIndex(3);
      outerDivRef.current.scrollTo({
        top: pageHeight * 2 + DIVIDER_HEIGHT * 2,
        left: 0,
        behavior: "smooth",
      });
    } else {
      setScrollIndex(4);
      outerDivRef.current.scrollTo({
        top: pageHeight * 3 + DIVIDER_HEIGHT * 3,
        left: 0,
        behavior: "smooth",
      });
    }
  };

  const videosArray = [
    {
      video: "videos-main.MP4",
      text: "소멸의 위기 속에서 희망을 찾다\n생명지킴이",
    },
    {
      video: "videos-wolf.MP4",
      text: "한국의 멸종 위기 동물들은 매년 수치가 증가하고 있어 보호 조치가 시급한 상황입니다.",
    },
    {
      video: "videos-bird.MP4",
      text: "여러 단체와 정부는 인식 개선 교육과 경쟁력 있는 정책을 구축하여 생태계의 균형을 찾으려 노력하고 있습니다.",
    },
    {
      video: "videos-fish.MP4",
      text: "우리 모두가 적극적인 환경 보호와 지속 가능한 발전을 위해 노력하여 멸종 위기 동물들이 안전하게 서식할 수 있는 지구를 만들어 갈 필요가 있습니다.",
    },
  ];

  return (
    <Outer ref={outerDivRef}>
      <Dots scrollIndex={scrollIndex} />
      {videosArray.map((item, i) => (
        <React.Fragment key={i}>
          <VideoItem video={item.video} text={item.text} />
          <Divider />
        </React.Fragment>
      ))}
      <InnerHalf>푸터</InnerHalf>
      <ScrollController
        outerDivRef={outerDivRef}
        handleScrollUp={handleScrollUp}
        handleScrollDown={handleScrollDown}
      />
      <ScrollToTop outerDivRef={outerDivRef} scrollIndex={scrollIndex} />
    </Outer>
  );
};

export default ScrollBackground;
