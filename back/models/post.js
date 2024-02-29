"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // user - post 1대다
      this.belongsTo(models.User, {
        targetKey: "id",
        foreignKey: "userId",
      });
      // post - comment 1대다
      this.hasMany(models.Comment, {
        sourceKey: "id",
        foreignKey: "postId",
      });
      this.hasMany(models.PostLike);
      // post - like 다대다
      this.belongsToMany(models.User, {
        through: "PostLike",
        foreignKey: "postId",
        sourceKey: "id",
        as: "user",
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Post.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
      },
      userId: {
        allowNull: false,
        type: DataTypes.UUID,
      },
      userName: {
        allowNull: false,
        type: DataTypes.STRING(10),
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING(400),
      },
      image: { type: DataTypes.STRING },
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
      modelName: "Post",
    }
  );
  return Post;
};
