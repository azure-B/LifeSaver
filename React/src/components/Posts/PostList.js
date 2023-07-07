import React, { useState, useEffect } from "react";
import axios from "axios";
import { SERVER } from "../../lib/config";
import { Link, useNavigate } from "react-router-dom";

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
      console.log(response.data);
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

  return (
    <>
      {canWrite && <button onClick={navigateToWritePage}>글쓰기</button>}
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
      <div>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageClick(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}

export default PostList;
