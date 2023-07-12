import React from "react";
import styled from "styled-components";

const DotWrapper = styled.div`
  width: 10px;
  height: 10px;
  border: ${({ $scrollIndex }) =>
    $scrollIndex === 5 || $scrollIndex === 6
      ? "1px solid #333"
      : "1px solid #bbb"};
  border-radius: 999px;
  background-color: ${({ $active, $scrollIndex }) =>
    $active
      ? $scrollIndex === 5 || $scrollIndex === 6
        ? "#333"
        : "#bbb"
      : "transparent"};
  transition: background-color 0.5s, border 0.5s;

  @media (max-width: 600px) {
    background-color: ${({ $active, $scrollIndex }) =>
      $active ? ($scrollIndex === 5 ? "#333" : "#bbb") : "transparent"};

    border: ${({ $scrollIndex }) =>
      $scrollIndex === 5 ? "1px solid #333" : "1px solid #bbb"};
  }
`;

const Dot = ({ num, scrollIndex }) => {
  return (
    <DotWrapper
      $active={scrollIndex === num}
      $scrollIndex={scrollIndex}
    ></DotWrapper>
  );
};

const FixedWrapper = styled.div`
  position: fixed;
  top: 370px;
  right: 50px;
  z-index: 3;
  @media (max-width: 600px) {
    top: 6rem;
    left: 38%;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 20px;
  height: 120px; // 간격을 맞추기 위해 높이를 조금 늘립니다.

  @media (max-width: 600px) {
    flex-direction: row;
    height: 20px;
    width: 120px;
  }
`;

const Dots = ({ scrollIndex }) => {
  return (
    <FixedWrapper>
      <FlexContainer>
        <Dot num={1} scrollIndex={scrollIndex}></Dot>
        <Dot num={2} scrollIndex={scrollIndex}></Dot>
        <Dot num={3} scrollIndex={scrollIndex}></Dot>
        <Dot num={4} scrollIndex={scrollIndex}></Dot>
        <Dot num={5} scrollIndex={scrollIndex}></Dot>
        <Dot num={6} scrollIndex={scrollIndex}></Dot>
      </FlexContainer>
    </FixedWrapper>
  );
};

export default Dots;
