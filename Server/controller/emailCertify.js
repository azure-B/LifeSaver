const { response } = require("express");
const Module = require("../Model/emailCertifyModule");
const models = require("../models");

exports.MailSender = async (req, res) => {
  const { email } = req.body;
  const auth = Module.getRandomKey(111111, 999999);
  const idDupleCk = await Module.idDuplicateCk(email);

  const message = {
    error: "이미 존재하는 아이디 입니다.",
    success: "메일이 전송되었습니다.",
  };

  let response = {
    resMsg: null,
    resResult: true,
  };

  const emailParam = {
    toEmail: email, // 수신할 이메일
    subject: "[ LifeSaver ] 인증 관련 메일입니다. ", // 메일 제목
    text: "오른쪽 숫자 6자리를 입력해 주세요 : " + auth, // 메일 내용
  };

  // ID 중복체크
  if (idDupleCk) {
    response.resMsg = message.error;
    response.resResult = false;
  } else {
    await models.db.auth.findOne({ where: { email } }).then(async (result) => {
      if (result) await models.db.auth.update({ auth }, { where: { email } });
      else {
        await models.db.auth.create({ email, auth });
      }

      await Module.sendMail(emailParam);

      response.resMsg = message.success;
      response.resResult = true;
    });
  }

  res.send({ message: response.resMsg, result: response.resResult });
};

exports.mailVerifier = async (req, res) => {
  const { email, auth } = req.body;

  const message = {
    error: "키를 다시한번 확인해주세요.",
    success: "이메일 인증 성공!",
  };

  let response = {
    resMsg: null,
    resResult: true,
  };

  await models.db.auth
    .findOne({
      where: { email },
    })
    .then((result) => {
      if (result.auth == auth) {
        models.db.auth.update(
          {
            auth_flag: "Y",
          },
          { where: { email } }
        );
        response.resMsg = message.success;
        response.resResult = true;
      } else {
        response.resMsg = message.error;
        response.resResult = false;
      }

      res.send({ message: response.resMsg, result: response.resResult });
    });
};
