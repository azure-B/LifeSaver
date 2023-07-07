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
  width: 90%;
  max-width: 450px;
  margin: 0 auto;
  border-radius: 0.3rem;
  background-color: #fff;
  animation: ${modalShow} 0.3s;
  overflow: hidden;
`;

const ModalHeader = styled.header`
  position: relative;
  padding: 16px 64px 16px 16px;
  background-color: #f1f1f1;
  font-weight: 700;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 30px;
  font-size: 21px;
  font-weight: 700;
  text-align: center;
  color: #999;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;

const ModalMain = styled.main`
  padding: 16px;
  border-bottom: 1px solid #dee2e6;
  border-top: 1px solid #dee2e6;
`;

const ModalFooter = styled.footer`
  padding: 12px 16px;
  text-align: right;
`;

const StyledFooterButton = styled.button`
  padding: 6px 12px;
  color: #fff;
  background-color: #6c757d;
  border-radius: 5px;
  font-size: 13px;
  border: none;
  outline: none;
  cursor: pointer;
`;

const Modal = (props) => {
  const { open, close, header } = props;

  return (
    <ModalBackground open={open}>
      <ModalSection>
        <ModalHeader>
          {header}
          <CloseButton onClick={close}>&times;</CloseButton>
        </ModalHeader>
        <ModalMain>{props.children}</ModalMain>
        <ModalFooter>
          <StyledFooterButton onClick={close}>close</StyledFooterButton>
        </ModalFooter>
      </ModalSection>
    </ModalBackground>
  );
};

export default Modal;
