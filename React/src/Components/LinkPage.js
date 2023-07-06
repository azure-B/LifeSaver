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
  height: 50vh;
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
  background-color: rgba(0, 0, 0, 0.5); // 텍스트 배경의 투명도 조절
  color: white; // 텍스트 색상
  font-weight: bold; // 텍스트 스타일 설정
  opacity: 0;
  transition: all 0.3s ease;

  &:hover {
    opacity: 1;
  }
`;

const LinkPage = () => {
  const history = useNavigate();

  // Handle click event and redirect to the respective page
  const handleClick = (path) => {
    history.push(path);
  };

  return (
    <PageSection>
      <ImageWrapper>
        <ImageContainer onClick={() => handleClick("/page-1")}>
          <Image src="/images/image-1.jpg" alt="포유류" />
          <TextOverImage>포유류</TextOverImage>
        </ImageContainer>
        <ImageContainer onClick={() => handleClick("/page-2")}>
          <Image src="/images/image-2.jpg" alt="조류" />
          <TextOverImage>조류</TextOverImage>
        </ImageContainer>
        <ImageContainer onClick={() => handleClick("/page-3")}>
          <Image src="/images/image-3.jpg" alt="어류" />
          <TextOverImage>어류</TextOverImage>
        </ImageContainer>
      </ImageWrapper>
    </PageSection>
  );
};

export default LinkPage;
