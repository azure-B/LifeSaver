import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVER } from "../../lib/config";
import { Link, useNavigate } from "react-router-dom";

function PostList() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);
  const apiGetPosts = async () => {
    const response = await axios.get(`${SERVER}/api/posts/`, {
      withCredentials: true,
    });
    setList(response.data.posts);
  };
  const navigateToWritePage = () => {
    navigate("/NoticeBoard/write");
  };
  useEffect(() => {
    apiGetPosts();
  }, []);
  return (
    <>
      <button onClick={navigateToWritePage}>글쓰기</button>
      <table className="list">
        <thead>
          <tr>
            <th>#</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {list.map((l, idx) => (
            <tr key={idx + 1}>
              <td>{idx + 1}</td>
              <td>
                <Link to={`/NoticeBoard/${l.id}`}>{l.title}</Link>
              </td>
              <td>{l.name}</td>
              <td>{l.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default PostList;
