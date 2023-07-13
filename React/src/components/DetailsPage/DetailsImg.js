import styled, { keyframes } from "styled-components";
import React, { useState } from "react";

function DeatilsImg({ animation, animal }) {
  const [Ani, SetAni] = useState(false);
  const [Ani2, SetAni2] = useState(true);

  const Settin = () => {
    SetAni(!Ani);
    SetAni2(false);
  };

  function getRandomNumber() {
    return Math.random() * (3.8 - 3.2) + 3.2;
  }
  const { 개요, 이름, 지정관리, 학명, path } = animal;

  const AnimeName = keyframes`
0%{
  left: -20rem;
}
90%{
  left: 0;
}
`;

  const AnimeHak = keyframes`
0%{
  left: -60rem;

}
90%{
  left: 0;
}
`;

  const AnimeContent = keyframes`
0%{
  left: -70rem;

}
100%{
  left: 0;
}
`;

  const Cut = (Content) => {
    const String = Content.split(".");
    return String;
  };

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

  const AnimeImg2 = keyframes`
0%{
  bottom: -50rem;
}

100%{
  bottom: 0;
}
`;

  const ImgsDiv = styled.div`
    height: 33.2rem;
    width: 44.2rem;
    overflow: hidden;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

  const Imgs = styled.img`
    height: 30rem;
    width: 40rem;
    position: relative;
    animation: ${animation ? AnimeImg : ""} 3.6s ease-in-out;
    filter: grayscale(40%);
    border: 0.1rem solid white;

    @media only screen and (max-width: 1024px) {
      width: 30rem;
      height: 27rem;
    }

    @media only screen and (max-width: 600px) {
      width: 33rem;
      height: 33rem;
      animation: ${Ani2 && AnimeImg2} 2.4s ease-in-out;
    }
  `;

  const Imgs2 = styled.div`
    height: 33rem;
    width: 33rem;
    position: relative;
    display: none;
    overflow: hidden;
    flex-direction: column;
    text-align: left;
    padding-left: 1rem;
    position: fixed;
    box-sizing: border-box;

    @media only screen and (max-width: 600px) {
      display: block;
      z-index: 100;
      opacity: ${Ani ? 1 : 0};
      background-color: ${Ani && "rgba(0,0,0,0.5)"};
      animation: ${Ani2 && AnimeImg2} 2.4s ease-in-out;
    }
  `;

  const AnimalsName = styled.h2`
    position: relative;
    animation: ${animation ? AnimeName : ""} 2s ease-in-out;
  `;
  const AnimalsEnName = styled.h3`
    margin-top: 1rem;
    margin-bottom: 2rem;
    position: relative;
    animation: ${animation ? AnimeHak : ""} 2s ease-in-out;
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
    <ImgsDiv>
      <Imgs2 onClick={Settin}>
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
      </Imgs2>
      <Imgs src={path}></Imgs>
    </ImgsDiv>
  );
}

export default React.memo(DeatilsImg);
