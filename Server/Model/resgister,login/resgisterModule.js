const bcrypt = require("bcrypt");
const models = require("../../models");

const saltRound = 10;

const Module = {
  salt: async function (pw) {
    return new Promise((result, error) => {
      bcrypt.hash(pw, saltRound, (err, hash) => {
        if (err) {
          return error(err);
        } else {
          result(hash);
        }
      });
    });
  },
};

module.exports = Module;
