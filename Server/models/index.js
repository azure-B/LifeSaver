const Sequelize = require("sequelize");
const initModels = require("./init-models.js");
const process = require("process");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const username = config.username;
const password = config.password;
const database = config.database;

const sequelize = new Sequelize(database, username, password, {
  dialect: config.dialect,
  host: `127.0.0.1`,
  timezone: "Asia/Seoul",
});
const db = initModels(sequelize);

module.exports = { db, sequelize };
