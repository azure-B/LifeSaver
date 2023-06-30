const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: "유저의 이메일"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      comment: "유저의 비밀번호"
    },
    name: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: "유저의 이름"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "유저 생성시간"
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
      comment: "유저 수정시간"
    }
  }, {
    sequelize,
    tableName: 'users',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
