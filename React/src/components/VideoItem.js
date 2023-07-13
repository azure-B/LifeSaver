import React from "react";
import styled from "styled-components";
import TextLayer from "./TextLayer";

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const VideoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  min-width: 100%;
  background-color: black;
`;

const Video = styled.video`
  z-index: 1;
  pointer-events: none;
  object-fit: cover;
  width: 100% !important;
  height: 100% !important;
  opacity: 0.5;
`;

const VideoItem = ({ video, text, scrollIndex }) => {
  return (
    <Container>
      <VideoWrapper>
        <TextLayer text={text} scrollIndex={scrollIndex} />
        <Video autoPlay loop muted playsInline>
          <source src={`./videos/${video}`} type="video/mp4" />
        </Video>
      </VideoWrapper>
    </Container>
  );
};

export default VideoItem;
