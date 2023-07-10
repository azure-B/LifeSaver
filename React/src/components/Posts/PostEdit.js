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
  const [previewUrls, setPreviewUrls] = useState([]);

  const renderFilePreviews = () => {
    return previewUrls.map((file, index) => (
      <div key={index}>
        <img
          src={file.url}
          alt={`File Preview ${index}`}
          style={{ width: "100px", height: "100px" }}
        />
      </div>
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const postData = {
        title: title,
        content: content,
      };
      await axios.patch(`${SERVER}/api/posts/${postId}`, postData, {
        withCredentials: true,
      });
      alert("게시물이 수정되었습니다.");
      setTitle("");
      setContent("");
      setPreviewUrls([]);
      navigate(`/NoticeBoard/${postId}`);
    } catch (error) {
      console.error(error);
      alert("게시물 수정 중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    const getPostApi = async () => {
      try {
        const response = await axios.get(`${SERVER}/api/posts/${postId}`, {
          withCredentials: true,
        });

        const postData = response.data.post;
        setTitle(postData.title);
        setContent(postData.content);
        const imgUrls = postData.images.map((img) => ({
          file_id: img.id,
          file: null,
          url: img.url,
        }));
        setFiles(imgUrls);
        setPreviewUrls(imgUrls);
      } catch (error) {
        console.error(error);
      }
    };

    getPostApi();
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
          <div>{renderFilePreviews()}</div>
        </div>
        <button type="submit">수정</button>
      </form>
    </>
  );
}

export default PostEdit;
