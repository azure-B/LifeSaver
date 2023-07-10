import { useForm } from "react-hook-form";
import axios from "axios";
import { SERVER } from "../lib/config";
import { useState } from "react";
import styled from "styled-components";

function Login() {
  const { register, handleSubmit } = useForm();
  const [loginMessage, SetLoginMessage] = useState("");

  const onVaild = async (data) => {
    const { email, password } = data;
    await axios
      .post(
        `${SERVER}/api/login`,
        { email, password },
        { withCredentials: true }
      )
      .then((result) => {
        SetLoginMessage(result.data.message);
      });
  };

  const onInValid = () => {
    console.log("에바");
  };

  return (
    <form
      onSubmit={handleSubmit(onVaild, onInValid)}
      style={{ position: "relative" }}
    >
      <input
        placeholder="아이디"
        {...register("email", {
          required: "아이디를 입력해 주세요.",
          validate: {
            checkName: (data) => data.includes("@") || "잘못된 형식입니다.",
          },
        })}
        type="text"
      />
      <br />
      <input
        placeholder="비밀번호"
        {...register("password", {
          required: "비밀번호를 입력해 주세요.",
        })}
        type="password"
      />
      <div>{loginMessage && loginMessage}</div>

      <LoginButton>로그인</LoginButton>
      <JoinButton>회원가입</JoinButton>
    </form>
  );
}

const LoginButton = styled.button`
  position: absolute;
  right: 6px;
  top: -1px;
  background-color: black;
  color: white;
  padding: 23px;
  border-radius: 10px;
  font-weight: bold;
`;

const JoinButton = styled.button`
  position: relative;
  top: 7px;
  left: -4px;
  font-size: 6pt;
  font-weight: bold;
`;

export default Login;
