import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { SERVER } from "../lib/config";

function Regi() {
  const [acceptRegister, setAcceptRegister] = useState(false);
  const [mailValue, SetmailValue] = useState();
  const [openKeyInput, setOpenKeyInput] = useState(false);
  const [mailSendMessage, SetMailSendmessage] = useState();
  const [mailCertifyMessage, SetmailCertifyMessage] = useState();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onValid = (data) => {
    const { email, password, name } = data;
    if (!acceptRegister) return alert("인증하세요");

    axios.post(`${SERVER}/api/register`, { email, password, name }).then(() => {
      alert("가입 성공!");
      window.location.reload();
      //link를 걸어서 마무리하면 됩니다
    });
  };

  const onInValid = () => {
    return alert("양식을 확인하여 주세요");
  };

  const mailSender = () => {
    const email = watch("email");
    SetmailValue(email);

    if (!email.includes("@") || !email.includes(".com")) {
      return SetMailSendmessage("이메일 형식이 아닙니다.");
    }

    axios.post(`${SERVER}/api/mail`, { email }).then((result) => {
      console.log(result.data);
      SetMailSendmessage(result.data.message);

      //전송완료 메일
      // 메일이 전송되었습니다가 출력됩니다. 혹은 이미 가입된 아이디입니다.

      setOpenKeyInput(result.data.result);
    });
  };

  const submitKey = () => {
    const auth = watch("key");
    axios
      .post(`${SERVER}/api/mail/certify`, { auth, email: mailValue })
      .then((result) => {
        SetmailCertifyMessage(result.data.message);
        // 인증 성공 메시지 혹은 키를 확인하시요가 출력됩니다.

        setAcceptRegister(result.data.result);
        // true 저장
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onValid, onInValid)}>
        <input
          placeholder="이메일 양식의 아이디"
          {...register("email", {
            required: "이메일을 입력해 주세요",
            validate: {
              checkName: (data) => data.includes("@") || "잘못된 형식 입니다.",
            },
          })}
          type="text"
        />
        <button type="button" onClick={mailSender}>
          인증기기
        </button>
        <div>{mailSendMessage && mailSendMessage}</div>

        {/* 인증메일을 보내야만 제출 태그가 보입니다. */}
        {openKeyInput && (
          <div>
            <input
              placeholder="인증키를 입력"
              {...register("key")}
              type="number"
            />
            <button type="button" onClick={submitKey}>
              제출
            </button>
            <div>{mailCertifyMessage && mailCertifyMessage}</div>
          </div>
        )}

        <input
          placeholder="이름"
          {...register("name", {
            required: "이름을 입력하세요",
          })}
          type="text"
        />

        <div style={{ color: "red" }}>{errors.email?.message}</div>
        <input
          placeholder="비밀번호를 입력"
          {...register("password", {
            required: "비밀번호를 입력하세요",
            minLength: {
              message: "비밀번호는 8자이상으로 작성하세요",
              value: 8,
            },
          })}
          type="password"
        />
        <div>{errors.password?.message}</div>
        <button type="submit">등록</button>
      </form>
    </>
  );
}

export default Regi;
