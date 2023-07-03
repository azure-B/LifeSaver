exports.logout = async (req, res) => {
  const message = {
    error: "로그인 안되어 있음",
    error2: "로그아웃 실패 재시도 해주세요",
    success: "로그아웃 성공",
  };

  if (!req.session.user || !req.sessionID) {
    return res.send({ message: message.error, result: false });
  } else {
    req.session.destroy((err) => {
      if (err) {
        return res.send({ message: message.error2, result: false });
      } else {
        return res.send({ message: message.success, result: true });
      }
    });
  }
};
