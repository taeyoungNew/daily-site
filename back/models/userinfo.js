"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.UserInfo, {
        targetKey: "id",
        foreignKey: "userId",
      });
    }
  }
  UserInfo.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      name: { type: DataTypes.STRING(10) },
      hobby: { type: DataTypes.STRING(20) },
      address: { type: DataTypes.STRING(30) },
      mbti: {
        type: DataTypes.ENUM(
          "ISTJ",
          "ISFJ",
          "INFJ",
          "INTJ",
          "ISTP",
          "ISFP",
          "INFP",
          "INTP",
          "ESTP",
          "ESFP",
          "ENFP",
          "ENTP",
          "ESTJ",
          "ESFJ",
          "ENFJ",
          "ENTJ"
        ),
      },
      food: { type: DataTypes.STRING(30) },
      age: {
        type: DataTypes.INTEGER(100),
      },
      aboutMe: { type: DataTypes.STRING(255) },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "UserInfo",
    }
  );
  return UserInfo;
};
