const Module = require("../../Model/resgister,login/loginModules");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const comparePwAndEmail = await Module.comparePwAndEmail(email, password);

  console.log(comparePwAndEmail);

  const message = {
    error: "아이디 혹은 비밀번호를 확인해 주세요",
    success: "로그인 성공",
  };

  if (comparePwAndEmail) {
    try {
      const { id } = await Module.userInfo(email);
      req.session.user = {
        id,
      };

      req.session.save((err) => {
        if (err) {
          console.error("세션 저장 오류:", err);
        } else {
          console.log("세션 저장 완료");
        }
      });

      return res.status(200).send({ message: message.success, result: true });
    } catch (error) {
      console.error("에러가 발생했습니다:", error);
      return res
        .status(500)
        .send({ message: "에러가 발생했습니다.", result: false });
    }
  } else {
    return res.send({ message: message.error });
  }
};
