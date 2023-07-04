const models = require("../models");
const bcrypt = require("bcrypt");

const Module = {
  comparePw: async (email, password) => {
    let hash;
    const result = await models.db.users.findOne(
      { attributes: ["salt"] },
      { where: { email } }
    );
    if (result) {
      hash = result.dataValues.salt;
      const isValid = await bcrypt.compare(password, hash);
      return isValid;
    } else {
      return false;
    }
  },

  compareEmail: async (email) => {
    const result = await models.db.users.findOne({ where: { email } });
    console.log(`result \n ${result}`);
    if (result) return true;
    else {
      return false;
    }
  },

  userInfo: async (email) => {
    const result = await models.db.users.findOne({
      attributes: ["id"],
      where: { email },
    });
    return result;
  },
};

module.exports = Module;
