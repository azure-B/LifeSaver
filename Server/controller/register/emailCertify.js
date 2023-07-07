const Module = require("../../Model/resgister,login/emailCertifyModule");
const models = require("../../models");

exports.MailSender = async (req, res) => {
  const { email } = req.body;
  const auth = Module.getRandomKey(111111, 999999);
  const idDupleCk = await Module.idDuplicateCk(email);

  const response = {
    resMsg: null,
    resResult: true,
  };

  const message = {
    error: "이미 존재하는 아이디 입니다.",
    success: "메일이 전송되었습니다.",
  };

  const emailParam = {
    toEmail: email, // 수신할 이메일
    subject: "[ LifeSaver ] 인증 관련 메일입니다. ", // 메일 제목
    text: `오른쪽 숫자 6자리를 입력해 주세요: ${auth}`, // 메일 내용
  };

  try {
    if (idDupleCk) {
      response.resMsg = message.error;
      response.resResult = false;
    } else {
      const authData = await models.db.auth.findOne({ where: { email } });

      if (authData) {
        await models.db.auth.update({ auth }, { where: { email } });
      } else {
        await models.db.auth.create({ email, auth });
      }

      await Module.sendMail(emailParam);

      response.resMsg = message.success;
      response.resResult = true;
    }
  } catch (error) {
    response.resMsg = "에러가 발생했습니다.";
    response.resResult = false;
    console.error(error);
  }

  res.send({ message: response.resMsg, result: response.resResult });
};

exports.mailVerifier = async (req, res) => {
  const { email, auth } = req.body;

  const message = {
    error: "키를 다시한번 확인해주세요.",
    success: "이메일 인증 성공!",
  };

  const response = {
    resMsg: null,
    resResult: true,
  };

  try {
    const result = await models.db.auth.findOne({ where: { email } });

    if (result.auth === auth) {
      await models.db.auth.update({ auth_flag: "Y" }, { where: { email } });

      response.resMsg = message.success;
      response.resResult = true;
    } else {
      response.resMsg = message.error;
      response.resResult = false;
    }
  } catch (error) {
    response.resMsg = "에러가 발생했습니다.";
    response.resResult = false;
    console.error(error);
  }

  res.send({ message: response.resMsg, result: response.resResult });
};
