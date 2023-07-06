import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER } from "../../lib/config";

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
    await axios
      .delete(`${apiUrl}/${postId}`, {
        withCredentials: true,
      })
      .then((response) => {
        alert(response.data);
        navigate(`${page}/list`);
      })
      .catch((error) => {
        alert(error.response.data);
      });
  };
  useEffect(() => {
    const apiGetPost = async () => {
      await axios
        .get(`${apiUrl}/${postId}`, {
          withCredentials: true,
        })
        .then((response) => {
          setDetail(response.data.post);
          setIsAuthor(response.data.isAuthor);
        })
        .catch((error) => {
          alert(error.response.data);
        });
    };
    apiGetPost();
  }, [postId]);

  if (!detail || isAuthor === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {!isAuthor && (
        <>
          <button onClick={navigateToEditPage}>수정하기</button>
          <button onClick={handleDelete}>삭제하기</button>
        </>
      )}
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
