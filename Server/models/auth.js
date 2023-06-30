const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "auth",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: "인증을 하고자 하는 이메일",
      },
      auth: {
        type: DataTypes.STRING(10),
        allowNull: false,
        comment: "인증번호",
      },
      auth_flag: {
        type: DataTypes.STRING(1),
        allowNull: false,
        defaultValue: "N",
        comment: "인증여부 판별",
      },
    },
    {
      sequelize,
      tableName: "auth",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
