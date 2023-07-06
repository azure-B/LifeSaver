import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER } from "../../lib/config";

function PostDetail() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [detail, setDetail] = useState(null);
  const [isAuthor, setIsAuthor] = useState(true);

  const apiGetPost = async () => {
    const response = await axios.get(`${SERVER}/api/posts/${postId}`, {
      withCredentials: true,
    });
    setDetail(response.data.post);
    setIsAuthor(response.data.isAuthor);
  };
  const navigateToEditPage = () => {
    // TODO: 글쓰기 페이지로 이동시키기 (경로 설정해주십쇼..)
    navigate(`/posts/edit/${postId}`);
  };

  useEffect(() => {
    apiGetPost();
  }, [postId]);

  if (!detail || isAuthor === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <button onClick={navigateToEditPage}>수정하기</button>
      <div>제목 : {detail.title}</div>
      <div>내용 : {detail.content}</div>
      <div>작성일시 : {detail.createdAt}</div>
      <div>사용자명 : {detail.user.name}</div>
      <div>
        이미지
        {detail.images.map((key, idx) => (
          <div key={idx + 1}>
            <img src={key.url} alt="이미지" />
          </div>
        ))}
      </div>
    </>
  );
}
export default PostDetail;
