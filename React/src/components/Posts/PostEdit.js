import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER } from "../../lib/config";
import styled from "styled-components";

const PostEditArea = styled.div`
  margin: 0 auto;
`;
const EditForm = styled.form`
  background-color: #fff;
  width: 40rem;
  max-width: 700px;
  padding: 2rem 2rem 2rem 2rem;
  margin: 2%;
  margin: 0 auto;
  border-radius: 3%;
  box-shadow: 7px 3px 20px 3px #7f7f7f;
  @media (min-width: 600px) and (max-width: 1024px) {
    width: 30rem;
  }
  @media (max-width: 600px) {
    width: 25rem;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.3rem;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 11pt;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  font-size: 11pt;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
  min-height: 180px;
  resize: none;
  font-family: "Nanum Gothic";
`;

const FilePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`;

const FilePreviewItem = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const FilePreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
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

function PostEdit() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);

  const renderFilePreviews = () => {
    return previewUrls.map((file, index) => (
      <FilePreviewItem key={index}>
        <FilePreviewImage src={file.url} alt={`File Preview ${index}`} />
      </FilePreviewItem>
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      alert("제목을 입력해주세요.");
      return;
    }
    if (!content) {
      alert("내용을 입력해주세요.");
      return;
    }
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
      <PostEditArea>
        <EditForm onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="title">제목</Label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="content">내용</Label>
            <TextArea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </FormGroup>
          {files.length > 0 && (
            <FormGroup>
              <Label htmlFor="file">첨부 파일</Label>
              <FilePreviewContainer>
                {renderFilePreviews()}
              </FilePreviewContainer>
            </FormGroup>
          )}
          <SubmitButtonArea>
            <SubmitButton type="submit">수정</SubmitButton>
          </SubmitButtonArea>
        </EditForm>
      </PostEditArea>
    </>
  );
}

export default PostEdit;
