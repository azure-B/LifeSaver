const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "posts",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "게시물 올린 유저의 id값",
        references: {
          model: "users",
          key: "id",
        },
      },
      title: {
        type: DataTypes.STRING(30),
        allowNull: true,
        comment: "게시물 제목 (기본값: 제보합니다)",
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "게시물 내용 (채팅 내용)",
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: Sequelize.Sequelize.literal("CURRENT_TIMESTAMP"),
        comment: "게시물 생성 시간",
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "게시물 수정시간",
      },
    },
    {
      sequelize,
      tableName: "posts",
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [{ name: "id" }],
        },
        {
          name: "FK_users_TO_posts_1",
          using: "BTREE",
          fields: [{ name: "user_id" }],
        },
      ],
    }
  );
};
