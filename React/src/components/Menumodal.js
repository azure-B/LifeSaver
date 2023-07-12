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
  height: 100%;
  border-radius: 0.3rem;
  background-color: #bbb;
  animation: ${modalShow} 0.3s;
  overflow: hidden;
`;

const ModalHeader = styled.header`
  position: relative;
  background-color: #bbb;
  font-weight: 700;
  height: 6rem;
`;

const CloseButton = styled.button`
  display: flex;
  width: 8rem;
  height: 100%;
  align-items: center;
  justify-content: space-around;
  font-size: 2rem;
  z-index: 20;
  padding-bottom: 7px;
  color: #333;
  background-color: #bbb;
  border: none;
  &:hover {
    opacity: 0.6;
    transition: 0.5s;
  }
`;

const ModalMain = styled.main``;

const Menumodal = (props) => {
  const { open, close, header } = props;

  return (
    <ModalBackground open={open}>
      <ModalSection>
        <ModalHeader>
          {header}
          <CloseButton onClick={close}>
            <RxCross1 />
          </CloseButton>
        </ModalHeader>
        <ModalMain>{props.children}</ModalMain>
      </ModalSection>
    </ModalBackground>
  );
};

export default Menumodal;
