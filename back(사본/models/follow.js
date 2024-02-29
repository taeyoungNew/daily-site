"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.Users, {
      //   foreignKey: "folloingId",
      // });
      // this.belongsTo(models.Users, {
      //   foreignKey: "followerId",
      // });
    }
  }
  Follow.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      // folloingId: {
      //   allowNull: false,
      //   type: DataTypes.INTEGER,
      //   references: {
      //     model: "Users",
      //     key: "id",
      //   },
      // },
      // followerId: {
      //   allowNull: false,
      //   type: DataTypes.INTEGER,
      //   references: {
      //     model: "Users",
      //     key: "id",
      //   },
      // },
    },
    {
      sequelize,
      modelName: "Follow",
    }
  );
  return Follow;
};
