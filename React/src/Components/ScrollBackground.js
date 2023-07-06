import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import Dots from "./Dots";
import VideoItem from "./VideoItem";
import Divider from "./Divider";
import ScrollController from "./ScrollController";
import ScrollToTop from "./ScrollToTop";
import EmptyItem from "./EmptyItem";
import LinkPage from "./LinkPage";
import Header from "./Header";
import Footer from "./Footer";

const Outer = styled.div`
  background-color: #bbb;
  height: 100vh;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

// const InnerHalf = styled.div`
//   height: 50vh;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   font-size: 100px;
// `;

const ScrollBackground = () => {
  const outerDivRef = useRef();
  const [scrollIndex, setScrollIndex] = useState(1);

  const DIVIDER_HEIGHT = 0.5;

  useEffect(() => {
    const listener = () => {
      const element = outerDivRef.current;
      const { scrollTop, clientHeight } = element;
      const newScrollIndex =
        Math.floor(scrollTop / (clientHeight + DIVIDER_HEIGHT)) + 1;

      setScrollIndex(newScrollIndex);
    };

    const outerElement = outerDivRef.current;
    outerElement.addEventListener("scroll", listener);

    return () => {
      outerElement.removeEventListener("scroll", listener);
    };
  }, []);

  const waitForScrollToEnd = (element) => {
    return new Promise((resolve) => {
      let timeoutId;

      const onScroll = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          element.removeEventListener("scroll", onScroll);
          resolve();
        }, 100);
      };

      element.addEventListener("scroll", onScroll);
    });
  };

  const scrollTo = async (idx) => {
    const pageHeight = window.innerHeight;

    outerDivRef.current.scrollTo({
      top: (pageHeight + DIVIDER_HEIGHT) * (idx - 1),
      left: 0,
      behavior: "smooth",
    });
    await waitForScrollToEnd(outerDivRef.current);
    setScrollIndex(idx);
  };

  const handleScrollUp = async () => {
    const currentScrollIndex = scrollIndex;
    if (currentScrollIndex > 1) {
      await scrollTo(currentScrollIndex - 1);
    }
  };

  const handleScrollDown = async () => {
    const currentScrollIndex = scrollIndex;
    if (currentScrollIndex < videosArray.length + 2) {
      await scrollTo(currentScrollIndex + 1);
    }
  };

  const videosArray = [
    {
      video: "videos-main.MP4",
      text: "소멸의 위기 속에서 희망을 찾다\n생명지킴이",
    },
    {
      video: "videos-wolf.MP4",
      text: "한국의 멸종 위기 동물들은\n\n매년 수치가 증가하고 있어\n 보호 조치가 시급한 상황입니다.",
    },
    {
      video: "videos-bird.MP4",
      text: "여러 단체와 정부는\n\n 인식 개선 교육과 경쟁력 있는 정책을 구축하여\n 생태계의 균형을 찾으려 노력하고 있습니다.",
    },
    {
      video: "videos-fish.MP4",
      text: "우리 모두가\n\n 적극적인 환경 보호와 지속 가능한 발전을 위해 노력하여\n 멸종 위기 동물들이 안전하게 서식할 수 있는\n 지구를 만들어 갈 필요가 있습니다.",
    },
  ];

  return (
    <Outer ref={outerDivRef}>
      <Header scrollIndex={scrollIndex} />
      <Dots scrollIndex={scrollIndex} />
      {videosArray.map((item, i) => (
        <React.Fragment key={i}>
          {item.video ? (
            <VideoItem
              video={item.video}
              text={item.text}
              scrollIndex={scrollIndex}
            />
          ) : (
            <EmptyItem></EmptyItem>
          )}
          <Divider />
        </React.Fragment>
      ))}
      <LinkPage></LinkPage>
      <Footer></Footer>

      <ScrollController
        outerDivRef={outerDivRef}
        handleScrollUp={handleScrollUp}
        handleScrollDown={handleScrollDown}
      />
      <ScrollToTop outerDivRef={outerDivRef} />
    </Outer>
  );
};

export default ScrollBackground;
