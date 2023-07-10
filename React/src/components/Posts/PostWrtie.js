import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER } from "../../lib/config";

function PostWrite() {
  const navigate = useNavigate();
  const page = "/NoticeBoard";
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const totalSelectedFiles = selectedFiles.length + files.length;

    if (totalSelectedFiles <= 10) {
      setSelectedFiles([...selectedFiles, ...files]);

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          setPreviewUrls((prevUrls) => [...prevUrls, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    }  else {
      alert("파일은 10개까지만 등록이 가능합니다.");
    }
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
      await axios
        .post(`${SERVER}/api/posts`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        })
        .then((response) => {
          alert(response.data.message);
          setTitle("");
          setContent("");
          setFiles(null);

          // 해당 글의 상세페이지로 이동
          const postId = response.data.postId;
          navigate(`${page}/${postId}`);
        })
        .catch((error) => {
          alert(error.response.data);
        });
    } catch (error) {
      alert(error.response.data);
    }
  };
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
          <button type="button" onClick={handleFileSelect}>
            파일 선택
          </button>
          <div>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              multiple={true}
              style={{ display: "none" }}
            />
          </div>
          <div>
            {/* 파일 미리보기 */}
            {previewUrls.map((url, index) => (
              <div key={index}>
                <img
                  src={url}
                  alt="File Preview"
                  style={{ width: "100px", height: "100px" }}
                />
                <button
                  type="button"
                  onClick={() => {
                    setPreviewUrls((prevUrls) =>
                      prevUrls.filter((_, i) => i !== index)
                    );
                    setSelectedFiles((prevFiles) =>
                      prevFiles.filter((_, i) => i !== index)
                    );
                  }}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>
        <button type="submit">등록</button>
      </form>
    </>
  );
}

export default PostWrite;
