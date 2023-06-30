const models = require("../models");

module.exports = {
  GetUsers: async (req, res) => {
    const users = await models.db.users.findAll();
    return res.send({ users });
  },
};
