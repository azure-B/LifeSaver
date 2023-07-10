import styled, { keyframes } from "styled-components";

import DeatilsImg from "./DetailsImg";

function DetailsContent({ animal, animation, fade }) {
  const { 개요, 이름, 지정관리, 학명, path } = animal;

  function getRandomNumber() {
    return Math.random() * (3.8 - 3.2) + 3.2;
  }

  const FadeOut = keyframes`
  0%{
    opacity: 1;
  }
  100%{
    opacity: 0;
  }`;

  const AnimeLine = keyframes`
  0%{
    top: 50rem;
  }

  100%{
    top: 0rem;
  }
`;

  const AnimeName = keyframes`
0%{
  left: -15rem;
}
50%{
  left: -15rem;
}
90%{
  left: 0;
}
`;

  const AnimeHak = keyframes`
0%{
  left: -40rem;
}
50%{
  left: -40rem;
}
90%{
  left: 0;
}
`;

  const AnimeContent = keyframes`
0%{
  left: -35rem;
}
50%{
  left: -35rem;
}
90%{
  left: 0;
}
`;

  const Cut = (Content) => {
    const String = Content.split(".");
    return String;
  };

  const MainDIv = styled.div`
    z-index: 1;
    width: 100%;
    height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: white;

    animation: ${fade ? FadeOut : ""} 1s ease-in-out;
  `;

  const ContentDiv = styled.div`
    height: 33rem;
    width: 33rem;
    overflow: scroll;
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
    padding-left: 1rem;

    /* Webkit 기반 브라우저용 스크롤바 숨기기 */
    ::-webkit-scrollbar {
      width: 0.5rem;
      background-color: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background-color: transparent;
    }

    /* Firefox 용 스크롤바 숨기기 */
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;

    /* IE 용 스크롤바 숨기기 */
    -ms-overflow-style: none;
    scrollbar-width: none;
  `;

  const MovingLine = styled.div`
    z-index: 1;
    border: 1px solid white;
    background-color: white;
    height: 33rem;
    width: 0.05rem;
    position: relative;
    animation: ${animation ? AnimeLine : ""} 1.3s ease-in-out;
  `;

  const MovingLines = styled.div`
    z-index: 1;
    background-color: none;
    height: 33rem;
    width: 0.1rem;
    position: relative;
    overflow: hidden;
  `;

  const AnimalsName = styled.h2`
    position: relative;
    animation: ${animation ? AnimeName : ""} 2.6s ease-in-out;
  `;
  const AnimalsEnName = styled.h3`
    margin-top: 1rem;
    margin-bottom: 2rem;
    position: relative;
    animation: ${animation ? AnimeHak : ""} 2.6s ease-in-out;
  `;
  const AnimalsContent = styled.h5`
    margin: 0;
    margin-top: 0.8rem;
    position: relative;
    animation: ${animation ? AnimeContent : ``} ${function (props) {
        return props.delay + "s";
      }} ease-in-out;
  `;

  return (
    <>
      {animal && (
        <MainDIv>
          <DeatilsImg path={path} animation={animation} />
          <MovingLines>
            <MovingLine />
          </MovingLines>
          <ContentDiv>
            <AnimalsName>{이름}</AnimalsName>
            <AnimalsEnName>
              {학명}
              <br />
              {지정관리}
            </AnimalsEnName>

            {Cut(개요).map((result, index) => {
              return (
                <AnimalsContent key={index} delay={getRandomNumber()}>
                  {result}
                </AnimalsContent>
              );
            })}
          </ContentDiv>
        </MainDIv>
      )}
    </>
  );
}

export default DetailsContent;
