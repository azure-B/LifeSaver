import React from "react";
import styled from "styled-components";
import { RxArrowUp } from "react-icons/rx";

const ScrollToTopButton = styled.button`
  position: fixed;
  z-index: 100;
  bottom: 50px;
  right: 50px;
  width: 50px;
  height: 50px;
  background-color: #bbb;
  opacity: 0.6;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.2s;
  border: none;

  &:before {
    justify-content: center;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 12px solid black;
  }

  &:hover {
    background-color: #999;
  }
`;

function animateScrollToTop(element, duration) {
  const start = element.scrollTop;
  const startTime = performance.now();

  const scroll = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    element.scrollTop = start * (1 - progress);

    if (progress < 1) {
      requestAnimationFrame(scroll);
    }
  };

  requestAnimationFrame(scroll);
}

const ScrollToTop = ({ outerDivRef }) => {
  const handleClick = () => {
    animateScrollToTop(outerDivRef.current, 500);
  };

  return (
    <ScrollToTopButton onClick={handleClick}>
      <RxArrowUp />
    </ScrollToTopButton>
  );
};

export default ScrollToTop;
