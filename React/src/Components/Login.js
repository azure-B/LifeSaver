import { useForm } from "react-hook-form";
import axios from "axios";
import { SERVER } from "../lib/config";
import { useState } from "react";

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
    <form onSubmit={handleSubmit(onVaild, onInValid)}>
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
      <div>
        <button type="submit">로그인</button>
      </div>
    </form>
  );
}

export default Login;
