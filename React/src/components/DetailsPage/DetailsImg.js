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
    height: 33.2rem;
    width: 44.2rem;
    overflow: hidden;
    text-align: center;
  `;

  const Imgs = styled.img`
    height: 33rem;
    width: 44rem;
    position: relative;
    animation: ${animation ? AnimeImg : ""} 3.6s ease-in-out;
    filter: grayscale(40%);
    border: 0.1rem solid white;
  `;

  return (
    <ImgsDiv>
      <Imgs src={path} />
    </ImgsDiv>
  );
}

export default DeatilsImg;
