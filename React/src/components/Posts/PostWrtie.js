import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER } from "../../lib/config";
import styled, { css } from "styled-components";
// Styles
const PostWriteArea = styled.div`
  margin: 0 auto;
`;
const FormContainer = styled.form`
  background-color: #fff;
  width: 86%;
  max-width: 700px;
  padding: 5% 4% 6% 4%;
  margin: 2%;
  margin: 0 auto;
  border-radius: 3%;
  box-shadow: 7px 3px 20px 3px #7f7f7f;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  margin-top: 10px;
`;

const inputStyles = css`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Input = styled.input`
  ${inputStyles}
`;

const TextArea = styled.textarea`
  ${inputStyles}
  resize: vertical;
  height: 180px;
  resize: none;
  font-family: "Nanum Gothic";
`;

const FileInput = styled.input`
  display: none;
`;

const FileInputLabel = styled.label`
  display: inline-block;
  padding: 10px 20px;
  margin-bottom: 10px;
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

const PreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const PreviewItem = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
`;

const PreviewRemoveButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 5px;
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

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #f2f2f2;
  color: #000;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
  margin-top: 10px;

  &:hover {
    background-color: #525353;
    color: #fff;
  }
`;
const SubmitButtonArea = styled.div`
  text-align: right;
`;

function PostWrite() {
  const navigate = useNavigate();
  const page = "/NoticeBoard";
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
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
    } else {
      alert("파일은 10개까지만 등록이 가능합니다.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!title) {
        alert("제목을 입력해주세요.");
        return;
      }
      if (!content) {
        alert("내용을 입력해주세요.");
        return;
      }
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (selectedFiles.length > 0) {
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
          setPreviewUrls([]);
          setSelectedFiles([]);

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
    <PostWriteArea>
      <FormContainer onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">제목</Label>
          <Input
            type="text"
            id="title"
            value={title}
            placeholder="제목을 입력해주세요."
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="content">내용</Label>
          <TextArea
            id="content"
            value={content}
            placeholder="내용을 입력해주세요."
            onChange={(e) => setContent(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="file">첨부 파일</Label>
          <FileInputLabel type="button" onClick={handleFileSelect}>
            파일 선택
          </FileInputLabel>
          <div>
            <FileInput
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              multiple={true}
            />
          </div>
          <PreviewContainer>
            {previewUrls.map((url, index) => (
              <PreviewItem key={index}>
                <PreviewImage src={url} alt="File Preview" />
                <PreviewRemoveButton
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
                </PreviewRemoveButton>
              </PreviewItem>
            ))}
          </PreviewContainer>
        </FormGroup>
        <SubmitButtonArea>
          <SubmitButton type="submit">등록</SubmitButton>
        </SubmitButtonArea>
      </FormContainer>
    </PostWriteArea>
  );
}

export default PostWrite;
