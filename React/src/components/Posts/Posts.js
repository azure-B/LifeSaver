import { Outlet } from "react-router-dom";
import Header from "../Header";
import { styled } from "styled-components";
function Posts() {
  const PostArea = styled.div`
    z-index: 1 !important;
    position: absolute;
    top: 15%;
    width: 100%;
    `;
  const BackgroundImage = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("/animals/Background_mammal.jpeg");
    opacity: 0.3; /* 투명도 조절 */
    background-size: cover;
    filter: grayscale(90%);
  `;
  return (
    <>
      <Header scrollIndex={6} />
      <PostArea>
        <Outlet />
      </PostArea>
      <BackgroundImage />
    </>
  );
}

export default Posts;
