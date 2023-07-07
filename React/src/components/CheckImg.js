import styled from "styled-components";

function CheckImg() {
  const Imgs = styled.img`
    width: 40rem;
    object-fit: cover;
  `;

  return (
    <>
      <Imgs className="ABC" src="/animals/Prionailurus bengalensis.jpeg"></Imgs>
    </>
  );
}

export default CheckImg;
