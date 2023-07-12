import { useForm } from "react-hook-form";
import axios from "axios";
import { SERVER } from "../lib/config";
import { useState } from "react";
import styled from "styled-components";

function Login() {
  const { register, handleSubmit } = useForm();
  const [loginMessage, SetLoginMessage] = useState("");
  const [sign, setSign] = useState(false);

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

  const signup = () => {
    console.log("fffffff");
    setSign(!sign);
  };

  return (
    <>
      {sign ? (
        <Main>
          <div
            style={{
              fontSize: "2.5rem",
            }}
          >
            LIFE SAVER
          </div>

          <Form onSubmit={handleSubmit(onVaild, onInValid)}>
            <Input
              placeholder="아이디"
              {...register("email", {
                required: "아이디를 입력해 주세요.",
                validate: {
                  checkName: (data) =>
                    data.includes("@") || "잘못된 형식입니다.",
                },
              })}
              type="text"
            />
            <Input
              placeholder="비밀번호"
              {...register("password", {
                required: "비밀번호를 입력해 주세요.",
              })}
              type="password"
            />
            <Input
              placeholder="비밀번호 확인하기"
              {...register("confirm password", {
                required: "비밀번호를 확인해 주세요.",
              })}
              type="password"
            />
            <Input
              placeholder="유저 이름"
              {...register("user name", {
                required: "유저 이름을 입력해주세요.",
              })}
              type="password"
            />

            <div>{loginMessage && loginMessage}</div>

            <LoginButton>회원가입</LoginButton>
          </Form>
          <SignupButton onClick={signup}>로그인하기</SignupButton>
        </Main>
      ) : (
        <Main>
          <div
            style={{
              fontSize: "2.5rem",
            }}
          >
            LIFE SAVER
          </div>
          <Form onSubmit={handleSubmit(onVaild, onInValid)}>
            <Input
              placeholder="아이디"
              {...register("email", {
                required: "아이디를 입력해 주세요.",
                validate: {
                  checkName: (data) =>
                    data.includes("@") || "잘못된 형식입니다.",
                },
              })}
              type="text"
            />
            <Input
              placeholder="비밀번호"
              {...register("password", {
                required: "비밀번호를 입력해 주세요.",
              })}
              type="password"
            />
            <div>{loginMessage && loginMessage}</div>

            <LoginButton>로그인</LoginButton>
          </Form>
          <SignupButton onClick={signup}>회원가입하기</SignupButton>
        </Main>
      )}
    </>
  );
}

const LoginButton = styled.button`
  position: relative;
  background-color: #333;
  color: #ddd;
  padding: 10px 35px;
  border-radius: 40px;
  font-weight: bold;
`;

const SignupButton = styled.button`
  position: relative;
  background-color: none;
  color: #333;
  padding: 10px 35px;
  font-weight: bold;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 70%;
  align-items: center;
  justify-content: space-around;
  @media (min-width: 600px) and (max-width: 1024px) {
    position: relative;
    width: 100%;
    height: 70%;
    align-items: center;
    justify-content: space-around;
  }
  @media (max-width: 600px) {
    position: relative;
    width: 50%;
    height: 70%;
    align-items: center;
    justify-content: space-around;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 20vh;
  left: 10%;
  width: 30%;
  height: 60vh;
  align-items: center;
  box-shadow: gray 5px 5px 5px;
  @media (min-width: 600px) and (max-width: 1024px) {
    top: 20vh;
    left: 28%;
    width: 50%;
    height: 60vh;
  }
  @media (max-width: 600px) {
    top: 20vh;
    left: 17%;
    width: 70%;
    height: 60vh;
  }
`;

const Input = styled.input`
  position: relative;
  outline: none;
  padding: 10px 40px;
  text-align: center;
  box-shadow: 5px 5px 5px gray;
  border: none;
  border-radius: 5px;
  background-color: #ddd;
  top: 5%;

  @media (min-width: 600px) and (max-width: 1024px) {
    padding: 10px 40px;
    box-shadow: 5px 5px 5px gray;
    border-radius: 5px;
    background-color: #ddd;
    top: 5%;
  }
  @media (max-width: 600px) {
    padding: 10px 0px;
    box-shadow: 5px 5px 5px gray;
    border-radius: 5px;
    background-color: #ddd;
    top: 5%;
  }
`;

export default Login;
