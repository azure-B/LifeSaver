import styled, { keyframes } from "styled-components";

function DeatilsImg({ path, animation }) {
  const AnimeImg = keyframes`
  0%{
    right: -50rem;
  }
  
  50%{
    right: -50rem;
  }
  100%{
    right: 0;
  }
  `;
  const ImgsDiv = styled.div`
    height: 33rem;
    width: 44rem;
    overflow: hidden;
  `;

  const Imgs = styled.img`
    height: 33rem;
    width: 44rem;
    position: relative;
    animation: ${animation ? AnimeImg : ""} 3.6s ease-in-out;
  `;

  return (
    <ImgsDiv>
      <Imgs src={path} />
    </ImgsDiv>
  );
}

export default DeatilsImg;
