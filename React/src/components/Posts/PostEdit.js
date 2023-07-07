import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER } from "../../lib/config";

function PostEdit() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  // 여러 개의 첨부파일을 files에 넣는 함수
  const handleFileSelect = (e) => {
    const fileArray = Array.from(e.target.files);
    const reader = new FileReader();
    setSelectedFiles([...selectedFiles, ...fileArray]);
    return new Promise((resolve) => {
      reader.onload = () => {
        setFiles(reader.result || null);
        resolve();
      };
    });
  };

  // form submit 이벤트
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
      await axios
        .patch(`${SERVER}/api/posts/${postId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        })
        .then((response) => {
          alert(response.data);
          setTitle("");
          setContent("");
          setFiles(null);
          navigate(`/NoticeBoard/${postId}`);
        })
        .catch((error) => {
          alert(error.response.data);
        });
    } catch (error) {
      console.error(error);
      alert("게시물 등록 중 오류가 발생했습니다.");
    }
  };
  useEffect(() => {
    const apiGetPost = async () => {
      const response = await axios.get(`${SERVER}/api/posts/${postId}`, {
        withCredentials: true,
      });

      setTitle(response.data.post.title);
      setContent(response.data.post.content);
      const resImg = response.data.post.images;
      const resImgArr = resImg.map((img) => img.url);
      setFiles(resImgArr);
    };
    apiGetPost();
  }, [postId]);
  return (
    <>
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
          <div>현재 파일 갯수: {files.length}</div>
        </div>
        <button type="submit">수정</button>
      </form>
    </>
  );
}
export default PostEdit;
