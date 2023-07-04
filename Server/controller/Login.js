const Module = require("../Model/LoginModule");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const comparePw = await Module.comparePw(email, password);
  const compareEmail = await Module.compareEmail(email);

  const message = {
    Error: "아이디 혹은 비밀번호를 확인해 주세요",
    Success: "로그인 성공",
  };

  if (!compareEmail || !comparePw) return res.send({ message: message.Error });
  else {
    // 추 후 유저정보 더 받을 수도 있으니까?
    const { name } = await Module.userInfo(email);
    req.session.user = {
      email,
      name,
    };

    req.session.save((err) => {
      if (err) {
        console.error("세션 저장 오류:", err);
      } else {
        console.log("세션 저장 완료");
      }
    });

    return res.status(200).send({ message: message.Success, result: true });
  }
};
