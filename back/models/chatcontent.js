"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ChatContent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Chat, {
        targetKey: "id",
        foreignKey: "ChatId",
      });
    }
  }
  ChatContent.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      ChatId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      senderId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      ChatContent: {
        type: DataTypes.STRING,
      },
      isCheck: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
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
      modelName: "ChatContent",
    }
  );
  return ChatContent;
};
