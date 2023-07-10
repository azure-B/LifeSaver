const models = require("../models");

module.exports = {
  // 로그인 상태를 확인 하는 함수 (true/false)
  CheckLoginStatus: async (req, res) => {
    const loggedIn = req.session.user ? true : false;
    return loggedIn;
  },
};
