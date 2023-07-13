import { Outlet } from "react-router-dom";
import Header from "../Header";
import styled from "styled-components";

function Posts() {
  const PostArea = styled.div`
    z-index: 1 !important;
    position: absolute;
    top: 8rem;
    width: 100%;
  `;
  const BackgroundImage = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("/animals/Background_mammal.jpeg");
    opacity: 0.3; 
    background-size: 100% 100%; /* Update: Make the background image cover the entire area */
    filter: grayscale(90%);

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3); /* 변경: 약간 어둡게 할 색상 */
    }
  `;

  return (
    <>
      <Header scrollIndex={6} />
      <BackgroundImage />
      <PostArea>
        <Outlet />
      </PostArea>
    </>
  );
}

export default Posts;
