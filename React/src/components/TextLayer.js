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
      ? "#ddd"
      : scrollIndex === 3
      ? "#ddd"
      : "#ddd"};
  transition: color 0.5s ease;
  font-size: 2.4rem;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 1;
  width: 100%;
  justify-content: center;
  align-items: center;

  @media (min-width: 600px) and (max-width: 1024px) {
    font-size: 1.8rem;
  }
  @media (max-width: 600px) {
    font-size: 1.4rem;
  }
`;

const StyledLine2 = styled(StyledLine1)`
  top: calc(45% + 3.8rem);
  color: #eee;
  transition: color 0.5s ease;
  font-size: 3.8rem;
  @media (min-width: 600px) and (max-width: 1024px) {
    font-size: 3.2rem;
    top: calc(45% + 3rem);
  }

  @media (max-width: 600px) {
    font-size: 2.8rem;
    top: calc(45% + 2.5rem);
  }
`;

const StyledLine3 = styled(StyledLine1)`
  top: calc(45% + 3rem);

  @media (min-width: 600px) and (max-width: 1024px) {
    top: calc(45% + 2.5rem);
  }

  @media (max-width: 600px) {
    top: calc(45% + 2rem);
  }
`;
const StyledLine4 = styled(StyledLine1)`
  top: calc(45% + 6rem);
  @media (min-width: 600px) and (max-width: 1024px) {
    top: calc(45% + 5rem);
  }

  @media (max-width: 600px) {
    top: calc(45% + 4rem);
  }
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
