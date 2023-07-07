const models = require("../../models");
const Module = require("../../Model/resgister,login/resgisterModule");

exports.Register = async function (req, res) {
  const { email, password, name } = req.body;
  let salt = "";

  // Password Salting
  try {
    salt = await Module.salt(password);
  } catch (error) {
    return res.send(error);
  }

  models.db.users.create({
    email,
    password,
    name,
    salt,
  });
  res.sendStatus(200);
};
