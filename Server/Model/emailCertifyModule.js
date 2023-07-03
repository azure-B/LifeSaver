const nodemailer = require("nodemailer");
const senderInfo = require("../config/email.json");
const models = require("../models");

// 메일발송 객체
const mailSender = {
  // 메일발송 함수
  sendMail: function (param) {
    var transporter = nodemailer.createTransport({
      service: "naver", // 메일 보내는 곳
      prot: 993,
      host: "smtp.naver.com",
      secure: false,
      requireTLS: true,
      auth: {
        user: senderInfo.user, // 보내는 메일의 주소
        pass: senderInfo.pass, // 보내는 메일의 비밀번호
      },
    });

    // 메일 옵션
    var mailOptions = {
      from: senderInfo.user, // 보내는 메일의 주소
      to: param.toEmail, // 수신할 이메일
      subject: param.subject, // 메일 제목
      text: param.text, // 메일 내용
    };

    // 메일 발송
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },

  getRandomKey: function (min, max) {
    let ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return ranNum;
  },

  idDuplicateCk: async (email) => {
    const result = await models.db.users.findOne({ where: { email } });
    if (result) return true;
    else {
      return false;
    }
  },
};

module.exports = mailSender;
