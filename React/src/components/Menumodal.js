import React from "react";
import styled, { keyframes } from "styled-components";

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
    margin-top: -50px;
  }
  to {
    opacity: 1;
    margin-top: 0;
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
  height: 100%;
  margin: 0 auto;
  border-radius: 0.3rem;
  background-color: #bbb;
  animation: ${modalShow} 0.3s;
  overflow: hidden;
`;

const ModalHeader = styled.header`
  position: relative;
  padding: 16px 64px 16px 16px;
  background-color: #bbb;
  font-weight: 700;
`;

const CloseButton = styled.button`
  position: absolute;
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 15pt;
  width: 8rem;
  height: 6rem;
  z-index: 20;
  &:hover {
    color: gray;
    font-size: 14pt;
    transition: all 0.3s ease-in-out;
  }
`;

const ModalMain = styled.main`
  padding: 16px;
`;

const Menumodal = (props) => {
  const { open, close, header } = props;

  return (
    <ModalBackground open={open}>
      <ModalSection>
        <ModalHeader>
          {header}
          <CloseButton onClick={close}>&times;</CloseButton>
        </ModalHeader>
        <ModalMain>{props.children}</ModalMain>
      </ModalSection>
    </ModalBackground>
  );
};

export default Menumodal;
