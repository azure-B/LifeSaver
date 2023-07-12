// LinkPage.js

import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PageSection = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageWrapper = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  justify-content: center;
  align-items: center;
  cursor: pointer;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const ImageContainer = styled.div`
  cursor: pointer;
  width: calc(33.33% - 1rem);
  height: 70vh;
  position: relative;
`;

const TextOverImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: #bbb;
  font-weight: bold;
  opacity: 0;
  transition: all 0.3s ease;
  font-size: 1.5rem;

  &:hover {
    opacity: 1;
  }
`;

const LinkPage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/animals/mammal");
  };
  const handleClick2 = () => {
    navigate("/animals/birds");
  };
  const handleClick3 = () => {
    navigate("/animals/fish");
  };

  return (
    <PageSection>
      <ImageWrapper>
        <ImageContainer onClick={() => handleClick()}>
          <Image src="/images/image-1.jpg" alt="포유류" />
          <TextOverImage>포유류</TextOverImage>
        </ImageContainer>
        <ImageContainer onClick={() => handleClick2()}>
          <Image src="/images/image-2.jpg" alt="조류" />
          <TextOverImage>조류</TextOverImage>
        </ImageContainer>
        <ImageContainer onClick={() => handleClick3()}>
          <Image src="/images/image-3.jpg" alt="어류" />
          <TextOverImage>어류</TextOverImage>
        </ImageContainer>
      </ImageWrapper>
    </PageSection>
  );
};

export default LinkPage;
