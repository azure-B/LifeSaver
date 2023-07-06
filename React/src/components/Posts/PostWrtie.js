import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER } from "../../lib/config";

function PostWrite() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  // 여러 개의 첨부파일을 files에 넣는 함수
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const reader = new FileReader();
    setSelectedFiles([...selectedFiles, ...files]);
    return new Promise((resolve) => {
      reader.onload = () => {
        setFiles(reader.result || null);
        resolve();
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (files) {
        selectedFiles.forEach((file) => {
          formData.append("files", file);
        });
      }
      // form 등록
      const response = await axios.post(`${SERVER}/api/posts`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      alert(response.data.message);
      setTitle("");
      setContent("");
      setFiles(null);

      // 해당 글의 상세페이지로 이동
      const postId = response.data.postId;
      navigate(`/posts/${postId}`);
    } catch (error) {
      console.error(error);
      alert("게시물 등록 중 오류가 발생했습니다.");
    }
  };
  return (
    <>
      <h2>Post Write</h2>
      <h2>게시물 등록</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">제목:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content">내용:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="file">첨부 파일:</label>
          <input type="file" onChange={handleFileSelect} multiple={true} />
        </div>
        <button type="submit">등록</button>
      </form>
    </>
  );
}

export default PostWrite;
