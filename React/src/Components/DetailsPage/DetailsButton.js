import styled from "styled-components";

function ButtonComponent({ onReturn, onNext, onMain }) {
  const ButtonDiv = styled.div`
    position: fixed;
    bottom: 5%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const Buttons = styled.button`
    background: none;
    border: none;
    font-size: 2rem;
    margin: 1rem;
    &:hover {
      color: white;
    }
  `;

  return (
    <ButtonDiv>
      <Buttons className="material-symbols-outlined" onClick={onReturn}>
        arrow_back
      </Buttons>
      <Buttons className="material-symbols-outlined" onClick={onMain}>
        search
      </Buttons>
      <Buttons className="material-symbols-outlined" onClick={onNext}>
        arrow_forward
      </Buttons>
    </ButtonDiv>
  );
}

export default ButtonComponent;
