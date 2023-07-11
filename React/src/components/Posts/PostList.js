import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVER } from "../../lib/config";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

function PostList() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [canWrite, setCanWrite] = useState(false);

  const apiGetPosts = async (page) => {
    try {
      const response = await axios.get(`${SERVER}/api/posts/?page=${page}`, {
        withCredentials: true,
      });
      setList(response.data.posts);
      setTotalPages(response.data.totalPages);
      setCanWrite(response.data.canWritePost);
    } catch (error) {
      console.error(error);
    }
  };

  const navigateToWritePage = () => {
    navigate("/NoticeBoard/write");
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
    apiGetPosts(page);
  };

  useEffect(() => {
    apiGetPosts(currentPage);
  }, [currentPage]);

  // Styles
  const ListArea = styled.div`
    margin: 0 auto;
    width: 90%;
  `;
  const ListContainer = styled.div`
    background-color: #fff;
    border: 3px solid #fff;
    border-radius: 5%;
    padding: 5% 4% 6% 4%;
  `;
  const TitleLink = styled(Link)`
    text-decoration: none;
    color: #000;
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
    display: block;
  `;
  const ContentText = styled.p`
    margin-bottom: 5px;
  `;
  const InfoText = styled.p`
    color: #666;
    margin-bottom: 10px;
  `;
  const WriteButton = styled.button`
    padding: 10px 20px;
    background-color: #f2f2f2;
    color: #000;
    border: none;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #525353;
      color: #fff;
    }
  `;
  const ButtonArea = styled.div`
    text-align: right;
    margin-bottom: 20px;
  `;
  const ContentArea = styled.div`
    border-bottom: 1px solid #a2a0a0;
    margin-top: 10px;

    &:last-child {
      border-bottom: none;
    }
  `;
  return (
    <ListArea>
      <ListContainer>
        <ButtonArea>
          {canWrite && (
            <WriteButton onClick={navigateToWritePage}>글쓰기</WriteButton>
          )}
        </ButtonArea>
        {list.map((l, idx) => (
          <ContentArea>
            <div key={idx}>
              <TitleLink to={`/NoticeBoard/${l.id}`}>{l.title}</TitleLink>
              <ContentText>{l.content}</ContentText>
              <InfoText>
                {l.name} | {l.createdAt}
              </InfoText>
            </div>
          </ContentArea>
        ))}
      </ListContainer>
    </ListArea>
  );
}

export default PostList;
