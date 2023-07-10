import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER } from "../../lib/config";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

function PostDetail() {
  const apiUrl = `${SERVER}/api/posts`;
  const page = "/NoticeBoard";
  const navigate = useNavigate();
  const { postId } = useParams();
  const [detail, setDetail] = useState(null);
  const [isAuthor, setIsAuthor] = useState(true);

  const navigateToEditPage = () => {
    navigate(`${page}/edit/${postId}`);
  };

  const handleDelete = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      apiDeletePost();
    }
  };

  const apiDeletePost = async () => {
    try {
      await axios.delete(`${apiUrl}/${postId}`, { withCredentials: true });
      alert("게시글이 삭제되었습니다.");
      navigate(`${page}`);
    } catch (error) {
      alert(error.response.data);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${apiUrl}/${postId}`, {
          withCredentials: true,
        });
        setDetail(response.data.post);
        setIsAuthor(response.data.isAuthor);
      } catch (error) {
        alert(error.response.data);
      }
    };

    fetchPost();
  }, [apiUrl, postId]);

  // Styles
  const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 24px;
  `;

  const ButtonContainer = styled.div`
    margin-bottom: 20px;
    text-align: right;
    border-top: 1px solid #f2f2f2;
  `;

  const Button = styled.button`
    padding: 10px 20px;
    margin-top: 20px;
    background-color: #f2f2f2;
    color: #000;
    border: none;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
    margin-right: 10px;

    &:hover {
      background-color: #525353;
      color: #fff;
    }
  `;
  const PostDetailArea = styled.div`
    margin: 0 auto;
  `;
  const DetailContainer = styled.div`
    margin-bottom: 20px;
    background-color: #fff;
    max-width: 700px;
    width: 86%;
    padding: 4%;
    margin: 2%;
    margin: 0 auto;
    border-radius: 3%;
    box-shadow: 7px 3px 20px 3px #7f7f7f;
  `;

  const DetailArea = styled.div`
    background-color: #fff;
    margin-top: 10px;
    padding: 15px;
  `;

  const DetailContents = styled.div``;

  const DetailTitle = styled.div`
    font-weight: bold;
    margin-bottom: 10px;
    font-size: 14pt;
  `;

  const DetailContent = styled.div`
    margin-bottom: 10px;
  `;

  const DetailUserAndDate = styled.div`
    margin-bottom: 10px;
    font-size: 10pt;
    color: gray;
  `;

  const DetailDate = styled.span``;

  const DetailUser = styled.span``;

  const CarouselContainer = styled.div`
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 96%;
    min-height: 300px;
    margin: 0 auto;
    .carousel .slide {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
    }

    .carousel .slide img {
      object-fit: cover;
      max-height: 100%;
      max-width: 100%;
    }

    .carousel .slider-wrapper {
      width: 87%;
    }
  `;
  if (!detail || isAuthor === null) {
    return <LoadingContainer>Loading...</LoadingContainer>;
  }

  return (
    <PostDetailArea>
      <DetailContainer>
        {detail.images && detail.images.length > 0 && (
          <CarouselContainer>
            <Carousel showThumbs={false} showStatus={false}>
              {detail.images.map((key, idx) => (
                <div key={idx + 1}>
                  <img src={key.url} alt="이미지" />
                </div>
              ))}
            </Carousel>
          </CarouselContainer>
        )}

        <DetailArea>
          <DetailContents>
            <DetailUserAndDate>
              <DetailUser>{detail.user.name}</DetailUser>
              <DetailDate>&nbsp;|&nbsp;{detail.createdAt}</DetailDate>
            </DetailUserAndDate>
            <DetailTitle>{detail.title}</DetailTitle>
            <DetailContent>{detail.content}</DetailContent>
          </DetailContents>
        </DetailArea>
        {isAuthor && (
          <ButtonContainer>
            <Button onClick={navigateToEditPage}>수정하기</Button>
            <Button onClick={handleDelete}>삭제하기</Button>
          </ButtonContainer>
        )}
      </DetailContainer>
    </PostDetailArea>
  );
}

export default PostDetail;
