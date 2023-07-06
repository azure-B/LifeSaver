var DataTypes = require("sequelize").DataTypes;
var _images = require("./images");
var _posts = require("./posts");
var _users = require("./users");

function initModels(sequelize) {
  var images = _images(sequelize, DataTypes);
  var posts = _posts(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);

  images.belongsTo(posts, { as: "post", foreignKey: "post_id" });
  posts.hasMany(images, { as: "images", foreignKey: "post_id" });
  posts.belongsTo(users, { as: "user", foreignKey: "user_id" });
  users.hasMany(posts, { as: "posts", foreignKey: "user_id" });

  return {
    images,
    posts,
    users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
