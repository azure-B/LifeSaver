import React from "react";
import styled from "styled-components";

const StyledLine1 = styled.div`
  display: flex;
  position: absolute;
  z-index: 2;
  color: ${({ scrollIndex }) =>
    scrollIndex === 1
      ? "#ddd"
      : scrollIndex === 2
      ? "#fff"
      : scrollIndex === 3
      ? "#bbb"
      : "#fff"};
  transition: color 0.5s ease;
  font-size: 36px;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const StyledLine2 = styled(StyledLine1)`
  top: calc(45% + 60px);
  color: #fff;
  transition: color 0.5s ease;
  font-size: 60px;
`;

const StyledLine3 = styled(StyledLine1)`
  top: calc(45% + 40px);
`;
const StyledLine4 = styled(StyledLine1)`
  top: calc(45% + 80px);
`;
const StyledLine5 = styled(StyledLine1)`
  top: calc(45% + 120px);
`;

const TextLayer = ({ text, scrollIndex }) => {
  const textArray = text.split("\n");

  return (
    <>
      {textArray.map((line, index) => {
        const StyledLine =
          index === 0
            ? StyledLine1
            : index === 1
            ? StyledLine2
            : index === 2
            ? StyledLine3
            : index === 3
            ? StyledLine4
            : index === 4
            ? StyledLine5
            : null;
        if (StyledLine) {
          return (
            <StyledLine key={index} scrollIndex={scrollIndex}>
              {line}
            </StyledLine>
          );
        } else {
          return null;
        }
      })}
    </>
  );
};

export default TextLayer;
