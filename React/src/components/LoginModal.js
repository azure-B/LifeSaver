import React from "react";
import styled, { keyframes } from "styled-components";
import { RxCross1 } from "react-icons/rx";

const ModalBackground = styled.div`
  display: ${(props) => (props.open ? "flex" : "none")};
  animation: ${(props) => (props.open ? modalBgShow : "")} 0.3s;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.6);
  align-items: center;
`;

const modalShow = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const modalBgShow = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ModalSection = styled.section`
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  border-radius: 0.3rem;
  background-color: #bbb;
  animation: ${modalShow} 0.3s;
  overflow: hidden;
`;

const CloseButton = styled.button`
  position: relative;
  border: none;
  background-color: transparent;
  font-size: 2rem;
  width: 8rem;
  height: 6rem;
  justify-content: center;
  align-items: center;
  float: right;
  z-index: 20;
  color: #333;
  &:hover {
    color: #ddd;
    font-size: 14pt;
    transition: all 0.3s ease-in-out;
  }
`;

const ModalMain = styled.main`
  position: relative;
  height: 100vh;
  width: 100%;
`;

const BgImage = styled.img`
  position: absolute;
  top: 5rem;
  right: -30rem;
  object-fit: cover;
  overflow: hidden;

  @media (max-width: 1300px) {
    right: -40rem;
  }
  @media (max-width: 1024px) {
    display: none;
  }
`;

const Example = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const LoginModal = (props) => {
  const { open, close } = props;

  return (
    <ModalBackground open={open}>
      <Example>
        <BgImage src="/images/hands.png" alt="손"></BgImage>
        <ModalSection>
          <CloseButton onClick={close}>
            <RxCross1 />
          </CloseButton>
          <ModalMain>{props.children}</ModalMain>
        </ModalSection>
      </Example>
    </ModalBackground>
  );
};

export default LoginModal;
