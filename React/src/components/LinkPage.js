// LinkPage.js

import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { setProps } from "../Store"; // Redux 액션 생성자 함수를 가져옵니다.

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
  const dispatch = useDispatch(); // useDispatch 훅을 사용하여 액션을 디스패치합니다.

  const handleClick = (classification) => {
    dispatch(setProps({ classification })); // Redux store의 classification 값을 변경합니다.
    navigate("/animals"); // "/animals"로 이동합니다.
  };

  return (
    <PageSection>
      <ImageWrapper>
        <ImageContainer onClick={() => handleClick("포유류")}>
          <Image src="/images/image-1.jpg" alt="포유류" />
          <TextOverImage>포유류</TextOverImage>
        </ImageContainer>
        <ImageContainer onClick={() => handleClick("조류")}>
          <Image src="/images/image-2.jpg" alt="조류" />
          <TextOverImage>조류</TextOverImage>
        </ImageContainer>
        <ImageContainer onClick={() => handleClick("어류")}>
          <Image src="/images/image-3.jpg" alt="어류" />
          <TextOverImage>어류</TextOverImage>
        </ImageContainer>
      </ImageWrapper>
    </PageSection>
  );
};

export default LinkPage;
