import React from "react";
import styled from "styled-components";

const DotWrapper = styled.div`
  width: 10px;
  height: 10px;
  border: 1px solid #bbb;
  border-radius: 999px;
  background-color: ${({ $active }) => ($active ? "#bbb" : "transparent")};
  transition: background-color 0.5s;
`;

const Dot = ({ num, scrollIndex }) => {
  return <DotWrapper $active={scrollIndex === num}></DotWrapper>;
};

const FixedWrapper = styled.div`
  position: fixed;
  top: 370px;
  right: 50px;
  z-index: 3;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 20px;
  height: 120px; // 간격을 맞추기 위해 높이를 조금 늘립니다.
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
