import styled from "styled-components";

function CheckImg() {
  const Imgs = styled.img`
    width: 40rem;
    object-fit: cover;
  `;

  return (
    <>
      <img src="/animals/Phoca largha Pallas.jpeg"></img>
      <Imgs src="/animals/Phoca largha Pallas.jpeg"></Imgs>
    </>
  );
}

export default CheckImg;
